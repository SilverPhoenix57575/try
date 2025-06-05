import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Check } from 'lucide-react';

const Input = ({
  label,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  success,
  helperText,
  icon,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Determine input type for password fields
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  // Handle focus state
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  // Determine input status
  const getInputStatus = () => {
    if (error) return 'error';
    if (success) return 'success';
    if (isFocused) return 'focused';
    return 'default';
  };
  
  // Status-based styles
  const statusStyles = {
    default: 'border-gray-700 bg-gray-900/80 focus:border-indigo-500 focus:ring-indigo-500/20',
    focused: 'border-indigo-500 bg-gray-900 ring-2 ring-indigo-500/20',
    error: 'border-red-500 bg-gray-900 ring-2 ring-red-500/20',
    success: 'border-green-500 bg-gray-900 ring-2 ring-green-500/20',
    disabled: 'border-gray-800 bg-gray-900/50 text-gray-500 cursor-not-allowed'
  };
  
  const status = getInputStatus();
  const inputStyles = disabled ? statusStyles.disabled : statusStyles[status];

  return (
    <div className={`mb-4 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={id} 
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      
      {/* Input container */}
      <div className="relative">
        {/* Leading icon */}
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        
        {/* Input element */}
        <motion.input
          type={inputType}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          className={`
            w-full px-4 py-3 rounded-lg text-white
            border transition-all duration-200
            ${inputStyles}
            ${icon ? 'pl-10' : ''}
            ${type === 'password' ? 'pr-10' : ''}
          `}
          {...props}
        />
        
        {/* Password toggle button */}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
        
        {/* Status indicators */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500" />
            </motion.div>
          )}
          
          {success && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <Check className="w-5 h-5 text-green-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Helper text or error message */}
      <AnimatePresence>
        {(error || helperText) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1"
          >
            <p className={`text-sm ${error ? 'text-red-500' : 'text-gray-400'}`}>
              {error || helperText}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Input;