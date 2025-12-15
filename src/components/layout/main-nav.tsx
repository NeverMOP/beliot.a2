'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '../ui/button';
import React from 'react';
import Image from 'next/image';

const mainNavLinks = [
    { href: '/dashboard', label: 'Дашборд' },
    { href: '/objects', label: 'Объекты' },
    { href: '/devices', label: 'Устройства' },
    { href: '/gateways', label: 'Шлюзы' },
    { href: '/reports', label: 'Отчеты' },
    { href: '/users', label: 'Пользователи' },
    { href: '/catalogs', label: 'Справочники' },
];

const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEX///8zMzM/Pz+JiYlPT09hYWHc3NwwMDAvLy+8vLw7OztAQECbm5uVlZVVVVWioqKhoaHi4uKpqamtra2xsbHd3d11dXXk5OTY2Njh4eHq6ur19fWcnJzPz89+fn6QkJBbW1uCgoJGRkbAwMCurq5YWFjLy8u/v7/T09NnZ2eArolGAAAEhklEQVR4nO2da3uiOhCGg1BQFEE8xYq3Vms9avf//1cPHQkUkOKUBLnL+555Wj8XzCQzCSEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAgxvR0Ld45L8nStGz8LsmS9L/Z0h2/trqN69wZ0zYvX/vj49uM6Yb3z8i/s83p4P77eyfSNE2fH1i/u/A3z92jY9v57b/v/u1/490xPj7e3t7eW7Zt27Zt25c/z//8+fPnz6+vr6+vr6+vL4/Ztq3b8j/n/2f7N9s/3t/Z3v/L/wMAAQEBAYEBAQGBgAEBAQGBgAEBAYEBAQGBgAEBAQGBgAEBAYEBAQGBgAEBAQGBgAEBAYEBAQGBgAEBAQGBgAEBAYEBAQGBgAEBAQGBgAEBAYEBAQGBgAEBAQGBgAEBAYEBAQGBgAEBAQGBgAEBAYEBAQGBgAEBAQGBgAEBAYEBAQGBgAEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBAYEBAQGBgAEBwS+M6dG+aD98l6b/b7Z8fV7N6f91X5+c/3t4/e1M0p9v99nB8u499eHl7fM7hJj+f990/6H9vR3s35yX7e7P/79g+Y8BAAAAAAAAAAAAAAAAQJL4Dx6U631yFwB7AAAAAElFTkSuQmCC";

const Logo = () => (
    <Link href="/" className="flex items-center gap-2" aria-label="Beliot Home">
      <Image 
        src={logoBase64} 
        alt="Beliot Logo" 
        width={140} 
        height={32}
        className="h-8 w-auto"
        priority
      />
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
