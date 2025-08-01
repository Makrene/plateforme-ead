import React from 'react';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'project' | 'payment';
  priority: 'low' | 'medium' | 'high';
}

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({ deadlines }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Demain";
    if (diffDays < 7) return `Dans ${diffDays} jours`;
    
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'text-blue-600 bg-blue-50';
      case 'project':
        return 'text-green-600 bg-green-50';
      case 'payment':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Échéances</h3>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-3">
        {deadlines.map((deadline) => (
          <div 
            key={deadline.id} 
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                {deadline.priority === 'high' && (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(deadline.type)}`}>
                  {deadline.type === 'exam' ? 'Examen' : 
                   deadline.type === 'project' ? 'Projet' : 'Paiement'}
                </span>
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {formatDate(deadline.date)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Voir toutes les échéances →
        </button>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;