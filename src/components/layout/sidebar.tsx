'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, CircuitBoard, Building, Hexagon, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-14 items-center gap-2 px-4 py-2">
          <Hexagon className="h-8 w-8 text-sidebar-primary" />
          <h1 className="font-headline text-xl font-semibold text-sidebar-foreground">
            beliot
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/dashboard'}
              tooltip="Дашборд"
            >
              <Link href="/dashboard">
                <LayoutDashboard />
                <span>Дашборд</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith('/objects')}
              tooltip="Объекты"
            >
              <Link href="/objects">
                <Building />
                <span>Объекты</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith('/devices')}
              tooltip="Устройства"
            >
              <Link href="/devices">
                <CircuitBoard />
                <span>Устройства</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith('/catalogs')}
              tooltip="Справочники"
            >
              <Link href="/catalogs">
                <Settings />
                <span>Справочники</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
