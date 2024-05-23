import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse('Não autenticado', { status: 403 });
    }

    if (!name) {
      return new NextResponse('O nome é obrigatório', { status: 400 });
    }

    if (!value) {
      return new NextResponse('O valor é obrigatório', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('O ID da loja é obrigatório', { status: 400 });
    }

    const storByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storByUserId) {
      return new NextResponse('Não autorizado', { status: 405 });
    }

    const colors = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log('[COLORS_POST]', error);
    return new NextResponse('erro interno', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('O ID da loja é obrigatório', { status: 400 });
    }

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log('[COLORS_GET]', error);
    return new NextResponse('erro interno', { status: 500 });
  }
}
