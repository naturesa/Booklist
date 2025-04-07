import React, { useState } from "react";
import { db, collection, addDoc } from "../firebase"; // Firebase config file

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("to-read"); // or 'read'

  // Add book function
  const addBook = async () => {
    try {
      const docRef = await addDoc(collection(db, "books"), {
        title,
        author,
        year,
        status,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
      setAuthor("");
      setYear("");
      setStatus("to-read");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <h2>Add a Book</h2>
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="to-read">To-Read</option>
        <option value="read">Read</option>
      </select>
      <button onClick={addBook}>Add Book</button>
    </div>
  );
};

export default AddBook;
