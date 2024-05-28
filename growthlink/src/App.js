import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Signup from './pages/Signup';

function App() {
  return (
    <>
    <Router>
    < NavBar />
      <Routes>
        <Route path='/' exact Component={Home} />
        <Route path='/dashboard' Component={Dashboard} />
        <Route path='/calendar' Component={Calendar} />
        <Route path='/sign-up' Component={Signup} />
      </Routes>
    </Router>
      
    </>
  );
}

export default App;
