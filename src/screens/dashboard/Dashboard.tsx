import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { BarChart3, Users, DollarSign, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "2,543",
    change: "+12%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Revenue",
    value: "$45,231",
    change: "+8%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    title: "Growth",
    value: "23.5%",
    change: "+3%",
    changeType: "positive",
    icon: TrendingUp,
  },
  {
    title: "Analytics",
    value: "12,459",
    change: "-2%",
    changeType: "negative",
    icon: BarChart3,
  },
];

const recentActivity = [
  {
    id: 1,
    user: "John Doe",
    action: "Created new account",
    time: "2 minutes ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Updated profile",
    time: "15 minutes ago",
  },
  { id: 3, user: "Bob Johnson", action: "Made a purchase", time: "1 hour ago" },
  { id: 4, user: "Alice Brown", action: "Logged in", time: "2 hours ago" },
  {
    id: 5,
    user: "Charlie Wilson",
    action: "Changed password",
    time: "3 hours ago",
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
        {/* Recent Activity */}
        <Card className="col-span-2 glass-hover">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-400">
              Latest user activities and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-[#5563F5] to-[#A284EC] rounded-full"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-white">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-400">{activity.action}</p>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass-hover">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-400">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full text-left px-4 py-3 text-sm glass-card hover:bg-white/10 rounded-lg transition-all duration-200 text-white">
              Create New User
            </button>
            <button className="w-full text-left px-4 py-3 text-sm glass-card hover:bg-white/10 rounded-lg transition-all duration-200 text-white">
              Generate Report
            </button>
            <button className="w-full text-left px-4 py-3 text-sm glass-card hover:bg-white/10 rounded-lg transition-all duration-200 text-white">
              View Analytics
            </button>
            <button className="w-full text-left px-4 py-3 text-sm glass-card hover:bg-white/10 rounded-lg transition-all duration-200 text-white">
              System Settings
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-hover">
          <CardHeader>
            <CardTitle className="text-white">Performance Overview</CardTitle>
            <CardDescription className="text-gray-400">
              System performance metrics for the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 glass-card rounded-lg flex items-center justify-center border border-white/10">
              <p className="text-gray-400 text-center">
                📊 Chart placeholder
                <br />
                <span className="text-sm">Performance data visualization</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-hover">
          <CardHeader>
            <CardTitle className="text-white">User Engagement</CardTitle>
            <CardDescription className="text-gray-400">
              User activity and engagement statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 glass-card rounded-lg flex items-center justify-center border border-white/10">
              <p className="text-gray-400 text-center">
                📈 Chart placeholder
                <br />
                <span className="text-sm">User engagement metrics</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
