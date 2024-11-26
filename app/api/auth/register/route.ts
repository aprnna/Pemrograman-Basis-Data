'use server'
import { NextRequest } from 'next/server'
import getResponse from '@/utils/getResponse'
import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt-ts';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, username, password, nama, umur, no_telp, role } = await req.json();
    
    if (!email || !username || !password || !nama || !umur || !no_telp || !role) {
      return getResponse(null,'All fields are required',400)
    }
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username },
        ],
      },
    });

    if (existingUser) return getResponse(null, 'Email or username already exists', 400);
    const createdUser = await prisma.users.create({
      data: {
        nama: nama as string,
        username: username as string,
        umur: umur as number,
        no_telp: no_telp as string,
        email: email as string,
        role: role as string,
        password: hashSync(password,10) as string,
      },
    });
    
    return getResponse(createdUser, 'Success create new user', 200);
  } catch (error) {
    console.error('Error creating new user:', error);

    return getResponse(error, 'Error creating new user', 400);
  }
}