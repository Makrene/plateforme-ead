import React, { useState } from 'react';
import {
  FileText,
  Download,
  Search,
  Filter,
  Calendar,
  User,
  Eye,
  FolderOpen,
  BookOpen
} from 'lucide-react';

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

const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
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
    },
    {
      id: '5',
      title: 'Cours - Modélisation UML',
      type: 'course',
      subject: 'Génie Logiciel',
      teacher: 'Dr. MAKAYA',
      uploadDate: '2024-11-15',
      size: '4.1 MB',
      downloads: 89
    }
  ];

  const subjects = ['all', 'Programmation Web', 'Base de Données', 'Algorithmes Avancés', 'Génie Logiciel'];
  const documentTypes = [
    { value: 'all', label: 'Tous les types' },
    { value: 'course', label: 'Cours' },
    { value: 'exercise', label: 'Exercices/TP' },
    { value: 'exam', label: 'Examens' },
    { value: 'project', label: 'Projets' }
  ];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesSubject = selectedSubject === 'all' || doc.subject === selectedSubject;
    
    return matchesSearch && matchesType && matchesSubject;
  });

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'exercise':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'exam':
        return <Eye className="w-5 h-5 text-red-600" />;
      case 'project':
        return <FolderOpen className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'bg-blue-100 text-blue-800';
      case 'exercise':
        return 'bg-green-100 text-green-800';
      case 'exam':
        return 'bg-red-100 text-red-800';
      case 'project':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents Pédagogiques</h1>
          <p className="text-gray-600">Accédez à tous vos supports de cours et ressources</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-gray-500">
            {filteredDocuments.length} document{filteredDocuments.length > 1 ? 's' : ''} disponible{filteredDocuments.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="lg:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {documentTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Filter */}
          <div className="lg:w-48">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Toutes les matières</option>
              {subjects.slice(1).map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    {getDocumentIcon(doc.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {doc.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getDocumentTypeColor(doc.type)}`}>
                        {getDocumentTypeLabel(doc.type)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {doc.subject}
                      </span>
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {doc.teacher}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(doc.uploadDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    
                    {doc.description && (
                      <p className="text-sm text-gray-600 mt-2">
                        {doc.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4 ml-4">
                  <div className="text-right text-sm text-gray-500">
                    <div>{doc.size}</div>
                    <div>{doc.downloads} téléchargements</div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document trouvé</h3>
              <p className="text-gray-500">
                Essayez de modifier vos critères de recherche ou filtres.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;