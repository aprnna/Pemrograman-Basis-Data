import getResponse from '@/utils/getResponse'
import { createClient } from '@/utils/supabase/server'
import { PrismaClient } from '@prisma/client';
import { parseISO, differenceInMinutes } from 'date-fns';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { start, end } = await req.json()

  try {
    const pesanan = await prisma.pesanan.findMany({
      where: {
        status: 'selesai',
        createdAt: {
          gte: new Date(start),
          lte: new Date(end)
        }
      }
    })

    if (!pesanan) return getResponse(null, 'no profit found', 404)
    let profit = 0
    let banyakPelanggan = 0
    let totalDifferenceInMinutes = 0;  
    let rataRataPesananSelesaiDalamJam = 0

    pesanan.map((item: any) => {
      profit += item.total_harga
      banyakPelanggan += item.banyak_orang
      const createdAt = parseISO(item.createdAt);
      const updatedAt = parseISO(item.updatedAt);
      const differenceInMinutess = differenceInMinutes(updatedAt, createdAt);

      totalDifferenceInMinutes += differenceInMinutess; 
    })
    rataRataPesananSelesaiDalamJam = totalDifferenceInMinutes / pesanan.length / 60; 
    if (!rataRataPesananSelesaiDalamJam) rataRataPesananSelesaiDalamJam = 0
    const data = {
      profit: profit,
      banyakPelanggan: banyakPelanggan,
      rataRataPesananSelesaiDalamJam: rataRataPesananSelesaiDalamJam 
    }

    return getResponse(data, 'profit fetched successfully', 200)
  } catch (error) {
    return getResponse(null, 'error fetching profit', 400)
    
  }
}
