import React, { useEffect, useState } from 'react';
import './App.css'; // Make sure your CSS is correctly linked

export default function App() {
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem('books');
    return stored ? JSON.parse(stored) : [];
  });

  const [form, setForm] = useState({ title: '', author: '', year: '' });

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addBook = (e) => {
    e.preventDefault();
    const { title, author, year } = form;

    if (!title || !author || !year) return;

    const yearNumber = parseInt(year);
    const currentYear = new Date().getFullYear();

    if (isNaN(yearNumber) || yearNumber < 1000 || yearNumber > currentYear) {
      alert(`Please enter a valid year between 1000 and ${currentYear}`);
      return;
    }

    const newBook = {
      title,
      author,
      year: yearNumber,
    };

    setBooks([...books, newBook]);
    setForm({ title: '', author: '', year: '' });
  };

  const deleteBook = (index) => {
    const updated = books.filter((_, i) => i !== index);
    setBooks(updated);
  };

  return (
    <div className="container">
      <header>
        <h1>📚 Book Manager</h1>
      </header>

      <form onSubmit={addBook}>
        <input
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          name="year"
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          required
          min="1000"
          max={new Date().getFullYear()}
          step="1"
        />
        <button type="submit">Add Book</button>
      </form>

      <div className="book-list">
        {books.length === 0 ? (
          <p>No books yet.</p>
        ) : (
          books.map((book, index) => (
            <div className="book-item" key={index}>
              <div className="book-info">
                <p className="book-title">{book.title}</p>
                <p className="book-meta">
                  {book.author} — {book.year}
                </p>
              </div>
              <button className="delete-button" onClick={() => deleteBook(index)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <footer>
        &copy; 2025 Book Manager. All rights reserved.
      </footer>
    </div>
  );
}