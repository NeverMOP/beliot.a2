"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { useToast } from "@/hooks/use-toast";
import { type Device } from "@/lib/types";
import { Trash2, PlusCircle } from "lucide-react";

const parametersSchema = z.object({
  attributes: z.array(
    z.object({
      name: z.string().min(1, "Название атрибута обязательно"),
      value: z.string().min(1, "Значение обязательно"),
    })
  ),
});

type ParametersFormValues = z.infer<typeof parametersSchema>;

interface DeviceParametersFormProps {
  device: Device;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeviceParametersForm({ device, isOpen, onOpenChange }: DeviceParametersFormProps) {
  const { toast } = useToast();
  
  const form = useForm<ParametersFormValues>({
    resolver: zodResolver(parametersSchema),
    defaultValues: {
      attributes: device.attributes || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attributes",
  });

  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        attributes: device.attributes || [],
      });
    }
  }, [isOpen, device, form]);

  function onSubmit(data: ParametersFormValues) {
    console.log("Updating parameters:", data);
    // In a real app, you would send this data to your API to update the device
    toast({
      title: "Параметры обновлены",
      description: `Атрибуты для устройства ${device.serial_number} были успешно обновлены.`,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Параметры устройства</DialogTitle>
          <DialogDescription>
            Управление дополнительными атрибутами для устройства {device.serial_number}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-2">
                  <FormField
                    control={form.control}
                    name={`attributes.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Имя</FormLabel>
                        <FormControl>
                          <Input placeholder="например, AppKey" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`attributes.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Значение</FormLabel>
                        <FormControl>
                          <Input placeholder="..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => append({ name: "", value: "" })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Добавить атрибут
            </Button>

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
