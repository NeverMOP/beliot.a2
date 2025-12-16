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
import { getAllObjects, getDevices as getAllDevices, getGatewayForDevice } from "@/lib/data";
import { Label } from "@/components/ui/label";

type Entity = BeliotObject | Device;
type EntityName = "object" | "device" | "gateway";

const deviceSchema = z.object({
  objectId: z.string().optional(),
  gatewayId: z.string().optional(),
});


const schemas = {
  device: deviceSchema,
  // Add other schemas if needed
};

const getFormDefaultValues = async (entityName: EntityName, entity: Entity) => {
    switch (entityName) {
        case 'device':
            const dev = entity as Device;
            const gateway = await getGatewayForDevice(dev);
            return {
                objectId: dev.objectId ? String(dev.objectId) : "",
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
  const [allObjects, setAllObjects] = React.useState<BeliotObject[]>([]);
  const [gateways, setGateways] = React.useState<Device[]>([]);
  
  // This form is only for devices for now, as per the user's request.
  if (entityName !== 'device') {
    return null;
  }
  
  // @ts-ignore
  const schema = schemas[entityName];
  const device = entity as Device;

  const form = useForm<z.infer<typeof deviceSchema>>({
    resolver: zodResolver(schema),
  });
  
  React.useEffect(() => {
      const fetchData = async () => {
          const [objects, allDevs] = await Promise.all([
              getAllObjects(),
              getAllDevices()
          ]);
          setAllObjects(objects);
          setGateways(allDevs.filter(d => d.is_gateway));
      }
      fetchData();
  }, []);

  React.useEffect(() => {
    if (entity && isOpen) {
        getFormDefaultValues(entityName, entity).then(defaultValues => {
             form.reset(defaultValues);
        });
    }
  }, [entity, entityName, isOpen, form]);

  function onSubmit(data: z.infer<typeof deviceSchema>) {
    console.log("Updating entity:", data);
    toast({
      title: "Данные обновлены",
      description: `Информация для устройства ${device.serial_number} была успешно обновлена.`,
    });
    onOpenChange(false);
  }

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
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите объект" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Без привязки</SelectItem>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите шлюз" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Без привязки</SelectItem>
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
