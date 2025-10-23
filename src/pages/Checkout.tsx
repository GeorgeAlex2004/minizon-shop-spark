import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentMethod {
  type: 'card' | 'paypal' | 'apple_pay';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingAddress, setShippingAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const [billingAddress, setBillingAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [savePayment, setSavePayment] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  const handleAddressChange = (field: keyof Address, value: string, isBilling = false) => {
    if (isBilling) {
      setBillingAddress(prev => ({ ...prev, [field]: value }));
    } else {
      setShippingAddress(prev => ({ ...prev, [field]: value }));
    }
  };

  const handlePaymentChange = (field: keyof PaymentMethod, value: string) => {
    setPaymentMethod(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address1', 'city', 'state', 'zipCode'];
    return required.every(field => shippingAddress[field as keyof Address].trim() !== '');
  };

  const validateStep2 = () => {
    if (paymentMethod.type === 'card') {
      return paymentMethod.cardNumber && paymentMethod.expiryDate && paymentMethod.cvv && paymentMethod.nameOnCard;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      toast({
        title: "Payment Information Required",
        description: "Please complete all payment fields",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePlaceOrder = async () => {
    if (!termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been confirmed and will be processed shortly."
    });

    clearCart();
    navigate('/order-success');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No Items to Checkout</h1>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep >= step ? 'text-primary font-semibold' : 'text-muted-foreground'
                  }`}>
                    {step === 1 ? 'Shipping' : step === 2 ? 'Payment' : 'Review'}
                  </span>
                  {step < 3 && <div className="w-8 h-px bg-muted mx-4" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={shippingAddress.firstName}
                        onChange={(e) => handleAddressChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={shippingAddress.lastName}
                        onChange={(e) => handleAddressChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => handleAddressChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => handleAddressChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address1">Address Line 1 *</Label>
                      <Input
                        id="address1"
                        value={shippingAddress.address1}
                        onChange={(e) => handleAddressChange('address1', e.target.value)}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address2">Address Line 2</Label>
                      <Input
                        id="address2"
                        value={shippingAddress.address2}
                        onChange={(e) => handleAddressChange('address2', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={shippingAddress.zipCode}
                        onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={shippingAddress.country}
                        onChange={(e) => handleAddressChange('country', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </Card>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-6">Payment Information</h2>
                  
                  <div className="space-y-6">
                    <RadioGroup value={paymentMethod.type} onValueChange={(value) => setPaymentMethod(prev => ({ ...prev, type: value as 'card' | 'paypal' | 'apple_pay' }))}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Credit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="apple_pay" id="apple_pay" />
                        <Label htmlFor="apple_pay">Apple Pay</Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod.type === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="nameOnCard">Name on Card *</Label>
                          <Input
                            id="nameOnCard"
                            value={paymentMethod.nameOnCard}
                            onChange={(e) => handlePaymentChange('nameOnCard', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentMethod.cardNumber}
                            onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={paymentMethod.expiryDate}
                              onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={paymentMethod.cvv}
                              onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sameAsShipping"
                          checked={sameAsShipping}
                          onCheckedChange={setSameAsShipping}
                        />
                        <Label htmlFor="sameAsShipping">Billing address same as shipping</Label>
                      </div>

                      {!sameAsShipping && (
                        <Card className="p-4">
                          <h3 className="font-semibold mb-4">Billing Address</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="billingFirstName">First Name</Label>
                              <Input
                                id="billingFirstName"
                                value={billingAddress.firstName}
                                onChange={(e) => handleAddressChange('firstName', e.target.value, true)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="billingLastName">Last Name</Label>
                              <Input
                                id="billingLastName"
                                value={billingAddress.lastName}
                                onChange={(e) => handleAddressChange('lastName', e.target.value, true)}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Label htmlFor="billingAddress1">Address Line 1</Label>
                              <Input
                                id="billingAddress1"
                                value={billingAddress.address1}
                                onChange={(e) => handleAddressChange('address1', e.target.value, true)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="billingCity">City</Label>
                              <Input
                                id="billingCity"
                                value={billingAddress.city}
                                onChange={(e) => handleAddressChange('city', e.target.value, true)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="billingZipCode">ZIP Code</Label>
                              <Input
                                id="billingZipCode"
                                value={billingAddress.zipCode}
                                onChange={(e) => handleAddressChange('zipCode', e.target.value, true)}
                              />
                            </div>
                          </div>
                        </Card>
                      )}

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="savePayment"
                          checked={savePayment}
                          onCheckedChange={setSavePayment}
                        />
                        <Label htmlFor="savePayment">Save payment method for future use</Label>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-6">Review Your Order</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <p className="text-sm text-muted-foreground">
                        {shippingAddress.firstName} {shippingAddress.lastName}<br />
                        {shippingAddress.address1}<br />
                        {shippingAddress.address2 && `${shippingAddress.address2}\n`}
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
                        {shippingAddress.country}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Payment Method</h3>
                      <p className="text-sm text-muted-foreground">
                        {paymentMethod.type === 'card' && `**** **** **** ${paymentMethod.cardNumber?.slice(-4)}`}
                        {paymentMethod.type === 'paypal' && 'PayPal'}
                        {paymentMethod.type === 'apple_pay' && 'Apple Pay'}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="termsAccepted"
                        checked={termsAccepted}
                        onCheckedChange={setTermsAccepted}
                      />
                      <Label htmlFor="termsAccepted">
                        I agree to the <Link to="/terms" className="text-primary hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      </Label>
                    </div>
                  </div>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/cart">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Cart
                  </Link>
                </Button>
                
                <div className="flex space-x-4">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={() => setCurrentStep(prev => prev - 1)}>
                      Previous
                    </Button>
                  )}
                  
                  {currentStep < 3 ? (
                    <Button onClick={handleNext}>
                      Next
                    </Button>
                  ) : (
                    <Button 
                      onClick={handlePlaceOrder}
                      disabled={isProcessing || !termsAccepted}
                      className="flex items-center"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Place Order
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
