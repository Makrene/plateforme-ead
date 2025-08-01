import React, { useState } from 'react';
import {
  CreditCard,
  Calendar,
  AlertCircle,
  CheckCircle,
  Download,
  Clock,
  DollarSign,
  TrendingDown,
  Receipt
} from 'lucide-react';

interface Payment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate?: string;
  method?: string;
  receiptUrl?: string;
}

interface Transaction {
  id: string;
  type: 'payment' | 'fee';
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

const FinancialTracking: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');

  const mockPayments: Payment[] = [
    {
      id: '1',
      description: 'Frais de scolarité S1 2024',
      amount: 250000,
      dueDate: '2024-12-15',
      status: 'pending'
    },
    {
      id: '2',
      description: 'Frais d\'inscription 2024',
      amount: 50000,
      dueDate: '2024-01-15',
      status: 'paid',
      paymentDate: '2024-01-10',
      method: 'Virement bancaire',
      receiptUrl: '#'
    },
    {
      id: '3',
      description: 'Frais de bibliothèque',
      amount: 15000,
      dueDate: '2024-11-30',
      status: 'overdue'
    },
    {
      id: '4',
      description: 'Frais d\'examen S1',
      amount: 25000,
      dueDate: '2024-12-20',
      status: 'pending'
    }
  ];

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: 'payment',
      description: 'Paiement frais inscription',
      amount: -50000,
      date: '2024-01-10',
      status: 'completed'
    },
    {
      id: '2',
      type: 'fee',
      description: 'Frais de scolarité S1',
      amount: 250000,
      date: '2024-09-01',
      status: 'pending'
    },
    {
      id: '3',
      type: 'fee',
      description: 'Frais de bibliothèque',
      amount: 15000,
      date: '2024-10-01',
      status: 'pending'
    }
  ];

  const totalDue = mockPayments
    .filter(p => p.status !== 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPaid = mockPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const overduePyments = mockPayments.filter(p => p.status === 'overdue');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Payé';
      case 'pending': return 'En attente';
      case 'overdue': return 'En retard';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(amount).replace('XAF', 'FCFA');
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suivi Financier</h1>
          <p className="text-gray-600">Gérez vos paiements et consultez votre historique financier</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="2024">Année 2024</option>
            <option value="2023">Année 2023</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Relevé complet
          </button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Montant dû</p>
              <p className="text-2xl font-bold">{formatCurrency(totalDue)}</p>
            </div>
            <TrendingDown className="w-10 h-10 text-red-300" />
          </div>
          <div className="mt-4">
            <p className="text-red-100 text-sm">
              {mockPayments.filter(p => p.status !== 'paid').length} échéance{mockPayments.filter(p => p.status !== 'paid').length > 1 ? 's' : ''} en cours
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Montant payé</p>
              <p className="text-2xl font-bold">{formatCurrency(totalPaid)}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-300" />
          </div>
          <div className="mt-4">
            <p className="text-green-100 text-sm">Cette année</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Paiements en retard</p>
              <p className="text-2xl font-bold">{overduePyments.length}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-orange-300" />
          </div>
          <div className="mt-4">
            <p className="text-orange-100 text-sm">Action requise</p>
          </div>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Échéances à venir</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockPayments.filter(p => p.status !== 'paid').map((payment) => {
              const daysUntilDue = getDaysUntilDue(payment.dueDate);
              return (
                <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(payment.status)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{payment.description}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Échéance: {new Date(payment.dueDate).toLocaleDateString('fr-FR')}
                        </span>
                        <span className={`flex items-center ${
                          daysUntilDue < 0 ? 'text-red-600' : 
                          daysUntilDue <= 7 ? 'text-orange-600' : 'text-gray-500'
                        }`}>
                          {daysUntilDue < 0 ? 
                            `${Math.abs(daysUntilDue)} jour${Math.abs(daysUntilDue) > 1 ? 's' : ''} de retard` :
                            `Dans ${daysUntilDue} jour${daysUntilDue > 1 ? 's' : ''}`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(payment.amount)}</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                        {getStatusLabel(payment.status)}
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Payer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Historique des paiements</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockPayments.filter(p => p.status === 'paid').map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">{payment.description}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>Payé le {new Date(payment.paymentDate!).toLocaleDateString('fr-FR')}</span>
                      {payment.method && (
                        <span>• {payment.method}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(payment.amount)}</p>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Payé
                    </span>
                  </div>
                  {payment.receiptUrl && (
                    <button className="p-2 text-gray-500 hover:text-blue-600 rounded-lg transition-colors">
                      <Receipt className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTracking;