import React from "react";
import { cn } from "@/lib/utils";

export function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto border-2 border-ink-black bg-white rounded-none shadow-sharp">
      <table className={cn("w-full caption-bottom text-xs text-left", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        "border-b-2 border-ink-black bg-vellum-100 text-ink-black font-mono text-[10px] uppercase tracking-wider",
        className
      )}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0 divide-y-2 divide-vellum-200 bg-white", className)}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn("hover:bg-vellum-50 transition-colors border-b border-vellum-200", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn("h-8 px-3.5 text-left align-middle font-bold text-ink-black border-r border-vellum-300 last:border-r-0", className)}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("p-3.5 align-middle text-ink-charcoal tabular-nums font-mono border-r border-vellum-200 last:border-r-0", className)}
      {...props}
    />
  );
}
