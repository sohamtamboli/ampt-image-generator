'use client';
import React, { createContext, useState } from 'react';
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import Pool from '@/app/UserPool';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface IContext {
  authenticate: (Username: string, Password: string) => Promise<any>;
  getSession: () => Promise<any>;
  Logout: () => void;
  error: string;
}
interface AccountProps {
  children?: React.ReactNode;
}

const AccountContext = createContext<IContext>({
  authenticate: () => Promise.resolve(),
  getSession: () => Promise.resolve(),
  Logout: () => {},
  error: '',
});
const Account: React.FC<AccountProps> = (props) => {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err: any, session: CognitoUserSession) => {
          if (err) {
            reject();
          } else {
            resolve(session);
            //
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username: string, Password: string) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool,
      });
      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('onsucess : ', data);
          setError('');
          resolve(data);
          router.push('/home');
        },
        onFailure: (err) => {
          console.error('onFailure : ', err);
          setError(err.message);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('onsucess : ', data);
          resolve(data);
        },
      });
    });
  };
  const Logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      Cookies.remove('jwtToken')
      user.signOut();
    }
  };
  return (
    <AccountContext.Provider
      value={{ authenticate, getSession, Logout, error }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
