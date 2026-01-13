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

const companySchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  unp: z.string().min(1, "УНП обязателен").regex(/^\d{9}$/, "УНП должен состоять из 9 цифр"),
  parentId: z.string().optional(),
});

type CompanyFormValues = z.infer<typeof companySchema>;

interface CreateCompanyFormProps {
    companies: Company[];
}

export function CreateCompanyForm({ companies }: CreateCompanyFormProps) {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      unp: "",
      parentId: "",
    },
  });

  function onSubmit(data: CompanyFormValues) {
    console.log("Creating company:", data);
    // Here you would typically call an API to create the company
    toast({
      title: "Компания создана",
      description: `Компания "${data.name}" была успешно добавлена.`,
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline-primary">
          <PlusCircle className="mr-2 h-4 w-4" />
          Создать компанию
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создать новую компанию</DialogTitle>
          <DialogDescription>
            Заполните информацию ниже для добавления новой компании.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input placeholder="ООО 'Рога и копыта'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>УНП</FormLabel>
                  <FormControl>
                    <Input placeholder="190000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Головная организация (необязательно)</FormLabel>
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
