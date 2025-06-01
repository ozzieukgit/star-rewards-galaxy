
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, Trophy, Target, Gift, LogOut, 
  Calendar, TrendingUp, Award
} from 'lucide-react';

interface ChildDashboardProps {
  user: any;
  childData: any;
  onLogout: () => void;
}

export const ChildDashboard = ({ user, childData, onLogout }: ChildDashboardProps) => {
  const [child] = useState(childData || {
    id: '1',
    name: user.name,
    stars: 0,
    monthlyStars: 42,
    lastActivity: {
      stars: 5,
      reason: 'Cleaned bedroom',
      date: new Date().toISOString()
    }
  });

  const getRewardTier = (stars: number) => {
    if (stars >= 100) return { name: 'Star Champion', color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: '👑' };
    if (stars >= 75) return { name: 'Star Hero', color: 'bg-gradient-to-r from-blue-500 to-purple-500', icon: '🦸‍♀️' };
    if (stars >= 50) return { name: 'Star Collector', color: 'bg-gradient-to-r from-green-500 to-blue-500', icon: '🌟' };
    if (stars >= 25) return { name: 'Rising Star', color: 'bg-gradient-to-r from-yellow-500 to-orange-500', icon: '⭐' };
    return { name: 'Star Beginner', color: 'bg-gradient-to-r from-gray-400 to-gray-500', icon: '✨' };
  };

  const tier = getRewardTier(child.monthlyStars);
  const progress = Math.min((child.monthlyStars / 100) * 100, 100);
  const nextReward = child.monthlyStars >= 50 ? 75 : 50;
  const starsToNext = nextReward - child.monthlyStars;

  const recentActivities = [
    { id: '1', activity: 'Cleaned bedroom', stars: 5, date: '2024-01-15' },
    { id: '2', activity: 'Helped with dishes', stars: 3, date: '2024-01-14' },
    { id: '3', activity: 'Finished homework', stars: 4, date: '2024-01-13' },
    { id: '4', activity: 'Fed the pet', stars: 2, date: '2024-01-12' },
  ];

  const availableRewards = [
    { id: '1', name: 'Extra Screen Time', cost: 10, available: child.monthlyStars >= 10 },
    { id: '2', name: 'Choose Dinner', cost: 25, available: child.monthlyStars >= 25 },
    { id: '3', name: 'Movie Night Pick', cost: 50, available: child.monthlyStars >= 50 },
    { id: '4', name: 'Special Outing', cost: 75, available: child.monthlyStars >= 75 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-full">
                <Star className="w-6 h-6 text-yellow-300" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">My Star Dashboard</h1>
                <p className="text-white/80">Hi {child.name}! 🌟</p>
              </div>
            </div>
            
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Star Count & Progress */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm overflow-hidden">
          <div className={`${tier.color} p-6 text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{tier.icon}</span>
                  <h2 className="text-2xl font-bold">{tier.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-8 h-8" fill="currentColor" />
                  <span className="text-4xl font-bold">{child.monthlyStars}</span>
                  <span className="text-xl opacity-90">stars this month</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/90">Next Level</p>
                <p className="text-2xl font-bold">{starsToNext > 0 ? starsToNext : '✓'}</p>
                <p className="text-sm opacity-90">
                  {starsToNext > 0 ? 'stars to go' : 'Level complete!'}
                </p>
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress to Star Champion</span>
                <span>{child.monthlyStars}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-800">{activity.activity}</p>
                    <p className="text-xs text-green-600">{new Date(activity.date).toLocaleDateString()}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    +{activity.stars} ⭐
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Available Rewards */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-600" />
                My Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableRewards.map((reward) => (
                <div 
                  key={reward.id} 
                  className={`p-3 rounded-lg border-2 ${
                    reward.available 
                      ? 'bg-purple-50 border-purple-200' 
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${reward.available ? 'text-purple-800' : 'text-gray-600'}`}>
                        {reward.name}
                      </p>
                      <p className="text-xs text-gray-500">{reward.cost} stars</p>
                    </div>
                    {reward.available ? (
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Claim
                      </Button>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        {reward.cost - child.monthlyStars} more
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Goals */}
        <Card className="mt-6 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              My Goals This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="font-semibold text-blue-800">Reach 75 Stars</p>
                <p className="text-sm text-blue-600">{Math.max(0, 75 - child.monthlyStars)} to go</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-green-800">Daily Chores</p>
                <p className="text-sm text-green-600">Keep it up!</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Calendar className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="font-semibold text-yellow-800">Weekly Goal</p>
                <p className="text-sm text-yellow-600">15 stars/week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
