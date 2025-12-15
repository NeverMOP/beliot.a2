"use client";

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '../ui/scroll-area';

interface CatalogCardProps {
  title: string;
  description: string;
  items: string[];
  itemName: string;
  dialogTitle: string;
  dialogDescription: string;
  dialogInputPlaceholder: string;
}

export function CatalogCard({
  title,
  description,
  items: initialItems,
  itemName,
  dialogTitle,
  dialogDescription,
  dialogInputPlaceholder,
}: CatalogCardProps) {
  const [items, setItems] = React.useState(initialItems);
  const [open, setOpen] = React.useState(false);
  const [newItem, setNewItem] = React.useState('');
  const { toast } = useToast();

  const handleAddItem = () => {
    if (newItem.trim() === '') {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: 'Название не может быть пустым.',
      });
      return;
    }
    // In a real app, you'd call an API here.
    setItems([...items, newItem]);
    toast({
      title: `Новая ${itemName} добавлена`,
      description: `"${newItem}" было добавлено в список.`,
    });
    setNewItem('');
    setOpen(false);
  };
  
  const handleDeleteItem = (itemToDelete: string) => {
    // In a real app, you'd call an API here.
    setItems(items.filter(item => item !== itemToDelete));
    toast({
      title: `${itemName} удалена`,
      description: `"${itemToDelete}" было удалено из списка.`,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-48 pr-4">
            <div className="space-y-2">
            {items.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-md border p-3">
                    <span className="text-sm font-medium">{item}</span>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7" disabled>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Редактировать</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive hover:text-destructive-foreground" onClick={() => handleDeleteItem(item)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Удалить</span>
                        </Button>
                    </div>
                </div>
            ))}
            </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Добавить {itemName}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
              <DialogDescription>{dialogDescription}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Название
                </Label>
                <Input
                  id="name"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder={dialogInputPlaceholder}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
              <Button type="submit" onClick={handleAddItem}>Добавить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
