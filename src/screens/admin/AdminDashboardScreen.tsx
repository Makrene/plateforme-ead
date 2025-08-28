import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../theme/theme';
import StatCard from '../../components/StatCard';

export default function AdminDashboardScreen() {
  const { user, logout } = useAuth();

  const stats = [
    { 
      title: 'Étudiants Actifs', 
      value: '1,247', 
      icon: 'account-group',
      color: theme.colors.primary,
      trend: '+12 cette semaine'
    },
    { 
      title: 'Moyenne Générale', 
      value: '13.8/20', 
      icon: 'trending-up',
      color: theme.colors.secondary,
      trend: '+0.3 pts ce semestre'
    },
    { 
      title: 'Cours Actifs', 
      value: '48', 
      icon: 'book-open',
      color: '#7c3aed',
      trend: '3 nouveaux ce mois'
    },
    { 
      title: 'Recettes', 
      value: '156M FCFA', 
      icon: 'credit-card',
      color: theme.colors.tertiary,
      trend: '+8% vs mois dernier'
    }
  ];

  const quickActions = [
    {
      title: 'Gérer Utilisateurs',
      description: 'Ajouter, modifier, désactiver',
      icon: 'account-group',
      color: theme.colors.primary,
    },
    {
      title: 'Saisir Notes',
      description: 'Importer, valider, publier',
      icon: 'school',
      color: theme.colors.secondary,
    },
    {
      title: 'Documents',
      description: 'Publier cours, ressources',
      icon: 'file-document',
      color: '#7c3aed',
    },
    {
      title: 'Rapports',
      description: 'Statistiques, exports',
      icon: 'chart-bar',
      color: theme.colors.tertiary,
    },
  ];

  const recentActivities = [
    {
      id: '1',
      message: '15 nouveaux étudiants inscrits',
      timestamp: '2h',
      icon: 'account-plus',
      color: theme.colors.primary,
    },
    {
      id: '2',
      message: 'Notes de Programmation Web publiées',
      timestamp: '4h',
      icon: 'school',
      color: theme.colors.secondary,
    },
    {
      id: '3',
      message: 'Sauvegarde automatique effectuée',
      timestamp: '6h',
      icon: 'check-circle',
      color: theme.colors.secondary,
    },
    {
      id: '4',
      message: 'Pic de connexions détecté',
      timestamp: '8h',
      icon: 'alert-circle',
      color: theme.colors.tertiary,
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Header */}
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.welcomeTitle}>
              Tableau de Bord Administrateur
            </Text>
            <Text variant="bodyMedium" style={styles.welcomeSubtitle}>
              Vue d'ensemble de la plateforme EAD
            </Text>
          </Card.Content>
        </Card>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </View>

        {/* Quick Actions */}
        <Card style={styles.quickActionsCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Actions Rapides
            </Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <Card key={index} style={styles.actionCard}>
                  <Card.Content style={styles.actionContent}>
                    <MaterialCommunityIcons
                      name={action.icon}
                      size={32}
                      color={action.color}
                      style={styles.actionIcon}
                    />
                    <View style={styles.actionInfo}>
                      <Text variant="titleSmall" style={styles.actionTitle}>
                        {action.title}
                      </Text>
                      <Text variant="bodySmall" style={styles.actionDescription}>
                        {action.description}
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Recent Activity */}
        <Card style={styles.activityCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Activité Récente
            </Text>
            <View style={styles.activityList}>
              {recentActivities.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                    <MaterialCommunityIcons
                      name={activity.icon}
                      size={20}
                      color={activity.color}
                    />
                  </View>
                  <View style={styles.activityContent}>
                    <Text variant="bodyMedium" style={styles.activityMessage}>
                      {activity.message}
                    </Text>
                    <Text variant="bodySmall" style={styles.activityTimestamp}>
                      Il y a {activity.timestamp}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* System Status */}
        <Card style={styles.statusCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              État du Système
            </Text>
            <View style={styles.statusGrid}>
              <View style={styles.statusItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={20}
                  color={theme.colors.secondary}
                />
                <View style={styles.statusInfo}>
                  <Text variant="bodyMedium" style={styles.statusTitle}>
                    Base de données
                  </Text>
                  <Text variant="bodySmall" style={styles.statusSubtitle}>
                    Opérationnelle
                  </Text>
                </View>
              </View>
              <View style={styles.statusItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={20}
                  color={theme.colors.secondary}
                />
                <View style={styles.statusInfo}>
                  <Text variant="bodyMedium" style={styles.statusTitle}>
                    Serveur web
                  </Text>
                  <Text variant="bodySmall" style={styles.statusSubtitle}>
                    En ligne
                  </Text>
                </View>
              </View>
              <View style={styles.statusItem}>
                <MaterialCommunityIcons
                  name="alert-circle"
                  size={20}
                  color={theme.colors.tertiary}
                />
                <View style={styles.statusInfo}>
                  <Text variant="bodyMedium" style={styles.statusTitle}>
                    Sauvegarde
                  </Text>
                  <Text variant="bodySmall" style={styles.statusSubtitle}>
                    Il y a 25h
                  </Text>
                </View>
              </View>
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
    backgroundColor: '#6366f1',
  },
  welcomeTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
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
    gap: 12,
  },
  actionCard: {
    backgroundColor: theme.colors.surfaceVariant,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  actionIcon: {
    marginRight: 16,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  actionDescription: {
    color: theme.colors.onSurfaceVariant,
  },
  activityCard: {
    marginBottom: 16,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    marginBottom: 2,
  },
  activityTimestamp: {
    color: theme.colors.onSurfaceVariant,
  },
  statusCard: {
    marginBottom: 16,
  },
  statusGrid: {
    gap: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusInfo: {
    marginLeft: 12,
  },
  statusTitle: {
    fontWeight: 'bold',
  },
  statusSubtitle: {
    color: theme.colors.onSurfaceVariant,
  },
  logoutButton: {
    marginBottom: 32,
    borderColor: theme.colors.error,
  },
});