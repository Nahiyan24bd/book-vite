"use client";

import React, { useSyncExternalStore, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import booksData from "@/data/booksData.json";
import { getStoredReadList, getStoredWishlist } from "@/utils/localStorage";

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

const emptySubscribe = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

export default function ListedBooksPage() {
  const isMounted = useIsMounted();
  const [activeTab, setActiveTab] = useState<"read" | "wishlist">("read");
  const [sortBy, setSortBy] = useState<string>("");

  if (!isMounted) {
    return (
      <section className="max-w-6xl mx-auto my-8 px-4 flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </section>
    );
  }

  // useEffect এ setState না করে সরাসরি মাউন্ট হওয়ার পর রেন্ডার টাইমে ফিল্টার করা (ESLint Fix)
  const storedReadIds = getStoredReadList();
  const storedWishlistIds = getStoredWishlist();
  const books = booksData as Book[];

  const readBooks = books.filter((b) => storedReadIds.includes(b.bookId));
  const wishlistBooks = books.filter((b) => storedWishlistIds.includes(b.bookId));

  const displayedBooks: Book[] =
    activeTab === "read" ? [...readBooks] : [...wishlistBooks];

  if (sortBy === "Rating") {
    displayedBooks.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "Pages") {
    displayedBooks.sort((a, b) => b.totalPages - a.totalPages);
  } else if (sortBy === "Year") {
    displayedBooks.sort((a, b) => b.yearOfPublishing - a.yearOfPublishing);
  }

  return (
    <section className="max-w-6xl mx-auto my-8 px-4">
      <div className="bg-[#131313]/5 rounded-2xl py-8 text-center mb-6">
        <h1 className="text-3xl font-bold font-serif text-[#131313]">Books</h1>
      </div>

      {/* Sort Dropdown */}
      <div className="flex justify-center mb-8">
        <div className="dropdown dropdown-bottom">
          <div
            tabIndex={0}
            role="button"
            className="btn bg-[#23BE0A] hover:bg-[#1fa509] text-white font-semibold text-base px-6 py-2.5 rounded-lg border-none flex items-center gap-3 shadow-none cursor-pointer"
          >
            <span>{sortBy ? `Sort By: ${sortBy}` : "Sort By"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-[#131313]/5 backdrop-blur-sm rounded-xl z-50 mt-2 w-48 p-2 shadow-sm border border-transparent text-[#131313]/80 space-y-1"
          >
            <li>
              <button
                onClick={() => setSortBy("Rating")}
                className="hover:bg-white/60 rounded-lg text-sm font-medium py-2.5 cursor-pointer"
              >
                Rating
              </button>
            </li>
            <li>
              <button
                onClick={() => setSortBy("Pages")}
                className="hover:bg-white/60 rounded-lg text-sm font-medium py-2.5 cursor-pointer"
              >
                Number of pages
              </button>
            </li>
            <li>
              <button
                onClick={() => setSortBy("Year")}
                className="hover:bg-white/60 rounded-lg text-sm font-medium py-2.5 cursor-pointer"
              >
                Publisher year
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#131313]/15 mb-8">
        <button
          onClick={() => setActiveTab("read")}
          className={`px-5 py-3 text-base font-medium rounded-t-xl transition-all cursor-pointer relative -mb-px ${
            activeTab === "read"
              ? "border border-[#131313]/20 border-b-white bg-white text-[#131313] font-semibold"
              : "text-[#131313]/60 hover:text-[#131313] border border-transparent"
          }`}
        >
          Read Books ({readBooks.length})
        </button>
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`px-5 py-3 text-base font-medium rounded-t-xl transition-all cursor-pointer relative -mb-px ${
            activeTab === "wishlist"
              ? "border border-[#131313]/20 border-b-white bg-white text-[#131313] font-semibold"
              : "text-[#131313]/60 hover:text-[#131313] border border-transparent"
          }`}
        >
          Wishlist Books ({wishlistBooks.length})
        </button>
      </div>

      {/* Book Cards */}
      <div className="space-y-6">
        {displayedBooks.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No books found in this list.</p>
        ) : (
          displayedBooks.map((book) => (
            <div
              key={book.bookId}
              className="border border-[#131313]/15 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center bg-white"
            >
              <div className="bg-[#F3F3F3] rounded-2xl w-full md:w-56 h-60 flex justify-center items-center shrink-0">
                <Image
                  src={book.image}
                  alt={book.bookName}
                  width={120}
                  height={160}
                  className="h-44 w-auto object-contain drop-shadow"
                />
              </div>

              <div className="flex-1 w-full space-y-3">
                <h2 className="text-2xl font-bold font-serif text-[#131313]">
                  {book.bookName}
                </h2>
                <p className="text-sm font-medium text-[#131313]/80">By : {book.author}</p>

                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="font-bold text-[#131313]">Tag</span>
                  {book.tags?.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-[#23BE0A]/5 text-[#23BE0A] font-semibold px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  <span className="text-[#131313]/70 ml-2">
                    📅 Year of Publishing: {book.yearOfPublishing}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs text-[#131313]/60">
                  <span>👥 Publisher: {book.publisher}</span>
                  <span>📄 Page {book.totalPages}</span>
                </div>

                <div className="border-t border-[#131313]/15 pt-4 flex flex-wrap items-center gap-3">
                  <span className="bg-[#328EFF]/15 text-[#328EFF] text-xs font-medium px-4 py-2 rounded-full">
                    Category: {book.category}
                  </span>
                  <span className="bg-[#FFAC33]/15 text-[#FFAC33] text-xs font-medium px-4 py-2 rounded-full">
                    Rating: {book.rating}
                  </span>
                  <Link
                    href={`/books/${book.bookId}`}
                    className="btn btn-sm bg-[#23BE0A] hover:bg-[#1fa509] text-white rounded-full px-5 border-none normal-case"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}