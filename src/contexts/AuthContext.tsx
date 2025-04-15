
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define user roles
export type UserRole = 'admin' | 'customer';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  lastLogin?: Date;
}

// Auth state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithOTP: (phone: string, otp: string) => Promise<boolean>;
  requestOTP: (phone: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

// Default auth state
const defaultAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin user for demo purposes
const ADMIN_USER = {
  id: '1',
  name: 'Admin',
  email: 'tulasimp@gmail.com',
  role: 'admin' as UserRole,
  lastLogin: new Date()
};

// Mock OTPs for demo
const MOCK_OTPS: Record<string, string> = {
  '+919848313261': '123456'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
  
  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('saree-shop-user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setAuthState({
          user: parsedUser,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem('saree-shop-user');
        setAuthState({...defaultAuthState, isLoading: false});
      }
    } else {
      setAuthState({...defaultAuthState, isLoading: false});
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo, only check admin credentials
    if (email === ADMIN_USER.email && password === 'Tul@si.mp') {
      const user = {...ADMIN_USER, lastLogin: new Date()};
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      localStorage.setItem('saree-shop-user', JSON.stringify(user));
      toast.success('Login successful', {
        description: "Welcome back, Admin!",
      });
      return true;
    } else {
      // For demo, any non-admin email will create a customer account
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role: 'customer' as UserRole,
        lastLogin: new Date()
      };
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      localStorage.setItem('saree-shop-user', JSON.stringify(user));
      toast.success('Login successful', {
        description: "Welcome to Tulasi Silks!",
      });
      return true;
    }
  };
  
  // Request OTP function
  const requestOTP = async (phone: string): Promise<boolean> => {
    // In a real app, this would call an API to send an OTP
    // For demo, we'll simulate success for specific numbers
    if (phone === '+919848313261') {
      toast.success('OTP sent successfully!', {
        description: `An OTP has been sent to ${phone}`,
      });
      return true;
    }
    
    // For demo, we'll accept any phone number as valid
    toast.success('OTP sent successfully!', {
      description: `An OTP has been sent to ${phone}`,
    });
    return true;
  };
  
  // Login with OTP function
  const loginWithOTP = async (phone: string, otp: string): Promise<boolean> => {
    // In a real app, this would validate the OTP with an API
    // For demo, we'll check against our mock OTPs or accept any code
    const isValidOTP = MOCK_OTPS[phone] === otp || otp === '123456';
    
    if (isValidOTP) {
      // Check if this is the admin phone
      const isAdmin = phone === '+919848313261';
      
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        name: isAdmin ? 'Admin' : `User-${phone.slice(-4)}`,
        phone,
        role: isAdmin ? 'admin' as UserRole : 'customer' as UserRole,
        email: isAdmin ? ADMIN_USER.email : '',
        lastLogin: new Date()
      };
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      
      localStorage.setItem('saree-shop-user', JSON.stringify(user));
      
      toast.success('Login successful', {
        description: isAdmin ? "Welcome back, Admin!" : "Welcome to Tulasi Silks!",
      });
      
      return true;
    } else {
      toast.error('Invalid OTP', {
        description: "Please check your OTP and try again",
      });
      return false;
    }
  };
  
  // Logout function
  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    localStorage.removeItem('saree-shop-user');
    toast.info('You have been logged out');
  };
  
  // Check if user is admin
  const isAdmin = (): boolean => {
    return authState.user?.role === 'admin';
  };
  
  return (
    <AuthContext.Provider value={{
      user: authState.user,
      isAuthenticated: authState.isAuthenticated,
      isLoading: authState.isLoading,
      login,
      loginWithOTP,
      requestOTP,
      logout,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
