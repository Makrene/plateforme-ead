import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Chip, Button, List, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../theme/theme';

interface Subject {
  id: string;
  name: string;
  code: string;
  coefficient: number;
  grades: Grade[];
  average: number;
  teacher: string;
}

interface Grade {
  id: string;
  type: 'devoir' | 'partiel' | 'examen';
  value: number;
  maxValue: number;
  date: string;
  coefficient: number;
  comment?: string;
}

export default function ResultsScreen() {
  const [selectedSemester, setSelectedSemester] = useState('S1-2024');
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const mockSubjects: Subject[] = [
    {
      id: '1',
      name: 'Programmation Web',
      code: 'INF301',
      coefficient: 3,
      teacher: 'Prof. MBEMBA',
      average: 16.2,
      grades: [
        { id: '1', type: 'devoir', value: 15, maxValue: 20, date: '2024-10-15', coefficient: 1, comment: 'Bon travail' },
        { id: '2', type: 'partiel', value: 17, maxValue: 20, date: '2024-11-20', coefficient: 2 },
        { id: '3', type: 'devoir', value: 16, maxValue: 20, date: '2024-12-01', coefficient: 1 }
      ]
    },
    {
      id: '2',
      name: 'Base de Données',
      code: 'INF302',
      coefficient: 3,
      teacher: 'Prof. KOUKA',
      average: 14.8,
      grades: [
        { id: '4', type: 'devoir', value: 13, maxValue: 20, date: '2024-10-20', coefficient: 1 },
        { id: '5', type: 'partiel', value: 16, maxValue: 20, date: '2024-11-25', coefficient: 2 },
        { id: '6', type: 'devoir', value: 15, maxValue: 20, date: '2024-12-03', coefficient: 1 }
      ]
    },
    {
      id: '3',
      name: 'Algorithmes Avancés',
      code: 'INF303',
      coefficient: 4,
      teacher: 'Dr. NZALA',
      average: 13.5,
      grades: [
        { id: '7', type: 'devoir', value: 12, maxValue: 20, date: '2024-10-18', coefficient: 1 },
        { id: '8', type: 'partiel', value: 14, maxValue: 20, date: '2024-11-22', coefficient: 2 },
        { id: '9', type: 'devoir', value: 14, maxValue: 20, date: '2024-11-30', coefficient: 1 }
      ]
    }
  ];

  const overallAverage = mockSubjects.reduce((acc, subject) => 
    acc + (subject.average * subject.coefficient), 0
  ) / mockSubjects.reduce((acc, subject) => acc + subject.coefficient, 0);

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 85) return theme.colors.secondary;
    if (percentage >= 70) return theme.colors.primary;
    if (percentage >= 50) return '#f59e0b';
    return theme.colors.error;
  };

  const getGradeTypeLabel = (type: string) => {
    switch (type) {
      case 'devoir': return 'Devoir';
      case 'partiel': return 'Partiel';
      case 'examen': return 'Examen';
      default: return type;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.title}>
            Résultats Scolaires
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Consultez vos notes et moyennes par matière
          </Text>
        </View>

        {/* Overall Stats */}
        <View style={styles.statsContainer}>
          <Card style={[styles.statCard, { backgroundColor: theme.colors.primary }]}>
            <Card.Content style={styles.statContent}>
              <View style={styles.statInfo}>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Moyenne Générale
                </Text>
                <Text variant="headlineMedium" style={styles.statValue}>
                  {overallAverage.toFixed(1)}/20
                </Text>
              </View>
              <MaterialCommunityIcons 
                name="trending-up" 
                size={32} 
                color="rgba(255, 255, 255, 0.7)" 
              />
            </Card.Content>
          </Card>

          <Card style={[styles.statCard, { backgroundColor: theme.colors.secondary }]}>
            <Card.Content style={styles.statContent}>
              <View style={styles.statInfo}>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Classement
                </Text>
                <Text variant="headlineMedium" style={styles.statValue}>
                  3/45
                </Text>
              </View>
              <MaterialCommunityIcons 
                name="trophy" 
                size={32} 
                color="rgba(255, 255, 255, 0.7)" 
              />
            </Card.Content>
          </Card>
        </View>

        {/* Semester Selector */}
        <View style={styles.semesterContainer}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Semestre
          </Text>
          <View style={styles.chipContainer}>
            <Chip
              selected={selectedSemester === 'S1-2024'}
              onPress={() => setSelectedSemester('S1-2024')}
              style={styles.chip}
            >
              S1 - 2024
            </Chip>
            <Chip
              selected={selectedSemester === 'S2-2023'}
              onPress={() => setSelectedSemester('S2-2023')}
              style={styles.chip}
            >
              S2 - 2023
            </Chip>
          </View>
        </View>

        {/* Subject Results */}
        <Card style={styles.subjectsCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Résultats par Matière
            </Text>
            
            {mockSubjects.map((subject, index) => (
              <View key={subject.id}>
                <List.Item
                  title={subject.name}
                  description={`${subject.code} • Coeff. ${subject.coefficient} • ${subject.teacher}`}
                  right={() => (
                    <View style={styles.gradeContainer}>
                      <Chip
                        style={[
                          styles.gradeChip,
                          { backgroundColor: getGradeColor(subject.average, 20) }
                        ]}
                        textStyle={{ color: 'white', fontWeight: 'bold' }}
                      >
                        {subject.average.toFixed(1)}/20
                      </Chip>
                    </View>
                  )}
                  onPress={() => setExpandedSubject(
                    expandedSubject === subject.id ? null : subject.id
                  )}
                />
                
                {expandedSubject === subject.id && (
                  <View style={styles.gradesContainer}>
                    {subject.grades.map((grade) => (
                      <Card key={grade.id} style={styles.gradeCard}>
                        <Card.Content style={styles.gradeContent}>
                          <View style={styles.gradeInfo}>
                            <View style={styles.gradeHeader}>
                              <Chip
                                style={styles.gradeTypeChip}
                                textStyle={{ fontSize: 12 }}
                              >
                                {getGradeTypeLabel(grade.type)}
                              </Chip>
                              <Text variant="bodySmall" style={styles.gradeDate}>
                                {new Date(grade.date).toLocaleDateString('fr-FR')}
                              </Text>
                            </View>
                            {grade.comment && (
                              <Text variant="bodySmall" style={styles.gradeComment}>
                                {grade.comment}
                              </Text>
                            )}
                          </View>
                          <Chip
                            style={[
                              styles.gradeValueChip,
                              { backgroundColor: getGradeColor(grade.value, grade.maxValue) }
                            ]}
                            textStyle={{ color: 'white', fontWeight: 'bold' }}
                          >
                            {grade.value}/{grade.maxValue}
                          </Chip>
                        </Card.Content>
                      </Card>
                    ))}
                  </View>
                )}
                
                {index < mockSubjects.length - 1 && <Divider />}
              </View>
            ))}
          </Card.Content>
        </Card>

        {/* Download Button */}
        <Button
          mode="contained"
          icon="download"
          style={styles.downloadButton}
          onPress={() => {}}
        >
          Télécharger le relevé PDF
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
  },
  semesterContainer: {
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
  subjectsCard: {
    marginBottom: 16,
  },
  gradeContainer: {
    justifyContent: 'center',
  },
  gradeChip: {
    minWidth: 70,
  },
  gradesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  gradeCard: {
    backgroundColor: theme.colors.surfaceVariant,
  },
  gradeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  gradeInfo: {
    flex: 1,
  },
  gradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  gradeTypeChip: {
    backgroundColor: theme.colors.primaryContainer,
  },
  gradeDate: {
    color: theme.colors.onSurfaceVariant,
  },
  gradeComment: {
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  gradeValueChip: {
    minWidth: 60,
  },
  downloadButton: {
    marginBottom: 32,
  },
});