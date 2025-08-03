import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchSelect from "@/components/ui/SearchSelect";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  showPreviousNext?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  limit = 10,
  onLimitChange,
  showPreviousNext = true,
  className = "",
}: PaginationProps) {
  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    // Always show first page
    buttons.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="sm"
        onClick={() => onPageChange(1)}
        className={
          currentPage === 1
            ? "bg-purple-600 text-white cursor-pointer"
            : "bg-gray-800/40 border-gray-700/50 text-gray-200 cursor-pointer"
        }
      >
        1
      </Button>
    );

    if (totalPages <= 1) {
      return buttons;
    }

    let startPage = Math.max(2, currentPage - halfVisible);
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage === totalPages - 1) {
      startPage = Math.max(2, endPage - maxVisiblePages + 1);
    }

    if (startPage > 2) {
      buttons.push(
        <span key="start-ellipsis" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(i)}
          className={
            currentPage === i
              ? "bg-purple-600 text-white cursor-pointer"
              : "bg-gray-800/40 border-gray-700/50 text-gray-200 cursor-pointer"
          }
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages - 1) {
      buttons.push(
        <span key="end-ellipsis" className="px-2 text-gray-400">
          ...
        </span>
      );
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      buttons.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(totalPages)}
          className={
            currentPage === totalPages
              ? "bg-purple-600 text-white cursor-pointer"
              : "bg-gray-800/40 border-gray-700/50 text-gray-200 cursor-pointer"
          }
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  const limitOptions = [
    { label: "10 per page", value: "10" },
    { label: "25 per page", value: "25" },
    { label: "50 per page", value: "50" },
    { label: "75 per page", value: "75" },
    { label: "100 per page", value: "100" },
  ];

  return (
    <div className="flex items-center justify-between w-full mt-6">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 ml-4">
          <span className="text-sm text-gray-400">Show:</span>
          <SearchSelect
            value={limit.toString()}
            onChange={(value) => onLimitChange(parseInt(value))}
            options={limitOptions}
            placeholder="Select limit"
            showSearch={false}
            className="w-[120px]"
          />
        </div>
        <div className="flex-shrink-0">
          <span className="text-sm text-gray-400">
            Showing {currentPage} of {totalPages} pages
          </span>
        </div>
      </div>
      <div className="flex-shrink-0">
        <div className={`flex items-center justify-between ${className}`}>
          <div className="flex items-center space-x-2">
            {showPreviousNext && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || totalPages <= 1}
                className="bg-gray-800/40 border-gray-700/50 text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            )}
            <div className="flex items-center space-x-1">
              {renderPageButtons()}
            </div>
            {showPreviousNext && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages <= 1}
                className="bg-gray-800/40 border-gray-700/50 text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
