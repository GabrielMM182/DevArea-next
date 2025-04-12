export interface CreateShortUrlResult {
  shortCode: string;
  originalUrl: string;
  shortUrl: string;
}

export interface UrlService {
  createShortUrl(url: string): Promise<CreateShortUrlResult>;
  getOriginalUrl(shortCode: string): Promise<string | null>;
}

class UrlServiceImpl implements UrlService {
  private readonly baseUrl: string;

  constructor(baseUrl: string = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async createShortUrl(url: string): Promise<CreateShortUrlResult> {
    if (!url) throw new Error('URL is required');

    const response = await fetch(`${this.baseUrl}/api/shorten`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      throw new Error('Erro ao encurtar URL');
    }

    const data = await response.json();
    return {
      shortCode: data.shortCode,
      originalUrl: data.originalUrl,
      shortUrl: `${this.baseUrl}/s/${data.shortCode}`,
    };
  }

  async getOriginalUrl(shortCode: string): Promise<string | null> {
    if (!shortCode) return null;

    const response = await fetch(`${this.baseUrl}/api/shorten/${shortCode}`);
    if (!response.ok) return null;

    const data = await response.json();
    return data.originalUrl || null;
  }
}

export const urlService = new UrlServiceImpl();