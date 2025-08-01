import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Award,
  Calendar,
  Download,
  Filter,
  BarChart3
} from 'lucide-react';

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

const StudentResults: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('S1-2024');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

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
    if (percentage >= 85) return 'text-green-600 bg-green-50';
    if (percentage >= 70) return 'text-blue-600 bg-blue-50';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Résultats Scolaires</h1>
          <p className="text-gray-600">Consultez vos notes et moyennes par matière</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="S1-2024">Semestre 1 - 2024</option>
            <option value="S2-2023">Semestre 2 - 2023</option>
            <option value="S1-2023">Semestre 1 - 2023</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Télécharger PDF
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Moyenne Générale</p>
              <p className="text-3xl font-bold">{overallAverage.toFixed(1)}/20</p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-300" />
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+0.8 pts ce semestre</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Classement</p>
              <p className="text-3xl font-bold">3/45</p>
            </div>
            <Award className="w-12 h-12 text-green-300" />
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm">Top 10% de la promotion</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Matières Validées</p>
              <p className="text-3xl font-bold">{mockSubjects.filter(s => s.average >= 10).length}/{mockSubjects.length}</p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-300" />
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm">Excellent parcours</span>
          </div>
        </div>
      </div>

      {/* Subject Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Résultats par Matière</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {mockSubjects.map((subject) => (
              <div key={subject.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedSubject(selectedSubject === subject.id ? null : subject.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                        <p className="text-sm text-gray-600">
                          {subject.code} • Coeff. {subject.coefficient} • {subject.teacher}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(subject.average, 20)}`}>
                          {subject.average.toFixed(1)}/20
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {subject.grades.length} évaluation{subject.grades.length > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className={`transform transition-transform ${selectedSubject === subject.id ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedSubject === subject.id && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    <div className="space-y-3">
                      {subject.grades.map((grade) => (
                        <div key={grade.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {getGradeTypeLabel(grade.type)}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                  {new Date(grade.date).toLocaleDateString('fr-FR')}
                                </span>
                                <span className="text-sm text-gray-500">
                                  • Coeff. {grade.coefficient}
                                </span>
                              </div>
                              {grade.comment && (
                                <p className="text-sm text-gray-600 mt-1">{grade.comment}</p>
                              )}
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grade.value, grade.maxValue)}`}>
                            {grade.value}/{grade.maxValue}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;