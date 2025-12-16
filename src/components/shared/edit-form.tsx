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
import { objects as allObjects, devices as allDevices } from "@/lib/data";

type Entity = BeliotObject | Device;
type EntityName = "object" | "device" | "gateway";

const deviceSchema = z.object({
  objectId: z.string().min(1, "Необходимо выбрать объект"),
  gatewayId: z.string().optional(),
});


const schemas = {
  // We only support device editing for now as per the request
  device: deviceSchema,
};

const getFormDefaultValues = (entityName: EntityName, entity: Entity) => {
    switch (entityName) {
        case 'device':
            const dev = entity as Device;
            // This is a simplified logic, in real app we'd need a more robust way to find the gateway
            const gateway = allDevices.find(d => d.is_gateway && d.objectId === dev.objectId);
            return {
                objectId: String(dev.objectId),
                gatewayId: gateway ? String(gateway.id) : undefined,
            };
        default:
            return {};
    }
}


interface EditFormProps {
  entity: Entity;
  entityName: EntityName;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditForm({ entity, entityName, isOpen, onOpenChange }: EditFormProps) {
  const { toast } = useToast();
  
  if (entityName !== 'device') {
    // Silently return null if we are not editing a device, to avoid crashes.
    // In a real app we might show a "not implemented" message.
    return null;
  }
  
  const schema = schemas[entityName];
  const device = entity as Device;

  // @ts-ignore
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  React.useEffect(() => {
    if (entity && isOpen) {
        const defaultValues = getFormDefaultValues(entityName, entity);
        form.reset(defaultValues);
    }
  }, [entity, entityName, isOpen, form]);

  function onSubmit(data: z.infer<typeof schema>) {
    console.log("Updating entity:", data);
    toast({
      title: "Данные обновлены",
      description: `Информация для устройства ${device.serial_number} была успешно обновлена.`,
    });
    onOpenChange(false);
  }
  
  const gateways = React.useMemo(() => allDevices.filter(d => d.is_gateway), []);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать привязки</DialogTitle>
          <DialogDescription>
            Измените объект или шлюз для устройства.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Идентификатор</Label>
                <Input value={device.external_id} readOnly className="col-span-3 font-mono" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Серийный номер</Label>
                <Input value={device.serial_number} readOnly className="col-span-3 font-mono" />
            </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="objectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Объект</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите объект" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allObjects.map((obj) => (
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
                name="gatewayId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Шлюз (необязательно)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите шлюз" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gateways.map((gw) => (
                          <SelectItem key={gw.id} value={String(gw.id)}>
                            {gw.serial_number} ({gw.object_name})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Отмена</Button>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
