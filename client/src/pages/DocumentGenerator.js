import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  Edit,
  Copy,
  Share,
  Save,
  Eye,
  Wand2,
  Upload,
  Search,
  Filter,
  Plus,
  Trash2,
  Clock,
  User,
  Calendar,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react';

const DocumentGenerator = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [generatedDocument, setGeneratedDocument] = useState('');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  const [recentDocuments, setRecentDocuments] = useState([]);

  useEffect(() => {
    fetchTemplates();
    fetchRecentDocuments();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setTemplates([
          {
            id: 1,
            name: 'Non-Disclosure Agreement',
            category: 'Contracts',
            description: 'Standard NDA template for business partnerships',
            fields: ['party1Name', 'party2Name', 'effectiveDate', 'duration'],
            complexity: 'Simple',
            estimatedTime: '5 minutes',
            usage: 245
          },
          {
            id: 2,
            name: 'Employment Contract',
            category: 'Employment',
            description: 'Comprehensive employment agreement template',
            fields: ['employeeName', 'position', 'salary', 'startDate', 'benefits'],
            complexity: 'Medium',
            estimatedTime: '15 minutes',
            usage: 189
          },
          {
            id: 3,
            name: 'Cease and Desist Letter',
            category: 'Litigation',
            description: 'Legal notice to stop infringing activities',
            fields: ['recipientName', 'infringementType', 'deadline', 'consequences'],
            complexity: 'Medium',
            estimatedTime: '10 minutes',
            usage: 156
          },
          {
            id: 4,
            name: 'Power of Attorney',
            category: 'Estate Planning',
            description: 'Legal document granting authority to act on behalf',
            fields: ['principalName', 'agentName', 'powers', 'limitations'],
            complexity: 'Complex',
            estimatedTime: '20 minutes',
            usage: 98
          },
          {
            id: 5,
            name: 'Service Agreement',
            category: 'Contracts',
            description: 'Professional services contract template',
            fields: ['clientName', 'serviceProvider', 'scope', 'payment', 'timeline'],
            complexity: 'Medium',
            estimatedTime: '12 minutes',
            usage: 203
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setLoading(false);
    }
  };

  const fetchRecentDocuments = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setRecentDocuments([
          {
            id: 1,
            name: 'NDA - TechCorp Partnership',
            template: 'Non-Disclosure Agreement',
            createdAt: '2024-01-15',
            status: 'completed'
          },
          {
            id: 2,
            name: 'Employment - John Doe',
            template: 'Employment Contract',
            createdAt: '2024-01-14',
            status: 'draft'
          },
          {
            id: 3,
            name: 'Service Agreement - ABC Corp',
            template: 'Service Agreement',
            createdAt: '2024-01-13',
            status: 'completed'
          }
        ]);
      }, 500);
    } catch (error) {
      console.error('Error fetching recent documents:', error);
    }
  };

  const generateDocument = async (templateId, data) => {
    setGenerating(true);
    try {
      // Simulate AI document generation
      setTimeout(() => {
        const sampleDocument = `
NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on ${data.effectiveDate || '[DATE]'} by and between ${data.party1Name || '[PARTY 1 NAME]'} ("Disclosing Party") and ${data.party2Name || '[PARTY 2 NAME]'} ("Receiving Party").

WHEREAS, the Disclosing Party possesses certain confidential and proprietary information that it wishes to disclose to the Receiving Party for the purpose of evaluating potential business opportunities;

WHEREAS, the Receiving Party agrees to maintain the confidentiality of such information;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. CONFIDENTIAL INFORMATION
For purposes of this Agreement, "Confidential Information" shall mean any and all non-public, confidential or proprietary information disclosed by the Disclosing Party to the Receiving Party...

2. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees to:
a) Hold and maintain the Confidential Information in strict confidence;
b) Not disclose the Confidential Information to any third parties without prior written consent;
c) Use the Confidential Information solely for the purpose of evaluating potential business opportunities...

3. TERM
This Agreement shall remain in effect for a period of ${data.duration || '[DURATION]'} from the date first written above...

[Document continues with standard legal clauses]
        `;
        setGeneratedDocument(sampleDocument);
        setGenerating(false);
        setShowPreview(true);
      }, 3000);
    } catch (error) {
      console.error('Error generating document:', error);
      setGenerating(false);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || template.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const TemplateCard = ({ template }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedTemplate(template)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{template.name}</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
          {template.category}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        <Clock className="w-4 h-4 mr-1" />
        <span>{template.estimatedTime}</span>
        <span className="mx-2">•</span>
        <span className={`${template.complexity === 'Simple' ? 'text-green-600' : template.complexity === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
          {template.complexity} complexity
        </span>
      </div>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <User className="w-4 h-4 mr-1" />
        <span>{template.usage} uses</span>
      </div>
    </motion.div>
  );

  const TemplateForm = ({ template, onSubmit }) => {
    const [localFormData, setLocalFormData] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setLocalFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(template.id, localFormData);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{template.name}</h2>
          <button
            onClick={() => setSelectedTemplate(null)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {template.fields.map((field) => (
            <div key={field} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name={field}
                value={localFormData[field] || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              />
            </div>
          ))}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            disabled={generating}
          >
            {generating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                Generating Document...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                Generate Document
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    );
  };

  const DocumentPreview = ({ document, onClose }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Document Preview</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg">
              <Copy className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg">
              <Edit className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg">
              <Share className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 font-mono text-sm whitespace-pre-wrap">
          {document}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            onClick={onClose}
          >
            Close
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            <Save className="w-4 h-4 inline mr-2" />
            Save Document
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const RecentDocumentCard = ({ document }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-900 dark:text-white">{document.name}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          document.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        }`}>
          {document.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{document.template}</p>
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <Calendar className="w-3 h-3 mr-1" />
        <span>{document.createdAt}</span>
      </div>
      <div className="flex items-center space-x-2 mt-3">
        <button className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded">
          <Eye className="w-4 h-4" />
        </button>
        <button className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded">
          <Edit className="w-4 h-4" />
        </button>
        <button className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Document Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create professional legal documents in minutes with AI assistance
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Selection */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
                  Document Templates
                </h2>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white w-full"
                    />
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All Categories</option>
                    <option value="Contracts">Contracts</option>
                    <option value="Employment">Employment</option>
                    <option value="Litigation">Litigation</option>
                    <option value="Estate Planning">Estate Planning</option>
                  </select>
                </div>
              </div>

              {selectedTemplate ? (
                <TemplateForm
                  template={selectedTemplate}
                  onSubmit={generateDocument}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTemplates.length > 0 ? (
                    filteredTemplates.map((template) => (
                      <TemplateCard key={template.id} template={template} />
                    ))
                  ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center py-12">
                      <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 text-center">
                        No templates found matching your search criteria.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* AI Enhancement Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-lg text-white mb-8"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI-Powered Document Enhancement</h3>
                  <p className="mb-4 opacity-90">
                    Our AI can analyze your documents for legal accuracy, suggest improvements, and ensure compliance with relevant regulations.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-white text-purple-700 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Documents */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 sticky top-24"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Documents</h2>
                <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {recentDocuments.length > 0 ? (
                  recentDocuments.map((document) => (
                    <RecentDocumentCard key={document.id} document={document} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      No recent documents found.
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {showPreview && generatedDocument && (
          <DocumentPreview
            document={generatedDocument}
            onClose={() => setShowPreview(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentGenerator;