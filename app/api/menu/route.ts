import getResponse from '@/utils/getResponse'
import { createClient } from '@/utils/supabase/server'
import { menu_kategori, PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tersedia = searchParams.get("tersedia");

    const data = await prisma.menu.findMany({
      where: {
        ...(tersedia ? { tersedia: tersedia  == 'true' ? true:false } : {})
      }
    })
    
    return getResponse(data, 'Menu fetched successfully', 200)
  } catch (error) {
    return getResponse(error, 'Menu fetch failed', 500)     
  }

}

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const data = await req.formData()
  const randomId = Math.floor(Math.random() * 1000)
  let dataUpload: { path: string } | null = null;
  
  try {
    if (!data.get('foto')) return getResponse(null, 'Image is required', 400)
    const { data:dataUploadResult, error:errUpload } = await supabase.storage.from('menu').upload(`${data.get("nama")} ${randomId}`, data.get('foto') as File)
    
    dataUpload = dataUploadResult;
    if (errUpload || !dataUpload) {
      await supabase.storage.from('menu').remove([`${(dataUpload as any)?.path}`])
      
      return getResponse(errUpload, 'Failed to upload image', 400)
    }
    const { data:dataImg } = await supabase.storage.from('menu').getPublicUrl(`${dataUpload.path}`)
    const menu = await prisma.menu.create({
      data: {
        nama: data.get('nama') as string,
        harga: data.get('harga') as unknown as number,
        kategori: data.get('kategori') as menu_kategori,
        foto: dataImg.publicUrl,
      },
    })

    return getResponse(menu, 'Menu Post successfully', 201)
  } catch (error) {
    console.error('Menu Post failed', error)
    if (dataUpload) {
      const {error:delError} = await supabase.storage.from('menu').remove([`${dataUpload.path}`])

      if (delError) return getResponse(delError, 'Failed to delete image', 400)
    }
      
    return getResponse(error, 'Menu Post failed', 500)
  } 
}


