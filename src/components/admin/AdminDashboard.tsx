import React from 'react';
import {
  Users,
  GraduationCap,
  Settings,
  FileText,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const quickStats = [
    { label: 'Étudiants actifs', value: '1,247', change: '+12', color: 'blue' },
    { label: 'Notes saisies', value: '3,456', change: '+89', color: 'green' },
    { label: 'Documents publiés', value: '234', change: '+5', color: 'purple' },
    { label: 'Alertes système', value: '3', change: '-2', color: 'orange' }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'user',
      message: '15 nouveaux étudiants inscrits',
      timestamp: '2h',
      icon: Users,
      color: 'blue'
    },
    {
      id: '2',
      type: 'grade',
      message: 'Notes de Programmation Web publiées',
      timestamp: '4h',
      icon: GraduationCap,
      color: 'green'
    },
    {
      id: '3',
      type: 'system',
      message: 'Sauvegarde automatique effectuée',
      timestamp: '6h',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: '4',
      type: 'alert',
      message: 'Pic de connexions détecté',
      timestamp: '8h',
      icon: AlertTriangle,
      color: 'orange'
    }
  ];

  const getStatColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 border-blue-200';
      case 'green': return 'bg-green-50 border-green-200';
      case 'purple': return 'bg-purple-50 border-purple-200';
      case 'orange': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getActivityColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'orange': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
        <p className="text-gray-600">Gestion complète de la plateforme EAD</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className={`p-6 rounded-xl border-2 ${getStatColor(stat.color)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className="text-right">
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <p className="text-xs text-gray-500">cette semaine</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Gérer Utilisateurs</div>
                  <div className="text-sm text-gray-500">Ajouter, modifier, désactiver</div>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <GraduationCap className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Saisir Notes</div>
                  <div className="text-sm text-gray-500">Importer, valider, publier</div>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <FileText className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Documents</div>
                  <div className="text-sm text-gray-500">Publier cours, ressources</div>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <BarChart3 className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Rapports</div>
                  <div className="text-sm text-gray-500">Statistiques, exports</div>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Settings className="w-8 h-8 text-gray-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Configuration</div>
                  <div className="text-sm text-gray-500">Paramètres système</div>
                </div>
              </button>
              
              <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <TrendingUp className="w-8 h-8 text-indigo-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Analytics</div>
                  <div className="text-sm text-gray-500">Performances, métriques</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.color)}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">Il y a {activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Voir toute l'activité →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">État du Système</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">Base de données</div>
              <div className="text-sm text-gray-500">Opérationnelle</div>
            </div>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">Serveur web</div>
              <div className="text-sm text-gray-500">En ligne</div>
            </div>
          </div>
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-orange-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">Sauvegarde</div>
              <div className="text-sm text-gray-500">Il y a 25h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;