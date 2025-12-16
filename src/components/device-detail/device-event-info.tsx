
import { type Device, type Reading } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BatteryLow, Magnet, Droplets, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { getReadingsForDevice } from '@/lib/data';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';

const ERROR_FLAGS = {
  LOW_BATTERY: 1 << 0, // 1
  TAMPERING: 1 << 1,   // 2
  LEAK: 1 << 2,        // 4
};

const getEventDetails = (device: Device, latestReading: Reading | undefined): { text: string; icon: React.ReactNode; time: string | null, variant: "destructive" | "secondary" } | null => {
  let eventTime = latestReading?.time || null;

  if (device.status === 'offline') {
    return { text: 'Офлайн', icon: <XCircle className="mr-2 h-4 w-4" />, time: eventTime, variant: 'secondary' };
  }

  if (device.status === 'warning' && latestReading) {
    if ((latestReading.error_flags & ERROR_FLAGS.TAMPERING) !== 0) {
      return { text: 'Вмешательство (магнит)', icon: <Magnet className="mr-2 h-4 w-4" />, time: eventTime, variant: 'destructive' };
    }
    if (latestReading.battery_percent < 10 || (latestReading.error_flags & ERROR_FLAGS.LOW_BATTERY) !== 0) {
      return { text: 'Низкий заряд батареи', icon: <BatteryLow className="mr-2 h-4 w-4" />, time: eventTime, variant: 'destructive' };
    }
     if ((latestReading.error_flags & ERROR_FLAGS.LEAK) !== 0) {
      return { text: 'Утечка', icon: <Droplets className="mr-2 h-4 w-4" />, time: eventTime, variant: 'destructive' };
    }
    // Fallback for generic warning
    return { text: 'Неизвестное предупреждение', icon: <AlertTriangle className="mr-2 h-4 w-4" />, time: eventTime, variant: 'destructive' };
  }
  
  return null; // No active event
};

export function DeviceEventInfo({ device }: { device: Device }) {
    const readings = getReadingsForDevice(device.id);
    const latestReading = readings.length > 0 ? readings[readings.length - 1] : undefined;
    const eventDetails = getEventDetails(device, latestReading);

  if (!eventDetails) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Последнее событие</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Событие</span>
            <Badge variant={eventDetails.variant} className="flex items-center text-xs">
                {eventDetails.icon}
                {eventDetails.text}
            </Badge>
        </div>
         {eventDetails.time && (
            <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground"><Clock size={16} />Время фиксации</span>
                <span>{format(new Date(eventDetails.time), 'PPPp', { locale: ru })}</span>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
