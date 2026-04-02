import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { useAuth } from '@/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const Auth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Simple admin check for demo
    if (email === 'admin@footwears.com' && password === 'admin123') {
      login(email, 'Admin User', 'admin');
      toast.success('Welcome back, Admin!');
    } else {
      login(email, email.split('@')[0]);
      toast.success('Successfully logged in!');
    }
    
    setIsLoading(false);
    navigate(from, { replace: true });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const formData = new FormData(e.target as HTMLFormElement);
    login(formData.get('email') as string, formData.get('name') as string);
    setIsLoading(false);
    toast.success('Account created successfully!');
    navigate(from, { replace: true });
  };

  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tighter uppercase">Join Footwears</h1>
          <p className="text-muted-foreground">Unlock exclusive drops and faster checkout.</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-14 p-1 rounded-2xl bg-muted/50">
            <TabsTrigger value="login" className="rounded-xl font-bold uppercase tracking-widest text-xs">Login</TabsTrigger>
            <TabsTrigger value="register" className="rounded-xl font-bold uppercase tracking-widest text-xs">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" name="email" type="email" placeholder="name@example.com" required className="pl-10 h-12 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot Password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" name="password" type="password" required className="pl-10 h-12 rounded-xl" />
                </div>
              </div>
              <Button type="submit" className="w-full h-14 text-lg font-black uppercase tracking-widest mt-4" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="mt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="name" name="name" placeholder="John Doe" required className="pl-10 h-12 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="reg-email" name="email" type="email" placeholder="name@example.com" required className="pl-10 h-12 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="reg-password" name="password" type="password" required className="pl-10 h-12 rounded-xl" />
                </div>
              </div>
              <Button type="submit" className="w-full h-14 text-lg font-black uppercase tracking-widest mt-4" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><Separator /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground font-bold tracking-widest">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-12 rounded-xl font-bold uppercase tracking-widest text-[10px]">
            <Chrome className="mr-2 h-4 w-4" /> Google
          </Button>
          <Button variant="outline" className="h-12 rounded-xl font-bold uppercase tracking-widest text-[10px]">
            <Github className="mr-2 h-4 w-4" /> GitHub
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground px-8 leading-relaxed">
          By clicking continue, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </motion.div>
    </div>
  );
};
