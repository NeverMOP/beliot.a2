import { AppHeader } from '@/components/layout/header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex min-h-svh w-full flex-col bg-background/80">
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </div>
  );
}
