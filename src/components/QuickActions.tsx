import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Utensils, 
  Car, 
  Calendar, 
  CreditCard, 
  MapPin,
  Users,
  Clock
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  query: string;
}

interface QuickActionsProps {
  onActionClick?: (query: string) => void;
}

const quickActions: QuickAction[] = [
  {
    id: 'dining',
    title: 'Dining Hours',
    description: 'Check cafeteria and dining hall schedules',
    icon: <Utensils className="w-5 h-5" />,
    query: 'What are the dining hall hours today?',
  },
  {
    id: 'library',
    title: 'Library Info',
    description: 'Hours, study rooms, and services',
    icon: <BookOpen className="w-5 h-5" />,
    query: 'What are the library hours and how do I reserve a study room?',
  },
  {
    id: 'parking',
    title: 'Parking & Transport',
    description: 'Parking permits and shuttle schedules',
    icon: <Car className="w-5 h-5" />,
    query: 'How do I get a parking permit and what are the shuttle schedules?',
  },
  {
    id: 'registration',
    title: 'Course Registration',
    description: 'Register for classes and check prerequisites',
    icon: <Calendar className="w-5 h-5" />,
    query: 'How do I register for courses and when does registration open?',
  },
  {
    id: 'financial',
    title: 'Financial Aid',
    description: 'Tuition, financial aid, and payment plans',
    icon: <CreditCard className="w-5 h-5" />,
    query: 'How do I check my financial aid status and payment options?',
  },
  {
    id: 'campus',
    title: 'Campus Map',
    description: 'Find buildings and campus locations',
    icon: <MapPin className="w-5 h-5" />,
    query: 'How do I find buildings on campus and get directions?',
  },
  {
    id: 'events',
    title: 'Campus Events',
    description: 'Student activities and campus events',
    icon: <Users className="w-5 h-5" />,
    query: 'What events and activities are happening on campus this week?',
  },
  {
    id: 'hours',
    title: 'Office Hours',
    description: 'Administrative office schedules',
    icon: <Clock className="w-5 h-5" />,
    query: 'What are the office hours for student services and administration?',
  },
];

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const handleActionClick = (action: QuickAction) => {
    if (onActionClick) {
      onActionClick(action.query);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary">
          Quick Actions
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Get instant answers to common campus questions
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              onClick={() => handleActionClick(action)}
              className="h-auto p-4 justify-start text-left hover:shadow-soft transition-smooth hover:border-primary/30"
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="flex-shrink-0 text-primary">
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {action.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};