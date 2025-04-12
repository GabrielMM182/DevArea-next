import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from '@/components/ui/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Template - App Router",
  description: "Template de Next.js com App Router, Server Components, e mais",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Header />
        <main className="container py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
