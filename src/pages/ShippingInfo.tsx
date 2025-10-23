import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Clock, 
  Shield, 
  Package, 
  MapPin,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const ShippingInfo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Truck className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-4xl font-bold">Shipping Information</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Fast, reliable shipping options to get your orders to you quickly and safely.
            </p>
          </div>

          {/* Shipping Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="text-center">
                <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Standard Shipping</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">FREE</div>
                <p className="text-sm text-muted-foreground mb-4">
                  On orders over $50
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>5-7 business days</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Fully insured</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Express Shipping</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">$9.99</div>
                <p className="text-sm text-muted-foreground mb-4">
                  For all orders
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>2-3 business days</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Fully insured</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Next Day Delivery</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">$19.99</div>
                <p className="text-sm text-muted-foreground mb-4">
                  For orders placed before 2 PM
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Next business day</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Fully insured</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shipping Details */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Shipping Destinations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Domestic Shipping</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      We ship to all 50 US states and territories:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Continental United States</li>
                      <li>• Alaska and Hawaii</li>
                      <li>• Puerto Rico</li>
                      <li>• US Virgin Islands</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">International Shipping</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      We ship to select international destinations:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Canada</li>
                      <li>• United Kingdom</li>
                      <li>• Australia</li>
                      <li>• Germany, France, Italy, Spain</li>
                    </ul>
                    <Badge variant="outline" className="mt-2">
                      Contact us for international rates
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Shipping Policies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Order Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        Orders are processed within 1-2 business days. You'll receive a confirmation email with tracking information.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Package Protection</h4>
                      <p className="text-sm text-muted-foreground">
                        All packages are fully insured and protected. We use high-quality packaging materials to ensure safe delivery.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Delivery Issues</h4>
                      <p className="text-sm text-muted-foreground">
                        If you experience delivery issues, contact us immediately. We'll work with the carrier to resolve any problems.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tracking Information */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Track Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">How to Track Your Order</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li>1. Check your email for the tracking number</li>
                    <li>2. Visit our tracking page or use the carrier's website</li>
                    <li>3. Enter your tracking number to see real-time updates</li>
                    <li>4. Sign up for delivery notifications</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Delivery Notifications</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Stay informed about your package with delivery notifications:
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Email updates at each milestone</li>
                    <li>• SMS notifications for delivery attempts</li>
                    <li>• Delivery confirmation</li>
                    <li>• Photo proof of delivery (where available)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">How long does shipping take?</h4>
                  <p className="text-sm text-muted-foreground">
                    Standard shipping takes 5-7 business days, express shipping takes 2-3 business days, 
                    and next-day delivery arrives the next business day.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Can I change my shipping address after ordering?</h4>
                  <p className="text-sm text-muted-foreground">
                    You can change your shipping address within 2 hours of placing your order. 
                    After that, contact customer service for assistance.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">What if my package is damaged?</h4>
                  <p className="text-sm text-muted-foreground">
                    If your package arrives damaged, contact us immediately with photos. 
                    We'll arrange for a replacement or refund.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Do you ship on weekends?</h4>
                  <p className="text-sm text-muted-foreground">
                    We process orders Monday through Friday. Weekend deliveries depend on your 
                    chosen shipping method and carrier availability.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShippingInfo;
