import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  HelpCircle,
  ShoppingCart,
  CreditCard,
  Truck,
  RotateCcw,
  User,
  Shield
} from "lucide-react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "General",
      icon: HelpCircle,
      questions: [
        {
          question: "What is Minizon?",
          answer: "Minizon is a leading e-commerce platform offering a wide range of products including electronics, clothing, home goods, and more. We're committed to providing quality products at competitive prices with excellent customer service."
        },
        {
          question: "How do I create an account?",
          answer: "Creating an account is easy! Click the 'Sign Up' button in the top right corner, fill in your information, and verify your email address. You'll then have access to order tracking, wishlist, and faster checkout."
        },
        {
          question: "Is my personal information secure?",
          answer: "Yes, we take your privacy seriously. We use industry-standard encryption to protect your personal and payment information. We never share your data with third parties without your consent."
        }
      ]
    },
    {
      category: "Shopping",
      icon: ShoppingCart,
      questions: [
        {
          question: "How do I place an order?",
          answer: "Simply browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information. Once confirmed, you'll receive an order confirmation email."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "You can modify or cancel your order within 2 hours of placing it. After that, contact customer service immediately as we may be able to help depending on the order status."
        },
        {
          question: "Do you offer gift wrapping?",
          answer: "Yes! We offer gift wrapping services for most items. You can select this option during checkout for an additional fee. Gift-wrapped items come with a beautiful box and ribbon."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for larger orders."
        }
      ]
    },
    {
      category: "Shipping",
      icon: Truck,
      questions: [
        {
          question: "How much does shipping cost?",
          answer: "We offer free standard shipping on orders over $50. Express shipping costs $9.99, and next-day delivery costs $19.99. International shipping rates vary by destination."
        },
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 5-7 business days, express shipping takes 2-3 business days, and next-day delivery arrives the next business day. International shipping typically takes 7-14 business days."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to select international destinations including Canada, UK, Australia, and several European countries. Contact us for specific rates and availability."
        },
        {
          question: "Can I track my order?",
          answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can track your package in real-time through our website or the carrier's website."
        }
      ]
    },
    {
      category: "Returns",
      icon: RotateCcw,
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for most items. Items must be unused, in original packaging, and in the same condition as received. Some items like electronics may have different return periods."
        },
        {
          question: "How do I return an item?",
          answer: "Log into your account, go to 'Order History', and select the items you want to return. Print the prepaid return label, package the items, and drop them off at any authorized shipping location."
        },
        {
          question: "How long do refunds take?",
          answer: "Once we receive your return, refunds are typically processed within 3-5 business days. The refund will appear on your original payment method within 5-10 business days depending on your bank."
        },
        {
          question: "Can I exchange an item instead of returning it?",
          answer: "Yes! During the return process, select 'Exchange' instead of 'Return'. Choose your replacement item, and we'll ship it once we receive your return. Any price difference will be charged or refunded."
        }
      ]
    },
    {
      category: "Account",
      icon: User,
      questions: [
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
        },
        {
          question: "Can I change my email address?",
          answer: "Yes, you can change your email address in your account settings. You'll need to verify the new email address before it becomes active."
        },
        {
          question: "How do I update my shipping address?",
          answer: "Go to your account settings and update your address book. You can have multiple addresses saved for easy checkout."
        },
        {
          question: "Can I delete my account?",
          answer: "Yes, you can delete your account by contacting customer service. Please note that this action is irreversible and will delete all your order history and personal data."
        }
      ]
    },
    {
      category: "Security",
      icon: Shield,
      questions: [
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use SSL encryption and work with trusted payment processors to ensure your payment information is secure. We never store your full credit card information on our servers."
        },
        {
          question: "What should I do if I notice suspicious activity?",
          answer: "If you notice any suspicious activity on your account, change your password immediately and contact customer service. We'll investigate and take appropriate action to secure your account."
        },
        {
          question: "Do you have a privacy policy?",
          answer: "Yes, we have a comprehensive privacy policy that explains how we collect, use, and protect your information. You can find it in the footer of our website."
        }
      ]
    }
  ];

  const filteredData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to common questions about shopping, shipping, returns, and more.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search FAQ..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {filteredData.map((category, categoryIndex) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <category.icon className="h-5 w-5 mr-2 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.questions.map((item, itemIndex) => {
                      const globalIndex = categoryIndex * 100 + itemIndex;
                      const isOpen = openItems.includes(globalIndex);
                      
                      return (
                        <div key={itemIndex} className="border-b last:border-b-0 pb-4 last:pb-0">
                          <button
                            className="w-full text-left flex items-center justify-between py-2 hover:text-primary transition-colors"
                            onClick={() => toggleItem(globalIndex)}
                          >
                            <h3 className="font-semibold pr-4">{item.question}</h3>
                            {isOpen ? (
                              <ChevronUp className="h-4 w-4 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-4 w-4 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="mt-2 text-muted-foreground">
                              <p>{item.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredData.length === 0 && searchQuery && (
            <Card>
              <CardContent className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any FAQ items matching your search.
                </p>
                <Button onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Contact Support */}
          <Card className="mt-12">
            <CardContent className="text-center py-8">
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our customer service team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button>
                  Contact Support
                </Button>
                <Button variant="outline">
                  Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
