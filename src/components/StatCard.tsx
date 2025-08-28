import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend }) => {
  return (
    <Card style={[styles.card, { flex: 1, minWidth: '45%' }]}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <View style={styles.info}>
            <Text variant="bodySmall" style={styles.title}>
              {title}
            </Text>
            <Text variant="titleLarge" style={styles.value}>
              {value}
            </Text>
            {trend && (
              <Text variant="bodySmall" style={styles.trend}>
                {trend}
              </Text>
            )}
          </View>
          <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color={color}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
  },
  content: {
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
  },
  title: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  value: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  trend: {
    color: theme.colors.onSurfaceVariant,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StatCard