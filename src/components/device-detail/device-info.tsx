import { type Device } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Battery, Rss, Signal, Clock, Hash, Package, GripVertical, Paperclip } from 'lucide-react';
import { getReadingsForDevice } from '@/lib/data';
import { Separator } from '../ui/separator';

const getStatusVariant = (status: 'online' | 'offline' | 'warning'): "default" | "destructive" | "secondary" => {
    switch (status) {
      case 'online':
        return 'default';
      case 'warning':
        return 'destructive';
      case 'offline':
        return 'secondary';
      default:
        return 'secondary';
    }
}

const statusRussian: Record<string, string> = {
    online: 'Онлайн',
    offline: 'Офлайн',
    warning: 'Предупреждение'
}

export function DeviceInfo({ device }: { device: Device }) {
    const latestReading = getReadingsForDevice(device.id).pop();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация об устройстве</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Статус</span>
            <Badge variant={getStatusVariant(device.status)}>{statusRussian[device.status]}</Badge>
        </div>
        {latestReading && (
            <>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground"><Battery size={16} />Батарея</span>
                    <span>{latestReading.battery_percent.toFixed(0)}%</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground"><Rss size={16} />RSSI</span>
                    <span>{latestReading.rssi} dBm</span>
                </div>
            </>
        )}
        <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground"><Hash size={16} />Идентификатор (DevEUI/IMEI)</span>
            <span className="font-mono text-xs">{device.external_id}</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground"><GripVertical size={16} />Серийный номер</span>
            <span className="font-mono text-xs">{device.serial_number}</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground"><Package size={16} />Модель</span>
            <span>{device.model}</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground"><Signal size={16} />Канал</span>
            <span className="capitalize">{device.channel_type}</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground"><Clock size={16} />Создан</span>
            <span>{new Date(device.created_at).toLocaleDateString()}</span>
        </div>

        {device.attributes && device.attributes.length > 0 && (
            <>
                <Separator />
                <div className='space-y-4'>
                    <h3 className="flex items-center gap-2 font-medium text-muted-foreground"><Paperclip size={16} />Дополнительные атрибуты</h3>
                    {device.attributes.map(attr => (
                        <div key={attr.name} className="flex items-center justify-between">
                            <span className="text-muted-foreground">{attr.name}</span>
                            <span>{attr.value}</span>
                        </div>
                    ))}
                </div>
            </>
        )}
      </CardContent>
    </Card>
  );
}
