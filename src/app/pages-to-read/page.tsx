"use client";

import React, { useSyncExternalStore } from "react";
import booksData from "@/data/booksData.json";
import { getStoredReadList } from "@/utils/localStorage";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Book {
  bookId: number;
  bookName: string;
  totalPages: number;
  [key: string]: unknown;
}

interface ChartDataItem {
  name: string;
  pages: number;
}

interface TriangleBarProps {
  fill?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const colors = ["#0085FF", "#00C49F", "#FFBB28", "#FF8042", "#FF0000", "#9370DB"];

// ট্রায়াঙ্গল বারের পাথ
const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${
    x + width / 2
  },${y + height / 3} ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
    y + height
  } ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = ({
  fill = "#000",
  x = 0,
  y = 0,
  width = 0,
  height = 0,
}: TriangleBarProps) => {
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// নো-রি-রেন্ডার ক্লায়েন্ট ডিটেক্টর (ESLint এরর এড়াতে)
const emptySubscribe = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

export default function PagesToReadPage() {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return (
      <div className="max-w-6xl mx-auto my-12 px-4 flex justify-center items-center min-h-400px">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  const storedReadIds = getStoredReadList();
  const books = booksData as Book[];
  const read = books.filter((b) => storedReadIds.includes(b.bookId));
  const finalBooks = read.length > 0 ? read : books.slice(0, 5);

  const chartData: ChartDataItem[] = finalBooks.map((book) => ({
    name: book.bookName,
    pages: book.totalPages,
  }));

  return (
    <section className="max-w-6xl w-full mx-auto my-12 px-4">
      <div className="bg-[#131313]/5 rounded-3xl p-4 sm:p-10 w-full block">
        <div className="w-full h-480px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 35, right: 20, left: 10, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#131313", opacity: 0.7, fontSize: 12 }}
                interval={0}
              />
              <YAxis tick={{ fill: "#131313", opacity: 0.7, fontSize: 12 }} />
              <Bar
                dataKey="pages"
                shape={<TriangleBar />}
                label={{ position: "top", fill: "#131313", fontWeight: "bold", fontSize: 13 }}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}