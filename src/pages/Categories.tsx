import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categories, products } from "@/data/products";
import { 
  Laptop, 
  Shirt, 
  Home, 
  Dumbbell, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from "lucide-react";

const Categories = () => {
  // Get product count for each category
  const getProductCount = (categoryId: string) => {
    return products.filter(product => product.category === categoryId).length;
  };

  // Icon mapping
  const iconMap = {
    Laptop,
    Shirt,
    Home,
    Dumbbell,
    BookOpen,
    Sparkles,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our wide range of products organized by category. 
              Find exactly what you're looking for with ease.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap];
              const productCount = getProductCount(category.id);
              
              return (
                <Link 
                  key={category.id} 
                  to={`/products?category=${category.id}`}
                  className="group"
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <CardContent className="p-6">
                      <div className="text-center">
                        {/* Category Image */}
                        <div className="relative mb-4">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <ArrowRight className="h-8 w-8 text-white" />
                          </div>
                        </div>

                        {/* Category Info */}
                        <div className="flex items-center justify-center mb-3">
                          {IconComponent && (
                            <IconComponent className="h-6 w-6 mr-2 text-primary" />
                          )}
                          <h3 className="text-xl font-semibold">{category.name}</h3>
                        </div>

                        {/* Product Count */}
                        <Badge variant="secondary" className="mb-4">
                          {productCount} {productCount === 1 ? 'product' : 'products'}
                        </Badge>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm">
                          Explore our {category.name.toLowerCase()} collection
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* All Products CTA */}
          <div className="text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-2">Can't find what you're looking for?</h3>
                <p className="text-muted-foreground mb-4">
                  Browse all our products in one place
                </p>
                <Link 
                  to="/products"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
