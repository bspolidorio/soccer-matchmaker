import * as React from "react";
import { cn } from "@/shared/lib/utils";

const Select = ({ children, value, onValueChange, className }: { 
  children: React.ReactNode, 
  value?: string, 
  onValueChange?: (val: string) => void,
  className?: string 
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {children}
    </select>
  );
};

export { Select };
