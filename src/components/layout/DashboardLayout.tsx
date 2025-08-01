import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AvatarDropdown from "@/components/ui/AvatarDropdown";
import { cn } from "@/lib/utils";

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    initials: "JD",
  };

  const handleLogout = () => {
    // Handle logout - for now just redirect to login
    window.location.href = "/login";
  };

  const handleProfile = () => {
    console.log("Navigate to profile");
  };

  const handleSettings = () => {
    console.log("Navigate to settings");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#A284EC]/40 via-[#5563F5]/30 to-[#A284EC]/50"></div> */}
      {/* <div className="absolute inset-0 bg-gradient-to-tl from-[#1a1a2e]/80 via-[#A284EC]/20 to-[#0a0a0a]/90"></div> */}

      {/* Floating background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-[#A284EC]/25 to-[#5563F5]/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-[#A284EC]/30 to-[#5563F5]/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-[#A284EC]/15 to-[#A284EC]/25 rounded-full blur-3xl"></div>

      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300 relative z-10",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        {/* Top Bar */}
        <header className="glass-card border-b border-white/10 px-6 py-4 mx-4 mt-4 rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <div className="glass-card px-3 py-1 rounded-lg">
                <span className="text-sm text-gray-300">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Avatar Dropdown */}
              <AvatarDropdown
                user={user}
                onLogout={handleLogout}
                onProfile={handleProfile}
                onSettings={handleSettings}
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
