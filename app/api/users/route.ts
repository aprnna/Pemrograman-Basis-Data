import getResponse from '@/utils/getResponse'
import { PrismaClient } from '@prisma/client';
export const dynamic = 'force-dynamic'

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      where: {
        status: true,
        role: {
          not: 'manager',
        },
      },
    });

    return getResponse(users, 'Users fetched successfully', 200);
  } catch (error) {
    console.error('Failed to fetch users:', error);

    return getResponse(error, 'Failed to fetch users', 400);
  }
}
