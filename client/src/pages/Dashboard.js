import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  FileText, 
  Calendar, 
  Users, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCases: 0,
    activeCases: 0,
    completedCases: 0,
    upcomingSchedules: 0
  });
  const [recentCases, setRecentCases] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API calls
      setTimeout(() => {
        setStats({
          totalCases: 24,
          activeCases: 8,
          completedCases: 16,
          upcomingSchedules: 5
        });
        setRecentCases([
          { id: 1, title: 'Contract Dispute - ABC Corp', status: 'active', priority: 'high', date: '2024-01-15' },
          { id: 2, title: 'Employment Law Case', status: 'pending', priority: 'medium', date: '2024-01-14' },
          { id: 3, title: 'Intellectual Property', status: 'completed', priority: 'low', date: '2024-01-13' }
        ]);
        setUpcomingEvents([
          { id: 1, title: 'Client Meeting - Smith vs Jones', time: '10:00 AM', date: '2024-01-16' },
          { id: 2, title: 'Court Hearing', time: '2:00 PM', date: '2024-01-17' },
          { id: 3, title: 'Document Review', time: '9:00 AM', date: '2024-01-18' }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 flex items-center ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const CaseCard = ({ case: caseItem }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900 dark:text-white">{caseItem.title}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          caseItem.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          caseItem.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}>
          {caseItem.status}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          caseItem.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
          caseItem.priority === 'medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {caseItem.priority} priority
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{caseItem.date}</span>
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
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your legal practice today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FileText}
            title="Total Cases"
            value={stats.totalCases}
            change={12}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatCard
            icon={Clock}
            title="Active Cases"
            value={stats.activeCases}
            change={8}
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatCard
            icon={CheckCircle}
            title="Completed Cases"
            value={stats.completedCases}
            change={-3}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
          <StatCard
            icon={Calendar}
            title="Upcoming Events"
            value={stats.upcomingSchedules}
            change={5}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Cases */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Cases</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Search className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>New Case</span>
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {recentCases.map((caseItem) => (
                  <CaseCard key={caseItem.id} case={caseItem} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Upcoming Events */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{event.title}</h4>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FileText, label: 'New Case', color: 'bg-blue-500' },
              { icon: Calendar, label: 'Schedule Meeting', color: 'bg-green-500' },
              { icon: Download, label: 'Generate Document', color: 'bg-purple-500' },
              { icon: Users, label: 'Client Management', color: 'bg-orange-500' }
            ].map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 flex flex-col items-center space-y-2"
              >
                <div className={`p-3 rounded-xl ${action.color}`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;