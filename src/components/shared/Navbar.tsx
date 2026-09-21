"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Home", path: "/" },
    { name: "Listed Books", path: "/listed-books" },
    { name: "Pages to Read", path: "/pages-to-read" },
  ];

  const navLinks = (
    <>
      {links.map((link) => {
        // রুট পাথ বা সাবপাথ মিলছে কিনা চেক করা
        const isActive =
          link.path === "/"
            ? pathname === "/"
            : pathname.startsWith(link.path);

        return (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive
                  ? "border border-[#23BE0A] text-[#23BE0A] font-semibold"
                  : "text-[#131313]/80 hover:border hover:border-[#23BE0A] hover:text-[#23BE0A]"
              }`}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </>
  );

  return (
    <nav className="bg-base-100 py-4">
      <div className="navbar max-w-6xl mx-auto px-4">
        {/* Brand & Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden p-0 mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-3 shadow-lg space-y-2"
            >
              {navLinks}
            </ul>
          </div>
          <Link href="/" className="text-2xl sm:text-3xl font-bold text-[#131313]">
            Book Vibe
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-3 text-base">
            {navLinks}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="navbar-end flex gap-3">
          <button className="btn bg-[#23BE0A] hover:bg-[#1fa509] text-white font-semibold px-6 py-2.5 rounded-lg border-none shadow-none text-base cursor-pointer">
            Sign In
          </button>
          <button className="btn bg-[#59C6D2] hover:bg-[#4ab4bf] text-white font-semibold px-6 py-2.5 rounded-lg border-none shadow-none text-base cursor-pointer">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;