'use client';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { DeviceStatusChart } from '@/components/dashboard/device-status-chart';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { getDevices } from '@/lib/data';
import { type Device } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <Skeleton className="h-[400px]" />
                </div>
                <div className="lg:col-span-2">
                    <Skeleton className="h-[400px]" />
                </div>
            </div>
        </div>
    )
}


async function DashboardPageContent() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get('companyId');
  const companyIdNum = companyId ? parseInt(companyId, 10) : undefined;
  const currentDevices = await getDevices(companyIdNum);

  return (
    <div className="space-y-6">
      <SummaryCards devices={currentDevices} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <DeviceStatusChart devices={currentDevices} />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity devices={currentDevices} />
        </div>
      </div>
    </div>
  );
}


export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardPageContent />
    </Suspense>
  )
}
