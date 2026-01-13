import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'Beliot Dashboard',
  description: 'IoT-платформа для мониторинга устройств',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <Suspense>
          <FirebaseClientProvider>
            {children}
          </FirebaseClientProvider>
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}
