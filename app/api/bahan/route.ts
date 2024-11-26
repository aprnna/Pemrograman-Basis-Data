import getResponse from '@/utils/getResponse'
import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import getSessionUser from '@/utils/session'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const bahan_baku = await prisma.bahan_Baku.findMany({
      where: {
        status: true, 
      },
    })

    return getResponse(bahan_baku, 'Bahan Baku fetched successfully', 200)
  } catch (error) {
    console.error('Error fetching bahan_baku:', error)

    return getResponse(error, 'Failed to fetch Bahan Baku', 500)
  }
}

export async function POST(req: NextRequest) {
  const session = await getSessionUser()

  if(!session) return getResponse(null, "Failed to insert bahan, user must login",200)
  try {
    const { nama, jumlah, satuan } = await req.json()
    const bahan_baku = await prisma.bahan_Baku.create({
      data: {
        nama,
        jumlah,
        satuan,
      },
    })

    await prisma.mengelola_Bahan.create({
      data: {
        jumlah,
        id_user: session?.id, 
        id_stock: bahan_baku.id_stock,
        proses: 'Tambah',
      },
    })

    return getResponse(bahan_baku, 'Bahan insert successfully', 201)
  } catch (error) {
    console.error('Error inserting bahan:', error)

    return getResponse(error, 'Failed to insert bahan', 400)
  }
}


