import { AppSidebar } from '@/components/layout/sidebar';
import { AppHeader } from '@/components/layout/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="relative flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="absolute top-0 left-0 h-1.5 w-full bg-primary/20">
                <div className="h-full w-3/4 max-w-xs rounded-r-full bg-primary"></div>
            </div>
            <div className="pt-4">
                {children}
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
