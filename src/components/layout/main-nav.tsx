'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Hexagon, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '../ui/button';
import React from 'react';

const mainNavLinks = [
    { href: '/dashboard', label: 'Панель мониторинга' },
    { href: '/companies', label: 'Компании' },
    { href: '/objects', label: 'Объекты' },
    { href: '/devices', label: 'Устройства' },
    { href: '/gateways', label: 'Шлюзы' },
    { href: '/reports', label: 'Отчеты' },
    { href: '/users', label: 'Пользователи' },
    { href: '/catalogs', label: 'Справочники' },
];

const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
        <Hexagon className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-xl font-semibold uppercase text-white">
            BELIOT
        </h1>
    </Link>
);


const DesktopNav = () => {
    const pathname = usePathname();
    return (
        <nav className="hidden items-center gap-4 md:flex">
            {mainNavLinks.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname.startsWith(link.href) ? "text-primary" : "text-white/80"
                    )}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    )
}

const MobileNav = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Открыть меню</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-background p-0">
                    <div className="flex h-16 items-center border-b px-6">
                       <Logo />
                    </div>
                    <nav className="flex flex-col gap-1 p-4">
                         {mainNavLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                                    pathname.startsWith(link.href) ? "bg-muted font-semibold text-foreground" : "text-muted-foreground"
                                )}
                                >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export function MainNav() {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-6">
        {isMobile ? <MobileNav /> : <div/>}
        <div className={cn(isMobile && "flex-1 justify-center", "flex items-center")}>
          <Logo />
        </div>
        {!isMobile && <DesktopNav />}
    </div>
  );
}
