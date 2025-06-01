
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle } from 'lucide-react';

interface AddStarsModalProps {
  child: any;
  onClose: () => void;
  onAddStars: (childId: string, stars: number, reason: string) => void;
}

const predefinedReasons = [
  { reason: 'Cleaned room', stars: 5 },
  { reason: 'Did homework', stars: 3 },
  { reason: 'Helped with dishes', stars: 4 },
  { reason: 'Good behavior', stars: 2 },
  { reason: 'Helped sibling', stars: 6 },
  { reason: 'Finished chores', stars: 5 },
  { reason: 'Good grades', stars: 8 },
  { reason: 'Extra kind', stars: 3 },
];

export const AddStarsModal = ({ child, onClose, onAddStars }: AddStarsModalProps) => {
  const [customStars, setCustomStars] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = (stars: number, reason: string) => {
    setIsAdding(true);
    onAddStars(child.id, stars, reason);
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 1000);
  };

  const handleCustomAdd = () => {
    const stars = parseInt(customStars);
    if (stars > 0 && customReason.trim()) {
      setIsAdding(true);
      onAddStars(child.id, stars, customReason.trim());
      setTimeout(() => {
        setIsAdding(false);
        onClose();
      }, 1000);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" fill="currentColor" />
            Add Stars for {child.name}
          </DialogTitle>
        </DialogHeader>

        {isAdding ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-green-600 mb-2">Stars Added! ⭐</h3>
            <p className="text-gray-600">Great job, {child.name}!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quick Add Options */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700">Quick Add</h3>
              <div className="grid grid-cols-2 gap-2">
                {predefinedReasons.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleQuickAdd(item.stars, item.reason)}
                    className="h-auto p-3 flex flex-col items-center gap-1 hover:bg-yellow-50 hover:border-yellow-300"
                  >
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                      +{item.stars} ⭐
                    </Badge>
                    <span className="text-xs text-center">{item.reason}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Add */}
            <div className="space-y-3 border-t pt-4">
              <h3 className="font-semibold text-gray-700">Custom Reward</h3>
              <div className="space-y-3">
                <Input
                  type="number"
                  placeholder="Number of stars"
                  value={customStars}
                  onChange={(e) => setCustomStars(e.target.value)}
                  min="1"
                  max="20"
                />
                <Input
                  type="text"
                  placeholder="What did they do?"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                />
                <Button
                  onClick={handleCustomAdd}
                  disabled={!customStars || !customReason.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Add Custom Stars
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
