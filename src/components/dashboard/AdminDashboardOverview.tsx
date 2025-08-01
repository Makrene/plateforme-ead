import React from 'react';
import {
  Users,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  BookOpen,
  CreditCard,
  Activity,
  PieChart
} from 'lucide-react';
import StatCard from './StatCard';

const AdminDashboardOverview: React.FC = () => {
  const stats = [
    { 
      title: 'Étudiants Actifs', 
      value: '1,247', 
      icon: Users, 
      color: 'blue' as const,
      trend: '+12 cette semaine'
    },
    { 
      title: 'Moyenne Générale', 
      value: '13.8/20', 
      icon: TrendingUp, 
      color: 'green' as const,
      trend: '+0.3 pts ce semestre'
    },
    { 
      title: 'Cours Actifs', 
      value: '48', 
      icon: BookOpen, 
      color: 'purple' as const,
      trend: '3 nouveaux ce mois'
    },
    { 
      title: 'Recettes', 
      value: '156M FCFA', 
      icon: CreditCard, 
      color: 'orange' as const,
      trend: '+8% vs mois dernier'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Tableau de Bord Administrateur
        </h1>
        <p className="text-indigo-100">
          Vue d'ensemble de la plateforme EAD
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Statistiques Rapides
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Taux de réussite</span>
              <span className="text-sm font-medium text-green-600">87.3%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Présence moyenne</span>
              <span className="text-sm font-medium text-blue-600">92.1%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Paiements à jour</span>
              <span className="text-sm font-medium text-orange-600">74.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Documents uploadés</span>
              <span className="text-sm font-medium text-purple-600">1,234</span>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Alertes Récentes
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">
                  Serveur de sauvegarde
                </p>
                <p className="text-xs text-red-600">
                  Dernière sauvegarde il y a 25h
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Paiements en retard
                </p>
                <p className="text-xs text-yellow-600">
                  127 étudiants concernés
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <Activity className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Pic de connexions
                </p>
                <p className="text-xs text-blue-600">
                  +340% aujourd'hui
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Actions Administratives
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Utilisateurs</div>
              <div className="text-sm text-gray-500">Gérer comptes</div>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <GraduationCap className="w-8 h-8 text-green-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Notes</div>
              <div className="text-sm text-gray-500">Saisir résultats</div>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BookOpen className="w-8 h-8 text-purple-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Documents</div>
              <div className="text-sm text-gray-500">Publier cours</div>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <PieChart className="w-8 h-8 text-orange-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Rapports</div>
              <div className="text-sm text-gray-500">Générer stats</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;