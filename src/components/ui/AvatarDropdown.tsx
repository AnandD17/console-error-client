import { useState } from "react";
import { LogOut, User, Settings } from "lucide-react";
import Dropdown from "@/components/ui/Dropdown";

interface UserInfo {
  name: string;
  email: string;
  initials: string;
}

interface AvatarDropdownProps {
  user: UserInfo;
  onLogout: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
  className?: string;
}

export default function AvatarDropdown({
  user,
  onLogout,
  onProfile,
  onSettings,
  className = "",
}: AvatarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownItems = [
    ...(onProfile
      ? [
          {
            id: "profile",
            label: "Profile",
            icon: <User size={16} />,
            onClick: onProfile,
          },
        ]
      : []),
    ...(onSettings
      ? [
          {
            id: "settings",
            label: "Settings",
            icon: <Settings size={16} />,
            onClick: onSettings,
          },
        ]
      : []),
    {
      id: "logout",
      label: "Logout",
      icon: <LogOut size={16} />,
      onClick: onLogout,
      className:
        "text-red-400 hover:bg-red-500/20 hover:text-red-300 border-t border-gray-700 mt-1 pt-1",
    },
  ];

  const trigger = (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-8 h-8 bg-gradient-to-r from-[#5563F5] to-[#A284EC] rounded-full flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
    >
      <span className="text-white text-sm font-medium">{user.initials}</span>
    </button>
  );

  const header = (
    <>
      <div className="text-sm font-medium text-white">{user.name}</div>
      <div className="text-xs text-gray-400">{user.email}</div>
    </>
  );

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={trigger}
      items={dropdownItems}
      className={className}
      header={header}
    />
  );
}
