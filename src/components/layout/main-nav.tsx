'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '../ui/button';
import React from 'react';

const mainNavLinks = [
    { href: '/dashboard', label: 'Панель мониторинга' },
    { href: '/objects', label: 'Объекты' },
    { href: '/devices', label: 'Устройства' },
    { href: '/gateways', label: 'Шлюзы' },
    { href: '/reports', label: 'Отчеты' },
    { href: '/users', label: 'Пользователи' },
    { href: '/catalogs', label: 'Справочники' },
];

const Logo = () => (
    <Link href="/" className="flex items-center gap-2" aria-label="Beliot Home">
      <svg
        width="140"
        height="32"
        viewBox="0 0 160 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-auto"
      >
        <path
          d="M17.808.232c-9.72 0-17.592 7.872-17.592 17.592s7.872 17.592 17.592 17.592 17.592-7.872 17.592-17.592S27.528.232 17.808.232zm0 31.656c-7.776 0-14.064-6.288-14.064-14.064S10.032 3.768 17.808 3.768s14.064 6.288 14.064 14.064-6.288 14.064-14.064 14.064z"
          fill="#CCCCCC"
        />
        <path
          d="M19.824 17.624c0-1.08-.864-1.992-1.992-1.992h-5.016v3.984h5.016c1.128 0 1.992-.912 1.992-1.992zm-8.4 8.592h5.016c4.68 0 8.4-3.792 8.4-8.592s-3.72-8.592-8.4-8.592h-5.016c-1.896 0-3.408 1.512-3.408 3.408v10.368c0 1.896 1.512 3.408 3.408 3.408z"
          fill="#CCCCCC"
        />
        <path
          d="M60.189 26.312h-3.408V9.416h3.408v16.896zM73.57 9.416l-5.016 8.016v-8.016h-3.408v16.896h3.408l5.016-8.016v8.016h3.408V9.416H73.57zM88.75 26.312h-3.408V9.416h3.408v16.896zM100.174 9.416a9.04 9.04 0 00-9.192 8.856c0 4.896 4.104 8.856 9.192 8.856s9.192-3.96 9.192-8.856c0-4.896-4.104-8.856-9.192-8.856zm0 14.28c-3.144 0-5.784-2.4-5.784-5.424s2.64-5.424 5.784-5.424 5.784 2.4 5.784 5.424-2.64 5.424-5.784 5.424zM121.726 26.312h-3.408V13.304h-4.392v-3.888h11.208v3.888h-3.408v13.008z"
          fill="#CCCCCC"
        />
        <text
          x="44"
          y="26"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="#CCCCCC"
        >
          BELI
        </text>
        <text
          x="109"
          y="26"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="#CCCCCC"
        >
          T
        </text>
      </svg>
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
