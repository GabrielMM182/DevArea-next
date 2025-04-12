import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL é obrigatória' },
        { status: 400 }
      );
    }

    // Validar URL
    try {
      new URL(url);
    } catch (error) {
      return NextResponse.json(
        { error: 'Formato de URL inválido' },
        { status: 400 }
      );
    }

    // Gerar código curto
    const shortCode = nanoid(8);
    
    // Salvar no banco de dados
    const link = await prisma.link.create({
      data: {
        originalUrl: url,
        shortCode
      }
    });

    // Construir URL encurtada
    const baseUrl = request.headers.get('host') || 'localhost:3000';
    const protocol = baseUrl.includes('localhost') ? 'http' : 'https';
    const shortUrl = `${protocol}://${baseUrl}/s/${shortCode}`;

    return NextResponse.json({
      shortCode,
      originalUrl: url,
      shortUrl
    });
  } catch (error) {
    console.error('Erro ao encurtar URL:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
}