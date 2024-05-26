import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCMaBcP1SYlXhYd8KlTS6A2GNrBDXaOPpg",
  authDomain: "growthlink-d896b.firebaseapp.com",
  projectId: "growthlink-d896b",
  storageBucket: "growthlink-d896b.appspot.com",
  messagingSenderId: "928620724722",
  appId: "1:928620724722:web:b146525d8efb19590dab6b",
  measurementId: "G-FZ31YGRGZ5"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [ user ] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section>
        {user ? <HomePage/> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
