import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../theme/theme';
import StatCard from '../../components/StatCard';
import RecentActivityCard from '../../components/RecentActivityCard';

export default function DashboardScreen() {
  const { user, logout } = useAuth();

  const stats = [
    { 
      title: 'Moyenne Générale', 
      value: '15.2/20', 
      icon: 'trending-up',
      color: theme.colors.primary,
      trend: '+0.8 pts ce semestre'
    },
    { 
      title: 'Classement', 
      value: '3/45', 
      icon: 'trophy',
      color: theme.colors.secondary,
      trend: 'Top 10%'
    },
    { 
      title: 'Documents', 
      value: '24', 
      icon: 'file-document',
      color: '#7c3aed',
      trend: '3 nouveaux cette semaine'
    },
    { 
      title: 'Solde', 
      value: '-125 000 FCFA', 
      icon: 'credit-card',
      color: theme.colors.tertiary,
      trend: 'Échéance dans 5 jours'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      title: 'Note ajoutée - Programmation Web',
      description: '16/20 - Projet final React',
      timestamp: '2 heures',
      icon: 'trending-up',
      color: theme.colors.secondary,
    },
    {
      id: '2',
      title: 'Nouveau document',
      description: 'Cours de Base de Données - Chapitre 8',
      timestamp: '1 jour',
      icon: 'file-document',
      color: theme.colors.primary,
    },
    {
      id: '3',
      title: 'Rappel de paiement',
      description: 'Frais de scolarité S2 - 125 000 FCFA',
      timestamp: '2 jours',
      icon: 'alert-circle',
      color: theme.colors.tertiary,
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Header */}
        <Card style={styles.welcomeCard}>
          <Card.Content style={styles.welcomeContent}>
            <View style={styles.welcomeInfo}>
              <Text variant="headlineSmall" style={styles.welcomeTitle}>
                Bonjour {user?.name} ! 👋
              </Text>
              <Text variant="bodyMedium" style={styles.welcomeSubtitle}>
                {user?.filiere} - Niveau {user?.niveau}
              </Text>
              <Text variant="bodySmall" style={styles.welcomeId}>
                Matricule: {user?.studentId}
              </Text>
            </View>
            {user?.avatar && (
              <Avatar.Image
                size={64}
                source={{ uri: user.avatar }}
                style={styles.avatar}
              />
            )}
          </Card.Content>
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </View>

        {/* Recent Activity */}
        <RecentActivityCard activities={recentActivities} />

        {/* Quick Actions */}
        <Card style={styles.quickActionsCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Actions rapides
            </Text>
            <View style={styles.quickActionsGrid}>
              <Button
                mode="outlined"
                icon="calendar"
                style={styles.quickActionButton}
                contentStyle={styles.quickActionContent}
                onPress={() => {}}
              >
                Planning
              </Button>
              <Button
                mode="outlined"
                icon="file-download"
                style={styles.quickActionButton}
                contentStyle={styles.quickActionContent}
                onPress={() => {}}
              >
                Relevé PDF
              </Button>
              <Button
                mode="outlined"
                icon="credit-card"
                style={styles.quickActionButton}
                contentStyle={styles.quickActionContent}
                onPress={() => {}}
              >
                Paiement
              </Button>
              <Button
                mode="outlined"
                icon="help-circle"
                style={styles.quickActionButton}
                contentStyle={styles.quickActionContent}
                onPress={() => {}}
              >
                Support
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Button
          mode="outlined"
          icon="logout"
          onPress={logout}
          style={styles.logoutButton}
          textColor={theme.colors.error}
        >
          Se déconnecter
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  welcomeCard: {
    marginBottom: 16,
    backgroundColor: theme.colors.primary,
  },
  welcomeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeInfo: {
    flex: 1,
  },
  welcomeTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  welcomeId: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  avatar: {
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  quickActionsCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickActionButton: {
    flex: 1,
    minWidth: '45%',
  },
  quickActionContent: {
    paddingVertical: 8,
  },
  logoutButton: {
    marginBottom: 32,
    borderColor: theme.colors.error,
  },
});