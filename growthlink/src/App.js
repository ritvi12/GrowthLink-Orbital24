import './App.css';
import NavBar from './components/NavBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import LandingPage from './pages/LandingPage';
import { AuthContext } from './AuthContext';
import { EventsContext } from './EventsContext';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavBar/>,
      children:[
        {path: '/', element:<LandingPage/>},
        {path: '/logIn', element:<LogIn/> },
        {path: '/signUp', element:<SignUp/> },
        {path: '/home', element:<Home/>},
        {path: '/dashboard', element:<Dashboard/>},
        {path: '/calendar', element:<Calendar/>}
      ]
    }
  ])
  return (
    <>
   
    <AuthContext>
      <EventsContext>
        <RouterProvider router={router}/>
      </EventsContext>
    </AuthContext>
    </>
  );
}

export default App;
