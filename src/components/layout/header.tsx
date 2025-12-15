import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from './user-nav';
import { Breadcrumbs } from './breadcrumbs';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <SidebarTrigger />
      <Breadcrumbs />
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  );
}
