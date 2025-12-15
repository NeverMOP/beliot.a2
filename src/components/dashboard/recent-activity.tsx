import { devices } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Droplets, Thermometer } from 'lucide-react';

const getStatusVariant = (status: 'online' | 'offline' | 'warning'): "default" | "destructive" | "secondary" => {
    switch (status) {
      case 'warning':
        return 'destructive';
      case 'offline':
        return 'secondary';
      default:
        return 'default';
    }
}

export function RecentActivity() {
  const recentAlerts = devices
    .filter((d) => d.status === 'offline' || d.status === 'warning')
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Последние оповещения</CardTitle>
        <CardDescription>Устройства, требующие внимания.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {recentAlerts.length > 0 ? recentAlerts.map((device) => (
          <div key={device.id} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-secondary">
                  {device.type === 'water' ? <Droplets className="h-5 w-5 text-secondary-foreground" /> : <Thermometer className="h-5 w-5 text-secondary-foreground" />}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{device.object_name}</p>
                <p className="text-sm text-muted-foreground">{device.external_id}</p>
              </div>
            </div>
            <Badge variant={getStatusVariant(device.status)}>{device.status}</Badge>
          </div>
        )) : <p className="text-sm text-muted-foreground">Нет активных оповещений.</p>}
      </CardContent>
    </Card>
  );
}
