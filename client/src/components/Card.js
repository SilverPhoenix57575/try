import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  variant = 'default',
  hover = 'lift',
  className = '',
  onClick,
  ...props
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Card variants
  const variants = {
    default: 'bg-gray-900/80 backdrop-blur-md border border-gray-800',
    glass: 'glass-effect',
    gradient: 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800',
    dark: 'bg-black border border-gray-800',
    highlight: 'bg-gray-900/80 backdrop-blur-md border-t-2 border-indigo-500 border-b border-l border-r border-gray-800'
  };

  // Hover effects
  const hoverEffects = {
    none: {},
    lift: {
      y: -8,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    scale: {
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    glow: {
      boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (hover === '3d') {
      const { currentTarget: target } = e;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  // Calculate 3D rotation based on mouse position
  const calculate3dEffect = () => {
    if (hover !== '3d') return {};
    
    const height = 300; // approximate card height
    const width = 400;  // approximate card width
    
    const rotateX = (mousePosition.y - height / 2) / 25;
    const rotateY = (width / 2 - mousePosition.x) / 25;
    
    return {
      rotateX: rotateX,
      rotateY: rotateY,
      transition: { duration: 0.1 }
    };
  };

  return (
    <motion.div
      className={`rounded-xl overflow-hidden ${variants[variant]} ${className}`}
      whileHover={hover === '3d' ? calculate3dEffect() : hoverEffects[hover]}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      {...props}
    >
      {/* Highlight effect on hover */}
      {hover === 'glow' && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 bg-indigo-500"
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 0.15,
            transition: { duration: 0.3 }
          }}
        />
      )}
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Border gradient effect */}
      {variant === 'highlight' && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0"
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 1,
            transition: { duration: 0.3 }
          }}
          style={{
            background: 'linear-gradient(to right, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
            zIndex: -1
          }}
        />
      )}
    </motion.div>
  );
};

export default Card;