import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import { cn } from "@/lib/utils";

interface App {
  id: string;
  name: string;
  description?: string;
}

interface AppSelectorProps {
  apps: App[];
  selectedApp: App;
  onAppSelect: (app: App) => void;
  className?: string;
}

export default function AppSelector({
  apps,
  selectedApp,
  onAppSelect,
  className = "",
}: AppSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddApp = () => {
    setIsOpen(false);
    navigate("/create-app");
  };

  const dropdownItems = [
    ...apps.map((app) => ({
      id: app.id,
      label: app.name,
      onClick: () => onAppSelect(app),
      className:
        selectedApp.id === app.id
          ? "bg-gradient-to-r from-[#5563F5]/20 to-[#A284EC]/20"
          : "",
    })),
    {
      id: "add-app",
      label: (
        <div className="flex items-center gap-2 text-[#5563F5] font-medium">
          <Plus size={16} />
          <span>Add App</span>
        </div>
      ),
      onClick: handleAddApp,
      className: "border-t border-gray-600 mt-1 pt-1",
    },
  ];

  const trigger = (
    <Button
      variant="ghost"
      onClick={() => setIsOpen(!isOpen)}
      className="w-full justify-between text-left p-2 text-white hover:bg-white/10 rounded-lg cursor-pointer"
    >
      <div className="truncate">
        <div className="text-sm font-medium truncate">{selectedApp.name}</div>
      </div>
      <ChevronDown
        size={16}
        className={cn("transition-transform", isOpen && "rotate-180")}
      />
    </Button>
  );

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={trigger}
      items={dropdownItems}
      className={className}
      position="left"
      width="w-full"
      dropdownClassName="mt-1"
    />
  );
}
