'use client';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { DeviceStatusChart } from '@/components/dashboard/device-status-chart';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { getDevices } from '@/lib/data';
import { type Device } from '@/lib/types';


function DashboardPageContent() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get('companyId');
  const [currentDevices, setCurrentDevices] = React.useState<Device[]>([]);

  React.useEffect(() => {
    const companyIdNum = companyId ? parseInt(companyId, 10) : undefined;
    setCurrentDevices(getDevices(companyIdNum));
  }, [companyId]);

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
    <Suspense fallback={<div>Загрузка...</div>}>
      <DashboardPageContent />
    </Suspense>
  )
}
