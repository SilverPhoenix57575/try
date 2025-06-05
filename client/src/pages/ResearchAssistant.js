import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, 
  FileText, 
  BookOpen, 
  Scale, 
  Lightbulb, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Briefcase,
  Sparkles,
  Download,
  Share
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext

const ResearchAssistant = () => {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    jurisdiction: 'all',
    sourceType: 'all', // 'caselaw', 'statutes', 'articles'
    dateRange: 'all',
  });
  const [activeResult, setActiveResult] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Mock data for jurisdictions and source types
  const jurisdictions = ['Federal', 'California', 'New York', 'Texas', 'Illinois', 'All'];
  const sourceTypes = ['All', 'Case Law', 'Statutes', 'Legal Articles', 'Regulations'];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setActiveResult(null);

    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          title: 'Marbury v. Madison, 5 U.S. 137 (1803)',
          summary: 'Established the principle of judicial review in the United States, meaning that American courts have the power to strike down laws, statutes, and some government actions that contravene the U.S. Constitution.',
          sourceType: 'Case Law',
          jurisdiction: 'Federal',
          date: '1803-02-24',
          relevance: 95,
          fullTextLink: '#',
          keyInsights: [
            'Principle of Judicial Review',
            'Separation of Powers',
            'Supreme Court Authority'
          ]
        },
        {
          id: 2,
          title: 'California Civil Code Section 1714',
          summary: 'Everyone is responsible, not only for the result of his or her willful acts, but also for an injury occasioned to another by his or her want of ordinary care or skill in the management of his or her property or person, except so far as the latter has, willfully or by want of ordinary care, brought the injury upon himself or herself.',
          sourceType: 'Statutes',
          jurisdiction: 'California',
          date: '1872-01-01',
          relevance: 88,
          fullTextLink: '#',
          keyInsights: [
            'Negligence Principle',
            'Duty of Care',
            'Comparative Negligence'
          ]
        },
        {
          id: 3,
          title: 'The Future of AI in Legal Research - Harvard Law Review',
          summary: 'An in-depth analysis of how artificial intelligence is transforming legal research methodologies, improving efficiency, and raising new ethical considerations for legal professionals.',
          sourceType: 'Legal Articles',
          jurisdiction: 'N/A',
          date: '2023-05-15',
          relevance: 92,
          fullTextLink: '#',
          keyInsights: [
            'AI Impact on Law',
            'Ethical AI Use',
            'Future Legal Tech Trends'
          ]
        },
      ];
      setSearchResults(mockResults.filter(res => 
        (filters.jurisdiction === 'all' || res.jurisdiction === filters.jurisdiction || res.jurisdiction === 'N/A') &&
        (filters.sourceType === 'all' || res.sourceType.toLowerCase().includes(filters.sourceType.toLowerCase().replace(' ', '')))
      ));
      setLoading(false);
    }, 2000);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const toggleFilterDropdown = () => setShowFilterDropdown(!showFilterDropdown);

  const ResultCard = ({ result }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer mb-6"
      onClick={() => setActiveResult(result)}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{result.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${result.sourceType === 'Case Law' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : result.sourceType === 'Statutes' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}`}>
          {result.sourceType}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{result.summary}</p>
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Jurisdiction: {result.jurisdiction}</span>
        <span>Date: {result.date}</span>
        <span>Relevance: <span className="font-semibold text-blue-600 dark:text-blue-400">{result.relevance}%</span></span>
      </div>
    </motion.div>
  );

  const ActiveResultView = ({ result }) => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 lg:sticky lg:top-28"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{result.title}</h2>
        <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg">
                <Download size={18} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg">
                <Share size={18} />
            </button>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span><Briefcase size={14} className="inline mr-1"/> {result.sourceType}</span>
        <span><Scale size={14} className="inline mr-1"/> {result.jurisdiction}</span>
        <span>{result.date}</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{result.summary}</p>
      
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Key Insights by AI <Sparkles size={16} className="inline text-blue-500"/></h4>
        <ul className="space-y-2">
          {result.keyInsights.map((insight, index) => (
            <li key={index} className="flex items-start">
              <Lightbulb size={16} className="mr-2 mt-1 text-yellow-500 flex-shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{insight}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <a 
        href={result.fullTextLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors w-full"
      >
        View Full Text <BookOpen size={16} className="ml-2"/>
      </a>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            AI Legal Research Assistant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Unlock powerful legal insights. Search case law, statutes, and articles with unparalleled speed and precision.
          </p>
        </motion.div>

        {/* Search Bar and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 mb-8"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your legal query (e.g., 'negligence standard of care')"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-md"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-md font-semibold disabled:opacity-50"
            >
              {loading ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : <Search size={20} />}
              <span>{loading ? 'Searching...' : 'Search'}</span>
            </button>
            <div className="relative w-full md:w-auto">
              <button 
                type="button"
                onClick={toggleFilterDropdown}
                className="w-full md:w-auto flex items-center justify-between px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-md"
              >
                <Filter size={18} className="mr-2" />
                <span>Filters</span>
                {showFilterDropdown ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <AnimatePresence>
                {showFilterDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 right-0 mt-2 w-full md:w-72 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 space-y-4"
                  >
                    <div>
                      <label htmlFor="jurisdiction" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jurisdiction</label>
                      <select 
                        id="jurisdiction"
                        value={filters.jurisdiction}
                        onChange={(e) => handleFilterChange('jurisdiction', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {jurisdictions.map(j => <option key={j} value={j.toLowerCase()}>{j}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="sourceType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Source Type</label>
                      <select 
                        id="sourceType"
                        value={filters.sourceType}
                        onChange={(e) => handleFilterChange('sourceType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {sourceTypes.map(s => <option key={s} value={s.toLowerCase().replace(' ', '')}>{s}</option>)}
                      </select>
                    </div>
                    {/* Add Date Range Filter if needed */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>

        {/* Results Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-0">
            {loading && (
              <div className="flex justify-center items-center py-12">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
                />
              </div>
            )}
            {error && <p className="text-red-500 dark:text-red-400 text-center py-8">{error}</p>}
            {!loading && !error && searchResults.length === 0 && query && (
              <motion.div 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
              >
                <FileText size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Results Found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try refining your search query or adjusting the filters.</p>
              </motion.div>
            )}
            {!loading && !error && searchResults.length === 0 && !query && (
              <motion.div 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
              >
                <Search size={48} className="mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Ready to Research?</h3>
                <p className="text-gray-500 dark:text-gray-400">Enter your query above to find relevant legal documents.</p>
              </motion.div>
            )}
            <AnimatePresence>
              {searchResults.map(result => (
                <ResultCard key={result.id} result={result} />
              ))}
            </AnimatePresence>
          </div>

          {/* Active Result View */}
          <div className="lg:col-span-1">
            <AnimatePresence>
            {activeResult && (
              <ActiveResultView result={activeResult} />
            )}
            </AnimatePresence>
            {!activeResult && !loading && searchResults.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 lg:sticky lg:top-28"
                >
                    <Lightbulb size={48} className="mx-auto text-yellow-500 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Select a Result</h3>
                    <p className="text-gray-500 dark:text-gray-400">Click on a search result to view its details and AI-powered insights.</p>
                </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchAssistant;