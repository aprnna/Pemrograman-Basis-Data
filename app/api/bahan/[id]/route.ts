import getResponse from "@/utils/getResponse";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import getSessionUser from "@/utils/session";

const prisma = new PrismaClient();

export async function PUT(req:NextRequest,{params}:any) {
  const session = await getSessionUser()

  if(!session) return getResponse(null, "Failed to update bahan, user must login",200)
  try {
    const { id } = params;
    const { nama, jumlah, satuan } = await req.json();
    const existBahan = await prisma.bahan_baku.findFirst({
      where: {
        AND: [
          { nama, status: true },
          { satuan, status: true },
        ],
      },
    });

    if (existBahan) return getResponse(null, "Bahan already exist", 400);
    const updateData = await prisma.bahan_baku.update({
      where: { id: parseInt(id) },
      data: { nama, jumlah: parseInt(jumlah), satuan },
    });

    await prisma.mengelola_bahan.create({
      data: {
        jumlah: updateData.jumlah,
        id_user: session.id,
        id_stock: updateData.id,
        proses: "Edit",
      },
    });

    return getResponse(updateData, "Success Update bahan baku", 200);
  } catch (error) {
    console.error("Error updating bahan baku:", error);

    return getResponse(error, "Failed update bahan baku", 400);
  }
}

export async function GET(req:NextRequest,{params}:any) {
  try {
    const { id } = params;

    const data = await prisma.bahan_baku.findUnique({
      where: { id: parseInt(id) },
    });

    if (!data) {
      return getResponse(null, "Bahan Baku not found", 404);
    }

    return getResponse(data, "Success Get bahan baku", 200);
  } catch (error) {
    console.error("Error fetching bahan baku:", error);

    return getResponse(error, "Failed get bahan baku", 400);
  }
}

export async function DELETE(req:NextRequest,{params}:any) {
  const session = await getSessionUser()

  if(!session) return getResponse(null, "Failed to delete bahan, user must login",200)
  try {
    const { id } = params;

    // Update status bahan_baku menjadi FALSE (soft delete)
    const deletedData = await prisma.bahan_baku.update({
      where: { id: parseInt(id) },
      data: { status: false },
    });

    await prisma.mengelola_bahan.create({
      data: {
        jumlah: deletedData.jumlah,
        id_user: session.id,
        id_stock: deletedData.id,
        proses: "Hapus",
      },
    });

    return getResponse(deletedData, "Success Delete bahan baku", 200);
  } catch (error) {
    console.error("Error deleting bahan baku:", error);

    return getResponse(error, "Failed delete bahan baku", 400);
  }
}