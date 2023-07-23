import { render } from 'react-dom';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Callback, Login, Relist } from '@/pages';

import '@/index.css';
import PlaylistContextProvider from './contexts/PlaylistContext';
import Liked from './routes/relist/Liked';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/relist',
    element: <Relist />,
    children: [
      {
        index: true,
        element: <div>supposed to be main, with history and other playlist tiles</div>,
      },
      {
        path: 'likes',
        element: <Liked />,
      },
      {
        path: 'playlist/:id',
        element: <div>supposed to be playlists</div>,
      },
    ],
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

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
render(
  <>
    <MuiThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <PlaylistContextProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </PlaylistContextProvider>
      </QueryClientProvider>
    </MuiThemeProvider>
  </>,
  rootElement,
);
