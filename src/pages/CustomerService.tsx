import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  Send,
  Headphones
} from "lucide-react";

const CustomerService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Headphones className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-4xl font-bold">Customer Service</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're here to help! Get support for your orders, products, and account.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Phone Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-2xl font-bold text-primary mb-2">1-800-MINIZON</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Mon-Fri: 9AM-6PM EST<br />
                  Sat-Sun: 10AM-4PM EST
                </p>
                <Button className="w-full">Call Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Email Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-semibold mb-2">support@minizon.com</p>
                <p className="text-sm text-muted-foreground mb-4">
                  We respond within 24 hours
                </p>
                <Button variant="outline" className="w-full">Send Email</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>Live Chat</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our support team in real-time
                </p>
                <Badge variant="secondary" className="mb-4">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Online Now
                </Badge>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Help Topics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Quick Help</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Order Status</h3>
                      <p className="text-sm text-muted-foreground">Track your order</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Returns & Exchanges</h3>
                      <p className="text-sm text-muted-foreground">Return or exchange items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Shipping Info</h3>
                      <p className="text-sm text-muted-foreground">Delivery options</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Account Issues</h3>
                      <p className="text-sm text-muted-foreground">Login problems</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Product Support</h3>
                      <p className="text-sm text-muted-foreground">Technical help</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Payment Issues</h3>
                      <p className="text-sm text-muted-foreground">Billing problems</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <Input id="name" placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What can we help you with?" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your issue or question..."
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Response Time */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Average response time: 2-4 hours</span>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerService;
