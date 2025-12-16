'use client';

import * as React from 'react';
import { getDeviceById, getReadingsForDevice } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { type Device, type Reading } from '@/lib/types';

const LOGS_PER_PAGE = 10;
const MAX_LOGS = 100;

export default function DeviceLogsPage({ params }: { params: { id: string } }) {
  const deviceId = parseInt(params.id, 10);
  const [device, setDevice] = React.useState<Device | null | undefined>(null);
  const [allReadings, setAllReadings] = React.useState<Reading[]>([]);

  React.useEffect(() => {
    async function fetchData() {
        const dev = await getDeviceById(deviceId);
        if (!dev) notFound();
        setDevice(dev);
        const readings = await getReadingsForDevice(deviceId);
        setAllReadings(readings.reverse().slice(0, MAX_LOGS));
    }
    fetchData();
  }, [deviceId])


  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');

  if (device === null) {
    return <div>Загрузка...</div>;
  }
  
  if (device === undefined) {
      notFound();
  }

  const filteredReadings = React.useMemo(() => {
    if (!searchQuery) {
      return allReadings;
    }
    return allReadings.filter(reading => 
      JSON.stringify(reading).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allReadings, searchQuery]);

  const totalPages = Math.ceil(filteredReadings.length / LOGS_PER_PAGE);
  const startIndex = (currentPage - 1) * LOGS_PER_PAGE;
  const endIndex = startIndex + LOGS_PER_PAGE;
  const currentLogs = filteredReadings.slice(startIndex, endIndex);

  const getSummary = (reading: any) => {
    const time = format(new Date(reading.time), 'dd.MM.yyyy HH:mm:ss', { locale: ru });
    let value = '';
    if (device?.type === 'water' && reading.in1 !== undefined) {
      value = `Объем: ${reading.in1.toFixed(3)} ${device.unit_volume}`;
    } else if (device?.type === 'heat' && reading.energy !== undefined) {
      value = `Энергия: ${reading.energy.toFixed(3)} ${device.unit_energy}`;
    }
    return `${time} - ${value}`;
  }
  
  // Reset page to 1 when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Логи устройства</CardTitle>
          <CardDescription>
            Отображены последние {Math.min(MAX_LOGS, allReadings.length)} записей для устройства <strong>{device.serial_number}</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по логам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <ScrollArea className="h-[55svh] w-full">
             <Accordion type="multiple" className="pr-4">
                {currentLogs.map((reading, index) => (
                    <AccordionItem value={`item-${startIndex + index}`} key={startIndex + index}>
                        <AccordionTrigger className="text-sm font-mono hover:no-underline">
                           {getSummary(reading)}
                        </AccordionTrigger>
                        <AccordionContent>
                             <pre className="text-xs bg-muted/50 p-4 rounded-md overflow-x-auto">
                                {JSON.stringify(reading, null, 2)}
                            </pre>
                        </AccordionContent>
                    </AccordionItem>
                ))}
             </Accordion>
             {filteredReadings.length === 0 && (
                <div className="flex h-48 items-center justify-center">
                    <p className="text-sm text-muted-foreground">Нет данных для отображения.</p>
                </div>
              )}
          </ScrollArea>
        </CardContent>
        {totalPages > 1 && (
            <CardFooter className="flex items-center justify-end space-x-2 pt-4">
                 <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Стр. {currentPage} из {totalPages}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Назад
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Вперед
                </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
