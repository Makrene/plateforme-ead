import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import StudentDashboard from './StudentDashboard';
import AdminDashboardOverview from './AdminDashboardOverview';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <AdminDashboardOverview />;
  }

  return <StudentDashboard />;
};

export default Dashboard;