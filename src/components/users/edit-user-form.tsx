
"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
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
  FormDescription,
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { type User, type Company } from "@/lib/types";
import { Separator } from "../ui/separator";

const userPermissionsSchema = z.object({
  canEditUsers: z.boolean().default(false),
  canCreateDevices: z.boolean().default(false),
  canCreateObjects: z.boolean().default(false),
  canCreateCompanies: z.boolean().default(false),
});

const userSchema = z.object({
  full_name: z.string().min(1, "Полное имя обязательно"),
  email: z.string().email("Неверный формат email"),
  role: z.enum(["admin", "user", "viewer"]),
  companyId: z.string().optional(),
  permissions: userPermissionsSchema,
});

type UserFormValues = z.infer<typeof userSchema>;

interface EditUserFormProps {
    user: User;
    companies: Company[];
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditUserForm({ user, companies, isOpen, onOpenChange }: EditUserFormProps) {
  const { toast } = useToast();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });
  
  React.useEffect(() => {
    if(user && isOpen) {
        form.reset({
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            companyId: user.companyId ? String(user.companyId) : undefined,
            permissions: {
                canEditUsers: user.permissions.canEditUsers,
                canCreateDevices: user.permissions.canCreateDevices,
                canCreateObjects: user.permissions.canCreateObjects,
                canCreateCompanies: user.permissions.canCreateCompanies,
            }
        })
    }
  }, [user, isOpen, form]);


  function onSubmit(data: UserFormValues) {
    console.log("Updating user:", { ...data, id: user.id });
    // In a real app, you would call an API to update the user
    toast({
      title: "Пользователь обновлен",
      description: `Данные для ${data.full_name} были успешно обновлены.`,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Редактировать пользователя</DialogTitle>
          <DialogDescription>
            Изменение данных и прав доступа для {user.full_name}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Полное имя</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Роль</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="admin">Администратор</SelectItem>
                        <SelectItem value="user">Пользователь</SelectItem>
                        <SelectItem value="viewer">Наблюдатель</SelectItem>
                        </SelectContent>
                    </Select>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Компания</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                        <SelectTrigger><SelectValue placeholder="Выберите компанию" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {companies.map(c => (
                            <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </FormItem>
                )}
                />
            </div>
            
            <Separator className="my-6" />

            <div>
                <h3 className="mb-4 text-lg font-medium">Права доступа</h3>
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="permissions.canCreateDevices"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Создание устройств</FormLabel>
                                    <FormDescription>Разрешить пользователю добавлять новые устройства и шлюзы.</FormDescription>
                                </div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="permissions.canCreateObjects"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Создание объектов</FormLabel>
                                    <FormDescription>Разрешить пользователю создавать новые объекты.</FormDescription>
                                </div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="permissions.canCreateCompanies"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Создание компаний</FormLabel>
                                    <FormDescription>Разрешить пользователю создавать новые компании.</FormDescription>
                                </div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="permissions.canEditUsers"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>Управление пользователями</FormLabel>
                                    <FormDescription>Разрешить пользователю редактировать других пользователей.</FormDescription>
                                </div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>


            <DialogFooter className="!mt-8">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Отмена</Button>
              <Button type="submit">Сохранить изменения</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
