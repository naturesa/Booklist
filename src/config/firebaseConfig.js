import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCcgN67S64ABn2j19_m5u3ZjANmG_0XrAw",
  authDomain: "mybookshelf-d32a6.firebaseapp.com",
  projectId: "mybookshelf-d32a6",
  storageBucket: "mybookshelf-d32a6.firebasestorage.app",
  messagingSenderId: "147427672181",
  appId: "1:147427672181:web:132bd0533f262c3a54f83c",
  measurementId: "G-Y1MCCS4KV5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
