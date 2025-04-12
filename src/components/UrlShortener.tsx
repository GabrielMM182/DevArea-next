'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { urlService, CreateShortUrlResult } from '@/services/url';

export function UrlShortener() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<CreateShortUrlResult | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const shortUrlResult = await urlService.createShortUrl(url);
      setResult(shortUrlResult);
      setUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao encurtar URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Erro ao copiar para a área de transferência:', err);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Encurtador de URLs</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Cole sua URL aqui"
            required
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Encurtando...' : 'Encurtar URL'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">URL Encurtada:</span>
              <button
                onClick={() => copyToClipboard(result.shortUrl)}
                className="text-sm text-primary hover:text-primary/90"
              >
                Copiar
              </button>
            </div>
            <a
              href={result.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/90 break-all"
            >
              {result.shortUrl}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}