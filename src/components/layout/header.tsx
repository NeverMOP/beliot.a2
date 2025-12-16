import { UserNav } from './user-nav';
import { MainNav } from './main-nav';
import { CompanyContextSwitcher } from './company-context-switcher';
import { Suspense } from 'react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-auto shrink-0 flex-col justify-center gap-4 border-b-4 border-primary bg-[#2c2c2c] px-4 text-header-foreground sm:px-6">
       <div className="flex h-16 w-full items-center gap-4">
            <MainNav />
            <div className="ml-auto flex items-center gap-4">
                <Suspense fallback={null}>
                  <CompanyContextSwitcher />
                </Suspense>
                <UserNav />
            </div>
      </div>
    </header>
  );
}
