import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would be an API call
      if (email === "demo@minizon.com" && password === "password") {
        const mockUser: User = {
          id: "1",
          email: "demo@minizon.com",
          name: "Demo User",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - in real app, this would be an API call
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Account Created!",
        description: "Welcome to Minizon! Your account has been created successfully.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  // Check for existing user on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
