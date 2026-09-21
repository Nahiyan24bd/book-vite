# 📚 Book Vibe — Books to Freshen Up Your Bookshelf

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/DaisyUI-v5-5AD8E6?style=for-the-badge&logo=daisyui" alt="DaisyUI" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

<br />

**Book Vibe** is a modern, responsive book catalog and reading tracker web application. It allows book lovers to explore curated collections, view in-depth details, organize books into Read and Wishlist collections via local storage, and visualize page count statistics with custom triangular bar charts.

---

## 🚀 Live Demo & Links

- **Live Site:** [https://your-book-vibe.vercel.app](https://your-deployment-url.com)
- **Repository:** [https://github.com/your-username/book-vibe](https://github.com/your-username/book-vibe)

---

## ✨ Key Features

- 📖 **Interactive Home & Book Grid:** Dynamic showcase cards displaying cover images, tags, authors, ratings, and categories.
- 🔍 **Detailed Book Overview (`/books/[id]`):** Dedicated dynamic routes showing publishing years, publishers, page counts, ratings, and full reviews.
- 📑 **Listed Books Management (`/listed-books`):**
  - **Read Books Tab:** Displays books finished by the user.
  - **Wishlist Books Tab:** Displays books saved for future reading.
- 🔄 **Strict Business Logic & Persistence:**
  - Marking a book as **Read** automatically removes it from the **Wishlist**.
  - A book already marked as **Read** cannot be added to the Wishlist, triggering an informative feedback notification.
  - All read and wishlist states persist across sessions using browser `localStorage`.
- 📊 **Dynamic Sorting:** Instant client-side sorting by **Rating**, **Number of pages**, or **Publisher year**.
- 📈 **Custom Visual Analytics (`/pages-to-read`):** Custom triangular/pyramid bar charts built with Recharts to visualize page counts per book.
- 🔔 **Toast Alerts:** Interactive and stylish notifications powered by `react-toastify`.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Frontend Library:** [React 19](https://react.dev/)
- **Programming Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI v5](https://daisyui.com/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Toast Notifications:** [React-Toastify](https://fkhadra.github.io/react-toastify/)
- **Package Manager:** `pnpm`

---

## 📁 Project Directory Structure

```text
book-vite/
├── src/
│   ├── app/
│   │   ├── books/
│   │   │   └── [id]/page.tsx      # Dynamic book details page
│   │   ├── listed-books/page.tsx  # Tabs (Read/Wishlist) & sorting page
│   │   ├── pages-to-read/page.tsx # Triangle bar chart page
│   │   ├── globals.css            # Tailwind & DaisyUI imports
│   │   ├── layout.tsx             # Root layout & global toast provider
│   │   └── page.tsx               # Homepage with Banner and Book Grid
│   ├── components/
│   │   ├── homepage/              # Banner and home-specific components
│   │   └── shared/                # Navbar, ToastProvider, and reusable elements
│   ├── data/
│   │   └── booksData.json         # Books dataset
│   └── utils/
│       └── localStorage.ts        # Storage handler & validation rules
├── public/                        # Static assets & icons
├── package.json
└── README.md