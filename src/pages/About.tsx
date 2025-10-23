import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  Award, 
  Heart,
  Globe,
  Shield,
  Leaf,
  TrendingUp
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">About Minizon</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're passionate about bringing you the best products at unbeatable prices, 
              with a commitment to quality, sustainability, and exceptional customer service.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-6 w-6 mr-2 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize access to quality products by offering an extensive selection 
                  of goods at competitive prices, while maintaining the highest standards of 
                  customer service and ethical business practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-6 w-6 mr-2 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To become the world's most trusted e-commerce platform, where customers 
                  can discover, purchase, and enjoy products that enhance their lives, 
                  while supporting sustainable and responsible business practices.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Company Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">10M+</div>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <p className="text-sm text-muted-foreground">Products Available</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <p className="text-sm text-muted-foreground">Countries Served</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">Customer Support</p>
              </CardContent>
            </Card>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    Customer First
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Every decision we make is guided by what's best for our customers. 
                    We listen, learn, and continuously improve based on your feedback.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Trust & Transparency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We believe in honest communication, fair pricing, and transparent 
                    business practices that build lasting relationships.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Leaf className="h-5 w-5 mr-2 text-primary" />
                    Sustainability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We're committed to environmental responsibility through sustainable 
                    packaging, carbon-neutral shipping, and eco-friendly products.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    Quality Excellence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We maintain the highest standards in product quality, customer service, 
                    and operational excellence across all aspects of our business.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We embrace technology and innovation to enhance your shopping 
                    experience and continuously improve our platform.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-primary" />
                    Community Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We give back to the communities we serve through charitable 
                    initiatives, local partnerships, and social responsibility programs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Our Story */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-center">Our Story</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Founded in 2015 by a team of passionate entrepreneurs, Minizon started 
                  as a small online store with a simple mission: to make quality products 
                  accessible to everyone, everywhere.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  What began as a local business has grown into a global e-commerce platform, 
                  serving millions of customers across 100+ countries. Our growth has been 
                  driven by our unwavering commitment to customer satisfaction, innovative 
                  technology, and ethical business practices.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we're proud to offer an extensive catalog of products across multiple 
                  categories, from cutting-edge electronics to sustainable home goods. 
                  But what truly sets us apart is our dedication to creating meaningful 
                  connections with our customers and making a positive impact on the world.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Leadership Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground mb-2">CEO & Founder</p>
                  <p className="text-xs text-muted-foreground">
                    Visionary leader with 15+ years in e-commerce and technology innovation.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Michael Chen</h3>
                  <p className="text-sm text-muted-foreground mb-2">CTO</p>
                  <p className="text-xs text-muted-foreground">
                    Technology expert driving innovation and platform scalability.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Emily Rodriguez</h3>
                  <p className="text-sm text-muted-foreground mb-2">Head of Customer Experience</p>
                  <p className="text-xs text-muted-foreground">
                    Passionate about creating exceptional customer experiences and satisfaction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Awards & Recognition */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-center">Awards & Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Best E-commerce 2023</h4>
                  <p className="text-sm text-muted-foreground">Retail Excellence Awards</p>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Customer Service Excellence</h4>
                  <p className="text-sm text-muted-foreground">Industry Recognition</p>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Sustainability Leader</h4>
                  <p className="text-sm text-muted-foreground">Green Business Awards</p>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Innovation Award</h4>
                  <p className="text-sm text-muted-foreground">Tech Excellence</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Be part of our mission to make quality products accessible to everyone. 
              Shop with confidence knowing you're supporting a company that values 
              quality, sustainability, and customer satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Start Shopping
              </Button>
              <Button variant="outline" size="lg">
                View Careers
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
