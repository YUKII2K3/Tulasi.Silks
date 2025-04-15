
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2, Send } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, loginWithOTP, requestOTP } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRequestingOTP, setIsRequestingOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [activeTab, setActiveTab] = useState("email"); // email, phone, register
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // OTP Login State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  
  // Register Form State
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await login(loginEmail, loginPassword);
      if (success) {
        setTimeout(() => {
          // Navigate based on login success
          if (loginEmail === 'tulasimp@gmail.com') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 500);
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    
    setIsRequestingOTP(true);
    
    try {
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      const success = await requestOTP(formattedPhone);
      
      if (success) {
        setOtpSent(true);
        setPhoneNumber(formattedPhone);
      }
    } catch (error) {
      toast({
        title: "Error sending OTP",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsRequestingOTP(false);
    }
  };
  
  const handleOTPLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await loginWithOTP(phoneNumber, otp);
      
      if (success) {
        // Special case for admin phone number
        if (phoneNumber === '+919848313261') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please check your password and try again",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simplified registration process for demo
    toast({
      title: "Registration successful",
      description: "Your account has been created",
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1000);
    
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow">
          <div className="text-center">
            <h1 className="font-playfair font-bold text-3xl text-gray-900">Welcome to SareeGlow</h1>
            <p className="mt-2 text-gray-600">Sign in to your account or create a new one</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            {/* Email Login Content */}
            <TabsContent value="email">
              <form onSubmit={handleEmailLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="youremail@example.com" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-saree-maroon hover:text-saree-gold">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-saree-maroon hover:bg-saree-maroon/90" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : "Sign in"}
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>
                <Button type="button" variant="outline" className="w-full" onClick={() => console.log("Google login")}>
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="h-5 w-5 mr-2" />
                  Google
                </Button>
              </form>
            </TabsContent>
            
            {/* Phone OTP Login Content */}
            <TabsContent value="phone">
              {!otpSent ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+919848313261" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                      <Button 
                        type="button" 
                        onClick={handleSendOTP} 
                        disabled={isRequestingOTP}
                        className="bg-saree-maroon hover:bg-saree-maroon/90"
                      >
                        {isRequestingOTP ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter your phone number with country code (e.g., +919848313261)
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleOTPLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP sent to {phoneNumber}</Label>
                    <div className="flex justify-center">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    <div className="flex justify-between mt-2">
                      <Button 
                        type="button" 
                        variant="link" 
                        onClick={() => setOtpSent(false)} 
                        className="text-saree-maroon hover:text-saree-gold p-0"
                      >
                        Change number
                      </Button>
                      <Button 
                        type="button" 
                        variant="link" 
                        onClick={handleSendOTP} 
                        disabled={isRequestingOTP}
                        className="text-saree-maroon hover:text-saree-gold p-0"
                      >
                        {isRequestingOTP ? "Sending..." : "Resend OTP"}
                      </Button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-saree-maroon hover:bg-saree-maroon/90" 
                    disabled={isSubmitting || otp.length !== 6}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : "Verify & Login"}
                  </Button>
                </form>
              )}
            </TabsContent>
            
            {/* Register Content */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="youremail@example.com" 
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input 
                    id="register-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-saree-maroon hover:bg-saree-maroon/90" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
