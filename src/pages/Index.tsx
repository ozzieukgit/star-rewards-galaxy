
import { useState } from 'react';
import { FamilyDashboard } from '@/components/FamilyDashboard';
import { SetupFamily } from '@/components/SetupFamily';
import { AuthModal } from '@/components/Auth/AuthModal';
import { ParentDashboard } from '@/components/ParentDashboard';
import { ChildDashboard } from '@/components/ChildDashboard';

const Index = () => {
  const [user, setUser] = useState(null);
  const [family, setFamily] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setFamily(null);
  };

  // If not authenticated, show auth modal
  if (!user) {
    return <AuthModal onAuthSuccess={setUser} />;
  }

  // If user is a child, show child dashboard
  if (user.userType === 'child') {
    return (
      <ChildDashboard
        user={user}
        childData={null}
        onLogout={handleLogout}
      />
    );
  }

  // If parent but no family setup, show family setup
  if (!family) {
    return <SetupFamily onFamilyCreated={setFamily} />;
  }

  // Show parent dashboard
  return (
    <ParentDashboard
      user={user}
      family={family}
      onLogout={handleLogout}
    />
  );
};

export default Index;
