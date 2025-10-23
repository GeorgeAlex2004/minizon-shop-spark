import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Package, Truck, Mail } from "lucide-react";

const OrderSuccess = () => {
  const orderNumber = `MIN-${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-muted-foreground">
                  Thank you for your purchase. Your order has been successfully placed.
                </p>
              </div>

              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="text-xl font-bold">{orderNumber}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4" />
                    <span>Order Processing</span>
                  </div>
                  <div className="w-8 h-px bg-muted" />
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4" />
                    <span>Shipped</span>
                  </div>
                  <div className="w-8 h-px bg-muted" />
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Delivered</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You will receive an email confirmation shortly with your order details and tracking information.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link to="/products">
                      Continue Shopping
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/orders">
                      View Order History
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
