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
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { Suspense } from 'react';

function GoogleIcon() {
    return (
        <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.638,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>
    );
}

function LoginPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const auth = useAuth();
    const { user, isUserLoading } = useUser();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // onAuthStateChanged will handle the redirect
        } catch (error: any) {
            console.error("Login Error:", error);
            toast({
                variant: 'destructive',
                title: "Ошибка входа",
                description: error.message || "Произошла ошибка при входе.",
            });
        }
    };
    
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // onAuthStateChanged will handle the redirect
        } catch (error: any) {
             console.error("Google Sign-In Error:", error);
            toast({
                variant: 'destructive',
                title: "Ошибка входа через Google",
                description: error.message || "Не удалось войти с помощью Google.",
            });
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
          <Button className="w-full" type="submit">Войти</Button>
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                Или войдите с помощью
                </span>
            </div>
          </div>
           <Button variant="outline" className="w-full" type="button" onClick={handleGoogleSignIn}>
                <GoogleIcon />
                Google
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
