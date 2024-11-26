import getResponse from '@/utils/getResponse'
import { NextRequest} from 'next/server'
import { PrismaClient, Status } from "@prisma/client";
import getSessionUser from '@/utils/session';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const pesanan = await prisma.pesanan.findMany({
      where:{
        ...(status && { status: status as Status })
      },
      include: {
        item_pesanan: true,
      },
    });

    return getResponse(pesanan, "Pesanan fetched successfully", 200);
  } catch (error) {
    console.error("Failed to fetch pesanan:", error);

    return getResponse(error, "Failed to fetch pesanan", 400);
  }
}

export async function POST(req: NextRequest) {
  const session = await getSessionUser()

  if(!session) return getResponse(null, "failed to create pesanan, user must login",200)
  try {
    const { atasNama, banyak_orang, no_meja, status, total_harga, items } = await req.json();

    const pesananBaru = await prisma.pesanan.create({
      data: {
        atas_nama: atasNama,
        banyak_orang: banyak_orang,
        no_meja: no_meja,
        status: status,
        total_harga: parseFloat(total_harga),
        id_user: session.id,
        item_pesanan: {
          create: items.map((item: any) => ({
            id_menu: item.id_menu,
            jumlah: item.jumlah,
          })),
        },
      },
      include: {
        item_pesanan: true, 
      },
    });

    return getResponse(pesananBaru, "Pesanan created successfully", 200);
  } catch (error) {
    console.error("Failed to create pesanan:", error);

    return getResponse(error, "Failed to create pesanan", 400);
  }
}
