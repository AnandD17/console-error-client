import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  AlertTriangle,
  Users,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  Zap,
  Globe,
} from "lucide-react";

const stats = [
  {
    title: "Total Errors",
    value: "1,247",
    change: "+23%",
    changeType: "negative",
    icon: AlertTriangle,
  },
  {
    title: "Affected Users",
    value: "892",
    change: "+8%",
    changeType: "negative",
    icon: Users,
  },
  {
    title: "Error Rate",
    value: "2.3%",
    change: "-0.5%",
    changeType: "positive",
    icon: TrendingDown,
  },
  {
    title: "Avg Response Time",
    value: "245ms",
    change: "+12ms",
    changeType: "negative",
    icon: Clock,
  },
];

const recentIssues = [
  {
    id: 1,
    title: "TypeError: Cannot read property 'map' of undefined",
    severity: "high",
    environment: "production",
    count: 47,
    time: "2 minutes ago",
    icon: AlertCircle,
    color: "text-orange-500",
  },
  {
    id: 2,
    title: "Network request failed",
    severity: "critical",
    environment: "production",
    count: 125,
    time: "15 minutes ago",
    icon: XCircle,
    color: "text-red-500",
  },
  {
    id: 3,
    title: "Memory leak in data processing",
    severity: "medium",
    environment: "staging",
    count: 12,
    time: "1 hour ago",
    icon: AlertTriangle,
    color: "text-yellow-500",
  },
  {
    id: 4,
    title: "Authentication token expired",
    severity: "resolved",
    environment: "production",
    count: 89,
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    id: 5,
    title: "CSS layout broken on mobile",
    severity: "low",
    environment: "production",
    count: 8,
    time: "3 hours ago",
    icon: AlertCircle,
    color: "text-blue-500",
  },
];

const topProjects = [
  {
    id: 1,
    name: "Main Web App",
    errors: 342,
    users: 1250,
    errorRate: "2.8%",
    status: "stable",
  },
  {
    id: 2,
    name: "Mobile API",
    errors: 156,
    users: 890,
    errorRate: "1.2%",
    status: "healthy",
  },
  {
    id: 3,
    name: "Analytics Service",
    errors: 89,
    users: 340,
    errorRate: "0.9%",
    status: "healthy",
  },
  {
    id: 4,
    name: "Payment Gateway",
    errors: 23,
    users: 567,
    errorRate: "0.4%",
    status: "excellent",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="glass-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#5563F5]/20 to-[#A284EC]/20 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-[#A284EC]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <p
                  className={`text-xs flex items-center ${
                    stat.changeType === "positive"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Issues */}
        <Card className="col-span-2 glass-hover">
          <CardHeader>
            <CardTitle className="text-white">Recent Issues</CardTitle>
            <CardDescription className="text-gray-400">
              Latest errors and exceptions across all projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIssues.map((issue) => {
                const Icon = issue.icon;
                return (
                  <div
                    key={issue.id}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                  >
                    <Icon className={`w-5 h-5 ${issue.color}`} />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none text-white truncate">
                        {issue.title}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400 capitalize">
                          {issue.environment}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-400">
                          {issue.count} events
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{issue.time}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Projects */}
        <Card className="glass-hover">
          <CardHeader>
            <CardTitle className="text-white">Top Projects</CardTitle>
            <CardDescription className="text-gray-400">
              Projects with most activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">
                    {project.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">
                      {project.errors} errors
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-400">
                      {project.users} users
                    </span>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-sm font-medium text-white">
                    {project.errorRate}
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${
                      project.status === "excellent"
                        ? "bg-green-500/20 text-green-400"
                        : project.status === "healthy"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {project.status}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-hover">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Error Trends
            </CardTitle>
            <CardDescription className="text-gray-400">
              Error frequency over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 glass-card rounded-lg flex items-center justify-center border border-white/10">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <TrendingDown className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-gray-400 text-sm">📈 Error trend chart</p>
                <p className="text-xs text-gray-500">
                  23% increase from last week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-hover">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription className="text-gray-400">
              Response time and throughput analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 glass-card rounded-lg flex items-center justify-center border border-white/10">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <Globe className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-gray-400 text-sm">⚡ Performance overview</p>
                <p className="text-xs text-gray-500">
                  Average: 245ms response time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
