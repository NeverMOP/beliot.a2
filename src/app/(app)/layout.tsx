import { AppSidebar } from '@/components/layout/sidebar';
import { AppHeader } from '@/components/layout/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="relative flex h-full min-h-svh w-full">
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="relative flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
