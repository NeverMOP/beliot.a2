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
import { type Company } from "@/lib/types";

const userSchema = z.object({
  full_name: z.string().min(1, "Полное имя обязательно"),
  email: z.string().email("Неверный формат email"),
  role: z.enum(["admin", "user", "viewer"], {
    required_error: "Необходимо выбрать роль",
  }),
  companyId: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

interface CreateUserFormProps {
    companies: Company[];
}

export function CreateUserForm({ companies }: CreateUserFormProps) {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      full_name: "",
      email: "",
      role: "user",
    },
  });

  function onSubmit(data: UserFormValues) {
    console.log("Creating user:", data);
    // Here you would typically call an API to create the user
    toast({
      title: "Пользователь создан",
      description: `Пользователь ${data.full_name} был успешно добавлен.`,
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline-primary">
          <PlusCircle className="mr-2 h-4 w-4" />
          Создать пользователя
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создать нового пользователя</DialogTitle>
          <DialogDescription>
            Заполните информацию ниже для добавления нового пользователя.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Полное имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Иван Иванов" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Роль</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите роль" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Администратор</SelectItem>
                      <SelectItem value="user">Пользователь</SelectItem>
                      <SelectItem value="viewer">Наблюдатель</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Компания (необязательно)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите компанию" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="">Нет</SelectItem>
                      {companies.map(c => (
                        <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
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
