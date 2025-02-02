import { PrismaClient } from '@prisma/client';
import getResponse from "@/utils/getResponse";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const { nama, umur, no_telp, role } = await req.json();
    const user = await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        nama: nama,
        umur: parseInt(umur),
        no_telp: no_telp,
        role: role,
      },
    });

    return getResponse(user, 'user updated successfully', 200);
  } catch (error) {
    return getResponse(error, 'error updating user', 400);
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  const { id } = params;

  try {
    const user = await prisma.users.delete({
      where: { id: parseInt(id) },
    });

    return getResponse(user, 'user deleted successfully', 200);
  } catch (error) {
    return getResponse(error, 'error deleting user', 400);
  }
}