
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Star, Lock } from 'lucide-react';

interface RewardsModalProps {
  child: any;
  onClose: () => void;
}

const rewardTiers = [
  {
    stars: 25,
    title: 'Rising Star Rewards',
    icon: '⭐',
    color: 'from-yellow-400 to-orange-500',
    rewards: ['Extra 30 minutes screen time', 'Choose dinner for the family', 'Stay up 30 minutes later']
  },
  {
    stars: 50,
    title: 'Star Collector Rewards',
    icon: '🌟',
    color: 'from-green-400 to-blue-500',
    rewards: ['Movie night choice', '$5 allowance bonus', 'Skip one chore this week', 'Friend sleepover']
  },
  {
    stars: 75,
    title: 'Star Hero Rewards',
    icon: '🦸‍♀️',
    color: 'from-blue-500 to-purple-500',
    rewards: ['Day trip of choice', '$10 toy budget', 'Pizza party with friends', 'Late bedtime weekend']
  },
  {
    stars: 100,
    title: 'Star Champion Rewards',
    icon: '👑',
    color: 'from-purple-500 to-pink-500',
    rewards: ['Special family outing', '$20 shopping spree', 'Theme park visit', 'Big sleepover party']
  }
];

export const RewardsModal = ({ child, onClose }: RewardsModalProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            {child.name}'s Reward Progress
          </DialogTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
            {child.monthlyStars} stars this month
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {rewardTiers.map((tier, index) => {
            const isUnlocked = child.monthlyStars >= tier.stars;
            const progress = Math.min((child.monthlyStars / tier.stars) * 100, 100);
            
            return (
              <Card key={index} className={`${isUnlocked ? 'ring-2 ring-green-300' : 'opacity-75'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`bg-gradient-to-r ${tier.color} p-2 rounded-full text-white`}>
                        <span className="text-lg">{tier.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{tier.title}</h3>
                        <p className="text-sm text-gray-600">{tier.stars} stars required</p>
                      </div>
                    </div>
                    {isUnlocked ? (
                      <Badge className="bg-green-500 text-white">
                        Unlocked! 🎉
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        <Lock className="w-3 h-3 mr-1" />
                        {tier.stars - child.monthlyStars} more stars
                      </Badge>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${tier.color} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Rewards List */}
                  <div className="space-y-1">
                    {tier.rewards.map((reward, rewardIndex) => (
                      <div key={rewardIndex} className={`text-sm p-2 rounded ${isUnlocked ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}>
                        <span className="mr-2">{isUnlocked ? '✅' : '⭐'}</span>
                        {reward}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
