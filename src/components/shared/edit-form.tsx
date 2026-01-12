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
import { Skeleton } from "../ui/skeleton";

type Entity = BeliotObject | Device;
type EntityName = "object" | "device" | "gateway";

const deviceSchema = z.object({
  objectId: z.string().optional(),
  gatewayId: z.string().optional(),
});

const objectSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  address: z.string().min(1, "Адрес обязателен"),
});


const schemas = {
  device: deviceSchema,
  object: objectSchema,
  gateway: deviceSchema, // Gateways are devices
};

const getFormDefaultValues = async (entityName: EntityName, entity: Entity) => {
    switch (entityName) {
        case 'device':
        case 'gateway':
            const dev = entity as Device;
            const gateway = await getGatewayForDevice(dev);
            return {
                objectId: dev.objectId ? String(dev.objectId) : "",
                gatewayId: gateway ? String(gateway.id) : "",
            };
        case 'object':
            const obj = entity as BeliotObject;
            return {
                name: obj.name,
                address: obj.address,
            }
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
  const [isLoading, setIsLoading] = React.useState(true);
  
  // @ts-ignore
  const schema = schemas[entityName];

  const form = useForm({
    resolver: zodResolver(schema),
  });
  
  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const fetchData = async () => {
          if (entityName === 'device' || entityName === 'gateway') {
            const [objects, allDevs] = await Promise.all([
                getAllObjects(),
                getAllDevices()
            ]);
            setAllObjects(objects);
            setGateways(allDevs.filter(d => d.is_gateway));
          }
          const defaultValues = await getFormDefaultValues(entityName, entity);
          form.reset(defaultValues);
          setIsLoading(false);
      }
      fetchData();
    }
  }, [entity, entityName, isOpen, form]);

  function onSubmit(data: any) {
    console.log(`Updating ${entityName}:`, data);
    toast({
      title: "Данные обновлены",
      description: `Информация была успешно обновлена.`,
    });
    onOpenChange(false);
  }
  
  const renderDeviceFields = () => {
      const device = entity as Device;
      return (
        <>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Идентификатор</Label>
                <Input value={device.external_id} readOnly className="col-span-3 font-mono" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Серийный номер</Label>
                <Input value={device.serial_number} readOnly className="col-span-3 font-mono" />
            </div>
            <FormField
                control={form.control}
                name="objectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Объект</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
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
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
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
        </>
      )
  }

    const renderObjectFields = () => (
        <>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Название объекта</FormLabel>
                        <FormControl>
                            <Input placeholder="Название..." {...field} />
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
                            <Input placeholder="Адрес..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );

  const getTitle = () => {
      switch (entityName) {
          case 'device': return 'Редактировать привязки устройства';
          case 'gateway': return 'Редактировать привязки шлюза';
          case 'object': return 'Редактировать объект';
          default: return 'Редактировать';
      }
  }


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
            <div className="space-y-4 py-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        ) : (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                {entityName === 'device' && renderDeviceFields()}
                {entityName === 'gateway' && renderDeviceFields()}
                {entityName === 'object' && renderObjectFields()}
                <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Отмена</Button>
                <Button type="submit">Сохранить</Button>
                </DialogFooter>
            </form>
            </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
