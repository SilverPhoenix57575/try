import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LegalAdvice = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults([
        {
          id: 1,
          title: 'Contract Termination Rights',
          snippet: 'Under common law, parties may terminate a contract when there is a material breach...',
          source: 'Legal Encyclopedia',
          relevance: 0.95
        },
        {
          id: 2,
          title: 'Employment Contract Termination',
          snippet: 'Employers must provide reasonable notice or payment in lieu of notice when terminating...',
          source: 'Employment Law Handbook',
          relevance: 0.87
        },
        {
          id: 3,
          title: 'Breach of Contract Remedies',
          snippet: 'Remedies for breach of contract include damages, specific performance, and rescission...',
          source: 'Contract Law Digest',
          relevance: 0.82
        }
      ]);
      setLoading(false);
    }, 1500);
  };

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
            Legal Research Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get instant answers to your legal questions from trusted sources.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
        >
          <form onSubmit={handleSearch}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Enter your legal question..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Results */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {loading ? 'Searching legal databases...' : 'Search Results'}
            </h2>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mb-4"
                />
                <p className="text-gray-600 dark:text-gray-400">Analyzing legal sources...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-6">
                {results.map((result) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <FileText className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{result.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{result.snippet}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-500">Source: {result.source}</span>
                          <span className="text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">
                            {Math.round(result.relevance * 100)}% match
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Results Found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We couldn't find any relevant legal information for your query. Try rephrasing your question.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Tips for Better Results
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="text-green-600 mr-2 mt-0.5" size={18} />
              <span className="text-gray-700 dark:text-gray-300">Be specific about the legal issue you're researching</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-green-600 mr-2 mt-0.5" size={18} />
              <span className="text-gray-700 dark:text-gray-300">Include relevant jurisdiction information (country, state, etc.)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-green-600 mr-2 mt-0.5" size={18} />
              <span className="text-gray-700 dark:text-gray-300">Use legal terminology when possible for more accurate results</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalAdvice;