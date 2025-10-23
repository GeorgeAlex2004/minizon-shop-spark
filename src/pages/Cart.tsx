import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Clock } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, total, clearCart, saveForLater, savedItems, moveToCart, removeFromSaved } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-6">
              Start shopping to add items to your cart
            </p>
            <Button asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <Button variant="ghost" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 border rounded-lg bg-card"
                >
                  <Link
                    to={`/product/${item.product.id}`}
                    className="flex-shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-24 w-24 object-cover rounded-md"
                    />
                  </Link>

                  <div className="flex-1 space-y-2">
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className="font-semibold hover:text-primary transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {item.product.brand}
                    </p>
                    <p className="font-bold text-primary">
                      ${item.product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-2 text-blue-600 hover:text-blue-700"
                        onClick={() => saveForLater(item.product.id)}
                        title="Save for later"
                      >
                        <Clock className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-2 text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Saved for Later */}
            {savedItems.length > 0 && (
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-4">Saved for Later</h2>
                <div className="space-y-4">
                  {savedItems.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-4 border rounded-lg bg-muted/50"
                    >
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-shrink-0"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-24 w-24 object-cover rounded-md"
                        />
                      </Link>

                      <div className="flex-1 space-y-2">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {product.brand}
                        </p>
                        <p className="font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button
                          variant="accent"
                          size="sm"
                          onClick={() => moveToCart(product.id)}
                        >
                          Move to Cart
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeFromSaved(product.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 space-y-4 sticky top-24">
                <h2 className="text-xl font-bold">Order Summary</h2>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Free shipping on orders over $50
                    </p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button variant="accent" size="lg" className="w-full" asChild>
                  <Link to="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>

                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
