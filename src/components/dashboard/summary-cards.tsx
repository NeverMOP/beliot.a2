import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { devices } from '@/lib/data';
import { CircuitBoard, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SummaryCards() {
  const totalDevices = devices.length;
  const onlineDevices = devices.filter((d) => d.status === 'online').length;
  const offlineDevices = devices.filter((d) => d.status === 'offline').length;
  const warningDevices = devices.filter((d) => d.status === 'warning').length;

  const summaries = [
    { title: 'Всего устройств', value: totalDevices, icon: CircuitBoard, color: 'text-muted-foreground', href: '/devices' },
    { title: 'Онлайн', value: onlineDevices, icon: CheckCircle, color: 'text-[hsl(var(--chart-1))]', href: '/devices?status=online' },
    { title: 'Офлайн', value: offlineDevices, icon: XCircle, color: 'text-muted-foreground', href: '/devices?status=offline' },
    { title: 'Предупреждения', value: warningDevices, icon: AlertTriangle, color: 'text-destructive', href: '/devices?status=warning' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaries.map((summary) => (
        <Link key={summary.title} href={summary.href}>
          <Card className="transition-all hover:shadow-md hover:-translate-y-1">
            <CardContent className="flex flex-row items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{summary.title}</p>
                <p className="text-2xl font-bold">{summary.value}</p>
              </div>
              <summary.icon className={cn('h-10 w-10', summary.color)} />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
