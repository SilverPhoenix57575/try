import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Filter,
  Plus,
  Download,
  Share,
  Edit,
  Eye,
  Calendar,
  Clock,
  AlertCircle,
  Sparkles,
  Scale,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const CaseAnalysis = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showInsights, setShowInsights] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setCases([
          {
            id: 1,
            title: "Smith vs. Jones - Contract Dispute",
            description:
              "Breach of contract case involving failure to deliver services as specified.",
            status: "active",
            priority: "high",
            createdAt: "2024-01-10",
            court: "Superior Court of California",
            caseNumber: "CV-2024-1234",
            clientName: "John Smith",
            tags: ["Contract", "Breach", "Business"],
            documents: 12,
            precedents: 8,
          },
          {
            id: 2,
            title: "Estate of Williams - Probate",
            description:
              "Probate case for the estate of deceased client with multiple beneficiaries.",
            status: "pending",
            priority: "medium",
            createdAt: "2024-01-08",
            court: "Probate Court of Cook County",
            caseNumber: "PR-2024-5678",
            clientName: "Williams Family",
            tags: ["Probate", "Estate", "Will"],
            documents: 9,
            precedents: 5,
          },
          {
            id: 3,
            title: "Johnson IP Infringement",
            description:
              "Intellectual property case involving patent infringement in tech sector.",
            status: "active",
            priority: "high",
            createdAt: "2024-01-05",
            court: "US District Court, Northern District",
            caseNumber: "IP-2024-9012",
            clientName: "Johnson Technologies",
            tags: ["IP", "Patent", "Technology"],
            documents: 18,
            precedents: 12,
          },
          {
            id: 4,
            title: "Garcia Employment Dispute",
            description:
              "Wrongful termination case with discrimination allegations.",
            status: "completed",
            priority: "medium",
            createdAt: "2023-12-15",
            court: "State Labor Board",
            caseNumber: "EMP-2023-3456",
            clientName: "Maria Garcia",
            tags: ["Employment", "Discrimination", "Labor"],
            documents: 7,
            precedents: 9,
          },
          {
            id: 5,
            title: "Thompson Family Trust",
            description:
              "Trust administration and modification for family estate planning.",
            status: "pending",
            priority: "low",
            createdAt: "2023-12-10",
            court: "N/A",
            caseNumber: "TR-2023-7890",
            clientName: "Thompson Family",
            tags: ["Trust", "Estate Planning", "Family"],
            documents: 5,
            precedents: 3,
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching cases:", error);
      setLoading(false);
    }
  };

  const analyzeCase = async (caseId) => {
    setAnalyzing(true);
    try {
      // Simulate AI analysis
      setTimeout(() => {
        const caseToAnalyze = cases.find((c) => c.id === caseId);

        setAnalysisResult({
          summary: `This ${
            caseToAnalyze.title
          } involves a ${caseToAnalyze.description.toLowerCase()} The case is currently ${
            caseToAnalyze.status
          } with ${caseToAnalyze.priority} priority.`,
          riskAssessment: {
            overall: 65,
            factors: [
              {
                name: "Precedent Strength",
                score: 72,
                description:
                  "Favorable precedents exist but some contradictions",
              },
              {
                name: "Evidence Quality",
                score: 68,
                description: "Key documents available but some gaps exist",
              },
              {
                name: "Opposing Counsel",
                score: 58,
                description:
                  "Experienced opposing counsel with strong track record",
              },
              {
                name: "Jurisdiction Favorability",
                score: 70,
                description:
                  "Generally favorable jurisdiction for similar cases",
              },
            ],
          },
          precedents: [
            {
              case: "Wilson v. Enterprise Corp",
              relevance: 85,
              outcome: "Favorable",
              citation: "123 F.3d 456 (2020)",
            },
            {
              case: "Roberts v. Standard Inc",
              relevance: 78,
              outcome: "Favorable",
              citation: "234 F.3d 567 (2019)",
            },
            {
              case: "Thompson v. Global LLC",
              relevance: 65,
              outcome: "Unfavorable",
              citation: "345 F.3d 678 (2018)",
            },
          ],
          timeline: [
            { event: "Case Filing", date: "2024-01-10", status: "Completed" },
            {
              event: "Discovery Phase",
              date: "2024-02-15",
              status: "In Progress",
            },
            { event: "Deposition", date: "2024-03-10", status: "Scheduled" },
            { event: "Mediation", date: "2024-04-05", status: "Scheduled" },
            { event: "Trial Date", date: "2024-06-15", status: "Tentative" },
          ],
          recommendations: [
            "Gather additional evidence regarding specific contract terms",
            "Prepare expert witness to testify on industry standards",
            "Consider early settlement discussions given risk assessment",
            "Research additional precedents in neighboring jurisdictions",
          ],
        });

        setAnalyzing(false);
        setShowInsights(true);
      }, 3000);
    } catch (error) {
      console.error("Error analyzing case:", error);
      setAnalyzing(false);
    }
  };

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || caseItem.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const CaseCard = ({ caseItem }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedCase(caseItem)}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {caseItem.title}
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            caseItem.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : caseItem.status === "pending"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          {caseItem.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {caseItem.description}
      </p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{caseItem.createdAt}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Briefcase className="w-4 h-4 mr-1" />
          <span>{caseItem.clientName}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {caseItem.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <FileText className="w-4 h-4 mr-1" />
            <span>{caseItem.documents}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{caseItem.precedents}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const RiskMeter = ({ score }) => (
    <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden w-full">
      <div
        className={`absolute top-0 left-0 h-full rounded-full ${
          score < 40
            ? "bg-green-500"
            : score < 70
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
        style={{ width: `${score}%` }}
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <span className="text-xs font-bold text-gray-900 dark:text-white">
          {score}%
        </span>
      </div>
    </div>
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
            Case Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analyze your legal cases with AI-powered insights and
            recommendations.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search cases..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter
                  size={18}
                  className="text-gray-500 dark:text-gray-400"
                />
                <select
                  className="border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus size={18} />
                <span>New Case</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Case List */}
          <div
            className={`${
              showInsights ? "hidden lg:block" : "col-span-full"
            } lg:col-span-1`}
          >
            <div className="space-y-6">
              {filteredCases.length > 0 ? (
                filteredCases.map((caseItem) => (
                  <CaseCard key={caseItem.id} caseItem={caseItem} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 text-center"
                >
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No cases found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search or filters
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Case Analysis */}
          {showInsights && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Case Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedCase?.title}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg">
                        <Share size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Scale className="w-4 h-4 mr-2" />
                      <span>{selectedCase?.court}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FileText className="w-4 h-4 mr-2" />
                      <span>Case #{selectedCase?.caseNumber}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{selectedCase?.createdAt}</span>
                    </div>
                  </div>
                </div>
                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex overflow-x-auto">
                    {[
                      "overview",
                      "risk",
                      "precedents",
                      "timeline",
                      "recommendations",
                    ].map((tab) => (
                      <button
                        key={tab}
                        className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                          activeTab === tab
                            ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>
                {/* Tab Content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === "overview" && (
                        <div>
                          <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                              Case Summary
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                              {analysisResult?.summary}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                                Key Details
                              </h4>
                              <ul className="space-y-2">
                                <li className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Client:
                                  </span>
                                  <span className="text-gray-900 dark:text-white font-medium">
                                    {selectedCase?.clientName}
                                  </span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Status:
                                  </span>
                                  <span className="text-gray-900 dark:text-white font-medium">
                                    {selectedCase?.status}
                                  </span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Priority:
                                  </span>
                                  <span className="text-gray-900 dark:text-white font-medium">
                                    {selectedCase?.priority}
                                  </span>
                                </li>
                                <li className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Documents:
                                  </span>
                                  <span className="text-gray-900 dark:text-white font-medium">
                                    {selectedCase?.documents}
                                  </span>
                                </li>
                              </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                                AI Insights
                              </h4>
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Overall Risk:
                                </span>
                                <span
                                  className={`font-medium ${
                                    analysisResult?.riskAssessment.overall < 40
                                      ? "text-green-600 dark:text-green-400"
                                      : analysisResult?.riskAssessment.overall <
                                        70
                                      ? "text-yellow-600 dark:text-yellow-400"
                                      : "text-red-600 dark:text-red-400"
                                  }`}
                                >
                                  {analysisResult?.riskAssessment.overall}%
                                </span>
                              </div>
                              <RiskMeter
                                score={analysisResult?.riskAssessment.overall}
                              />
                            </div>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                            <div className="flex items-start">
                              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                              <div>
                                <h4 className="text-md font-medium text-blue-900 dark:text-blue-300 mb-1">
                                  AI Recommendation
                                </h4>
                                <p className="text-blue-800 dark:text-blue-200 text-sm">
                                  {analysisResult?.recommendations[0]}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "risk" && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Risk Assessment
                          </h3>
                          <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-700 dark:text-gray-300">
                                Overall Risk Score
                              </span>
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {analysisResult?.riskAssessment.overall}%
                              </span>
                            </div>
                            <RiskMeter
                              score={analysisResult?.riskAssessment.overall}
                            />
                          </div>
                          <div className="space-y-6">
                            {analysisResult?.riskAssessment.factors.map(
                              (factor, index) => (
                                <div
                                  key={index}
                                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-900 dark:text-white">
                                      {factor.name}
                                    </h4>
                                    <span
                                      className={`font-medium ${
                                        factor.score < 40
                                          ? "text-green-600 dark:text-green-400"
                                          : factor.score < 70
                                          ? "text-yellow-600 dark:text-yellow-400"
                                          : "text-red-600 dark:text-red-400"
                                      }`}
                                    >
                                      {factor.score}%
                                    </span>
                                  </div>
                                  <RiskMeter score={factor.score} />
                                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    {factor.description}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {activeTab === "precedents" && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Relevant Precedents
                          </h3>
                          <div className="space-y-4">
                            {analysisResult?.precedents.map(
                              (precedent, index) => (
                                <motion.div
                                  key={index}
                                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                                  whileHover={{ scale: 1.01 }}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-900 dark:text-white">
                                      {precedent.case}
                                    </h4>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        precedent.outcome === "Favorable"
                                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                      }`}
                                    >
                                      {precedent.outcome}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                      {precedent.citation}
                                    </span>
                                    <span className="text-blue-600 dark:text-blue-400">
                                      Relevance: {precedent.relevance}%
                                    </span>
                                  </div>
                                </motion.div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {activeTab === "timeline" && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Case Timeline
                          </h3>
                          <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                            <div className="space-y-6">
                              {analysisResult?.timeline.map((event, index) => (
                                <div key={index} className="relative pl-10">
                                  {/* Timeline dot */}
                                  <div
                                    className={`absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center border-4 ${
                                      event.status === "Completed"
                                        ? "bg-green-500 border-green-200 dark:bg-green-700 dark:border-green-800"
                                        : event.status === "In Progress"
                                        ? "bg-yellow-500 border-yellow-200 dark:bg-yellow-700 dark:border-yellow-800"
                                        : "bg-blue-500 border-blue-200 dark:bg-blue-700 dark:border-blue-800"
                                    }`}
                                  >
                                    <Clock className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="ml-2">
                                    <div className="flex items-center space-x-2">
                                      <span className="font-medium text-gray-900 dark:text-white">
                                        {event.event}
                                      </span>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        ({event.status})
                                      </span>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                      {event.date}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "recommendations" && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            AI Recommendations
                          </h3>
                          <ul className="space-y-4">
                            {analysisResult?.recommendations.map((rec, idx) => (
                              <li
                                key={idx}
                                className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex items-start"
                              >
                                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-blue-800 dark:text-blue-200 text-sm">
                                  {rec}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>{" "}
                {/* End of Tab Content */}
              </div>{" "}
              {/* End of Card */}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseAnalysis;
