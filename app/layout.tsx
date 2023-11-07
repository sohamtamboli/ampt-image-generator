import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Account, AccountContext } from './components/context/accountcontext';
import QueryProvider from './components/providers/QueryProvider';
import ToasterProvider from './components/providers/ToasterProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ampt + Next.js Starter Template',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Account>
      <QueryProvider>
        <html lang="en">
          <body className={inter.className}>
            <ToasterProvider>{children}</ToasterProvider>
          </body>
        </html>
      </QueryProvider>
    </Account>
  );
}
