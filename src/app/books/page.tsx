import React from "react";
import booksData from "@/data/booksData.json"; // রুট ফোল্ডার থেকে booksData.json ইমপোর্ট
import BookCard, { Book } from "@/components/BookCard";

const BooksPage = () => {
  const books: Book[] = booksData;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold font-serif text-center text-[#131313] mb-10">
        Books
      </h1>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.bookId} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksPage;