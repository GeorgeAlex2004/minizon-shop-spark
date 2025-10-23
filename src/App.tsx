import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { SearchProvider } from "./contexts/SearchContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Wishlist from "./pages/Wishlist";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import Sale from "./pages/Sale";
import CustomerService from "./pages/CustomerService";
import ContactUs from "./pages/ContactUs";
import ShippingInfo from "./pages/ShippingInfo";
import Returns from "./pages/Returns";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import OurStory from "./pages/OurStory";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/shipping" element={<ShippingInfo />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AuthProvider>
        </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
