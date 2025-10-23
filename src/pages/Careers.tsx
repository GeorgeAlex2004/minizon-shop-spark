import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users,
  Heart,
  Lightbulb,
  TrendingUp,
  Globe,
  Award,
  Coffee,
  Laptop,
  Calendar
} from "lucide-react";

const Careers = () => {
  const jobOpenings = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      remote: true,
      description: "Join our engineering team to build the next generation of e-commerce experiences."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      remote: true,
      description: "Lead product strategy and drive innovation across our platform."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Experience",
      location: "Remote",
      type: "Full-time",
      remote: true,
      description: "Help our customers succeed and grow their businesses with our platform."
    },
    {
      title: "Data Scientist",
      department: "Analytics",
      location: "Seattle, WA",
      type: "Full-time",
      remote: true,
      description: "Use data to drive insights and improve our customer experience."
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Austin, TX",
      type: "Full-time",
      remote: true,
      description: "Create beautiful and intuitive user experiences for our customers."
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Chicago, IL",
      type: "Full-time",
      remote: false,
      description: "Drive growth through innovative marketing campaigns and strategies."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision coverage for you and your family."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Professional development opportunities, mentorship programs, and career advancement paths."
    },
    {
      icon: Globe,
      title: "Flexible Work",
      description: "Remote work options, flexible hours, and work-life balance initiatives."
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Competitive compensation, equity options, and performance-based bonuses."
    },
    {
      icon: Coffee,
      title: "Office Perks",
      description: "Free meals, snacks, coffee, and modern office spaces with great amenities."
    },
    {
      icon: Calendar,
      title: "Time Off",
      description: "Generous PTO, paid holidays, and sabbatical opportunities."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Be part of a mission-driven company that's revolutionizing e-commerce. 
              We're looking for passionate individuals who want to make a difference.
            </p>
          </div>

          {/* Why Work With Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Work at Minizon?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <benefit.icon className="h-5 w-5 mr-2 text-primary" />
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Company Culture */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-center">Our Culture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">What We Value</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Collaboration and teamwork</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <span>Innovation and creativity</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-primary" />
                      <span>Customer-centric approach</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span>Continuous learning and growth</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-primary" />
                      <span>Diversity and inclusion</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We're building the future of e-commerce by creating innovative solutions 
                    that make shopping better for everyone. Our team is passionate about 
                    technology, customer experience, and making a positive impact on the world.
                  </p>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Team Stats</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-semibold text-primary">500+</div>
                        <div className="text-muted-foreground">Employees</div>
                      </div>
                      <div>
                        <div className="font-semibold text-primary">25+</div>
                        <div className="text-muted-foreground">Countries</div>
                      </div>
                      <div>
                        <div className="font-semibold text-primary">50%</div>
                        <div className="text-muted-foreground">Remote</div>
                      </div>
                      <div>
                        <div className="font-semibold text-primary">4.8/5</div>
                        <div className="text-muted-foreground">Job Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
            <div className="space-y-4">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center space-x-1">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.type}</span>
                          </div>
                          {job.remote && (
                            <Badge variant="secondary">Remote OK</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{job.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Button>Apply Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-center">Application Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                    1
                  </div>
                  <h4 className="font-semibold mb-2">Apply Online</h4>
                  <p className="text-sm text-muted-foreground">
                    Submit your application with resume and cover letter
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                    2
                  </div>
                  <h4 className="font-semibold mb-2">Initial Review</h4>
                  <p className="text-sm text-muted-foreground">
                    Our team reviews your application within 1 week
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                    3
                  </div>
                  <h4 className="font-semibold mb-2">Interviews</h4>
                  <p className="text-sm text-muted-foreground">
                    Phone/video interviews with team members
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 font-bold">
                    4
                  </div>
                  <h4 className="font-semibold mb-2">Decision</h4>
                  <p className="text-sm text-muted-foreground">
                    Final decision and offer within 2 weeks
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Don't see a position that matches your skills? We're always looking for 
              talented individuals. Send us your resume and let us know how you'd like to contribute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                View All Positions
              </Button>
              <Button variant="outline" size="lg">
                Submit General Application
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
