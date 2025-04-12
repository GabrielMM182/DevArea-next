import { UrlShortener } from '@/components/UrlShortener';

export default function ShortenPage() {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Encurtador de URLs</h1>
      <p className="text-lg mb-8 text-gray-600">
        Encurte suas URLs de forma simples e rápida.
      </p>
      <UrlShortener />
    </div>
  );
}