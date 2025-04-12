import { prisma } from '@/lib/prisma';

// lógica de redirecionamento:
export async function useShortenRedirect(shortCode: string) {
  if (!shortCode) {
    return { redirect: '/' };
  }

  try {
    const link = await prisma.link.findUnique({
      where: { shortCode }
    });

    if (!link) {
      return { redirect: '/' };
    }

    return { redirect: link.originalUrl };
  } catch (error) {
    console.error('Erro ao redirecionar:', error);
    return { redirect: '/' };
  }
} 