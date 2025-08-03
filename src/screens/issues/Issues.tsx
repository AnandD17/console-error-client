import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Pagination from "@/components/ui/Pagination";
import { Search, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";

interface Issue {
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
}

interface PaginationState {
  currentPage: number;
  limit: number;
  search: string;
}

// Mock data for issues
const mockIssues: Issue[] = [
  {
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
  },
  {
    id: "2",
    title: "Network request failed",
    description:
      "API calls to /api/users endpoint are failing with 500 status code.",
    severity: "critical",
    status: "in_progress",
    count: 125,
    lastSeen: "2024-01-15T11:45:00Z",
    firstSeen: "2024-01-15T08:30:00Z",
    userAffected: 87,
    environment: "production",
    tags: ["api", "network", "backend"],
  },
  {
    id: "3",
    title: "Memory leak in data processing",
    description:
      "Memory usage continuously increases during large dataset processing operations.",
    severity: "medium",
    status: "open",
    count: 12,
    lastSeen: "2024-01-15T09:15:00Z",
    firstSeen: "2024-01-13T14:20:00Z",
    userAffected: 5,
    environment: "staging",
    tags: ["memory", "performance", "data"],
  },
  {
    id: "4",
    title: "Authentication token expired",
    description:
      "Users are being logged out unexpectedly due to premature token expiration.",
    severity: "high",
    status: "resolved",
    count: 89,
    lastSeen: "2024-01-14T16:30:00Z",
    firstSeen: "2024-01-12T11:15:00Z",
    userAffected: 45,
    environment: "production",
    tags: ["auth", "token", "security"],
  },
  {
    id: "5",
    title: "CSS layout broken on mobile",
    description:
      "The navigation menu is not displaying correctly on mobile devices.",
    severity: "low",
    status: "open",
    count: 8,
    lastSeen: "2024-01-15T08:20:00Z",
    firstSeen: "2024-01-14T12:10:00Z",
    userAffected: 12,
    environment: "production",
    tags: ["css", "mobile", "ui"],
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "text-red-500 bg-red-500/10";
    case "high":
      return "text-orange-500 bg-orange-500/10";
    case "medium":
      return "text-yellow-500 bg-yellow-500/10";
    case "low":
      return "text-blue-500 bg-blue-500/10";
    default:
      return "text-gray-500 bg-gray-500/10";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "open":
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    case "in_progress":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "resolved":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "closed":
      return <XCircle className="w-4 h-4 text-gray-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-gray-500" />;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Issues() {
  const navigate = useNavigate();
  const [paginationState, setPaginationState] = useState<PaginationState>({
    currentPage: 1,
    limit: 10,
    search: "",
  });

  const [filteredIssues, setFilteredIssues] = useState<Issue[]>(mockIssues);
  const [isLoading] = useState(false);

  // Filter issues based on search
  useEffect(() => {
    const filtered = mockIssues.filter(
      (issue) =>
        issue.title
          .toLowerCase()
          .includes(paginationState.search.toLowerCase()) ||
        issue.description
          .toLowerCase()
          .includes(paginationState.search.toLowerCase()) ||
        issue.tags.some((tag) =>
          tag.toLowerCase().includes(paginationState.search.toLowerCase())
        )
    );
    setFilteredIssues(filtered);
    // Reset to first page when search changes
    if (paginationState.currentPage > 1) {
      updatePaginationState("currentPage", 1);
    }
  }, [paginationState.search]);

  const updatePaginationState = (
    field: keyof PaginationState,
    value: string | number
  ) => {
    setPaginationState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredIssues.length / paginationState.limit);
  const startIndex = (paginationState.currentPage - 1) * paginationState.limit;
  const endIndex = startIndex + paginationState.limit;
  const currentIssues = filteredIssues.slice(startIndex, endIndex);

  const handleSearch = (value: string) => {
    updatePaginationState("search", value);
  };

  const handleIssueClick = (issueId: string) => {
    navigate(`/issues/${issueId}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Issues</h1>
          <p className="text-gray-400 mt-1">
            Monitor and track application errors and issues
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search issues..."
              value={paginationState.search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-gray-400">Loading issues...</div>
          </div>
        ) : currentIssues.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-gray-400">
              {paginationState.search
                ? "No issues match your search."
                : "No issues found."}
            </div>
          </Card>
        ) : (
          currentIssues.map((issue) => (
            <Card
              key={issue.id}
              className="p-6 hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => handleIssueClick(issue.id)}
            >
              <div className="space-y-4">
                {/* Issue Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3 flex-1">
                    {getStatusIcon(issue.status)}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-white truncate">
                        {issue.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {issue.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(
                        issue.severity
                      )}`}
                    >
                      {issue.severity}
                    </span>
                  </div>
                </div>

                {/* Issue Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Count:</span>
                    <span className="text-white ml-2 font-medium">
                      {issue.count}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Users Affected:</span>
                    <span className="text-white ml-2 font-medium">
                      {issue.userAffected}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Seen:</span>
                    <span className="text-white ml-2 font-medium">
                      {formatDate(issue.lastSeen)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Environment:</span>
                    <span className="text-white ml-2 font-medium capitalize">
                      {issue.environment}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {issue.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {filteredIssues.length > 0 && (
        <Pagination
          currentPage={paginationState.currentPage}
          totalPages={totalPages}
          limit={paginationState.limit}
          onPageChange={(page) => updatePaginationState("currentPage", page)}
          onLimitChange={(limit) => updatePaginationState("limit", limit)}
          className="mt-6"
        />
      )}
    </div>
  );
}
