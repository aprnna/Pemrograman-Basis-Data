import getResponse from "@/utils/getResponse";
import { createClient } from "@/utils/supabase/server";
import { Kategori, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma  = new PrismaClient();

export async function PUT(req:NextRequest,{params}:any) {
  const supabase = createClient()
  const data =  await req.formData();
  const { id } = params
  const newDataImg =  data.get('foto') as File
  let newImg = null

  try {
    if (newDataImg.size > 0) {
      const randomId = Math.floor(Math.random() * 1000)
      const { data:dataUpload, error:errUpload } = await supabase.storage.from('menu').upload(`${data.get("nama")} ${randomId}`, data.get('foto') as File)
      
      if (errUpload) return getResponse(errUpload, 'Failed to upload image', 400)
      const { data:dataImg } = await supabase.storage.from('menu').getPublicUrl(`${dataUpload.path}`)
  
      newImg = dataImg.publicUrl
    }
    const MenuUpdate = await prisma.menu.update({
      where: { id_menu: parseInt(id) },
      data: {
        nama: data.get('nama') as string,
        harga: data.get('harga') as unknown as number,
        kategori: data.get('kategori') as Kategori,
        foto: newImg ? newImg : (data.get('oldFoto') as string),
      },
    });

    return getResponse(MenuUpdate, "Success Update Menu",200)

  } catch (error) {
    console.error(error)

    return getResponse(error, "Failed Update Menu",500)
  }



}

export async function GET(req:NextRequest,{params}:any) {
  try {
    const { id } = params;
    const data = await prisma.menu.findFirst({
      where: { id_menu: parseInt(id) },
    });

    if (!data) {
      return getResponse(null, "Menu not found", 404);
    }

    return getResponse(data, "Success Get Menu", 200);
  } catch (error) {
    console.error("Error fetching menu:", error);

    return getResponse(error, "Failed get menu", 400);
  }
}

export async function DELETE(req:NextRequest,{params}:any) {
  try {
    const { id } = params;
    const deletedData = await prisma.menu.delete({
      where: { id_menu: parseInt(id) },
    });

    return getResponse(deletedData, "Success Delete Menu", 200);
  } catch (error) {
    console.error("Error deleting menu:", error);
    
    return getResponse(error, "Failed delete menu", 400);
  }
}