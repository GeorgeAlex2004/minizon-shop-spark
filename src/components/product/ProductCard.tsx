import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-semibold">
              -{discount}%
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background"
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-lg font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4 space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-accent text-accent"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <Button
          variant="accent"
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};
