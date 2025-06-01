
import { useAuth } from '@/hooks/useAuth';
import { useFamily } from '@/hooks/useFamily';
import { AuthModal } from '@/components/Auth/AuthModal';
import { SetupFamily } from '@/components/SetupFamily';
import { ParentDashboard } from '@/components/ParentDashboard';
import { ChildDashboard } from '@/components/ChildDashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const Index = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { family, loading: familyLoading } = useFamily();

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 flex items-center justify-center">
        <Card className="bg-white/95 backdrop-blur-sm p-8">
          <CardContent className="flex items-center gap-4">
            <Star className="w-8 h-8 text-yellow-500 animate-spin" />
            <span className="text-lg">Loading...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If not authenticated, show auth modal
  if (!user) {
    return <AuthModal onAuthSuccess={() => window.location.reload()} />;
  }

  // If user is a child, show child dashboard
  if (user.userType === 'child') {
    return (
      <ChildDashboard
        user={user}
        childData={null}
        onLogout={signOut}
      />
    );
  }

  // If parent but no family setup, show family setup
  if (!user.familyId || !family) {
    if (familyLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 flex items-center justify-center">
          <Card className="bg-white/95 backdrop-blur-sm p-8">
            <CardContent className="flex items-center gap-4">
              <Star className="w-8 h-8 text-yellow-500 animate-spin" />
              <span className="text-lg">Loading family...</span>
            </CardContent>
          </Card>
        </div>
      );
    }
    
    return <SetupFamily />;
  }

  // Show parent dashboard
  return (
    <ParentDashboard
      user={user}
      family={family}
      onLogout={signOut}
    />
  );
};

export default Index;
