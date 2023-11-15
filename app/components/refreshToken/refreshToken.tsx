'use client';
import React, { useCallback, useContext, useEffect } from 'react';
import { AccountContext } from '../context/accountcontext';
import Cookies from 'js-cookie';
import UserPool from '@/app/UserPool';

const RefreshToken = () => {
  const { getSession } = useContext(AccountContext);

  
  const refreshToken = useCallback(() => {
    getSession()
      .then((Session) => {
        const User = UserPool.getCurrentUser();
        
        if (User) {
          User.refreshSession(Session.refreshToken, function (err, session) {
            if (err) {
              console.error('session block', err);
            } else {
            
              Cookies.set('jwtToken', session.getAccessToken().getJwtToken());
              Cookies.set(
                'accessTokenJwt',
                session.getAccessToken().getJwtToken(),
              );
            }
          });
        } else {
          console.error('No current user');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [getSession]);

  useEffect(() => {
    // Call refreshToken every 55 minutes
    const interval = setInterval(refreshToken, 55 * 60000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [refreshToken]);

  return null;
};

export default RefreshToken;
