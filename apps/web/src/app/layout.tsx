import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import StoreProvider from '@/providers/StoreProvider';
import { AuthProvider } from '@/providers/AuthProvider';

const inter = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Purwapora',
  description: 'cihuy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
