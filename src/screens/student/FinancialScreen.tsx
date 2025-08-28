import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Card, Button, Chip, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme/theme';

interface Payment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentDate?: string;
  method?: string;
}

export default function FinancialScreen() {
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
      method: 'Virement bancaire'
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

  const totalDue = mockPayments
    .filter(p => p.status !== 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPaid = mockPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const overduePayments = mockPayments.filter(p => p.status === 'overdue');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return theme.colors.secondary;
      case 'pending': return '#f59e0b';
      case 'overdue': return theme.colors.error;
      default: return theme.colors.onSurfaceVariant;
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
      case 'paid': return 'check-circle';
      case 'pending': return 'clock';
      case 'overdue': return 'alert-circle';
      default: return 'clock';
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

  const renderPayment = ({ item }: { item: Payment }) => {
    const daysUntilDue = getDaysUntilDue(item.dueDate);
    
    return (
      <Card style={styles.paymentCard}>
        <Card.Content>
          <View style={styles.paymentHeader}>
            <View style={styles.paymentInfo}>
              <Text variant="titleSmall" style={styles.paymentTitle}>
                {item.description}
              </Text>
              <View style={styles.paymentMeta}>
                <MaterialCommunityIcons
                  name={getStatusIcon(item.status)}
                  size={16}
                  color={getStatusColor(item.status)}
                />
                <Text variant="bodySmall" style={styles.metaText}>
                  Échéance: {new Date(item.dueDate).toLocaleDateString('fr-FR')}
                </Text>
                {item.status !== 'paid' && (
                  <Text 
                    variant="bodySmall" 
                    style={[
                      styles.metaText,
                      { color: daysUntilDue < 0 ? theme.colors.error : 
                               daysUntilDue <= 7 ? '#f59e0b' : theme.colors.onSurfaceVariant }
                    ]}
                  >
                    {daysUntilDue < 0 ? 
                      `${Math.abs(daysUntilDue)} jour${Math.abs(daysUntilDue) > 1 ? 's' : ''} de retard` :
                      `Dans ${daysUntilDue} jour${daysUntilDue > 1 ? 's' : ''}`
                    }
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.paymentAmount}>
              <Text variant="titleMedium" style={styles.amountText}>
                {formatCurrency(item.amount)}
              </Text>
              <Chip
                style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) + '20' }]}
                textStyle={{ color: getStatusColor(item.status), fontSize: 12 }}
              >
                {getStatusLabel(item.status)}
              </Chip>
            </View>
          </View>
          
          {item.status === 'paid' && item.paymentDate && (
            <View style={styles.paymentDetails}>
              <Text variant="bodySmall" style={styles.detailText}>
                Payé le {new Date(item.paymentDate).toLocaleDateString('fr-FR')}
                {item.method && ` • ${item.method}`}
              </Text>
            </View>
          )}
          
          {item.status !== 'paid' && (
            <View style={styles.paymentActions}>
              <Button
                mode="contained"
                onPress={() => {}}
                style={styles.payButton}
              >
                Payer maintenant
              </Button>
            </View>
          )}
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
            Suivi Financier
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Gérez vos paiements et consultez votre historique
          </Text>
        </View>

        {/* Financial Overview */}
        <View style={styles.statsContainer}>
          <Card style={[styles.statCard, { backgroundColor: theme.colors.error }]}>
            <Card.Content style={styles.statContent}>
              <View style={styles.statInfo}>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Montant dû
                </Text>
                <Text variant="titleLarge" style={styles.statValue}>
                  {formatCurrency(totalDue)}
                </Text>
                <Text variant="bodySmall" style={styles.statSubtext}>
                  {mockPayments.filter(p => p.status !== 'paid').length} échéance{mockPayments.filter(p => p.status !== 'paid').length > 1 ? 's' : ''}
                </Text>
              </View>
              <MaterialCommunityIcons 
                name="trending-down" 
                size={32} 
                color="rgba(255, 255, 255, 0.7)" 
              />
            </Card.Content>
          </Card>

          <Card style={[styles.statCard, { backgroundColor: theme.colors.secondary }]}>
            <Card.Content style={styles.statContent}>
              <View style={styles.statInfo}>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Montant payé
                </Text>
                <Text variant="titleLarge" style={styles.statValue}>
                  {formatCurrency(totalPaid)}
                </Text>
                <Text variant="bodySmall" style={styles.statSubtext}>
                  Cette année
                </Text>
              </View>
              <MaterialCommunityIcons 
                name="check-circle" 
                size={32} 
                color="rgba(255, 255, 255, 0.7)" 
              />
            </Card.Content>
          </Card>
        </View>

        {overduePayments.length > 0 && (
          <Card style={[styles.alertCard, { backgroundColor: theme.colors.errorContainer }]}>
            <Card.Content>
              <View style={styles.alertContent}>
                <MaterialCommunityIcons 
                  name="alert-circle" 
                  size={24} 
                  color={theme.colors.error} 
                />
                <View style={styles.alertText}>
                  <Text variant="titleSmall" style={{ color: theme.colors.error }}>
                    Paiements en retard
                  </Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.error }}>
                    {overduePayments.length} paiement{overduePayments.length > 1 ? 's' : ''} en retard - Action requise
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Period Selector */}
        <View style={styles.periodContainer}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Période
          </Text>
          <View style={styles.chipContainer}>
            <Chip
              selected={selectedPeriod === '2024'}
              onPress={() => setSelectedPeriod('2024')}
              style={styles.chip}
            >
              2024
            </Chip>
            <Chip
              selected={selectedPeriod === '2023'}
              onPress={() => setSelectedPeriod('2023')}
              style={styles.chip}
            >
              2023
            </Chip>
          </View>
        </View>

        {/* Payments List */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Échéances et Paiements
        </Text>
        
        <FlatList
          data={mockPayments}
          renderItem={renderPayment}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.paymentsList}
        />

        {/* Download Button */}
        <Button
          mode="outlined"
          icon="download"
          onPress={() => {}}
          style={styles.downloadButton}
        >
          Télécharger le relevé complet
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: theme.colors.onSurfaceVariant,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  statValue: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  alertCard: {
    marginBottom: 16,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    marginLeft: 12,
    flex: 1,
  },
  periodContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    marginRight: 8,
  },
  paymentsList: {
    paddingBottom: 16,
  },
  paymentCard: {
    marginBottom: 12,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  paymentInfo: {
    flex: 1,
    marginRight: 16,
  },
  paymentTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paymentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  metaText: {
    color: theme.colors.onSurfaceVariant,
  },
  paymentAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusChip: {
    minWidth: 70,
  },
  paymentDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outline,
  },
  detailText: {
    color: theme.colors.onSurfaceVariant,
  },
  paymentActions: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  payButton: {
    minWidth: 140,
  },
  downloadButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});