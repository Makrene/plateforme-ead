import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  color: string;
}

interface RecentActivityCardProps {
  activities: Activity[];
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activities }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          Activité récente
        </Text>
        <View style={styles.activitiesList}>
          {activities.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={[styles.iconContainer, { backgroundColor: activity.color + '20' }]}>
                <MaterialCommunityIcons
                  name={activity.icon}
                  size={20}
                  color={activity.color}
                />
              </View>
              <View style={styles.activityContent}>
                <Text variant="bodyMedium" style={styles.activityTitle}>
                  {activity.title}
                </Text>
                <Text variant="bodySmall" style={styles.activityDescription}>
                  {activity.description}
                </Text>
                <Text variant="bodySmall" style={styles.activityTimestamp}>
                  Il y a {activity.timestamp}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <Button
          mode="text"
          onPress={() => {}}
          style={styles.viewAllButton}
        >
          Voir toutes les activités →
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  activitiesList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
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
  activityTitle: {
    fontWeight: '500',
    marginBottom: 2,
  },
  activityDescription: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: 2,
  },
  activityTimestamp: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
  },
  viewAllButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
  },
});

export default RecentActivityCard