import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse('O ID do produto é obrigatório', { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse('erro interno', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Não autenticado', { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse('O ID do produto é obrigatório', { status: 400 });
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

    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse('erro interno', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse('Não autenticado', { status: 403 });
    }

    if (!name) {
      return new NextResponse('O nome é obrigatório', { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse('Imagem é obrigatória', { status: 400 });
    }

    if (!price) {
      return new NextResponse('A URL de preço é obrigatória', { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse('O ID da categoria é obrigatória', { status: 400 });
    }

    if (!colorId) {
      return new NextResponse('O ID da marca é obrigatória', { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse('O ID do cor é obrigatório', { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse('O ID do produto é obrigatório', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Não autorizado', { status: 405 });
    }

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse('erro interno', { status: 500 });
  }
}
