import { render } from 'react-dom';

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Callback, Login, Relist } from '@/pages';

import '@/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/relist',
    element: <Relist />,
  },
  {
    path: '/callback',
    element: <Callback />,
  },
]);

const theme = createTheme({
  shape: {
    borderRadius: 8,
  },
});

const rootElement = document.getElementById('root');
render(
  <>
    <MuiThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </MuiThemeProvider>
  </>,
  rootElement,
);
