
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Star, Trophy, Bell } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'achievement' | 'reminder';
  time: string;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onClose: () => void;
}

export const NotificationCenter = ({ notifications, onClose }: NotificationCenterProps) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Star className="w-5 h-5 text-green-600" fill="currentColor" />;
      case 'achievement':
        return <Trophy className="w-5 h-5 text-yellow-600" />;
      default:
        return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'achievement':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No new notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                <Badge className={`text-xs ${getNotificationBadge(notification.type)}`}>
                  {notification.type}
                </Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};
