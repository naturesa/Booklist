import React from "react";
import { db, doc, deleteDoc, updateDoc } from "../firebase";

const BookCard = ({ book, fetchBooks }) => {
  // Delete a book
  const deleteBook = async () => {
    try {
      const bookRef = doc(db, "books", book.id);
      await deleteDoc(bookRef);
      fetchBooks();
      console.log("Book deleted");
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  };

  // Toggle read status
  const toggleStatus = async () => {
    try {
      const bookRef = doc(db, "books", book.id);
      const newStatus = book.status === "to-read" ? "read" : "to-read";
      await updateDoc(bookRef, { status: newStatus });
      fetchBooks();
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  return (
    <div className="book-card border p-4 rounded shadow bg-white flex flex-col items-center">
      <h3 className="text-lg font-semibold text-center mb-2">{book.title}</h3>
      <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
      <p className="text-sm text-gray-500 mb-2">Year: {book.year}</p>
      <p className="text-sm text-blue-700 font-medium mb-2">Status: {book.status}</p>
      <img
        src={book.image}
        alt={book.title}
        className="w-32 h-48 object-cover mb-3 rounded"
      />
      <div className="flex gap-2">
        <button onClick={toggleStatus} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
          Mark as {book.status === "to-read" ? "Read" : "To Read"}
        </button>
        <button onClick={deleteBook} className="bg-custom-light text-white px-3 py-1 rounded text-sm">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
