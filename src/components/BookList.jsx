import React, { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs } from "../firebase";
import BookCard from "./BookCard";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    console.log("🔍 Search Results:", searchResults);
    console.log("📚 Selected Book:", selectedBook);
    fetchBooks();
  }, []);

  const toReadBooks = books.filter(book => book.status === "to-read");
  const readBooks = books.filter(book => book.status === "read");

  const fetchBooks = async () => {
    const querySnapshot = await getDocs(collection(db, "books"));
    const fetchedBooks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBooks(fetchedBooks);
    console.log("📖 Books from Firestore:", fetchedBooks);
  };

  const addBook = async () => {
    if (!selectedBook) {
      console.warn("⚠️ No book selected!");
      return;
    }

    try {
      console.log("✅ Adding book...", selectedBook);
      const docRef = await addDoc(collection(db, "books"), {
        title: selectedBook.title,
        author: selectedBook.author,
        year: selectedBook.publishedDate?.substring(0, 4) || "Unknown",
        status: "to-read",
        image: selectedBook.imageLinks?.thumbnail || "/fallback-image.jpg",
      });

      console.log("✅ Book added with ID:", docRef.id);
      fetchBooks();
      setSelectedBook(null);
    } catch (error) {
      console.error("❌ Error adding book:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Search Books</h2>
      <input
  type="text"
  placeholder="Search for a book"
  className="border p-2 rounded w-full mt-2"
  onChange={async (e) => {
    const query = e.target.value;
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      const data = await response.json();

      const books = data.items?.map(item => {
        const volume = item.volumeInfo;
        return {
          id: item.id,
          title: volume.title,
          author: volume.authors?.[0] || "Unknown",
          publishedDate: volume.publishedDate,
          imageLinks: volume.imageLinks,
        };
      }) || [];

      setSearchResults(books);
    } catch (err) {
      console.error("🔍 Error fetching books from API:", err);
      setSearchResults([]);
    }
  }}
/>

      <ul>
  {searchResults.length === 0 ? (
    <p className="text-gray-500">No books found.</p>
  ) : (
    searchResults.map((book) => (
      <li
        key={book.id}
        onClick={() => {
          console.log("✅ Selected book:", book);
          setSelectedBook(book);
        }}
        className="cursor-pointer hover:bg-gray-200 p-2"
      >
        {book.title}
      </li>
    ))
  )}
</ul>


      {/* If a book is selected, show the "Add Book" button */}
      {selectedBook && (
        <div className="mt-4">
          <h3 className="text-lg">Selected Book: {selectedBook.title}</h3>
          <button
            onClick={addBook}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
          >
            Add Book
          </button>
        </div>
      )}

      {/* Display added books */}
      <h2 className="mt-6 text-xl font-bold">Your Books</h2>
      <h2 className="mt-6 text-xl font-bold">To Read</h2>
<div className="grid grid-cols-2 gap-4">
  {toReadBooks.length === 0 ? (
    <p className="text-gray-500">No books to read yet.</p>
  ) : (
    toReadBooks.map(book => <BookCard key={book.id} book={book} fetchBooks={fetchBooks} />)
  )}
</div>

<h2 className="mt-6 text-xl font-bold">Read</h2>
<div className="grid grid-cols-2 gap-4">
  {readBooks.length === 0 ? (
    <p className="text-gray-500">No books read yet.</p>
  ) : (
    readBooks.map(book => <BookCard key={book.id} book={book} fetchBooks={fetchBooks} />)
  )}
</div>

    </div>
  );
};

export default BookList;
