import { useState } from "react";
import { ChevronDown } from "lucide-react";
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

  const dropdownItems = apps.map((app) => ({
    id: app.id,
    label: app.name,
    onClick: () => onAppSelect(app),
    className:
      selectedApp.id === app.id
        ? "bg-gradient-to-r from-[#5563F5]/20 to-[#A284EC]/20"
        : "",
  }));

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
