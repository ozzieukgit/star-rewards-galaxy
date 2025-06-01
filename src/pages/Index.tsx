
import { useState } from 'react';
import { FamilyDashboard } from '@/components/FamilyDashboard';
import { SetupFamily } from '@/components/SetupFamily';

const Index = () => {
  const [family, setFamily] = useState(null);

  if (!family) {
    return <SetupFamily onFamilyCreated={setFamily} />;
  }

  return <FamilyDashboard family={family} />;
};

export default Index;
