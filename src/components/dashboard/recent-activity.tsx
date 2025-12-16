'use client';

import Link from 'next/link';
import { getReadingsForDevice } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Droplets, Thermometer, BatteryLow, Magnet } from 'lucide-react';
import { type Device, type Reading } from '@/lib/types';
import React from 'react';

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

const ERROR_FLAGS = {
  LOW_BATTERY: 1 << 0, // 1
  TAMPERING: 1 << 1,   // 2
  LEAK: 1 << 2,        // 4
};

const getWarningDetails = async (device: Device): Promise<{ text: string; icon: React.ReactNode }> => {
  if (device.status === 'offline') {
    return { text: 'Офлайн', icon: null };
  }

  const readings = await getReadingsForDevice(device.id);
  const latestReading = readings[readings.length - 1];

  if (latestReading) {
    if ((latestReading.error_flags & ERROR_FLAGS.TAMPERING) !== 0) {
      return { text: 'Вмешательство (магнит)', icon: <Magnet className="mr-2 h-4 w-4" /> };
    }
    if (latestReading.battery_percent < 10 || (latestReading.error_flags & ERROR_FLAGS.LOW_BATTERY) !== 0) {
      return { text: 'Низкий заряд батареи', icon: <BatteryLow className="mr-2 h-4 w-4" /> };
    }
     if ((latestReading.error_flags & ERROR_FLAGS.LEAK) !== 0) {
      return { text: 'Утечка', icon: <Droplets className="mr-2 h-4 w-4" /> };
    }
  }

  // Fallback for generic warning
  return { text: 'Предупреждение', icon: null };
};

function ActivityItem({ device }: { device: Device }) {
    const [warningDetails, setWarningDetails] = React.useState<{ text: string; icon: React.ReactNode } | null>(null);

    React.useEffect(() => {
        getWarningDetails(device).then(setWarningDetails);
    }, [device]);

    if (!warningDetails) {
        return null; // Or a loading skeleton
    }

    return (
        <Link href={`/devices/${device.id}`} className="block rounded-lg -mx-2 px-2 py-3 transition-colors hover:bg-muted">
            <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-secondary">
                    {device.type === 'water' ? <Droplets className="h-5 w-5 text-secondary-foreground" /> : <Thermometer className="h-5 w-5 text-secondary-foreground" />}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-medium leading-none">{device.object_name}</p>
                    <p className="text-sm text-muted-foreground">{device.serial_number}</p>
                </div>
                </div>
                <Badge variant={getStatusVariant(device.status)} className="flex items-center">
                {warningDetails.icon}
                {warningDetails.text}
                </Badge>
            </div>
        </Link>
    )
}

export function RecentActivity({ devices }: { devices: Device[] }) {
  const recentAlerts = React.useMemo(() => {
    if (!devices) return [];
    return devices
      .filter((d) => d.status === 'offline' || d.status === 'warning')
      .slice(0, 5);
  }, [devices]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Последние оповещения</CardTitle>
        <CardDescription>Устройства, требующие внимания.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {recentAlerts.length > 0 
            ? recentAlerts.map((device) => <ActivityItem key={device.id} device={device} />) 
            : <p className="text-sm text-muted-foreground">Нет активных оповещений.</p>}
      </CardContent>
    </Card>
  );
}
