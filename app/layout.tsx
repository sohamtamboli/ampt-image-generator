import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Account } from './components/context/accountcontext';
import QueryProvider from './components/providers/QueryProvider';
import ToasterProvider from './components/providers/ToasterProvider';
import './globals.css';
import RefreshToken from './components/refreshToken/refreshToken';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AMPT Nextjs Image Gen',
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
            <ToasterProvider>
              <RefreshToken/>
              {children}</ToasterProvider>
          </body>
        </html>
      </QueryProvider>
    </Account>
  );
}
