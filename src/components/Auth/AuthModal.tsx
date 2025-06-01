
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Mail, Lock, User } from 'lucide-react';

interface AuthModalProps {
  onAuthSuccess: (user: any) => void;
}

export const AuthModal = ({ onAuthSuccess }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<'parent' | 'child'>('parent');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - will be replaced with Supabase
    const user = {
      id: Date.now().toString(),
      email,
      name: isLogin ? 'Demo User' : name,
      userType,
      familyId: userType === 'child' ? 'demo-family' : null
    };
    onAuthSuccess(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full">
              <Star className="w-8 h-8 text-white" fill="currentColor" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {isLogin ? 'Welcome Back!' : 'Join Star Rewards'}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">I am a:</label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={userType === 'parent' ? 'default' : 'outline'}
                    onClick={() => setUserType('parent')}
                    className="flex-1"
                  >
                    Parent
                  </Button>
                  <Button
                    type="button"
                    variant={userType === 'child' ? 'default' : 'outline'}
                    onClick={() => setUserType('child')}
                    className="flex-1"
                  >
                    Child
                  </Button>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
