import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nouveaux résultats disponibles',
    message: 'Vos notes du semestre 1 sont maintenant disponibles.',
    type: 'success',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    title: 'Échéance de paiement',
    message: 'Votre prochaine échéance est due dans 5 jours.',
    type: 'warning',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: false,
    priority: 'high'
  },
  {
    id: '3',
    title: 'Nouveau document pédagogique',
    message: 'Cours de Programmation Web - Chapitre 5 disponible.',
    type: 'info',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    priority: 'medium'
  }
];

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};