
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Hexagon } from 'lucide-react';

const mainNavLinks = [
    { href: '/dashboard', label: 'Дашборд' },
    { href: '/objects', label: 'Объекты' },
    { href: '/devices', label: 'Устройства' },
    { href: '/gateways', label: 'Шлюзы' },
    { href: '/reports', label: 'Отчеты' },
    { href: '/users', label: 'Пользователи' },
    { href: '/catalogs', label: 'Справочники' },
]

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
            <Hexagon className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-xl font-semibold text-header-foreground">
                beliot
            </h1>
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
        {mainNavLinks.map(link => (
             <Link
                key={link.href}
                href={link.href}
                className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname.startsWith(link.href) ? "text-primary" : "text-header-foreground/80"
                )}
                >
                {link.label}
            </Link>
        ))}
        </nav>
    </div>
  );
}
