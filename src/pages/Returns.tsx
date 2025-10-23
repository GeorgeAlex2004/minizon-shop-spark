import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RotateCcw, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Package,
  CreditCard,
  Truck
} from "lucide-react";

const Returns = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <RotateCcw className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-4xl font-bold">Returns & Exchanges</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Easy returns and exchanges. We want you to be completely satisfied with your purchase.
            </p>
          </div>

          {/* Return Policy Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>30-Day Returns</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Return any item within 30 days of delivery for a full refund
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Free Returns</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Free return shipping on all domestic returns
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CreditCard className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Quick Refunds</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Refunds processed within 3-5 business days
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How to Return */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>How to Return an Item</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">Start Your Return</h4>
                      <p className="text-sm text-muted-foreground">
                        Log into your account and go to "Order History" to initiate a return.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">Select Items</h4>
                      <p className="text-sm text-muted-foreground">
                        Choose which items you'd like to return and provide a reason.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">Print Label</h4>
                      <p className="text-sm text-muted-foreground">
                        Print the prepaid return label and attach it to your package.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-semibold">Ship It Back</h4>
                      <p className="text-sm text-muted-foreground">
                        Drop off your package at any authorized shipping location.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Return Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Original Packaging</h4>
                      <p className="text-sm text-muted-foreground">
                        Items must be in original packaging with all tags and accessories.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Unused Condition</h4>
                      <p className="text-sm text-muted-foreground">
                        Items must be unused and in the same condition as received.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Return Authorization</h4>
                      <p className="text-sm text-muted-foreground">
                        You must have a valid return authorization number.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Time Limit</h4>
                      <p className="text-sm text-muted-foreground">
                        Returns must be initiated within 30 days of delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Return Timeline */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Return Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Day 1</h4>
                  <p className="text-sm text-muted-foreground">
                    Initiate return online
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Day 2-3</h4>
                  <p className="text-sm text-muted-foreground">
                    Ship package back
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Day 5-7</h4>
                  <p className="text-sm text-muted-foreground">
                    Package received and processed
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Day 8-10</h4>
                  <p className="text-sm text-muted-foreground">
                    Refund processed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exchange Process */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Exchange Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">How Exchanges Work</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li>1. Follow the same return process above</li>
                    <li>2. Select "Exchange" instead of "Return"</li>
                    <li>3. Choose your replacement item</li>
                    <li>4. We'll ship the new item once we receive your return</li>
                    <li>5. Any price difference will be charged or refunded</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Exchange Benefits</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Faster than return + new purchase</li>
                    <li>• No additional shipping charges</li>
                    <li>• Priority processing</li>
                    <li>• Same return window applies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Special Return Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Damaged or Defective Items</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    If your item arrives damaged or is defective, contact us immediately:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Email photos of the damage to support@minizon.com</li>
                    <li>• We'll provide a prepaid return label</li>
                    <li>• Priority processing for replacement or refund</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Wrong Item Received</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    If you received the wrong item:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Contact us within 48 hours</li>
                    <li>• We'll send the correct item immediately</li>
                    <li>• Free return shipping for the wrong item</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">International Returns</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    For international customers:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Contact customer service for return instructions</li>
                    <li>• Return shipping costs may apply</li>
                    <li>• Extended processing time for international returns</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button size="lg" className="mr-4">
              Start Return
            </Button>
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Returns;
