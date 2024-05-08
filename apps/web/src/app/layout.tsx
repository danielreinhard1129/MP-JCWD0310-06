import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import StoreProvider from '@/providers/StoreProvider';
import { AuthProvider } from '@/providers/AuthProvider';

const inter = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  showNavbarAndFooter = true,
}: {
  children: React.ReactNode;
  showNavbarAndFooter?: boolean;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            {showNavbarAndFooter && <Navbar />}
            {children}
            {showNavbarAndFooter && <Footer />}
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
