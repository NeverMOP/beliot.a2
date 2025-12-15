import { AppSidebar } from '@/components/layout/sidebar';
import { AppHeader } from '@/components/layout/header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="relative flex h-full min-h-svh w-full">
        <AppSidebar />
        <div className="flex-1">
          <AppHeader />
          <main className="relative flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
