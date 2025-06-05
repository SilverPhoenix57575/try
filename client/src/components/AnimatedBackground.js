import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AnimatedBackground = ({
  variant = "gradient",
  intensity = "medium",
  className = "",
  children,
}) => {
  const canvasRef = useRef(null);

  // Intensity levels
  const intensityLevels = {
    low: 0.3,
    medium: 0.5,
    high: 0.8,
  };

  // Gradient animation
  const gradientVariants = {
    animate: {
      background: [
        "radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0) 50%)",
        "radial-gradient(circle at 80% 30%, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 50%)",
        "radial-gradient(circle at 40% 70%, rgba(236, 72, 153, 0.15) 0%, rgba(0, 0, 0, 0) 50%)",
        "radial-gradient(circle at 60% 20%, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0) 50%)",
      ],
      transition: {
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  // Matrix effect
  useEffect(() => {
    if (variant !== "matrix" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters
    const characters = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Initialize drops at random positions
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor((Math.random() * canvas.height) / fontSize);
    }

    // Drawing function
    const draw = () => {
      // Set semi-transparent black background
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text color and font
      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );

        // Draw character
        ctx.fillStyle = `rgba(99, 102, 241, ${intensityLevels[intensity]})`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Move drop
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // Animation loop
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [variant, intensity]);

  // Particle effect
  useEffect(() => {
    if (variant !== "particles" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle settings
    const particleCount =
      Math.floor(window.innerWidth / 20) * intensityLevels[intensity];
    const particles = [];

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2})`,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
      });
    }

    // Drawing function
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${
              0.1 * (1 - distance / 100)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const interval = setInterval(draw, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [variant, intensity]);

  // Render based on variant
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Canvas for matrix or particles */}
      {(variant === "matrix" || variant === "particles") && (
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      )}

      {/* Animated gradient */}
      {variant === "gradient" && (
        <motion.div
          variants={gradientVariants}
          animate="animate"
          className="absolute inset-0 z-0"
          style={{ opacity: intensityLevels[intensity] }}
        />
      )}

      {/* Static noise */}
      {variant === "noise" && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            opacity: intensityLevels[intensity] / 2,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
