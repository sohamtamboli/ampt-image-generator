import Image from 'next/image';
import { Suspense } from 'react';
import LoginPage from './login/page';
import Navbar from './components/navbar/navbar';
export const revalidate = 0;
import { Account } from './components/context/accountcontext';
import LoginForm from './components/login/login';
export default function Home() {
  return (
    <Account>
      <LoginPage />
    </Account>
  );
}
