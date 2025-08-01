import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  CreditCard,
  MessageSquare,
  Bell,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { user } = useAuth();

  const studentMenuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard' },
    { icon: GraduationCap, label: 'Résultats', path: '/results' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: CreditCard, label: 'Finances', path: '/financial' },
    { icon: MessageSquare, label: 'Forums', path: '/forums' },
    { icon: Bell, label: 'Notifications', path: '/notifications' }
  ];

  const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard' },
    { icon: Shield, label: 'Administration', path: '/admin' },
    { icon: GraduationCap, label: 'Gestion Notes', path: '/admin/grades' },
    { icon: FileText, label: 'Documents', path: '/admin/documents' },
    { icon: CreditCard, label: 'Finances', path: '/admin/financial' },
    { icon: Settings, label: 'Paramètres', path: '/admin/settings' }
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : studentMenuItems;

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {isOpen && (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 font-semibold text-gray-900">EAD</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-colors group ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                  {!isOpen && (
                    <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info */}
        {isOpen && user && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {user.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.role === 'student' ? user.studentId : 'Administrateur'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;