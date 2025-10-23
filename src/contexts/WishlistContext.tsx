import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";
import { toast } from "@/hooks/use-toast";

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    setItems((prevItems) => {
      if (prevItems.find((item) => item.id === product.id)) {
        toast({
          title: "Already in wishlist",
          description: `${product.name} is already in your wishlist`,
        });
        return prevItems;
      }
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productId);
      if (item) {
        toast({
          title: "Removed from wishlist",
          description: `${item.name} has been removed from your wishlist`,
        });
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
