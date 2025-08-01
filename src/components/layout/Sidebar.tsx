import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import AppSelector from "@/components/ui/AppSelector";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Users", href: "/users", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface App {
  id: string;
  name: string;
  description?: string;
}

// Dummy app data
const apps: App[] = [
  { id: "1", name: "Main App", description: "Primary application" },
  { id: "2", name: "Analytics App", description: "Data analytics platform" },
  { id: "3", name: "CRM App", description: "Customer relationship management" },
  { id: "4", name: "E-commerce App", description: "Online store platform" },
];

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [selectedApp, setSelectedApp] = useState(apps[0]);

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-[calc(100vh-20px)] glass text-white transition-all duration-300 z-50 m-4 mt-2 mb-2 rounded-2xl bg-gray-600/10",
        isCollapsed ? "w-16" : "w-60"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!isCollapsed ? (
          <AppSelector
            apps={apps}
            selectedApp={selectedApp}
            onAppSelect={(app) => setSelectedApp(app)}
            className="flex-1 mr-2"
          />
        ) : (
          <div className="flex-1"></div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-white hover:bg-white/10 hover:scale-110"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <ul className="space-y-2 px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-[#5563F5] to-[#A284EC] text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white hover:scale-105",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#5563F5]/20 to-[#A284EC]/20 rounded-xl blur-sm"></div>
                  )}
                  <Icon size={20} className="relative z-10" />
                  {!isCollapsed && (
                    <span className="relative z-10">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logo at bottom */}
      <div className="absolute bottom-6 left-0 right-0 px-4">
        {!isCollapsed ? (
          <div className="flex items-center justify-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#5563F5] to-[#A284EC] bg-clip-text text-transparent">
              errix
            </h1>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-[#5563F5] to-[#A284EC] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">E</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
