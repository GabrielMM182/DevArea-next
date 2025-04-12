'use client';

import { useUrlStore } from '@/store/url';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function UrlShortener() {
  const {
    originalUrl,
    shortenedUrl,
    error,
    isLoading,
    setOriginalUrl,
    shortenNewUrl,
  } = useUrlStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await shortenNewUrl();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Encurtador de URL</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL Original</Label>
            <Input
              id="url"
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://exemplo.com"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Encurtando...' : 'Encurtar URL'}
          </Button>
        </form>

        {shortenedUrl && (
          <div className="space-y-2">
            <Label>URL Encurtada</Label>
            <div className="flex gap-2">
              <Input value={shortenedUrl} readOnly />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(shortenedUrl);
                }}
              >
                Copiar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}