import Image from 'next/image';
import { Suspense } from 'react';
import LoginPage from './login/page';
export const revalidate = 0;

export default function Home() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}
