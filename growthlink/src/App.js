import './App.css';
import NavBar from './components/NavBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import LandingPage from './pages/LandingPage';

import { AuthProvider } from './assets/AuthContext';
import { EventsProvider } from './assets/EventsContext';
import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './assets/RoleProtectedRoute';
import LandingRedirect from './LandingRedirect';
import AdminDashboard from './pages/AdminDashboard';



function App() {
  console.log("App Rendered");
  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavBar />,
      children: [
        { path: '/', element:<LandingRedirect><LandingPage /></LandingRedirect>  },
        { path: '/logIn', element: <LandingRedirect><LogIn /></LandingRedirect>  },
        { path: '/signUp', element: <LandingRedirect><SignUp /></LandingRedirect> },
        { path: '/home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: '/dashboard', element: <ProtectedRoute ><Dashboard /></ProtectedRoute> },
        { path: '/calendar', element: <ProtectedRoute><Calendar /></ProtectedRoute> },
        { path: '/adminDashboard', element: <RoleProtectedRoute requiredRole="admin"><AdminDashboard /></RoleProtectedRoute> }
      ],
    },
  ]);

  return (
    <AuthProvider>
      <EventsProvider>
        <RouterProvider router={router} />
      </EventsProvider>
    </AuthProvider>
  );
}

export default App;

