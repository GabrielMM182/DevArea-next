import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { urlService } from '@/services/url';
import { urlSchema } from '@/utils/validations';

export interface UrlState {
  originalUrl: string;
  shortenedUrl: string | null;
  error: string | null;
  isLoading: boolean;
  setOriginalUrl: (url: string) => void;
  shortenNewUrl: () => Promise<void>;
}

export const useUrlStore = create<UrlState>()(
  devtools((set, get) => ({
    originalUrl: '',
    shortenedUrl: null,
    error: null,
    isLoading: false,
    setOriginalUrl: (url) => set({ originalUrl: url, error: null }),
    shortenNewUrl: async () => {
      try {
        set({ isLoading: true });
        const url = get().originalUrl;
        await urlSchema.parseAsync({ url });
        const result = await urlService.createShortUrl(url);
        set({ shortenedUrl: result.shortUrl, error: null });
      } catch (error) {
        if (error instanceof Error) {
          set({ error: error.message });
        }
      } finally {
        set({ isLoading: false });
      }
    }
  }), { name: 'url-store' })
); 