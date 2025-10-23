import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  Building2
} from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                          First Name
                        </label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number (Optional)
                      </label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input id="subject" placeholder="What's this about?" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="h-5 w-5 mr-2" />
                    Our Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Minizon Headquarters</p>
                      <p className="text-muted-foreground">
                        123 Commerce Street<br />
                        Suite 100<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Phone Numbers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Customer Service</p>
                      <p className="text-muted-foreground">1-800-MINIZON (1-800-646-4966)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Business Inquiries</p>
                      <p className="text-muted-foreground">1-800-BUSINESS (1-800-287-4637)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Email Addresses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">General Inquiries</p>
                      <p className="text-muted-foreground">info@minizon.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Customer Support</p>
                      <p className="text-muted-foreground">support@minizon.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Business Partnerships</p>
                      <p className="text-muted-foreground">partnerships@minizon.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-muted-foreground">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-muted-foreground">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Find Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive Map Coming Soon</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      123 Commerce Street, Suite 100, New York, NY 10001
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactUs;
