import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Scale, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings,
  ChevronDown,
  BarChart,
  FileText,
  MessageCircle,
  Calendar,
  Home
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Case Analysis', path: '/case-analysis', icon: <BarChart className="h-4 w-4" /> },
    { name: 'Documents', path: '/documents', icon: <FileText className="h-4 w-4" /> },
    { name: 'Legal Advice', path: '/legal-advice', icon: <MessageCircle className="h-4 w-4" /> },
    { name: 'Schedule', path: '/schedule', icon: <Calendar className="h-4 w-4" /> }
  ];

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }),
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9],
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.6, 0.05, -0.01, 0.9]
      }
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ 
                rotate: 360,
                scale: 1.1,
                transition: { duration: 0.8, ease: "easeInOut" }
              }}
              className="relative"
            >
              <Scale className="h-9 w-9 text-indigo-500" />
              <motion.div 
                className="absolute inset-0 bg-indigo-500 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 0.3, 0] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 3
                }}
              />
            </motion.div>
            <div className="flex flex-col">
              <span 
                className="text-2xl font-bold gradient-text" 
                data-text="Harvey"
              >
                Harvey
              </span>
              <span className="text-xs text-gray-400 tracking-wider -mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">LEGAL AI</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, i) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 overflow-hidden ${
                  location.pathname === item.path
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navBackground"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10">{item.name}</span>
                
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                  <motion.div
                    animate={{ rotate: showUserMenu ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-56 glass-effect rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="p-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm hover:bg-indigo-500/10 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-indigo-400" />
                          </div>
                          <div>
                            <span className="font-medium block">Dashboard</span>
                            <span className="text-xs text-gray-400">View your activity</span>
                          </div>
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm hover:bg-indigo-500/10 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                            <Settings className="h-4 w-4 text-indigo-400" />
                          </div>
                          <div>
                            <span className="font-medium block">Profile</span>
                            <span className="text-xs text-gray-400">Manage your account</span>
                          </div>
                        </Link>
                        <div className="h-px bg-white/10 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm hover:bg-red-500/10 transition-colors w-full text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                            <LogOut className="h-4 w-4 text-red-400" />
                          </div>
                          <span className="font-medium text-red-400">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login" className="btn btn-secondary px-6">
                    Login
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link to="/register" className="btn btn-primary px-6">
                    Get Started
                  </Link>
                  <motion.div 
                    className="absolute inset-0 rounded-md bg-indigo-500"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: [0, 0.3, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      repeatDelay: 2
                    }}
                  />
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden border-t border-white/10 mt-4 pt-4 pb-6"
            >
              <div className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    custom={i}
                    variants={menuItemVariants}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 text-white'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        location.pathname === item.path
                          ? 'bg-indigo-500/20'
                          : 'bg-gray-800'
                      }`}>
                        {item.icon}
                      </div>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {isAuthenticated ? (
                  <motion.div 
                    variants={menuItemVariants}
                    custom={navItems.length}
                    className="pt-4 border-t border-white/10 space-y-1"
                  >
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                        <Settings className="h-4 w-4" />
                      </div>
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <LogOut className="h-4 w-4" />
                      </div>
                      <span>Logout</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    variants={menuItemVariants}
                    custom={navItems.length}
                    className="pt-4 border-t border-white/10 space-y-3"
                  >
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-3 rounded-xl text-sm font-medium text-center border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 transition-all duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-3 rounded-xl text-sm font-medium text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;