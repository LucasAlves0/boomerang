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

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Não autenticado', { status: 403 });
    }

    if (!label) {
      return new NextResponse('A coluna é obrigatório', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('A URL da imagem é obrigatória', { status: 400 });
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

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('["BILLBOARDS_POST]', error);
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

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log('["BILLBOARDS_GET]', error);
    return new NextResponse('erro interno', { status: 500 });
  }
}
