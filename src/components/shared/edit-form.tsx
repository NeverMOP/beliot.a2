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
import { type BeliotObject, type Device } from "@/lib/types";
import { deviceModels, channelTypes, gatewayModels } from "@/lib/catalogs";

type Entity = BeliotObject | Device;
type EntityName = "object" | "device" | "gateway";

const objectSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  address: z.string().min(1, "Адрес обязателен"),
  objectType: z.enum(['residential', 'business_center', 'mall', 'medical', 'school', 'kindergarten', 'heating_point', 'warehouse']),
});

const deviceSchema = z.object({
  external_id: z.string().min(1, "Идентификатор обязателен"),
  serial_number: z.string().min(1, "Серийный номер обязателен"),
  model: z.string().min(1, "Модель обязательна"),
  channel_type: z.string().min(1, "Тип канала обязателен"),
  object_name: z.string().min(1, "Название объекта обязательно"),
  address: z.string().min(1, "Адрес обязателен"),
  type: z.enum(["water", "heat"]),
});

const gatewaySchema = z.object({
    external_id: z.string().min(1, "Идентификатор обязателен"),
    serial_number: z.string().min(1, "Серийный номер обязателен"),
    model: z.string().min(1, "Модель обязательна"),
    channel_type: z.string().min(1, "Тип канала обязателен"),
    object_name: z.string().min(1, "Название объекта обязательно"),
    address: z.string().min(1, "Адрес обязателен"),
});


const schemas = {
  object: objectSchema,
  device: deviceSchema,
  gateway: gatewaySchema
};

const defaultValues = {
    object: (entity: BeliotObject) => ({
        name: entity.name,
        address: entity.address,
        objectType: entity.objectType
    }),
    device: (entity: Device) => ({
        external_id: entity.external_id,
        serial_number: entity.serial_number,
        model: entity.model,
        channel_type: entity.channel_type,
        object_name: entity.object_name,
        address: entity.address,
        type: entity.type
    }),
    gateway: (entity: Device) => ({
        external_id: entity.external_id,
        serial_number: entity.serial_number,
        model: entity.model,
        channel_type: entity.channel_type,
        object_name: entity.object_name,
        address: entity.address,
    })
}

interface EditFormProps {
  entity: Entity;
  entityName: EntityName;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditForm({ entity, entityName, isOpen, onOpenChange }: EditFormProps) {
  const { toast } = useToast();
  
  const schema = schemas[entityName];
  // @ts-ignore
  const form = useForm({
    // @ts-ignore
    resolver: zodResolver(schema),
  });

  React.useEffect(() => {
    if (isOpen && entity) {
        // @ts-ignore
        const values = defaultValues[entityName](entity);
        form.reset(values);
    }
  }, [isOpen, entity, entityName, form]);

  function onSubmit(data: z.infer<typeof schema>) {
    console.log("Updating entity:", data);
    toast({
      title: "Данные обновлены",
      description: `Информация была успешно обновлена.`,
    });
    onOpenChange(false);
  }

  const renderFormFields = () => {
    switch(entityName) {
        case 'object':
            return (
                <>
                    <FormField control={form.control} name="name" render={({ field }) => ( <FormItem> <FormLabel>Название</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="address" render={({ field }) => ( <FormItem> <FormLabel>Адрес</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="objectType" render={({ field }) => (
                         <FormItem>
                            <FormLabel>Тип объекта</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="residential">Жилой дом</SelectItem>
                                    <SelectItem value="business_center">Бизнес-центр</SelectItem>
                                    <SelectItem value="mall">Торговый центр</SelectItem>
                                    <SelectItem value="medical">Мед. учреждение</SelectItem>
                                    <SelectItem value="school">Школа</SelectItem>
                                    <SelectItem value="kindergarten">Детский сад</SelectItem>
                                    <SelectItem value="heating_point">Тепловой пункт</SelectItem>
                                    <SelectItem value="warehouse">Склад</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                </>
            )
        case 'device':
            return (
                <>
                    <FormField control={form.control} name="external_id" render={({ field }) => ( <FormItem> <FormLabel>Идентификатор</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="serial_number" render={({ field }) => ( <FormItem> <FormLabel>Серийный номер</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="model" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Модель</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>{deviceModels.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="object_name" render={({ field }) => ( <FormItem> <FormLabel>Объект</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="address" render={({ field }) => ( <FormItem> <FormLabel>Адрес</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                     <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="type" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Тип</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="water">Вода</SelectItem>
                                    <SelectItem value="heat">Тепло</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="channel_type" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Канал</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                                <SelectContent>{channelTypes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                </>
            )
        case 'gateway':
             return (
                <>
                    <FormField control={form.control} name="external_id" render={({ field }) => ( <FormItem> <FormLabel>Идентификатор</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="serial_number" render={({ field }) => ( <FormItem> <FormLabel>Серийный номер</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="model" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Модель</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>{gatewayModels.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="object_name" render={({ field }) => ( <FormItem> <FormLabel>Объект</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="address" render={({ field }) => ( <FormItem> <FormLabel>Адрес</FormLabel> <FormControl> <Input {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                    <FormField control={form.control} name="channel_type" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Канал</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                                <SelectContent>{channelTypes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                </>
            )
        default:
            return null;
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать</DialogTitle>
          <DialogDescription>
            Измените информацию ниже и нажмите "Сохранить".
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            {renderFormFields()}
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Отмена</Button>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
