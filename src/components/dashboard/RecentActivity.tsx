import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'purple';
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses[activity.color]}`}>
              <activity.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">Il y a {activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Voir toutes les activités →
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;