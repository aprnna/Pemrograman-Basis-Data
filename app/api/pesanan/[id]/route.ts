import getResponse from "@/utils/getResponse";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: any) {
  const { id } = params;
  const order = await prisma.pesanan.findFirst({ where: { id: parseInt(id) } });
  const items = await prisma.item_pesanan.findMany({ where: { id_pesanan: order?.id } });
  const menuIds = items.map(item => item.id_menu);
  const menuDetails = await prisma.menu.findMany({ where: { id: { in: menuIds } } });

  if (!order) return getResponse(null, "Failed get order", 400);
  if (!items) return getResponse(null, "Failed get items", 400);
  if (!menuDetails) return getResponse(null, `Failed get menu ${menuIds}`, 400);

  return getResponse({ order, items, menuDetails }, "Success Get pesanan", 200);
}

export async function PUT(req: NextRequest, { params }: any) {
  const { id } = params;
  const { atas_nama, banyak_orang, no_meja, status, total_harga,  } = await req.json();

  const updatedOrder = await prisma.pesanan.update({
    where: { id: parseInt(id) },
    data: {
      atas_nama,
      banyak_orang,
      no_meja,
      status,
      total_harga,
      updatedAt: new Date().toISOString()
    }
  });

  if (!updatedOrder) return getResponse(null, "Failed to update order", 400);

  return getResponse(updatedOrder, "Successfully updated pesanan", 200);
}