'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { type DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { type BeliotObject } from '@/lib/types';

const reportSchema = z.object({
  objectId: z.string().min(1, { message: 'Необходимо выбрать объект' }),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine((data) => data.from && data.to, {
      message: 'Необходимо выбрать период',
    }),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export function ReportForm({ objects }: { objects: BeliotObject[] }) {
  const { toast } = useToast();
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = (data: ReportFormValues) => {
    // In a real app, you would generate a report here.
    console.log(data);
    toast({
      title: 'Отчет формируется',
      description: `Запрошен отчет для объекта ID: ${
        data.objectId
      } за период с ${format(data.dateRange.from, 'PPP', {
        locale: ru,
      })} по ${format(data.dateRange.to, 'PPP', { locale: ru })}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Параметры отчета</CardTitle>
        <CardDescription>
          Выберите объект и период для формирования отчета.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="objectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Объект</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите объект" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {objects.map((obj) => (
                          <SelectItem key={obj.id} value={String(obj.id)}>
                            {obj.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Период</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !field.value?.from && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, 'LLL dd, y', {
                                    locale: ru,
                                  })}{' '}
                                  -{' '}
                                  {format(field.value.to, 'LLL dd, y', {
                                    locale: ru,
                                  })}
                                </>
                              ) : (
                                format(field.value.from, 'LLL dd, y', {
                                  locale: ru,
                                })
                              )
                            ) : (
                              <span>Выберите период</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={{
                            from: field.value?.from,
                            to: field.value?.to,
                          }}
                          onSelect={(range) => field.onChange(range)}
                          numberOfMonths={2}
                          locale={ru}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Сформировать отчет</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
