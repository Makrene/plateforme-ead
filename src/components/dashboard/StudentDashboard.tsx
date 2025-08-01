import React from 'react';
import {
  TrendingUp,
  Calendar,
  FileText,
  CreditCard,
  Award,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import UpcomingDeadlines from './UpcomingDeadlines';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { 
      title: 'Moyenne Générale', 
      value: '15.2/20', 
      icon: TrendingUp, 
      color: 'blue',
      trend: '+0.8 pts ce semestre'
    },
    { 
      title: 'Classement', 
      value: '3/45', 
      icon: Award, 
      color: 'green',
      trend: 'Top 10%'
    },
    { 
      title: 'Documents', 
      value: '24', 
      icon: FileText, 
      color: 'purple',
      trend: '3 nouveaux cette semaine'
    },
    { 
      title: 'Solde', 
      value: '-125 000 FCFA', 
      icon: CreditCard, 
      color: 'orange',
      trend: 'Échéance dans 5 jours'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'grade',
      title: 'Note ajoutée - Programmation Web',
      description: '16/20 - Projet final React',
      timestamp: '2 heures',
      icon: TrendingUp,
      color: 'green'
    },
    {
      id: '2',
      type: 'document',
      title: 'Nouveau document',
      description: 'Cours de Base de Données - Chapitre 8',
      timestamp: '1 jour',
      icon: FileText,
      color: 'blue'
    },
    {
      id: '3',
      type: 'financial',
      title: 'Rappel de paiement',
      description: 'Frais de scolarité S2 - 125 000 FCFA',
      timestamp: '2 jours',
      icon: AlertCircle,
      color: 'orange'
    }
  ];

  const upcomingDeadlines = [
    {
      id: '1',
      title: 'Examen Final - Algorithmes',
      date: '2024-12-15',
      type: 'exam',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Projet - Application Mobile',
      date: '2024-12-10',
      type: 'project',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Paiement Frais S2',
      date: '2024-12-08',
      type: 'payment',
      priority: 'high'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Bonjour {user?.name} ! 👋
            </h1>
            <p className="text-blue-100 mb-1">
              {user?.filiere} - Niveau {user?.niveau}
            </p>
            <p className="text-blue-100">
              Matricule: {user?.studentId}
            </p>
          </div>
          {user?.avatar && (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full border-4 border-white/20"
            />
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity activities={recentActivities} />
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <UpcomingDeadlines deadlines={upcomingDeadlines} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-8 h-8 text-blue-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Planning</div>
              <div className="text-sm text-gray-500">Emploi du temps</div>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-8 h-8 text-green-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Relevé</div>
              <div className="text-sm text-gray-500">Télécharger PDF</div>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CreditCard className="w-8 h-8 text-orange-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Paiement</div>
              <div className="text-sm text-gray-500">Effectuer</div>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CheckCircle className="w-8 h-8 text-purple-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Support</div>
              <div className="text-sm text-gray-500">Contacter</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;