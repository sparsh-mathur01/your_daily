import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';

export const tabsTheme = createTheme({
  palette: {
    primary: {
      // main: "#8c8c8c",
      main: "#000000",
    },
    secondary: {
      main: '#f88a12',
    },
    
  },
  
})