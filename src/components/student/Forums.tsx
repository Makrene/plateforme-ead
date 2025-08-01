import React, { useState } from 'react';
import {
  MessageSquare,
  Users,
  Calendar,
  Search,
  Plus,
  ThumbsUp,
  MessageCircle,
  Pin,
  Lock,
  Eye
} from 'lucide-react';

interface ForumTopic {
  id: string;
  title: string;
  author: string;
  authorAvatar?: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  lastAuthor: string;
  isPinned: boolean;
  isLocked: boolean;
  likes: number;
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  topics: number;
  color: string;
}

const Forums: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const forumCategories: ForumCategory[] = [
    {
      id: 'informatique',
      name: 'Informatique',
      description: 'Discussions sur la programmation, développement web, bases de données',
      topics: 45,
      color: 'blue'
    },
    {
      id: 'gestion',
      name: 'Gestion',
      description: 'Management, comptabilité, économie, ressources humaines',
      topics: 32,
      color: 'green'
    },
    {
      id: 'general',
      name: 'Général',
      description: 'Discussions générales, événements, annonces',
      topics: 28,
      color: 'purple'
    },
    {
      id: 'aide',
      name: 'Entraide',
      description: 'Questions et réponses entre étudiants',
      topics: 67,
      color: 'orange'
    }
  ];

  const mockTopics: ForumTopic[] = [
    {
      id: '1',
      title: 'Problème avec l\'authentification JWT en React',
      author: 'Marie Kouamé',
      authorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      category: 'informatique',
      replies: 12,
      views: 89,
      lastActivity: '2024-12-02T14:30:00',
      lastAuthor: 'Jean Ngouabi',
      isPinned: false,
      isLocked: false,
      likes: 8
    },
    {
      id: '2',
      title: '[URGENT] Aide pour projet de base de données',
      author: 'Paul Mabandza',
      category: 'aide',
      replies: 23,
      views: 156,
      lastActivity: '2024-12-02T16:45:00',
      lastAuthor: 'Sophie Kimbembe',
      isPinned: true,
      isLocked: false,
      likes: 15
    },
    {
      id: '3',
      title: 'Ressources pour apprendre Node.js',
      author: 'Christelle Makaya',
      category: 'informatique',
      replies: 8,
      views: 67,
      lastActivity: '2024-12-01T10:20:00',
      lastAuthor: 'Marie Kouamé',
      isPinned: false,
      isLocked: false,
      likes: 12
    },
    {
      id: '4',
      title: 'Dates d\'examens du semestre 1',
      author: 'Administration',
      category: 'general',
      replies: 5,
      views: 234,
      lastActivity: '2024-11-30T09:15:00',
      lastAuthor: 'Prof. MBEMBA',
      isPinned: true,
      isLocked: true,
      likes: 3
    }
  ];

  const filteredTopics = mockTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (categoryId: string) => {
    const category = forumCategories.find(c => c.id === categoryId);
    switch (category?.color) {
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'green': return 'bg-green-100 text-green-800';
      case 'purple': return 'bg-purple-100 text-purple-800';
      case 'orange': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Il y a quelques minutes';
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forums de Discussion</h1>
          <p className="text-gray-600">Échangez avec vos camarades et enseignants</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau sujet
        </button>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {forumCategories.map((category) => (
          <div 
            key={category.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(category.id)}`}>
                {category.topics} sujets
              </span>
            </div>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans les forums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Toutes les catégories</option>
            {forumCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Topics List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Discussions récentes ({filteredTopics.length})
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredTopics.map((topic) => (
            <div key={topic.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-4">
                {/* Author Avatar */}
                <div className="flex-shrink-0">
                  {topic.authorAvatar ? (
                    <img
                      src={topic.authorAvatar}
                      alt={topic.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {topic.author.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Topic Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {topic.isPinned && (
                          <Pin className="w-4 h-4 text-orange-500" />
                        )}
                        {topic.isLocked && (
                          <Lock className="w-4 h-4 text-gray-500" />
                        )}
                        <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                          {topic.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span>Par {topic.author}</span>
                        <span className={`px-2 py-1 rounded-full ${getCategoryColor(topic.category)}`}>
                          {forumCategories.find(c => c.id === topic.category)?.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {topic.replies} réponse{topic.replies > 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {topic.views} vue{topic.views > 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {topic.likes}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right text-sm text-gray-500 ml-4">
                      <div>Dernière activité</div>
                      <div className="font-medium text-gray-900">
                        {formatLastActivity(topic.lastActivity)}
                      </div>
                      <div>par {topic.lastAuthor}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun sujet trouvé</h3>
            <p className="text-gray-500 mb-4">
              Essayez de modifier vos critères de recherche ou créez un nouveau sujet.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Créer un nouveau sujet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forums;