
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Users, Plus, Trash2 } from 'lucide-react';
import { useFamily } from '@/hooks/useFamily';
import { useToast } from '@/hooks/use-toast';

interface Child {
  id: string;
  name: string;
}

export const SetupFamily = () => {
  const [familyName, setFamilyName] = useState('');
  const [children, setChildren] = useState<Child[]>([]);
  const [newChildName, setNewChildName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { createFamily } = useFamily();
  const { toast } = useToast();

  const addChild = () => {
    if (newChildName.trim()) {
      const newChild: Child = {
        id: Date.now().toString(),
        name: newChildName.trim()
      };
      setChildren([...children, newChild]);
      setNewChildName('');
    }
  };

  const removeChild = (id: string) => {
    setChildren(children.filter(child => child.id !== id));
  };

  const handleCreateFamily = async () => {
    if (!familyName.trim() || children.length === 0) return;

    setIsCreating(true);
    try {
      await createFamily(familyName, children);
      toast({
        title: "Family created!",
        description: "Your star rewards system is ready to go!",
      });
    } catch (error) {
      console.error('Error creating family:', error);
      toast({
        title: "Error",
        description: "Failed to create family. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-indigo-600 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full">
              <Star className="w-12 h-12 text-white" fill="currentColor" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create Your Family Star System
          </CardTitle>
          <p className="text-gray-600 mt-2">Set up your family's reward system and start earning stars!</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Family Name</label>
            <Input
              type="text"
              placeholder="The Smith Family"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <label className="text-sm font-medium text-gray-700">Add Children</label>
            </div>
            
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Child's name"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addChild()}
                className="flex-1"
              />
              <Button 
                onClick={addChild} 
                className="bg-green-500 hover:bg-green-600"
                disabled={!newChildName.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {children.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Children added:</p>
                {children.map((child) => (
                  <div key={child.id} className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                    <span className="font-medium text-purple-700">{child.name}</span>
                    <Button
                      onClick={() => removeChild(child.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={handleCreateFamily}
            disabled={!familyName.trim() || children.length === 0 || isCreating}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6"
          >
            {isCreating ? 'Creating...' : 'Start Our Star Journey! ⭐'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
