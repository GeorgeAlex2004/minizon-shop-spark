import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useSearch } from "@/contexts/SearchContext";
import { Filter, Search, X } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { searchResults, addToRecentSearches } = useSearch();
  
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1500]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (query) {
      addToRecentSearches(query);
    }
  }, [query, addToRecentSearches]);

  const filteredAndSortedResults = searchResults
    .filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id.localeCompare(a.id); // Simple newest sort
        default: {
          // Relevance - products with query in name first
          const aNameMatch = a.name.toLowerCase().includes(query.toLowerCase());
          const bNameMatch = b.name.toLowerCase().includes(query.toLowerCase());
          if (aNameMatch && !bNameMatch) return -1;
          if (!aNameMatch && bNameMatch) return 1;
          return 0;
        }
      }
    });

  if (!query) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Search Products</h1>
            <p className="text-muted-foreground mb-6">
              Enter a search term to find products
            </p>
            <Button asChild>
              <Link to="/products">Browse All Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Search Results for "{query}"
              </h1>
              <p className="text-muted-foreground">
                {filteredAndSortedResults.length} products found
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`${
                showFilters ? "block" : "hidden"
              } md:block w-full md:w-64 space-y-6`}
            >
              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1500}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setPriceRange([0, 1500]);
                  setSortBy("relevance");
                }}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </aside>

            {/* Search Results */}
            <div className="flex-1">
              {/* Sort */}
              <div className="flex justify-end mb-6">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results */}
              {filteredAndSortedResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-2">No products found</h2>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or filters
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPriceRange([0, 1500]);
                        setSortBy("relevance");
                      }}
                    >
                      Clear Filters
                    </Button>
                    <Button asChild>
                      <Link to="/products">Browse All Products</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
