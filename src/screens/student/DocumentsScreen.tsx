import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Card, Searchbar, Chip, Button, List, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme/theme';

interface Document {
  id: string;
  title: string;
  type: 'course' | 'exercise' | 'exam' | 'project';
  subject: string;
  teacher: string;
  uploadDate: string;
  size: string;
  downloads: number;
  description?: string;
}

export default function DocumentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const mockDocuments: Document[] = [
    {
      id: '1',
      title: 'Cours - Introduction à React',
      type: 'course',
      subject: 'Programmation Web',
      teacher: 'Prof. MBEMBA',
      uploadDate: '2024-12-01',
      size: '2.5 MB',
      downloads: 45,
      description: 'Support de cours complet sur les bases de React.js'
    },
    {
      id: '2',
      title: 'TP - Création d\'une API REST',
      type: 'exercise',
      subject: 'Programmation Web',
      teacher: 'Prof. MBEMBA',
      uploadDate: '2024-11-28',
      size: '1.8 MB',
      downloads: 32
    },
    {
      id: '3',
      title: 'Examen Final - Algorithmes 2023',
      type: 'exam',
      subject: 'Algorithmes Avancés',
      teacher: 'Dr. NZALA',
      uploadDate: '2024-11-25',
      size: '456 KB',
      downloads: 67
    },
    {
      id: '4',
      title: 'Projet - Système de Gestion BDD',
      type: 'project',
      subject: 'Base de Données',
      teacher: 'Prof. KOUKA',
      uploadDate: '2024-11-20',
      size: '3.2 MB',
      downloads: 28,
      description: 'Cahier des charges pour le projet final'
    }
  ];

  const subjects = ['all', 'Programmation Web', 'Base de Données', 'Algorithmes Avancés', 'Génie Logiciel'];
  const documentTypes = [
    { value: 'all', label: 'Tous' },
    { value: 'course', label: 'Cours' },
    { value: 'exercise', label: 'TP' },
    { value: 'exam', label: 'Examens' },
    { value: 'project', label: 'Projets' }
  ];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesSubject = selectedSubject === 'all' || doc.subject === selectedSubject;
    
    return matchesSearch && matchesType && matchesSubject;
  });

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'course': return 'book-open';
      case 'exercise': return 'file-document';
      case 'exam': return 'eye';
      case 'project': return 'folder-open';
      default: return 'file-document';
    }
  };

  const getDocumentColor = (type: string) => {
    switch (type) {
      case 'course': return theme.colors.primary;
      case 'exercise': return theme.colors.secondary;
      case 'exam': return theme.colors.error;
      case 'project': return '#7c3aed';
      default: return theme.colors.onSurfaceVariant;
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'course': return 'Cours';
      case 'exercise': return 'Exercice';
      case 'exam': return 'Examen';
      case 'project': return 'Projet';
      default: return type;
    }
  };

  const renderDocument = ({ item }: { item: Document }) => (
    <Card style={styles.documentCard}>
      <Card.Content>
        <View style={styles.documentHeader}>
          <View style={styles.documentInfo}>
            <View style={styles.documentTitleRow}>
              <MaterialCommunityIcons
                name={getDocumentIcon(item.type)}
                size={20}
                color={getDocumentColor(item.type)}
                style={styles.documentIcon}
              />
              <Text variant="titleSmall" style={styles.documentTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
            <Chip
              style={[styles.typeChip, { backgroundColor: getDocumentColor(item.type) + '20' }]}
              textStyle={{ color: getDocumentColor(item.type), fontSize: 12 }}
            >
              {getDocumentTypeLabel(item.type)}
            </Chip>
          </View>
        </View>
        
        <View style={styles.documentMeta}>
          <Text variant="bodySmall" style={styles.metaText}>
            <MaterialCommunityIcons name="book-open" size={14} /> {item.subject}
          </Text>
          <Text variant="bodySmall" style={styles.metaText}>
            <MaterialCommunityIcons name="account" size={14} /> {item.teacher}
          </Text>
          <Text variant="bodySmall" style={styles.metaText}>
            <MaterialCommunityIcons name="calendar" size={14} /> {new Date(item.uploadDate).toLocaleDateString('fr-FR')}
          </Text>
        </View>

        {item.description && (
          <Text variant="bodySmall" style={styles.description}>
            {item.description}
          </Text>
        )}

        <View style={styles.documentFooter}>
          <View style={styles.documentStats}>
            <Text variant="bodySmall" style={styles.statText}>
              {item.size}
            </Text>
            <Text variant="bodySmall" style={styles.statText}>
              {item.downloads} téléchargements
            </Text>
          </View>
          <View style={styles.documentActions}>
            <Button
              mode="outlined"
              icon="eye"
              compact
              onPress={() => {}}
              style={styles.actionButton}
            >
              Voir
            </Button>
            <Button
              mode="contained"
              icon="download"
              compact
              onPress={() => {}}
              style={styles.actionButton}
            >
              Télécharger
            </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
            Documents Pédagogiques
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {filteredDocuments.length} document{filteredDocuments.length > 1 ? 's' : ''} disponible{filteredDocuments.length > 1 ? 's' : ''}
          </Text>
        </View>

        {/* Search */}
        <Searchbar
          placeholder="Rechercher des documents..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          <View style={styles.filters}>
            <Text variant="labelMedium" style={styles.filterLabel}>Type:</Text>
            {documentTypes.map(type => (
              <Chip
                key={type.value}
                selected={selectedType === type.value}
                onPress={() => setSelectedType(type.value)}
                style={styles.filterChip}
              >
                {type.label}
              </Chip>
            ))}
          </View>
        </ScrollView>

        {/* Documents List */}
        <FlatList
          data={filteredDocuments}
          renderItem={renderDocument}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.documentsList}
          ListEmptyComponent={
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <MaterialCommunityIcons
                  name="file-document"
                  size={48}
                  color={theme.colors.onSurfaceVariant}
                />
                <Text variant="titleMedium" style={styles.emptyTitle}>
                  Aucun document trouvé
                </Text>
                <Text variant="bodyMedium" style={styles.emptyText}>
                  Essayez de modifier vos critères de recherche
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
  searchbar: {
    marginBottom: 16,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 16,
  },
  filterLabel: {
    marginRight: 8,
    color: theme.colors.onSurfaceVariant,
  },
  filterChip: {
    marginRight: 8,
  },
  documentsList: {
    paddingBottom: 16,
  },
  documentCard: {
    marginBottom: 12,
  },
  documentHeader: {
    marginBottom: 8,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  documentIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  documentTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  typeChip: {
    alignSelf: 'flex-start',
  },
  documentMeta: {
    marginBottom: 8,
    gap: 4,
  },
  metaText: {
    color: theme.colors.onSurfaceVariant,
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    color: theme.colors.onSurfaceVariant,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  documentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  documentStats: {
    flex: 1,
  },
  statText: {
    color: theme.colors.onSurfaceVariant,
  },
  documentActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    minWidth: 80,
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