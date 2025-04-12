'use client';

import { useNavigationStore } from '@/store/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

function NavItem({ href, active, children }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md transition-colors ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-secondary'
      }`}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const { setCurrentPath } = useNavigationStore();

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname, setCurrentPath]);

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">DevArea</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-2 text-sm font-medium">
          <NavItem href="/password-generator" active={pathname === '/password-generator'}>
            Gerador de Senha
          </NavItem>
          <NavItem href="/shorten" active={pathname === '/shorten'}>
            Encurtador de URL
          </NavItem>
          <NavItem href="/conversor" active={pathname === '/conversor'}>
            Conversor de Moeda
          </NavItem>
          <NavItem href="/api-validator" active={pathname === '/api-validator'}>
            Validador de API
          </NavItem>
        </nav>
      </div>
    </header>
  );
} 