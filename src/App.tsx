import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentResults from './components/student/StudentResults';
import Documents from './components/student/Documents';
import FinancialTracking from './components/student/FinancialTracking';
import Forums from './components/student/Forums';
import Notifications from './components/student/Notifications';
import Layout from './components/layout/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<StudentResults />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/financial" element={<FinancialTracking />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/notifications" element={<Notifications />} />
        {user.role === 'admin' && (
          <Route path="/admin" element={<AdminDashboard />} />
        )}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;