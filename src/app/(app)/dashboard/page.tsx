import { SummaryCards } from '@/components/dashboard/summary-cards';
import { DeviceStatusChart } from '@/components/dashboard/device-status-chart';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Дашборд</h1>
      <SummaryCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <DeviceStatusChart />
        </div>
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
