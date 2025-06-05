import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', color = 'primary', fullScreen = false }) => {
  // Size variants
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  // Color variants
  const colorMap = {
    primary: 'from-indigo-500 to-purple-600',
    secondary: 'from-blue-500 to-teal-400',
    success: 'from-green-400 to-emerald-500',
    warning: 'from-yellow-400 to-orange-500',
    error: 'from-red-500 to-pink-600'
  };

  // Animation variants
  const containerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  const dotVariants = {
    initial: { scale: 0.8, opacity: 0.4 },
    animate: index => ({
      scale: [0.8, 1, 0.8],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: index * 0.15
      }
    })
  };

  // Render dots
  const renderDots = () => {
    return Array.from({ length: 4 }).map((_, index) => (
      <motion.div
        key={index}
        custom={index}
        variants={dotVariants}
        initial="initial"
        animate="animate"
        className={`absolute bg-gradient-to-r ${colorMap[color]} rounded-full w-3 h-3`}
        style={{
          top: index === 0 || index === 1 ? 0 : 'auto',
          bottom: index === 2 || index === 3 ? 0 : 'auto',
          left: index === 0 || index === 3 ? 0 : 'auto',
          right: index === 1 || index === 2 ? 0 : 'auto',
        }}
      />
    ));
  };

  // If fullScreen, render a centered spinner with backdrop
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          <motion.div
            variants={containerVariants}
            animate="animate"
            className={`${sizeMap.lg} relative mx-auto`}
          >
            {renderDots()}
          </motion.div>
          <p className="mt-6 text-lg text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Regular spinner
  return (
    <motion.div
      variants={containerVariants}
      animate="animate"
      className={`${sizeMap[size]} relative`}
    >
      {renderDots()}
    </motion.div>
  );
};

export default LoadingSpinner;