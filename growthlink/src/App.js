import './App.css';
import NavBar from './components/NavBar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { AuthContext } from './AuthContext';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavBar/>,
      children:[
        {path: '/', element:<Home/>},
        {path: '/logIn', element:<LogIn/> },
        {path: '/signUp', element:<SignUp/> },
        {path: '/dashboard', element:<Dashboard/>},
        {path: '/calendar', element:<Calendar/>},
      ]
    }
  ])
  return (
    <>
    <AuthContext>
      <RouterProvider router={router}/>
    </AuthContext>
    </>
  );
}

export default App;
