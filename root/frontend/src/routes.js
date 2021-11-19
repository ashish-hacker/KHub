import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/Home';
import Blog from './pages/Forum';
import Hub from './pages/Hub';
import NotFound from './pages/Page404';
import NewResource from './pages/NewResource';

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
        { path: 'forum', element: <Blog /> }
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
      // element: <NewResource />,
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
