'use client';
import React, { useContext, useEffect } from 'react';
import { AccountContext } from '../context/accountcontext';
import Cookies from 'js-cookie';
import UserPool from '@/app/UserPool';

const RefreshToken = () => {
  const { getSession } = useContext(AccountContext);

  const refreshToken = () => {
    getSession()
      .then((Session) => {
        const User = UserPool.getCurrentUser();
        console.log(User, Session.refreshToken.token);
        if (User) {
          User.refreshSession(
            Session.refreshToken,
            function (err, session) {
              if (err) {
                console.error("session block",err);
              } else {
              
                console.log(session.getAccessToken().getJwtToken());
                Cookies.set('jwtToken', session.getAccessToken().getJwtToken());
              }
            },
          );
        } else {
          console.error('No current user');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    
    // Call refreshToken every hour
    const interval = setInterval(refreshToken, 55 * 60 * 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default RefreshToken;
