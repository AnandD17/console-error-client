"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RadioGroupContextType {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextType>({});

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

function RadioGroup({
  value,
  onValueChange,
  disabled = false,
  className,
  children,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange, disabled }}>
      <div className={cn("space-y-2", className)} role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
}

function RadioGroupItem({
  value,
  disabled = false,
  className,
}: RadioGroupItemProps) {
  const context = React.useContext(RadioGroupContext);
  const isSelected = context.value === value;
  const isDisabled = disabled || context.disabled;

  const handleClick = () => {
    if (!isDisabled && context.onValueChange) {
      context.onValueChange(value);
    }
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      disabled={isDisabled}
      onClick={handleClick}
      className={cn(
        "size-4 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5563F5] focus:ring-offset-2 focus:ring-offset-gray-800",
        isSelected && "border-[#5563F5] bg-[#5563F5]",
        isDisabled && "opacity-50 cursor-not-allowed",
        !isDisabled && "cursor-pointer hover:border-[#5563F5]",
        className
      )}
    >
      {isSelected && <div className="size-2 rounded-full bg-white" />}
    </button>
  );
}

export { RadioGroup, RadioGroupItem };
