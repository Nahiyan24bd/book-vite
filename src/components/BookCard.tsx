import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface Book {
  bookId: number;
  bookName: string;
  author: string;
  image: string;
  review: string;
  totalPages: number;
  rating: number;
  category: string;
  tags: string[];
  publisher: string;
  yearOfPublishing: number;
}

const BookCard = ({ book }: { book: Book }) => {
  return (
    <Link
      href={`/books/${book.bookId}`}
      className="border border-[#131313]/15 rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition duration-200 bg-white"
    >
      <div>
        {/* Book Image Container */}
        <div className="bg-[#F3F3F3] rounded-2xl py-8 flex justify-center items-center mb-6">
          <div className="relative w-36 h-48">
            <Image
              src={book.image}
              alt={book.bookName}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 150px"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {book.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-[#23BE0A]/5 text-[#23BE0A] text-sm font-semibold px-4 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Book Title & Author */}
        <h2 className="text-2xl font-bold font-serif text-[#131313] line-clamp-1 mb-2">
          {book.bookName}
        </h2>
        <p className="text-[#131313]/80 font-medium mb-4">By : {book.author}</p>
      </div>

      {/* Footer Info */}
      <div>
        <hr className="border-t border-dashed border-[#131313]/15 my-4" />
        <div className="flex justify-between items-center text-[#131313]/80 font-medium">
          <span>{book.category}</span>
          <div className="flex items-center gap-2">
            <span>{book.rating.toFixed(2)}</span>
            {/* DaisyUI / SVG Star */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-amber-500 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.399 8.165-7.333-3.856-7.333 3.856 1.399-8.165-5.934-5.784 8.2-1.192zm0 5.702l-2.232 4.523-4.991.725 3.612 3.521-.852 4.969 4.463-2.346 4.463 2.346-.852-4.969 3.612-3.521-4.991-.725z" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;