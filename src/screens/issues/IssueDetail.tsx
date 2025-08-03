import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Users,
  MapPin,
  Hash,
  Code,
  Monitor,
  Globe,
  Smartphone,
  Copy,
  ExternalLink,
} from "lucide-react";

interface DetailedIssue {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "resolved" | "closed";
  count: number;
  lastSeen: string;
  firstSeen: string;
  userAffected: number;
  environment: string;
  tags: string[];
  // Detailed information
  errorMessage: string;
  stackTrace: string;
  url: string;
  userAgent: string;
  browser: string;
  os: string;
  device: string;
  ipAddress: string;
  userId?: string;
  sessionId: string;
  requestId: string;
  timestamp: string;
  culprit: string;
  fingerprint: string;
  level: string;
  release: string;
  contexts: {
    runtime: {
      name: string;
      version: string;
    };
    browser: {
      name: string;
      version: string;
    };
    os: {
      name: string;
      version: string;
    };
  };
  breadcrumbs: Array<{
    timestamp: string;
    message: string;
    category: string;
    level: string;
  }>;
  occurrences: Array<{
    id: string;
    timestamp: string;
    user: {
      id?: string;
      email?: string;
      username?: string;
    };
    context: {
      url: string;
      userAgent: string;
    };
  }>;
}

// Mock detailed data for the issue
const mockDetailedIssues: { [key: string]: DetailedIssue } = {
  "1": {
    id: "1",
    title: "TypeError: Cannot read property 'map' of undefined",
    description:
      "Error occurs when trying to iterate over an undefined array in the user dashboard component.",
    severity: "high",
    status: "open",
    count: 47,
    lastSeen: "2024-01-15T10:30:00Z",
    firstSeen: "2024-01-14T15:20:00Z",
    userAffected: 23,
    environment: "production",
    tags: ["javascript", "react", "dashboard"],
    errorMessage: "TypeError: Cannot read property 'map' of undefined",
    stackTrace: `TypeError: Cannot read property 'map' of undefined
    at UserDashboard (https://app.example.com/static/js/dashboard.js:145:23)
    at renderWithHooks (https://app.example.com/static/js/react-dom.js:14985:18)
    at mountIndeterminateComponent (https://app.example.com/static/js/react-dom.js:17811:13)
    at beginWork (https://app.example.com/static/js/react-dom.js:19049:16)
    at HTMLUnknownElement.callCallback (https://app.example.com/static/js/react-dom.js:3945:14)
    at Object.invokeGuardedCallbackDev (https://app.example.com/static/js/react-dom.js:3994:16)
    at invokeGuardedCallback (https://app.example.com/static/js/react-dom.js:4056:31)
    at beginWork$1 (https://app.example.com/static/js/react-dom.js:23964:7)
    at performUnitOfWork (https://app.example.com/static/js/react-dom.js:22776:12)
    at workLoopSync (https://app.example.com/static/js/react-dom.js:22707:5)`,
    url: "https://app.example.com/dashboard",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    browser: "Chrome 120.0.0.0",
    os: "Windows 10",
    device: "Desktop",
    ipAddress: "192.168.1.100",
    userId: "user_12345",
    sessionId: "sess_abcd1234",
    requestId: "req_xyz789",
    timestamp: "2024-01-15T10:30:15.123Z",
    culprit: "dashboard.js in UserDashboard",
    fingerprint: "{{ default }}",
    level: "error",
    release: "v1.2.3",
    contexts: {
      runtime: {
        name: "node",
        version: "18.17.0",
      },
      browser: {
        name: "Chrome",
        version: "120.0.0.0",
      },
      os: {
        name: "Windows",
        version: "10",
      },
    },
    breadcrumbs: [
      {
        timestamp: "2024-01-15T10:29:45.000Z",
        message: "User navigated to dashboard",
        category: "navigation",
        level: "info",
      },
      {
        timestamp: "2024-01-15T10:30:00.000Z",
        message: "API call to /api/users started",
        category: "http",
        level: "info",
      },
      {
        timestamp: "2024-01-15T10:30:10.000Z",
        message: "API call to /api/users completed",
        category: "http",
        level: "info",
      },
      {
        timestamp: "2024-01-15T10:30:15.000Z",
        message: "TypeError occurred in UserDashboard component",
        category: "error",
        level: "error",
      },
    ],
    occurrences: [
      {
        id: "occ_1",
        timestamp: "2024-01-15T10:30:15.123Z",
        user: {
          id: "user_12345",
          email: "john.doe@example.com",
          username: "johndoe",
        },
        context: {
          url: "https://app.example.com/dashboard",
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      },
      {
        id: "occ_2",
        timestamp: "2024-01-15T09:45:22.456Z",
        user: {
          id: "user_67890",
          email: "jane.smith@example.com",
          username: "janesmith",
        },
        context: {
          url: "https://app.example.com/dashboard",
          userAgent:
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
      },
    ],
  },
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "text-red-500 bg-red-500/10 border-red-500/20";
    case "high":
      return "text-orange-500 bg-orange-500/10 border-orange-500/20";
    case "medium":
      return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    case "low":
      return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    default:
      return "text-gray-500 bg-gray-500/10 border-gray-500/20";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "open":
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case "in_progress":
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case "resolved":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "closed":
      return <XCircle className="w-5 h-5 text-gray-500" />;
    default:
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

export default function IssueDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [issue, setIssue] = useState<DetailedIssue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (id && mockDetailedIssues[id]) {
        setIssue(mockDetailedIssues[id]);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-center items-center h-40">
          <div className="text-gray-400">Loading issue details...</div>
        </div>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="p-6 space-y-6">
        <Card className="p-8 text-center">
          <div className="text-gray-400">Issue not found.</div>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "stacktrace", label: "Stack Trace" },
    { id: "breadcrumbs", label: "Breadcrumbs" },
    { id: "occurrences", label: "Occurrences" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/issues")}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Issues
        </Button>
      </div>

      {/* Issue Header */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              {getStatusIcon(issue.status)}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-white mb-2">
                  {issue.title}
                </h1>
                <p className="text-gray-400">{issue.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize border ${getSeverityColor(
                  issue.severity
                )}`}
              >
                {issue.severity}
              </span>
              <span className="text-sm text-gray-400 capitalize">
                {issue.status.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-4 border-t border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{issue.count}</div>
              <div className="text-sm text-gray-400">Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {issue.userAffected}
              </div>
              <div className="text-sm text-gray-400">Users</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-white">
                {formatDate(issue.firstSeen).split(",")[0]}
              </div>
              <div className="text-sm text-gray-400">First Seen</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-white">
                {formatDate(issue.lastSeen).split(",")[0]}
              </div>
              <div className="text-sm text-gray-400">Last Seen</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-white capitalize">
                {issue.environment}
              </div>
              <div className="text-sm text-gray-400">Environment</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-white">
                {issue.release}
              </div>
              <div className="text-sm text-gray-400">Release</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                activeTab === tab.id
                  ? "border-[#5563F5] text-[#5563F5]"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Error Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Code className="w-5 h-5" />
              Error Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Error Message</label>
                <div className="mt-1 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <code className="text-red-400 text-sm">
                    {issue.errorMessage}
                  </code>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Culprit</label>
                <div className="mt-1 text-white font-mono text-sm">
                  {issue.culprit}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Level</label>
                <div className="mt-1 text-white capitalize">{issue.level}</div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Fingerprint</label>
                <div className="mt-1 text-white font-mono text-sm">
                  {issue.fingerprint}
                </div>
              </div>
            </div>
          </Card>

          {/* Context Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Context
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  URL
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <code className="text-blue-400 text-sm">{issue.url}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(issue.url, "_blank")}
                    className="p-1 h-auto cursor-pointer"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 flex items-center gap-1">
                  <Smartphone className="w-4 h-4" />
                  Browser
                </label>
                <div className="mt-1 text-white">{issue.browser}</div>
              </div>
              <div>
                <label className="text-sm text-gray-400">
                  Operating System
                </label>
                <div className="mt-1 text-white">{issue.os}</div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Device</label>
                <div className="mt-1 text-white">{issue.device}</div>
              </div>
              <div>
                <label className="text-sm text-gray-400 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  IP Address
                </label>
                <div className="mt-1 text-white font-mono">
                  {issue.ipAddress}
                </div>
              </div>
            </div>
          </Card>

          {/* Runtime Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5" />
              Runtime Context
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Runtime</label>
                <div className="mt-1 text-white">
                  {issue.contexts.runtime.name} {issue.contexts.runtime.version}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Session ID</label>
                <div className="mt-1 flex items-center gap-2">
                  <code className="text-white font-mono text-sm">
                    {issue.sessionId}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(issue.sessionId)}
                    className="p-1 h-auto cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Request ID</label>
                <div className="mt-1 flex items-center gap-2">
                  <code className="text-white font-mono text-sm">
                    {issue.requestId}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(issue.requestId)}
                    className="p-1 h-auto cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              {issue.userId && (
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    User ID
                  </label>
                  <div className="mt-1 text-white font-mono">
                    {issue.userId}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Tags */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {issue.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "stacktrace" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Code className="w-5 h-5" />
              Stack Trace
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(issue.stackTrace)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap">
              {issue.stackTrace}
            </pre>
          </div>
        </Card>
      )}

      {activeTab === "breadcrumbs" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Breadcrumbs
          </h3>
          <div className="space-y-3">
            {issue.breadcrumbs.map((breadcrumb, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 bg-gray-800/50 rounded-lg"
              >
                <div className="text-xs text-gray-400 min-w-[120px]">
                  {formatDate(breadcrumb.timestamp).split(", ")[1]}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white">{breadcrumb.message}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {breadcrumb.category} • {breadcrumb.level}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "occurrences" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Recent Occurrences
          </h3>
          <div className="space-y-4">
            {issue.occurrences.map((occurrence) => (
              <div
                key={occurrence.id}
                className="p-4 bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="text-sm text-white">
                      {formatDate(occurrence.timestamp)}
                    </div>
                    {occurrence.user.email && (
                      <div className="text-sm text-gray-400">
                        User: {occurrence.user.email}
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      {occurrence.context.url}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300 cursor-pointer"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
