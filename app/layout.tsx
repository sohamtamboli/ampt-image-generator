import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Account, AccountContext } from './components/context/accountcontext';


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
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Account>
  );
}
