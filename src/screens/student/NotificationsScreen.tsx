import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, Chip, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNotifications } from '../../contexts/NotificationContext';
import { theme } from '../../theme/theme';

export default function NotificationsScreen() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return 'check-circle';
      case 'warning': return 'alert-circle';
      case 'error': return 'alert-circle';
      default: return 'information';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return theme.colors.secondary;
      case 'warning': return '#f59e0b';
      case 'error': return theme.colors.error;
      default: return theme.colors.primary;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return theme.colors.error;
      case 'medium': return '#f59e0b';
      case 'low': return theme.colors.secondary;
      default: return theme.colors.onSurfaceVariant;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Urgent';
      case 'medium': return 'Important';
      case 'low': return 'Normal';
      default: return priority;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Il y a quelques minutes';
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    
    return timestamp.toLocaleDateString('fr-FR');
  };

  const getCategoryIcon = (title: string) => {
    if (title.toLowerCase().includes('résultat') || title.toLowerCase().includes('note')) {
      return 'school';
    }
    if (title.toLowerCase().includes('paiement') || title.toLowerCase().includes('échéance')) {
      return 'credit-card';
    }
    if (title.toLowerCase().includes('forum') || title.toLowerCase().includes('message')) {
      return 'message';
    }
    return 'calendar';
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  const renderNotification = ({ item }: { item: any }) => (
    <Card 
      style={[
        styles.notificationCard,
        !item.read && styles.unreadCard
      ]}
      onPress={() => !item.read && markAsRead(item.id)}
    >
      <Card.Content>
        <View style={styles.notificationHeader}>
          <View style={styles.notificationIcons}>
            <MaterialCommunityIcons
              name={getNotificationIcon(item.type)}
              size={20}
              color={getNotificationColor(item.type)}
            />
            <MaterialCommunityIcons
              name={getCategoryIcon(item.title)}
              size={16}
              color={theme.colors.onSurfaceVariant}
              style={styles.categoryIcon}
            />
          </View>
          <View style={styles.notificationContent}>
            <View style={styles.titleRow}>
              <Text 
                variant="titleSmall" 
                style={[
                  styles.notificationTitle,
                  !item.read && styles.unreadTitle
                ]}
                numberOfLines={2}
              >
                {item.title}
              </Text>
              <Chip
                style={[
                  styles.priorityChip,
                  { backgroundColor: getPriorityColor(item.priority) + '20' }
                ]}
                textStyle={{ 
                  color: getPriorityColor(item.priority), 
                  fontSize: 10 
                }}
              >
                {getPriorityLabel(item.priority)}
              </Chip>
            </View>
            <Text 
              variant="bodyMedium" 
              style={[
                styles.notificationMessage,
                !item.read && styles.unreadMessage
              ]}
              numberOfLines={3}
            >
              {item.message}
            </Text>
            <Text variant="bodySmall" style={styles.timestamp}>
              {formatTimestamp(item.timestamp)}
            </Text>
          </View>
        </View>
        
        {!item.read && (
          <View style={styles.notificationActions}>
            <Button
              mode="text"
              onPress={() => markAsRead(item.id)}
              style={styles.markReadButton}
            >
              Marquer comme lu
            </Button>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  const renderSectionHeader = (title: string, count: number) => (
    <View style={styles.sectionHeader}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        {title} ({count})
      </Text>
    </View>
  );

  const allNotifications = [
    ...unreadNotifications.map(n => ({ ...n, section: 'unread' })),
    ...readNotifications.map(n => ({ ...n, section: 'read' }))
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
            Notifications
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {unreadNotifications.length} notification{unreadNotifications.length > 1 ? 's' : ''} non lue{unreadNotifications.length > 1 ? 's' : ''}
          </Text>
        </View>

        {/* Mark All Read Button */}
        {unreadNotifications.length > 0 && (
          <Button
            mode="outlined"
            icon="check-all"
            onPress={markAllAsRead}
            style={styles.markAllButton}
          >
            Tout marquer comme lu
          </Button>
        )}

        {/* Notifications List */}
        <FlatList
          data={allNotifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.notificationsList}
          ListHeaderComponent={
            unreadNotifications.length > 0 ? 
            renderSectionHeader('Non lues', unreadNotifications.length) : null
          }
          ListEmptyComponent={
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <MaterialCommunityIcons
                  name="bell"
                  size={48}
                  color={theme.colors.onSurfaceVariant}
                />
                <Text variant="titleMedium" style={styles.emptyTitle}>
                  Aucune notification
                </Text>
                <Text variant="bodyMedium" style={styles.emptyText}>
                  Vous êtes à jour ! Les nouvelles notifications apparaîtront ici.
                </Text>
              </Card.Content>
            </Card>
          }
        />
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
  markAllButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  notificationsList: {
    paddingBottom: 16,
  },
  notificationCard: {
    marginBottom: 8,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryContainer + '40',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcons: {
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  categoryIcon: {
    marginTop: 4,
  },
  notificationContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  priorityChip: {
    height: 24,
  },
  notificationMessage: {
    marginBottom: 8,
    lineHeight: 20,
  },
  unreadMessage: {
    color: theme.colors.onSurface,
  },
  timestamp: {
    color: theme.colors.onSurfaceVariant,
  },
  notificationActions: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  markReadButton: {
    minWidth: 120,
  },
  emptyCard: {
    marginTop: 32,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
  },
});