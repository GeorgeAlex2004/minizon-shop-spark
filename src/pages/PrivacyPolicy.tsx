import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Eye, 
  Lock, 
  Database,
  Mail,
  Phone,
  Calendar,
  FileText
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
            </p>
            <Badge variant="outline" className="mt-4">
              Last updated: January 1, 2024
            </Badge>
          </div>

          {/* Quick Overview */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Privacy Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Transparency</h4>
                  <p className="text-sm text-muted-foreground">
                    We're open about what data we collect and how we use it
                  </p>
                </div>
                <div className="text-center">
                  <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Security</h4>
                  <p className="text-sm text-muted-foreground">
                    Your data is protected with industry-standard security measures
                  </p>
                </div>
                <div className="text-center">
                  <Database className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Control</h4>
                  <p className="text-sm text-muted-foreground">
                    You have control over your personal information and preferences
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Personal Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-sm">Name and email address</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-sm">Phone number (optional)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm">Billing and shipping addresses</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">Account creation date</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Database className="h-4 w-4 text-primary" />
                        <span className="text-sm">Order history and preferences</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-primary" />
                        <span className="text-sm">Communication preferences</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Technical Information</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• IP address and device information</li>
                    <li>• Browser type and version</li>
                    <li>• Operating system</li>
                    <li>• Website usage patterns and analytics</li>
                    <li>• Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Service Provision</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Process and fulfill your orders</li>
                    <li>• Provide customer support</li>
                    <li>• Send order confirmations and updates</li>
                    <li>• Manage your account and preferences</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Communication</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Send marketing communications (with your consent)</li>
                    <li>• Notify you about important account changes</li>
                    <li>• Respond to your inquiries and feedback</li>
                    <li>• Send product recommendations</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Improvement</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Analyze website usage to improve user experience</li>
                    <li>• Develop new products and services</li>
                    <li>• Conduct market research and analytics</li>
                    <li>• Prevent fraud and ensure security</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Information Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">We Do NOT Sell Your Data</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    We never sell, rent, or trade your personal information to third parties for marketing purposes.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Limited Sharing</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    We may share your information only in these limited circumstances:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• With service providers who help us operate our business (payment processors, shipping companies)</li>
                    <li>• When required by law or to protect our rights</li>
                    <li>• In case of business transfer (merger, acquisition)</li>
                    <li>• With your explicit consent</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Security Measures</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• SSL encryption for data transmission</li>
                      <li>• Secure servers and databases</li>
                      <li>• Regular security audits</li>
                      <li>• Employee access controls</li>
                    </ul>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• PCI DSS compliance for payment data</li>
                      <li>• Two-factor authentication</li>
                      <li>• Regular security training</li>
                      <li>• Incident response procedures</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Data Retention</h4>
                  <p className="text-sm text-muted-foreground">
                    We retain your personal information only as long as necessary to provide our services 
                    and comply with legal obligations. Account data is typically retained for 3 years 
                    after account closure, unless longer retention is required by law.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Access and Control</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Access your personal information</li>
                      <li>• Update or correct your data</li>
                      <li>• Delete your account</li>
                      <li>• Export your data</li>
                    </ul>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Opt-out of marketing communications</li>
                      <li>• Control cookie preferences</li>
                      <li>• Request data portability</li>
                      <li>• Object to certain processing</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">How to Exercise Your Rights</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    You can exercise your privacy rights by:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Logging into your account settings</li>
                    <li>• Contacting our privacy team at privacy@minizon.com</li>
                    <li>• Using our self-service tools</li>
                    <li>• Calling our customer service team</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Types of Cookies</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium mb-2">Essential Cookies</h5>
                      <p className="text-sm text-muted-foreground">
                        Required for basic website functionality, such as login and shopping cart.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Analytics Cookies</h5>
                      <p className="text-sm text-muted-foreground">
                        Help us understand how visitors use our website to improve performance.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Marketing Cookies</h5>
                      <p className="text-sm text-muted-foreground">
                        Used to deliver relevant advertisements and measure campaign effectiveness.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Cookie Management</h4>
                  <p className="text-sm text-muted-foreground">
                    You can control cookies through your browser settings or our cookie preference center. 
                    Note that disabling certain cookies may affect website functionality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Privacy Team</h4>
                    <p className="text-sm text-muted-foreground">
                      Email: privacy@minizon.com<br />
                      Phone: 1-800-PRIVACY<br />
                      Address: 123 Commerce Street, Suite 100, New York, NY 10001
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Protection Officer</h4>
                    <p className="text-sm text-muted-foreground">
                      Email: dpo@minizon.com<br />
                      Response time: Within 30 days<br />
                      Languages: English, Spanish, French
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

export default PrivacyPolicy;
