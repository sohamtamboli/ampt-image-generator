import React, { ReactNode } from 'react';
import { SnackbarProvider } from './SnackbarLib';

const ToasterProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default ToasterProvider;
