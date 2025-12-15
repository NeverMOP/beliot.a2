import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { devices } from '@/lib/data';
import { CircuitBoard, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export function SummaryCards() {
  const totalDevices = devices.length;
  const onlineDevices = devices.filter((d) => d.status === 'online').length;
  const offlineDevices = devices.filter((d) => d.status === 'offline').length;
  const warningDevices = devices.filter((d) => d.status === 'warning').length;

  const summaries = [
    { title: 'Всего устройств', value: totalDevices, icon: CircuitBoard, color: 'text-muted-foreground' },
    { title: 'Онлайн', value: onlineDevices, icon: CheckCircle, color: 'text-[hsl(var(--chart-1))]' },
    { title: 'Офлайн', value: offlineDevices, icon: XCircle, color: 'text-muted-foreground' },
    { title: 'Предупреждения', value: warningDevices, icon: AlertTriangle, color: 'text-destructive' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaries.map((summary) => (
        <Card key={summary.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{summary.title}</CardTitle>
            <summary.icon className={`h-5 w-5 ${summary.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
