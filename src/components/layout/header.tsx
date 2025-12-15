import { SidebarRail } from '@/components/ui/sidebar';
import { UserNav } from './user-nav';
import { Breadcrumbs } from './breadcrumbs';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-sidebar-border bg-sidebar text-sidebar-foreground px-4 sm:px-6">
      <SidebarRail />
      <Breadcrumbs />
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  );
}
