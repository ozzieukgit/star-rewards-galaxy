
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChildCard } from '@/components/ChildCard';
import { AddStarsModal } from '@/components/AddStarsModal';
import { RewardsModal } from '@/components/RewardsModal';
import { Star, Trophy, Calendar, Settings } from 'lucide-react';

interface FamilyDashboardProps {
  family: any;
}

export const FamilyDashboard = ({ family }: FamilyDashboardProps) => {
  const [children, setChildren] = useState(family.children);
  const [selectedChild, setSelectedChild] = useState(null);
  const [showAddStars, setShowAddStars] = useState(false);
  const [showRewards, setShowRewards] = useState(false);

  const addStarsToChild = (childId: string, stars: number, reason: string) => {
    setChildren(children.map(child => 
      child.id === childId 
        ? { 
            ...child, 
            stars: child.stars + stars,
            monthlyStars: child.monthlyStars + stars,
            lastActivity: { stars, reason, date: new Date().toISOString() }
          }
        : child
    ));
  };

  const totalFamilyStars = children.reduce((total, child) => total + child.monthlyStars, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{family.name}</h1>
          <div className="flex items-center justify-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-300" fill="currentColor" />
              <span className="text-lg font-semibold">{totalFamilyStars} Family Stars This Month</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Resets: {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Family Stats Card */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-600" />
              Family Achievement Board
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
                <div className="text-3xl font-bold text-yellow-700">{totalFamilyStars}</div>
                <div className="text-yellow-600">Stars This Month</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                <div className="text-3xl font-bold text-green-700">{children.length}</div>
                <div className="text-green-600">Star Earners</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                <div className="text-3xl font-bold text-purple-700">
                  {Math.max(...children.map(c => c.monthlyStars))}
                </div>
                <div className="text-purple-600">Top Monthly Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Children Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              onAddStars={() => {
                setSelectedChild(child);
                setShowAddStars(true);
              }}
              onViewRewards={() => {
                setSelectedChild(child);
                setShowRewards(true);
              }}
            />
          ))}
        </div>

        {/* Modals */}
        {showAddStars && selectedChild && (
          <AddStarsModal
            child={selectedChild}
            onClose={() => setShowAddStars(false)}
            onAddStars={addStarsToChild}
          />
        )}

        {showRewards && selectedChild && (
          <RewardsModal
            child={selectedChild}
            onClose={() => setShowRewards(false)}
          />
        )}
      </div>
    </div>
  );
};
