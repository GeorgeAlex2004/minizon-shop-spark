import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Lightbulb,
  Globe,
  Heart,
  Award,
  Target
} from "lucide-react";

const OurStory = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From humble beginnings to global impact - discover the journey that shaped 
              Minizon into the trusted e-commerce platform it is today.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* 2015 */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold">
                      2015
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">The Beginning</h3>
                      <p className="text-muted-foreground mb-4">
                        Sarah Johnson founded Minizon in her garage with a simple vision: 
                        to make quality products accessible to everyone. Starting with just 
                        50 products and a small team of 3 people, we began our journey.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>3 employees</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="h-4 w-4" />
                          <span>50 products</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2017 */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold">
                      2017
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">First Million Customers</h3>
                      <p className="text-muted-foreground mb-4">
                        We reached our first million customers milestone! This achievement 
                        validated our mission and motivated us to expand our product catalog 
                        and improve our customer service.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>1M customers</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4" />
                          <span>First award</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2019 */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold">
                      2019
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">International Expansion</h3>
                      <p className="text-muted-foreground mb-4">
                        We launched our international shipping program, starting with Canada 
                        and the UK. This marked our transformation from a local business to 
                        a global e-commerce platform.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Globe className="h-4 w-4" />
                          <span>3 countries</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>500% growth</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2021 */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold">
                      2021
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Sustainability Initiative</h3>
                      <p className="text-muted-foreground mb-4">
                        We launched our comprehensive sustainability program, committing to 
                        carbon-neutral shipping, eco-friendly packaging, and supporting 
                        environmentally responsible suppliers.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>Carbon neutral</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4" />
                          <span>Green award</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2023 */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold">
                      2023
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">AI-Powered Innovation</h3>
                      <p className="text-muted-foreground mb-4">
                        We integrated AI technology to enhance customer experience with 
                        personalized recommendations, intelligent search, and automated 
                        customer service.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Lightbulb className="h-4 w-4" />
                          <span>AI integration</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>10M customers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Today */}
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-accent text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold">
                      Now
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Global Impact</h3>
                      <p className="text-muted-foreground mb-4">
                        Today, Minizon serves millions of customers worldwide with over 
                        50,000 products across multiple categories. We continue to innovate 
                        while staying true to our founding values of quality, accessibility, 
                        and customer satisfaction.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Globe className="h-4 w-4" />
                          <span>100+ countries</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>10M+ customers</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="h-4 w-4" />
                          <span>50K+ products</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Values Evolution */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values Through Time</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">2015-2017</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Foundation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Customer-first approach</li>
                    <li>• Quality products</li>
                    <li>• Honest pricing</li>
                    <li>• Personal service</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">2017-2019</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Growth</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Scalable systems</li>
                    <li>• Team expansion</li>
                    <li>• Process optimization</li>
                    <li>• Market research</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">2019-2021</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Global</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• International reach</li>
                    <li>• Cultural sensitivity</li>
                    <li>• Local partnerships</li>
                    <li>• Global standards</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">2021-Present</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Innovation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI integration</li>
                    <li>• Sustainability focus</li>
                    <li>• Technology leadership</li>
                    <li>• Social impact</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Future Vision */}
          <Card className="mt-16">
            <CardHeader>
              <CardTitle className="text-center">Looking Forward</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  As we look to the future, we remain committed to our founding mission while 
                  embracing new technologies and challenges. We're excited to continue 
                  innovating, expanding our global reach, and making a positive impact on 
                  the world through sustainable business practices.
                </p>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  The best is yet to come
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OurStory;
