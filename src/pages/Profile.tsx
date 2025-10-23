import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Heart, 
  Settings,
  LogOut,
  Edit
} from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false);
  };

  const mockOrders = [
    {
      id: "MIN-12345678",
      date: "2024-01-15",
      status: "Delivered",
      total: 299.99,
      items: 2,
    },
    {
      id: "MIN-87654321",
      date: "2024-01-10",
      status: "Shipped",
      total: 149.99,
      items: 1,
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to view your profile
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
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
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">My Account</h1>
                <p className="text-muted-foreground">
                  Manage your account settings and preferences
                </p>
              </div>
              <Button variant="outline" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Personal Information</h2>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="address"
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                          className="pl-10"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={profileData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={profileData.state}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={profileData.zipCode}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <Button onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-6">Order History</h2>
                  
                  {mockOrders.length > 0 ? (
                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <Package className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <p className="font-semibold">{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.date} • {order.items} item{order.items > 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${order.total.toFixed(2)}</p>
                            <p className={`text-sm ${
                              order.status === 'Delivered' ? 'text-green-600' :
                              order.status === 'Shipped' ? 'text-blue-600' :
                              'text-yellow-600'
                            }`}>
                              {order.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start shopping to see your orders here
                      </p>
                      <Button asChild>
                        <Link to="/products">Start Shopping</Link>
                      </Button>
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="wishlist" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">My Wishlist</h2>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="text-sm text-muted-foreground">
                        {wishlistItems.length} items
                      </span>
                    </div>
                  </div>

                  {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlistItems.map((product) => (
                        <div key={product.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-12 w-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
                      <p className="text-muted-foreground mb-4">
                        Save items you love to your wishlist
                      </p>
                      <Button asChild>
                        <Link to="/products">Browse Products</Link>
                      </Button>
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about your orders and promotions
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">SMS Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Get text messages about order updates
                        </p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Marketing Emails</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive promotional offers and new product updates
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>

                  <div className="border-t pt-6 mt-6">
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      This action cannot be undone. All your data will be permanently deleted.
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
