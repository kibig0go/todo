import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { TodoPage } from '../pages/todo';

const theme = createTheme();

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoPage />
    </ThemeProvider>
  );
};
