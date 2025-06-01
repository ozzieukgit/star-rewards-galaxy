
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, Trophy, TrendingUp } from 'lucide-react';

interface ChildCardProps {
  child: any;
  onAddStars: () => void;
  onViewRewards: () => void;
}

export const ChildCard = ({ child, onAddStars, onViewRewards }: ChildCardProps) => {
  const getRewardTier = (stars: number) => {
    if (stars >= 100) return { name: 'Star Champion', color: 'bg-gradient-to-r from-purple-500 to-pink-500', icon: '👑' };
    if (stars >= 75) return { name: 'Star Hero', color: 'bg-gradient-to-r from-blue-500 to-purple-500', icon: '🦸‍♀️' };
    if (stars >= 50) return { name: 'Star Collector', color: 'bg-gradient-to-r from-green-500 to-blue-500', icon: '🌟' };
    if (stars >= 25) return { name: 'Rising Star', color: 'bg-gradient-to-r from-yellow-500 to-orange-500', icon: '⭐' };
    return { name: 'Star Beginner', color: 'bg-gradient-to-r from-gray-400 to-gray-500', icon: '✨' };
  };

  const tier = getRewardTier(child.monthlyStars);
  const progress = Math.min((child.monthlyStars / 100) * 100, 100);

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800">{child.name}</CardTitle>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
            <span className="font-bold text-yellow-600">{child.monthlyStars}</span>
          </div>
        </div>
        <Badge className={`${tier.color} text-white border-0 w-fit`}>
          <span className="mr-1">{tier.icon}</span>
          {tier.name}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress to Star Champion</span>
            <span>{child.monthlyStars}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Last Activity */}
        {child.lastActivity && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-700">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                +{child.lastActivity.stars} stars for {child.lastActivity.reason}
              </span>
            </div>
            <div className="text-xs text-green-600 mt-1">
              {new Date(child.lastActivity.date).toLocaleDateString()}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={onAddStars}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Stars
          </Button>
          <Button 
            onClick={onViewRewards}
            variant="outline"
            className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <Trophy className="w-4 h-4 mr-1" />
            Rewards
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
