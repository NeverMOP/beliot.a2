"use client";

import { AppHeader } from '@/components/layout/header';
import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function AppSkeleton() {
    return (
        <div className="flex min-h-svh w-full flex-col">
            <Skeleton className="h-16 w-full" />
            <div className="flex-1 p-4 md:p-6 lg:p-8">
                <Skeleton className="h-[400px] w-full" />
            </div>
        </div>
    )
}


function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        if (!isUserLoading && !user) {
            const currentPath = pathname || '/';
            router.push(`/login?redirectTo=${encodeURIComponent(currentPath)}`);
        }
    }, [user, isUserLoading, router, pathname]);

    if (isUserLoading || !user) {
        return <AppSkeleton />;
    }

    return (
        <div className="flex min-h-svh w-full flex-col bg-background/80">
            <AppHeader />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
