import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: ReactNode;
  items: DropdownItem[];
  className?: string;
  dropdownClassName?: string;
  position?: "left" | "right";
  width?: string;
  header?: ReactNode;
}

export default function Dropdown({
  isOpen,
  onClose,
  trigger,
  items,
  className = "",
  dropdownClassName = "",
  position = "right",
  width = "w-48",
  header,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {trigger}

      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-2 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden z-50 shadow-xl",
            width,
            position === "left" ? "left-0" : "right-0",
            dropdownClassName
          )}
        >
          {header && (
            <div className="p-3 border-b border-gray-700">{header}</div>
          )}

          <div className="py-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick();
                    onClose();
                  }
                }}
                disabled={item.disabled}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors cursor-pointer",
                  item.disabled
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  item.className
                )}
              >
                {item.icon && (
                  <span className="flex-shrink-0">{item.icon}</span>
                )}
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
