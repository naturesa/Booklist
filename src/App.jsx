import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebaseConfig';
import BookList from './components/BookList';
import './index.css';  // Or wherever your Tailwind CSS file is located


const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const booksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
<div className=" min-h-screen flex flex-col items-center py-6">
  <div className="flex justify-center w-fit"> {/* Add w-fit here */}
  <img 
  src="/BookList_blue.svg" 
  alt="MainLogo" 
  style={{ width: "20rem", height: "auto" }} 
  className="max-w-xs" 
/>
  </div>

  {/* Book List */}
  <div className="w-full max-w-6xl">
    <BookList books={books} />
  </div>
</div>

  );
};

export default App;
