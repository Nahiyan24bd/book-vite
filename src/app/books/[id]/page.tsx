"use client";

import React, { use } from "react";
import Image from "next/image";
import booksData from "@/data/booksData.json";
import { notFound } from "next/navigation";
import { addToReadList, addToWishlist } from "@/utils/localStorage";
import { toast } from "react-toastify";

interface Book {
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

export default function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const bookIdNum = parseInt(id);
  const book = (booksData as Book[]).find((b) => b.bookId === bookIdNum);

  if (!book) {
    notFound();
  }

  const handleRead = () => {
    const res = addToReadList(bookIdNum);
    if (res.success) {
      toast.success(`"${book.bookName}" added to Read list!`);
    } else {
      toast.error(res.message);
    }
  };

  const handleWishlist = () => {
    const res = addToWishlist(bookIdNum);
    if (res.success) {
      toast.success(`"${book.bookName}" added to Wishlist!`);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <section className="max-w-6xl mx-auto my-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Book Image */}
        <div className="bg-[#F3F3F3] rounded-3xl p-12 flex justify-center items-center min-h-560px">
          <Image
            src={book.image}
            alt={book.bookName}
            width={350}
            height={480}
            priority
            className="w-auto max-h-480px object-contain drop-shadow-2xl rounded-md"
          />
        </div>

        {/* Book Details */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#131313]">
            {book.bookName}
          </h1>
          <p className="text-lg font-medium text-[#131313]/80">By : {book.author}</p>
          
          <div className="border-y border-[#131313]/15 py-3 text-base font-medium text-[#131313]/80">
            {book.category}
          </div>

          <p className="text-[#131313]/70 leading-relaxed text-sm">
            <span className="font-bold text-[#131313]">Review : </span>
            {book.review}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-3 pt-2">
            <span className="font-bold text-[#131313] text-sm">Tag</span>
            {book.tags?.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="bg-[#23BE0A]/5 text-[#23BE0A] text-xs font-semibold px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Specifications */}
          <div className="border-t border-[#131313]/15 pt-4 space-y-2 text-sm text-[#131313]/70">
            <div className="grid grid-cols-2 max-w-xs">
              <span>Number of Pages:</span>
              <span className="font-bold text-[#131313]">{book.totalPages}</span>
            </div>
            <div className="grid grid-cols-2 max-w-xs">
              <span>Publisher:</span>
              <span className="font-bold text-[#131313]">{book.publisher}</span>
            </div>
            <div className="grid grid-cols-2 max-w-xs">
              <span>Year of Publishing:</span>
              <span className="font-bold text-[#131313]">{book.yearOfPublishing}</span>
            </div>
            <div className="grid grid-cols-2 max-w-xs">
              <span>Rating:</span>
              <span className="font-bold text-[#131313]">{book.rating}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleRead}
              className="btn btn-outline border-[#131313]/30 hover:bg-[#131313] text-[#131313] font-semibold px-7 rounded-xl cursor-pointer"
            >
              Read
            </button>
            <button
              onClick={handleWishlist}
              className="btn bg-[#50B1C9] hover:bg-[#439aa8] text-white font-semibold px-7 rounded-xl border-none cursor-pointer"
            >
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}