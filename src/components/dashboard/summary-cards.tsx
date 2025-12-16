import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircuitBoard, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Device } from '@/lib/types';
import React from 'react';

export function SummaryCards({ devices }: { devices: Device[] }) {
  const summary = React.useMemo(() => {
      if (!devices) return { total: 0, online: 0, offline: 0, warning: 0 };
      return {
          total: devices.length,
          online: devices.filter((d) => d.status === 'online').length,
          offline: devices.filter((d) => d.status === 'offline').length,
          warning: devices.filter((d) => d.status === 'warning').length,
      }
  }, [devices]);

  const summaries = [
    { title: 'Всего устройств', value: summary.total, icon: CircuitBoard, color: 'text-muted-foreground', href: '/devices' },
    { title: 'Онлайн', value: summary.online, icon: CheckCircle, color: 'text-[hsl(var(--chart-1))]', href: '/devices?status=online' },
    { title: 'Офлайн', value: summary.offline, icon: XCircle, color: 'text-muted-foreground', href: '/devices?status=offline' },
    { title: 'Предупреждения', value: summary.warning, icon: AlertTriangle, color: 'text-destructive', href: '/devices?status=warning' },
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
