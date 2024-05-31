import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCMaBcP1SYlXhYd8KlTS6A2GNrBDXaOPpg",
    authDomain: "growthlink-d896b.firebaseapp.com",
    projectId: "growthlink-d896b",
    storageBucket: "growthlink-d896b.appspot.com",
    messagingSenderId: "928620724722",
    appId: "1:928620724722:web:b146525d8efb19590dab6b",
    measurementId: "G-FZ31YGRGZ5"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
