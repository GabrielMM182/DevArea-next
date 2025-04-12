import { ShortenRedirect } from '@/components/ShortenRedirect';

// rota dinâmica que captura o parâmetro da URL vinda de shorten/page
interface ShortCodePageProps {
  params: {
    shortCode: string;
  };
}

export default function ShortCodePage({ params }: ShortCodePageProps) {
  return <ShortenRedirect shortCode={params.shortCode} />;
}