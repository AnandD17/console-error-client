import React, { useState, useRef } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "./select";
import { Input } from "./Input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
interface SearchSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string; tag?: string }[];
  placeholder?: string;
  showSearch?: boolean;
  className?: string;
  label?: string;
}
const SearchSelect = ({
  value,
  onChange,
  options,
  placeholder,
  showSearch,
  className,
}: SearchSelectProps) => {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    inputRef.current?.focus();
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Select
      onValueChange={(value: string) => {
        onChange(value);
      }}
      value={value}
    >
      <SelectTrigger
        className={`bg-gray-800/40 text-gray-100 border-gray-700/50 backdrop-filter backdrop-blur-md w-[200px] shadow-sm ${className}`}
      >
        <SelectValue placeholder={placeholder ?? "Select"} />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-700 z-[60]">
        {showSearch && (
          <div className=" pt-1 pb-0">
            <div
              className="flex items-center border  border-input rounded-md bg-gray-700 px-1 py-1"
              onClick={handleSearchContainerClick}
            >
              <Search className=" opacity-50 mr-2 ml-1" />
              <Input
                ref={inputRef}
                type="text"
                value={search}
                onChange={handleInputChange}
                onClick={handleInputClick}
                placeholder="Search"
                className="border-0 h-7 bg-transparent px-0 py-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
        )}
        {options?.map((option) => {
          return (
            <SelectItem
              key={option.value}
              value={option.value}
              className={cn(
                option.label.toLowerCase().includes(search.toLowerCase())
                  ? "hover:bg-gray-700/40"
                  : "hidden",
                "cursor-pointer"
              )}
            >
              {option.label}
              {option.tag && (
                <span className="text-xs text-gray-500 ml-2 border border-gray-500 rounded-md px-1 py-0.5">
                  {option.tag}
                </span>
              )}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SearchSelect;
