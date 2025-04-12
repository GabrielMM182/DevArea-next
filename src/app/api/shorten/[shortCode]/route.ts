import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { shortCode: string } }) {
  try {
    const { shortCode } = params;
    
    if (!shortCode) {
      return NextResponse.json(
        { error: 'Código curto é obrigatório' },
        { status: 400 }
      );
    }

    const link = await prisma.link.findUnique({
      where: { shortCode }
    });

    if (!link) {
      return NextResponse.json(
        { error: 'Link não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      originalUrl: link.originalUrl
    });
  } catch (error) {
    console.error('Erro ao buscar URL original:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
}