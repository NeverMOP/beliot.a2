import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="fixed inset-0 z-[-1] opacity-80">
            <Image
                src="https://storage.googleapis.com/stedi-assets/belit-background-iot.png"
                alt="IoT background"
                layout="fill"
                objectFit="cover"
                quality={100}
            />
        </div>
        <div className="relative z-0">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
