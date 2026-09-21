import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import ToastProvider from "@/components/shared/ToastProvider"; // আপনার পাথ অনুযায়ী

export const metadata: Metadata = {
  title: "Book Vibe",
  description: "Books to freshen up your bookshelf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen flex flex-col antialiased">
        <ToastProvider />
        <Navbar />
        {children}
      </body>
    </html>
  );
}