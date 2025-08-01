import React from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Calendar, GraduationCap, CreditCard, MessageSquare, Trash2, BookMarked as MarkAsRead } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

const Notifications: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationBg = (type: string, read: boolean) => {
    const opacity = read ? 'bg-opacity-30' : 'bg-opacity-50';
    switch (type) {
      case 'success':
        return `bg-green-50 ${opacity}`;
      case 'warning':
        return `bg-orange-50 ${opacity}`;
      case 'error':
        return `bg-red-50 ${opacity}`;
      default:
        return `bg-blue-50 ${opacity}`;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Il y a quelques minutes';
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    
    return timestamp.toLocaleDateString('fr-FR');
  };

  const getCategoryIcon = (title: string) => {
    if (title.toLowerCase().includes('résultat') || title.toLowerCase().includes('note')) {
      return <GraduationCap className="w-4 h-4" />;
    }
    if (title.toLowerCase().includes('paiement') || title.toLowerCase().includes('échéance')) {
      return <CreditCard className="w-4 h-4" />;
    }
    if (title.toLowerCase().includes('forum') || title.toLowerCase().includes('message')) {
      return <MessageSquare className="w-4 h-4" />;
    }
    return <Calendar className="w-4 h-4" />;
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            {unreadNotifications.length} notification{unreadNotifications.length > 1 ? 's' : ''} non lue{unreadNotifications.length > 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          {unreadNotifications.length > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <MarkAsRead className="w-4 h-4 mr-2" />
              Tout marquer comme lu
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-6">
        {/* Unread Notifications */}
        {unreadNotifications.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Non lues ({unreadNotifications.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {unreadNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 ${getNotificationBg(notification.type, notification.read)} hover:bg-opacity-70 transition-colors cursor-pointer`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {getCategoryIcon(notification.title)}
                            <h3 className="text-sm font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(notification.priority)}`}>
                              {notification.priority === 'high' ? 'Urgent' : 
                               notification.priority === 'medium' ? 'Important' : 'Normal'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
                            title="Marquer comme lu"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Read Notifications */}
        {readNotifications.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Lues ({readNotifications.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {readNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-6 hover:bg-gray-50 transition-colors opacity-75"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 opacity-60">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {getCategoryIcon(notification.title)}
                            <h3 className="text-sm font-medium text-gray-700">
                              {notification.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune notification
            </h3>
            <p className="text-gray-500">
              Vous êtes à jour ! Les nouvelles notifications apparaîtront ici.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;