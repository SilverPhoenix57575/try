import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import {
  Scale,
  Shield,
  FileText,
  Calendar,
  Globe,
  Zap,
  Gavel,
  Users,
  BookOpen,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Star,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Scale className="w-10 h-10" />,
      title: "AI-Powered Case Analysis",
      description:
        "Get intelligent insights and difficulty ratings for your legal cases using advanced AI technology.",
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Multi-Country Legal Advice",
      description:
        "Access legal expertise from multiple jurisdictions and legal systems around the world.",
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: "Document Generation",
      description:
        "Create professional legal documents, charge sheets, warrants, and contracts with ease.",
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: "Schedule Management",
      description:
        "Organize your legal appointments and court dates with our intuitive scheduling system.",
    },
    {
      icon: <Gavel className="w-10 h-10" />,
      title: "Counter-Argument Analysis",
      description:
        "Prepare for opposing viewpoints with AI-generated counter-arguments and rebuttals.",
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Fast Performance",
      description:
        "Experience lightning-fast response times and seamless interactions throughout the platform.",
    },
  ];

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "South Africa",
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Corporate Lawyer",
      text: "Harvey has transformed how I prepare for cases. The AI-powered analysis saves me hours of research time.",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Legal Consultant",
      text: "The document generation feature is incredibly accurate and has streamlined our entire workflow.",
      avatar: "MC",
    },
    {
      name: "Priya Patel",
      role: "Immigration Attorney",
      text: "Having access to legal frameworks from multiple countries in one platform is a game-changer for my practice.",
      avatar: "PP",
    },
  ];

  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const countriesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: false, amount: 0.2 });
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.2 });
  const countriesInView = useInView(countriesRef, { once: false, amount: 0.2 });
  const testimonialsInView = useInView(testimonialsRef, {
    once: false,
    amount: 0.2,
  });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.2 });

  // Animation controls
  const heroControls = useAnimation();
  const featuresControls = useAnimation();
  const countriesControls = useAnimation();
  const testimonialsControls = useAnimation();
  const ctaControls = useAnimation();

  // Trigger animations when sections come into view
  useEffect(() => {
    if (heroInView) heroControls.start("visible");
    if (featuresInView) featuresControls.start("visible");
    if (countriesInView) countriesControls.start("visible");
    if (testimonialsInView) testimonialsControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
  }, [
    heroInView,
    featuresInView,
    countriesInView,
    testimonialsInView,
    ctaInView,
  ]);

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const scaleInVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black animated-bg">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-screen flex items-center pt-32 pb-20"
      >
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container mx-auto px-4 relative z-10"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroControls}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/20 text-sm font-medium text-indigo-300"
            >
              <span className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                The Future of Legal Technology
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
              data-text="Your One-Stop Destination for Legal Solutions"
            >
              Your One-Stop Destination for Legal Solutions
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed"
            >
              Access legal expertise, generate documents, analyze cases, and
              manage your legal schedule - all in one powerful AI-driven
              platform.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <Button
                to="/register"
                variant="premium"
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
                onClick={() => window.location.href = '/register'}
              >
                Get Started
              </Button>
              <Link
                to="/legal-advice"
                className="btn btn-secondary text-lg px-8 py-4"
              >
                <span>Explore Legal Advice</span>
                <ChevronRight className="w-5 h-5 ml-1" />
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-gray-400"
            >
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-indigo-400" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-indigo-400" />
                <span>Global Legal Coverage</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-indigo-400" />
                <span>Document Generation</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-indigo-400" />
                <span>Secure & Confidential</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Background gradient effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -top-40 -left-40 w-[40rem] h-[40rem] bg-indigo-700 rounded-full filter blur-[100px]"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
            className="absolute top-60 -right-20 w-[30rem] h-[30rem] bg-purple-600 rounded-full filter blur-[100px]"
          ></motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-24 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={featuresControls}
            className="text-center mb-20"
          >
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/20 text-sm font-medium text-indigo-300">
              Premium Features
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
              data-text="Powerful Legal Tools"
            >
              Powerful Legal Tools
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with legal
              expertise to provide you with comprehensive solutions.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={featuresControls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleInVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="glass-effect p-8 flex flex-col items-center text-center relative group"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></motion.div>

                <div className="relative z-10 mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="text-indigo-400"
                  >
                    {feature.icon}
                  </motion.div>
                </div>

                <h3 className="text-2xl font-semibold mb-4 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-400 relative z-10">
                  {feature.description}
                </p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={testimonialsControls}
            className="text-center mb-16"
          >
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/20 text-sm font-medium text-indigo-300">
              Testimonials
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
              data-text="What Our Users Say"
            >
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from legal professionals who have transformed their practice
              with Harvey.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={testimonialsControls}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={scaleInVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="glass-effect p-8 rounded-xl relative"
              >
                <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>

                <div className="mb-6 text-gray-300 italic">
                  "{testimonial.text}"
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Countries Section */}
      <section
        ref={countriesRef}
        className="py-24 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={countriesControls}
            className="text-center mb-16"
          >
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/20 text-sm font-medium text-indigo-300">
              Global Reach
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 gradient-text"
              data-text="Global Legal Coverage"
            >
              Global Legal Coverage
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Access legal advice from multiple jurisdictions around the world
              with our comprehensive platform.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={countriesControls}
            className="flex flex-wrap justify-center gap-4"
          >
            {countries.map((country, index) => (
              <motion.div
                key={index}
                variants={scaleInVariants}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(99, 102, 241, 0.1)",
                  borderColor: "rgba(99, 102, 241, 0.3)",
                  transition: { duration: 0.2 },
                }}
                className="glass-effect px-6 py-3 rounded-full flex items-center transition-all duration-300"
              >
                <Globe className="w-5 h-5 mr-3 text-indigo-400" />
                <span>{country}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            variants={scaleInVariants}
            initial="hidden"
            animate={ctaControls}
            className="relative max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl transform -rotate-1"></div>
            <div className="glass-effect p-12 md:p-16 rounded-3xl border border-indigo-500/20 relative z-10">
              <motion.div variants={fadeInUpVariants} className="text-center">
                <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-indigo-900/30 border border-indigo-500/20 text-sm font-medium text-indigo-300">
                  Get Started Today
                </span>
                <h2
                  className="text-3xl md:text-5xl font-bold mb-6 gradient-text"
                  data-text="Ready to Transform Your Legal Experience?"
                >
                  Ready to Transform Your Legal Experience?
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                  Join thousands of clients and legal professionals who are
                  already using our platform to streamline their legal
                  processes.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button
                    to="/register"
                    variant="premium"
                    size="xl"
                    icon={<ArrowRight className="h-5 w-5" />}
                    onClick={() => window.location.href = '/register'}
                  >
                    Get Started Now
                  </Button>
                </motion.div>
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-indigo-400" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-indigo-400" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-indigo-400" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Scale className="h-8 w-8 text-indigo-500" />
                <h2
                  className="text-2xl font-bold gradient-text"
                  data-text="Harvey"
                >
                  Harvey
                </h2>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Harvey is your AI-powered legal companion, providing intelligent
                solutions for legal professionals and clients worldwide.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500/20 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500/20 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500/20 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500/20 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/security"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    to="/compliance"
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Harvey Legal Platform. All rights
              reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Made with</span>
              <svg
                className="w-4 h-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>for legal professionals</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
