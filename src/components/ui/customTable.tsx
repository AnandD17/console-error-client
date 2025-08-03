import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

type TTableProps = {
  data: any[];
  columns: {
    label: string;
    key: string;
    render?: (value: any, item: any) => React.ReactNode | undefined;
  }[];
  emptyState?: React.ReactNode;
  className?: string;
  rowClassName?: string;
  onRowClick?: (item: any) => void;
};

const CustomTable = ({
  data,
  columns,
  emptyState,
  className,
  rowClassName,
  onRowClick,
}: TTableProps) => {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-lg border border-gray-700/50 w-full",
        className
      )}
    >
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="border-gray-700/50 bg-gray-800/40 hover:bg-gray-800/60">
            {columns.map((column) => (
              <TableHead
                className="text-gray-300 font-medium py-3"
                key={column.key}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <TableRow
                key={item.id}
                className={cn(
                  "border-gray-700/50 hover:bg-gray-800/60 transition-colors duration-150",
                  onRowClick && "cursor-pointer",
                  rowClassName
                )}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <TableCell className="text-gray-200" key={column.key}>
                    {column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-gray-400 py-8">
                {emptyState || (
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-5 w-5 text-gray-500" />
                    <p>No data found</p>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;
