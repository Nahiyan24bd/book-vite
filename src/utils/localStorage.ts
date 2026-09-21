export const getStoredReadList = (): number[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("read-books");
    return stored ? JSON.parse(stored) : [];
  };
  
  export const getStoredWishlist = (): number[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("wishlist-books");
    return stored ? JSON.parse(stored) : [];
  };
  
  export const addToReadList = (id: number): { success: boolean; message: string } => {
    const readList = getStoredReadList();
    const wishlist = getStoredWishlist();
  
    if (readList.includes(id)) {
      return { success: false, message: "You have already read this book!" };
    }
  
    // Read লিস্টে যোগ করা
    readList.push(id);
    localStorage.setItem("read-books", JSON.stringify(readList));
  
    // Wishlist এ থাকলে সেখান থেকে স্বয়ংক্রিয়ভাবে মুছে ফেলা
    if (wishlist.includes(id)) {
      const updatedWishlist = wishlist.filter((item) => item !== id);
      localStorage.setItem("wishlist-books", JSON.stringify(updatedWishlist));
    }
  
    return { success: true, message: "Book added to Read list successfully!" };
  };
  
  export const addToWishlist = (id: number): { success: boolean; message: string } => {
    const readList = getStoredReadList();
    const wishlist = getStoredWishlist();
  
    // রুল: Read করা থাকলে Wishlist এ নেওয়া যাবে না
    if (readList.includes(id)) {
      return { success: false, message: "You have already read this book!" };
    }
  
    if (wishlist.includes(id)) {
      return { success: false, message: "Book is already in your Wishlist!" };
    }
  
    wishlist.push(id);
    localStorage.setItem("wishlist-books", JSON.stringify(wishlist));
    return { success: true, message: "Book added to Wishlist successfully!" };
  };