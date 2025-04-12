import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface ShortCodePageProps {
  params: {
    shortCode: string;
  };
}

export default async function ShortCodePage({ params }: ShortCodePageProps) {
  const { shortCode } = params;

  if (!shortCode) {
    redirect('/');
  }

  try {
    // Buscar o link no banco de dados
    const link = await prisma.link.findUnique({
      where: { shortCode }
    });

    if (!link) {
      redirect('/');
    }

    // Redirecionar para a URL original
    redirect(link.originalUrl);
  } catch (error) {
    console.error('Erro ao redirecionar:', error);
    redirect('/');
  }

  // Isso nunca será executado devido ao redirecionamento, mas é necessário para o TypeScript
  return null;
}