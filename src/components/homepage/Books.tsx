import React from "react";
import Image from "next/image";
import Link from "next/link";
import booksData from "@/data/booksData.json";

interface Book {
  bookId: number;
  bookName: string;
  author: string;
  image: string;
  rating: number;
  category: string;
  tags: string[];
}

const Books = () => {
  return (
    <section className="max-w-6xl mx-auto my-16 px-4">
      {/* Section Title */}
      <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#131313] text-center mb-10">
        Books
      </h2>

      {/* 3-Column Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksData.map((book: Book) => (
          <Link
            key={book.bookId}
            href={`/books/${book.bookId}`}
            className="border border-[#131313]/15 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200"
          >
            {/* Book Image Box */}
            <div className="bg-[#F3F3F3] rounded-2xl py-8 flex justify-center items-center h-60">
              <Image
                src={book.image}
                alt={book.bookName}
                width={130}
                height={166}
                className="h-44 w-auto object-contain drop-shadow-md"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {book.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#23BE0A]/5 text-[#23BE0A] text-sm font-semibold px-4 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Book Info */}
            <div className="my-4">
              <h3 className="text-2xl font-bold font-serif text-[#131313] line-clamp-1">
                {book.bookName}
              </h3>
              <p className="text-sm font-medium text-[#131313]/80 mt-2">
                By : {book.author}
              </p>
            </div>

            {/* Category & Rating */}
            <div className="border-t border-dashed border-[#131313]/15 pt-4 flex justify-between items-center text-sm font-medium text-[#131313]/80">
              <span>{book.category}</span>
              <div className="flex items-center gap-1.5">
                <span>{book.rating.toFixed(2)}</span>
                <span className="text-amber-500">★</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Books;