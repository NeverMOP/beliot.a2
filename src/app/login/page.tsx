"use client";

import * as React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Hexagon } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { Suspense } from 'react';

function LoginPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const auth = useAuth();
    const { user, isUserLoading } = useUser();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // onAuthStateChanged in layout will handle the redirect
        } catch (error: any) {
            console.error("Login Error:", error);
            toast({
                variant: 'destructive',
                title: "Ошибка входа",
                description: "Проверьте правильность email и пароля.",
            });
            setIsLoggingIn(false);
        }
    };

    React.useEffect(() => {
        if (!isUserLoading && user) {
            const redirectTo = searchParams.get('redirectTo') || '/dashboard';
            router.push(redirectTo);
        }
    }, [user, isUserLoading, router, searchParams]);

    if (isUserLoading || user) {
        return (
             <div className="flex min-h-svh items-center justify-center">
                <p>Загрузка...</p>
            </div>
        );
    }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="mb-4 flex justify-center">
          <Hexagon className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Вход в Beliot</CardTitle>
        <CardDescription>
          Введите свои учетные данные для доступа к платформе.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@beliot.local" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? 'Вход...' : 'Войти'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}


export default function LoginPage() {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <LoginPageContent />
        </Suspense>
    )
}
