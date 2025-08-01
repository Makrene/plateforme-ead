import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  studentId?: string;
  filiere?: string;
  niveau?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock data pour la démo
const mockUsers = [
  {
    id: '1',
    name: 'Marie Kouamé',
    email: 'marie.kouame@ead.cg',
    role: 'student' as const,
    studentId: 'EAD2024001',
    filiere: 'Informatique',
    niveau: 'L3',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Jean Ngouabi',
    email: 'jean.ngouabi@ead.cg',
    role: 'student' as const,
    studentId: 'EAD2024002',
    filiere: 'Gestion',
    niveau: 'L2',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'Dr. Emmanuel Sassou',
    email: 'admin@ead.cg',
    role: 'admin' as const,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler la vérification de session
    const savedUser = localStorage.getItem('ead_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulation de l'authentification
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password.length > 0) {
      setUser(foundUser);
      localStorage.setItem('ead_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ead_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};