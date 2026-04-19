import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from './AuthProvider';
import { LogIn, UserPlus, Shield, Package, X } from 'lucide-react';

export const AuthModal: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (isLogin) {
        login(data.token, data.user);
      } else {
        setIsLogin(true);
        setError('Registration successful. Please login.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#f9faf8]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-3xl border-none shadow-2xl bg-white overflow-hidden relative">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#f4f7f4] text-muted-foreground transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <div className="h-2 bg-primary w-full" />
        <CardHeader className="pt-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-[#f4f7f4] flex items-center justify-center text-primary mb-4 border border-[#e2e8e1]">
            <Package className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {isLogin ? 'Welcome to SpecInsite SDM' : 'Create Account'}
          </CardTitle>
          <CardDescription className="text-xs uppercase font-bold tracking-widest text-muted-foreground mt-2">
            Secure Data Management Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-[#8a9a8a]">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@specinsite.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl border-[#e2e8e1] focus-visible:ring-primary h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-[#8a9a8a]">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border-[#e2e8e1] focus-visible:ring-primary h-11"
              />
            </div>
            {error && (
              <p className="text-xs font-bold text-destructive italic">{error}</p>
            )}
            <Button 
              type="submit" 
              className="w-full h-11 rounded-xl bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest text-xs"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : isLogin ? 'Sign In' : 'Register'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pb-8">
          <Button 
            variant="link" 
            className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </Button>
          <div className="pt-4 border-t border-[#f0f2ef] w-full text-center">
            <p className="text-[10px] text-muted-foreground font-medium italic">
              "Administrator, Editor, and Viewer roles automatically assigned"
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
