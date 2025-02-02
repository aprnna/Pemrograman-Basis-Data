import getResponse from '@/utils/getResponse'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const pesanan = await prisma.pesanan.findMany({
      orderBy: { id: 'desc' },
    });

    return getResponse(pesanan, 'Pesanan fetched successfully', 200)
  } catch (error) {
    console.error('Failed to fetch last id', error)
    
    return getResponse(error, 'Failed to fetch last id', 500)
  } finally {
    await prisma.$disconnect()
  }
}