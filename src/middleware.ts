import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { urlService } from '@/services/url';

export async function middleware(request: NextRequest) {
  // Verifica se a requisição é para uma URL curta
  const shortCodeMatch = request.nextUrl.pathname.match(/^\/s\/([\w-]+)$/);
  
  if (shortCodeMatch) {
    const shortCode = shortCodeMatch[1];
    
    try {
      // Busca a URL original
      const originalUrl = await urlService.getOriginalUrl(shortCode);
      
      if (originalUrl) {
        // Redireciona para a URL original
        return NextResponse.redirect(originalUrl, { status: 301 });
      }
    } catch (error) {
      console.error('Erro ao processar redirecionamento:', error);
    }
  }

  return NextResponse.next();
}