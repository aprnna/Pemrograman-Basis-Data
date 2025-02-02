import getResponse from "@/utils/getResponse";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function PUT(req:NextRequest,{params}:any) {
  const { id } = params

  try {
    const menu = await prisma.menu.findFirst({where:{id:Number(id)}})
    
    if (!menu) return getResponse(null, "Menu not found",404)
    const updateMenuStatus = await prisma.menu.update({
      where:{id:Number(id)},
      data:{tersedia:!menu.tersedia}
    })

    return getResponse(updateMenuStatus, "Success Update Menu",200)
  } catch (error) {
    return getResponse(error, "Failed Update Menu",500)
  }



}
