import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { toast } from "@/hooks/use-toast";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  saveForLater: (productId: string) => void;
  savedItems: Product[];
  moveToCart: (productId: string) => void;
  removeFromSaved: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<Product[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("minizon-cart");
    const savedForLater = localStorage.getItem("minizon-saved");
    
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        localStorage.removeItem("minizon-cart");
      }
    }
    
    if (savedForLater) {
      try {
        setSavedItems(JSON.parse(savedForLater));
      } catch (error) {
        localStorage.removeItem("minizon-saved");
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("minizon-cart", JSON.stringify(items));
  }, [items]);

  // Save saved items to localStorage whenever savedItems change
  useEffect(() => {
    localStorage.setItem("minizon-saved", JSON.stringify(savedItems));
  }, [savedItems]);

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Updated cart",
          description: `Increased quantity of ${product.name}`,
        });
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.product.id === productId);
      if (item) {
        toast({
          title: "Removed from cart",
          description: `${item.product.name} has been removed`,
        });
      }
      return prevItems.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const saveForLater = (productId: string) => {
    const item = items.find((item) => item.product.id === productId);
    if (item) {
      setSavedItems((prev) => [...prev, item.product]);
      removeFromCart(productId);
      toast({
        title: "Saved for later",
        description: `${item.product.name} has been saved for later`,
      });
    }
  };

  const moveToCart = (productId: string) => {
    const product = savedItems.find((item) => item.id === productId);
    if (product) {
      addToCart(product);
      removeFromSaved(productId);
    }
  };

  const removeFromSaved = (productId: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        saveForLater,
        savedItems,
        moveToCart,
        removeFromSaved,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
