'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShortenRedirect } from '@/hooks/useShortenRedirect';

interface ShortenRedirectProps {
  shortCode: string;
}

export function ShortenRedirect({ shortCode }: ShortenRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const { redirect } = await useShortenRedirect(shortCode);
      router.push(redirect);
    };

    handleRedirect();
  }, [shortCode, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
} 