import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";
import { products } from "@/data/products";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  isSearching: boolean;
  recentSearches: string[];
  addToRecentSearches: (query: string) => void;
  clearRecentSearches: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const searchResults = searchQuery.trim() === "" 
    ? [] 
    : products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const isSearching = searchQuery.trim() !== "";

  const addToRecentSearches = (query: string) => {
    if (query.trim() === "") return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== query);
      return [query, ...filtered].slice(0, 5); // Keep only 5 recent searches
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        recentSearches,
        addToRecentSearches,
        clearRecentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
