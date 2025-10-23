import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, User, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useSearch } from "@/contexts/SearchContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { searchQuery, setSearchQuery, searchResults, isSearching } = useSearch();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Minizon
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
              />
              {isSearching && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg z-50 mt-1 max-h-96 overflow-y-auto">
                  {searchResults.slice(0, 5).map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex items-center space-x-3 p-3 hover:bg-muted transition-colors"
                      onClick={() => setSearchQuery("")}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-10 w-10 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                  {searchResults.length > 5 && (
                    <Link
                      to={`/search?q=${encodeURIComponent(searchQuery)}`}
                      className="block p-3 text-center text-sm text-primary hover:bg-muted"
                      onClick={() => setSearchQuery("")}
                    >
                      View all {searchResults.length} results
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Shop Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium">
                  Shop
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/products">All Products</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/categories">Categories</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/sale">Sale</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/products?featured=true">Featured</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Customer Service Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium">
                  Customer Service
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/customer-service">Customer Service</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/contact">Contact Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/shipping">Shipping Info</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/returns">Returns</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/faq">FAQ</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium">
                  About
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/about">About</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/our-story">Our Story</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/careers">Careers</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/privacy">Privacy Policy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/terms">Terms of Service</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Account */}
            {user ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"}
                    alt={user.name}
                    className="h-6 w-6 rounded-full"
                  />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-semibold">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-semibold">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
                }
              }}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t animate-in slide-in-from-top-5">
            <nav className="flex flex-col space-y-4">
              {/* Shop Section */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">SHOP</h4>
                <div className="space-y-2 ml-4">
                  <Link 
                    to="/products" 
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link 
                    to="/categories" 
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Categories
                  </Link>
                  <Link 
                    to="/sale" 
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sale
                  </Link>
                </div>
              </div>

              {/* Customer Service Section */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">CUSTOMER SERVICE</h4>
                <div className="space-y-2 ml-4">
                  <Link 
                    to="/customer-service" 
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Customer Service
                  </Link>
                  <Link 
                    to="/contact" 
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                  <Link 
                    to="/shipping" 
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Shipping Info
                  </Link>
                  <Link 
                    to="/returns" 
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Returns
                  </Link>
                  <Link 
                    to="/faq" 
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                </div>
              </div>

              {/* About Section */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">ABOUT</h4>
                <div className="space-y-2 ml-4">
                  <Link 
                    to="/about" 
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    to="/our-story" 
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Our Story
                  </Link>
                  <Link 
                    to="/careers" 
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Careers
                  </Link>
                  <Link 
                    to="/privacy" 
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    to="/terms" 
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>

              {/* Account Section */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">ACCOUNT</h4>
                <div className="space-y-2 ml-4">
                  <Link 
                    to="/cart" 
                    className="block text-sm font-medium transition-colors hover:text-primary flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cart {itemCount > 0 && `(${itemCount})`}
                  </Link>
                  <Link 
                    to="/wishlist" 
                    className="block text-sm font-medium transition-colors hover:text-primary flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
                  </Link>
                  {user ? (
                    <Link 
                      to="/profile" 
                      className="block text-sm font-medium transition-colors hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  ) : (
                    <Link 
                      to="/login" 
                      className="block text-sm font-medium transition-colors hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};