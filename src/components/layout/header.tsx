import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from './user-nav';
import { Breadcrumbs } from './breadcrumbs';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 flex-col justify-center gap-4 border-b-4 border-primary bg-secondary px-4 sm:px-6">
       <div className="flex h-full w-full items-center gap-4">
            <SidebarTrigger className="text-secondary-foreground" />
            <Breadcrumbs />
            <div className="ml-auto flex items-center gap-4">
                <UserNav />
            </div>
      </div>
    </header>
  );
}
