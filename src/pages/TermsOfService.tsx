import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Scale, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Mail,
  Phone
} from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Scale className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-4xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              These terms govern your use of our website and services. 
              Please read them carefully before using our platform.
            </p>
            <Badge variant="outline" className="mt-4">
              Last updated: January 1, 2024
            </Badge>
          </div>

          {/* Acceptance */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                By accessing or using Minizon's website, mobile application, or services, 
                you agree to be bound by these Terms of Service and our Privacy Policy. 
                If you do not agree to these terms, please do not use our services.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium">
                  By using our services, you confirm that you are at least 18 years old 
                  and have the legal capacity to enter into this agreement.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account Terms */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Account Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Account Creation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• You must provide accurate and complete information</li>
                    <li>• You are responsible for maintaining account security</li>
                    <li>• One account per person or business entity</li>
                    <li>• You must be at least 18 years old to create an account</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Account Responsibilities</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Keep your login credentials secure and confidential</li>
                    <li>• Notify us immediately of any unauthorized access</li>
                    <li>• Update your information when it changes</li>
                    <li>• Comply with all applicable laws and regulations</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Account Termination</h4>
                  <p className="text-sm text-muted-foreground">
                    We reserve the right to suspend or terminate your account if you violate 
                    these terms or engage in fraudulent or illegal activities. You may also 
                    close your account at any time by contacting customer service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product and Service Terms */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Products and Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Product Information</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Product descriptions and images are for informational purposes</li>
                    <li>• We strive for accuracy but cannot guarantee all information is error-free</li>
                    <li>• Prices are subject to change without notice</li>
                    <li>• Product availability may vary by location</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Orders and Payment</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• All orders are subject to acceptance and availability</li>
                    <li>• Payment is required at the time of order placement</li>
                    <li>• We accept major credit cards, PayPal, and other approved methods</li>
                    <li>• Orders may be cancelled within 2 hours of placement</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Shipping and Delivery</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Delivery times are estimates and not guaranteed</li>
                    <li>• Risk of loss transfers to you upon delivery</li>
                    <li>• You are responsible for providing accurate shipping addresses</li>
                    <li>• Additional charges may apply for international shipping</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Returns and Refunds */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Returns and Refunds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Return Policy</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 30-day return window for most items</li>
                    <li>• Items must be unused and in original packaging</li>
                    <li>• Return authorization required before sending items back</li>
                    <li>• Some items may have different return policies</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Refund Process</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Refunds processed within 3-5 business days of receipt</li>
                    <li>• Original payment method will be credited</li>
                    <li>• Shipping costs may not be refundable</li>
                    <li>• Refund amount may be reduced for damaged or missing items</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Uses */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <XCircle className="h-5 w-5 mr-2 text-red-500" />
                Prohibited Uses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">You May Not:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Use our services for illegal purposes</li>
                      <li>• Attempt to gain unauthorized access to our systems</li>
                      <li>• Interfere with or disrupt our services</li>
                      <li>• Use automated systems to access our website</li>
                    </ul>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Impersonate another person or entity</li>
                      <li>• Violate any applicable laws or regulations</li>
                      <li>• Transmit harmful or malicious code</li>
                      <li>• Engage in fraudulent activities</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Consequences</h4>
                  <p className="text-sm text-muted-foreground">
                    Violation of these terms may result in immediate account termination, 
                    legal action, and reporting to appropriate authorities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Our Content</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    All content on our website, including text, graphics, logos, images, 
                    and software, is owned by Minizon or our licensors and protected by 
                    copyright and other intellectual property laws.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• You may not copy, modify, or distribute our content without permission</li>
                    <li>• You may not use our trademarks without written consent</li>
                    <li>• Unauthorized use may result in legal action</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">User Content</h4>
                  <p className="text-sm text-muted-foreground">
                    By submitting content (reviews, comments, etc.), you grant us a 
                    non-exclusive license to use, modify, and display such content 
                    in connection with our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Service Availability</h4>
                  <p className="text-sm text-muted-foreground">
                    We strive to provide continuous service but cannot guarantee uninterrupted 
                    access. We may modify, suspend, or discontinue services at any time 
                    without notice.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Limitation of Liability</h4>
                  <p className="text-sm text-muted-foreground">
                    To the maximum extent permitted by law, Minizon shall not be liable for 
                    any indirect, incidental, special, or consequential damages arising from 
                    your use of our services.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Third-Party Services</h4>
                  <p className="text-sm text-muted-foreground">
                    Our services may include links to third-party websites or services. 
                    We are not responsible for the content or practices of these third parties.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Governing Law and Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Governing Law</h4>
                  <p className="text-sm text-muted-foreground">
                    These terms are governed by the laws of the State of New York, 
                    United States, without regard to conflict of law principles.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Dispute Resolution</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Any disputes arising from these terms or your use of our services 
                    will be resolved through:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• First, through good faith negotiations</li>
                    <li>• If unsuccessful, through binding arbitration</li>
                    <li>• Arbitration will be conducted in New York, NY</li>
                    <li>• You may opt out of arbitration within 30 days of account creation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We may update these Terms of Service from time to time. When we make 
                  changes, we will:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Post the updated terms on our website</li>
                  <li>• Update the "Last updated" date</li>
                  <li>• Notify you via email for material changes</li>
                  <li>• Provide 30 days notice for significant changes</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  Your continued use of our services after changes become effective 
                  constitutes acceptance of the new terms.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Legal Department</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>legal@minizon.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>1-800-LEGAL</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Mailing Address</h4>
                    <p className="text-sm text-muted-foreground">
                      Minizon Legal Department<br />
                      123 Commerce Street, Suite 100<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
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

export default TermsOfService;
