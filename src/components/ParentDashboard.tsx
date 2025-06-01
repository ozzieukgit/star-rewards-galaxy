
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, Trophy, Users, Plus, Settings, Bell, 
  TrendingUp, Calendar, BarChart3 
} from 'lucide-react';
import { ChildCard } from '@/components/ChildCard';
import { AddStarsModal } from '@/components/AddStarsModal';
import { RewardsModal } from '@/components/RewardsModal';
import { NotificationCenter } from '@/components/NotificationCenter';

interface ParentDashboardProps {
  user: any;
  family: any;
  onLogout: () => void;
}

export const ParentDashboard = ({ user, family, onLogout }: ParentDashboardProps) => {
  const [children, setChildren] = useState(family?.children || []);
  const [selectedChild, setSelectedChild] = useState(null);
  const [showAddStars, setShowAddStars] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: '1', message: 'Emma completed all her chores!', type: 'success' as const, time: '2 hours ago' },
    { id: '2', message: 'Jake reached 50 stars milestone', type: 'achievement' as const, time: '1 day ago' },
  ]);

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
  const activeChildren = children.length;
  const topPerformer = children.reduce((top, child) => 
    child.monthlyStars > (top?.monthlyStars || 0) ? child : top, null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-full">
                <Star className="w-6 h-6 text-yellow-300" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Parent Dashboard</h1>
                <p className="text-white/80">Welcome back, {user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(true)}
                className="text-white hover:bg-white/20 relative"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 p-0 flex items-center justify-center">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/20"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Star className="w-6 h-6 text-yellow-600" fill="currentColor" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{totalFamilyStars}</p>
                  <p className="text-sm text-gray-600">Total Family Stars</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{activeChildren}</p>
                  <p className="text-sm text-gray-600">Active Children</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {Math.round(totalFamilyStars / activeChildren) || 0}
                  </p>
                  <p className="text-sm text-gray-600">Avg Stars/Child</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">{topPerformer?.name || 'None'}</p>
                  <p className="text-sm text-gray-600">Top Performer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              <Button className="bg-green-500 hover:bg-green-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Child
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Set Rewards
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Family Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Children Grid */}
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

        {showNotifications && (
          <NotificationCenter
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
          />
        )}
      </div>
    </div>
  );
};
