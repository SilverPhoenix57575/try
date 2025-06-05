import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = "right",
  className = "",
  ...props
}) => {
  // Button variants
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40",
    secondary:
      "bg-transparent border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10",
    tertiary: "bg-transparent text-indigo-400 hover:bg-indigo-500/10",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40",
    glass:
      "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10",
    dark: "bg-gray-900 border border-gray-800 text-white hover:bg-gray-800",
    premium: "premium-button", // Add premium variant that uses the premium-button class
  };

  // Button sizes
  const sizes = {
    sm: "text-xs px-3 py-2 rounded-lg",
    md: "text-sm px-4 py-2.5 rounded-lg",
    lg: "text-base px-6 py-3 rounded-xl",
    xl: "text-lg px-8 py-4 rounded-xl",
  };

  // Common button styles
  const buttonStyles = `
    relative
    font-medium
    inline-flex
    items-center
    justify-center
    transition-all
    duration-300
    ${fullWidth ? "w-full" : ""}
    ${sizes[size]}
    ${variants[variant]}
    ${
      disabled
        ? "opacity-60 cursor-not-allowed"
        : variant !== "premium"
        ? "hover:translate-y-[-2px]"
        : ""
    }
    ${className}
  `;

  // Animation variants
  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  // Render icon
  const renderIcon = () => {
    if (!icon) return null;

    return (
      <span className={`${iconPosition === "left" ? "mr-2" : "ml-2"}`}>
        {icon}
      </span>
    );
  };

  // Render button content
  const renderContent = () => (
    <>
      {loading ? (
        <LoadingSpinner
          size="sm"
          color={variant === "secondary" ? "primary" : "secondary"}
        />
      ) : (
        <>
          {iconPosition === "left" && renderIcon()}
          <span>{children}</span>
          {iconPosition === "right" && renderIcon()}
        </>
      )}
    </>
  );

  // If it's a link (internal)
  if (to && !disabled) {
    // If there's an onClick handler, use a regular button instead of Link
    if (onClick) {
      return (
        <motion.button
          whileHover={!disabled && variant !== "premium" && "hover"}
          whileTap={!disabled && variant !== "premium" && "tap"}
          variants={buttonVariants}
          onClick={onClick}
          disabled={disabled || loading}
          className={buttonStyles}
          data-text={variant === "premium" ? children : undefined}
          {...props}
        >
          {renderContent()}

          {/* Hover effect for non-premium buttons */}
          {!disabled && variant !== "premium" && (
            <motion.span
              className="absolute inset-0 rounded-lg bg-white"
              initial={{ opacity: 0 }}
              whileHover={{
                opacity: [0, 0.1, 0],
                transition: { duration: 1.5, repeat: Infinity },
              }}
            />
          )}
        </motion.button>
      );
    }

    return (
      <motion.div
        whileHover={variant !== "premium" && "hover"}
        whileTap={variant !== "premium" && "tap"}
        variants={buttonVariants}
      >
        <Link
          to={to}
          className={buttonStyles}
          data-text={variant === "premium" ? children : undefined}
          {...props}
        >
          {renderContent()}
        </Link>
      </motion.div>
    );
  }

  // If it's an external link
  if (href && !disabled) {
    return (
      <motion.div
        whileHover={variant !== "premium" && "hover"}
        whileTap={variant !== "premium" && "tap"}
        variants={buttonVariants}
      >
        <a
          href={href}
          className={buttonStyles}
          target="_blank"
          rel="noopener noreferrer"
          data-text={variant === "premium" ? children : undefined}
          {...props}
        >
          {renderContent()}
        </a>
      </motion.div>
    );
  }

  // Regular button
  return (
    <motion.button
      whileHover={!disabled && variant !== "premium" && "hover"}
      whileTap={!disabled && variant !== "premium" && "tap"}
      variants={buttonVariants}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonStyles}
      data-text={variant === "premium" ? children : undefined}
      type={props.type || "button"} // Ensure type is set correctly for form submission
      {...props}
    >
      {renderContent()}

      {/* Hover effect for non-premium buttons */}
      {!disabled && variant !== "premium" && (
        <motion.span
          className="absolute inset-0 rounded-lg bg-white"
          initial={{ opacity: 0 }}
          whileHover={{
            opacity: [0, 0.1, 0],
            transition: { duration: 1.5, repeat: Infinity },
          }}
        />
      )}
    </motion.button>
  );
};

export default Button;
