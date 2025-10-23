import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, Percent } from "lucide-react";

const Sale = () => {
  const [sortBy, setSortBy] = useState<string>("discount-high");
  const [showFilters, setShowFilters] = useState(false);

  // Filter products that have originalPrice (on sale)
  const saleProducts = useMemo(() => {
    return products.filter(product => product.originalPrice && product.originalPrice > product.price);
  }, []);

  const sortedProducts = useMemo(() => {
    let sorted = [...saleProducts];

    switch (sortBy) {
      case "discount-high":
        sorted.sort((a, b) => {
          const discountA = ((a.originalPrice! - a.price) / a.originalPrice!) * 100;
          const discountB = ((b.originalPrice! - b.price) / b.originalPrice!) * 100;
          return discountB - discountA;
        });
        break;
      case "discount-low":
        sorted.sort((a, b) => {
          const discountA = ((a.originalPrice! - a.price) / a.originalPrice!) * 100;
          const discountB = ((b.originalPrice! - b.price) / b.originalPrice!) * 100;
          return discountA - discountB;
        });
        break;
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return sorted;
  }, [saleProducts, sortBy]);

  const calculateDiscount = (originalPrice: number, salePrice: number) => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Percent className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-4xl font-bold">Sale</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover amazing deals and discounts on our best products. 
              Limited time offers you won't want to miss!
            </p>
            <Badge variant="destructive" className="mt-4 text-lg px-4 py-2">
              Up to {Math.max(...saleProducts.map(p => calculateDiscount(p.originalPrice!, p.price)))}% OFF
            </Badge>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Sale Items</h2>
              <p className="text-muted-foreground">
                {sortedProducts.length} products on sale
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount-high">Highest Discount</SelectItem>
                  <SelectItem value="discount-low">Lowest Discount</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => {
                const discount = calculateDiscount(product.originalPrice!, product.price);
                return (
                  <div key={product.id} className="relative">
                    <Badge 
                      variant="destructive" 
                      className="absolute top-2 left-2 z-10 text-sm font-bold"
                    >
                      -{discount}%
                    </Badge>
                    <ProductCard product={product} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Percent className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Sale Items Available</h3>
              <p className="text-muted-foreground mb-4">
                Check back soon for amazing deals and discounts!
              </p>
              <Button asChild>
                <a href="/products">Browse All Products</a>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sale;
