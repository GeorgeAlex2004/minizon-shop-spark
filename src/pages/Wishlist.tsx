import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
            <p className="text-muted-foreground mb-6">
              Save items you love to your wishlist for later
            </p>
            <Button asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Start Shopping
              </Link>
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
              <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <Button variant="ghost" onClick={clearWishlist}>
              Clear Wishlist
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFromWishlist(product.id)}
                    className="h-8 w-8"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
