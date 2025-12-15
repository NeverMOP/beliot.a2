"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { gatewayModels, channelTypes } from "@/lib/catalogs";

const gatewaySchema = z.object({
  external_id: z.string().min(1, "Идентификатор обязателен"),
  serial_number: z.string().min(1, "Серийный номер обязателен"),
  model: z.string().min(1, "Модель обязательна"),
  channel_type: z.string().min(1, "Тип канала обязателен"),
  object_name: z.string().min(1, "Название объекта обязательно"),
  address: z.string().min(1, "Адрес обязателен"),
});

type GatewayFormValues = z.infer<typeof gatewaySchema>;

export function CreateGatewayForm() {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<GatewayFormValues>({
    resolver: zodResolver(gatewaySchema),
    defaultValues: {
      channel_type: "lora",
    },
  });

  function onSubmit(data: GatewayFormValues) {
    console.log("Creating gateway:", { ...data, is_gateway: true, type: 'heat' }); // type is irrelevant for gateway but needed for Device type
    // Here you would typically call an API to create the gateway
    toast({
      title: "Шлюз создан",
      description: `Шлюз ${data.external_id} был успешно добавлен.`,
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Создать шлюз
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создать новый шлюз</DialogTitle>
          <DialogDescription>
            Заполните информацию ниже для добавления нового шлюза.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="external_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Идентификатор (DevEUI/IMEI)</FormLabel>
                  <FormControl>
                    <Input placeholder="8A3B4C5D6E7F8G9H" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serial_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Серийный номер</FormLabel>
                  <FormControl>
                    <Input placeholder="SN-GW-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Модель</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите модель" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gatewayModels.map((model) => (
                            <SelectItem key={model} value={model}>{model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="object_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Объект</FormLabel>
                  <FormControl>
                    <Input placeholder="Тепловой узел №1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес</FormLabel>
                  <FormControl>
                    <Input placeholder="ул. Центральная, д. 10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="channel_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип канала</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите канал" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                       {channelTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
              <Button type="submit">Создать</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
