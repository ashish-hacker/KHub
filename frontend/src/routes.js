import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/Home';
import Forum from './pages/Forum';
import Hub from './pages/Hub';
import NotFound from './pages/Page404';
import NewResource from './pages/NewResource';
import Post from './pages/Post';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'hub', element: <Hub /> },
        { path: 'forum', element: <Forum /> },
        { path: 'forum/post/:id', element: <Post /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/" /> }
        // { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/hub',
      element: <DashboardLayout />,
      children: [
        {
          path: 'newRsc',
          element: <NewResource />
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);
}
