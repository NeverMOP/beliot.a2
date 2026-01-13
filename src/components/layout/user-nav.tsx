"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';

export function UserNav() {
  const { user } = useUser();
  const auth = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    // The redirect to /login is handled by the main app layout's effect
  };
  
  if (!user) {
    return null; // Or a login button if you prefer
  }

  const userInitial = user.displayName ? user.displayName[0] : (user.email ? user.email[0] : 'U');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-black/10">
          <Avatar className="h-10 w-10 border">
            {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
            <AvatarFallback>{userInitial.toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none font-headline">{user.displayName || user.email || 'Пользователь'}</p>
            {user.email && <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <User className="mr-2 h-4 w-4" />
            <span>Профиль</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Settings className="mr-2 h-4 w-4" />
            <span>Настройки</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
