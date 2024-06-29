import './App.css';
import NavBar from './components/NavBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import LandingPage from './pages/LandingPage';
import { AuthContext } from './AuthContext';
import { EventsContext } from './EventsContext';
import ProtectedRoute from './ProtectedRoute';
import LandingRedirect from './LandingRedirect';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavBar />,
      children: [
        { path: '/', element: <LandingRedirect><LandingPage /></LandingRedirect> },
        { path: '/logIn', element: <LogIn /> },
        { path: '/signUp', element: <SignUp /> },
        { path: '/home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
        { path: '/calendar', element: <ProtectedRoute><Calendar /></ProtectedRoute> },
      ],
    },
  ]);

  return (
    <AuthContext>
      <EventsContext>
        <RouterProvider router={router} />
      </EventsContext>
    </AuthContext>
  );
}

export default App;
