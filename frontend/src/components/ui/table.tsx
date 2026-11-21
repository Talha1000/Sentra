import React from "react";
import { cn } from "@/lib/utils";

export function Table({ className, children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0D111A]/60 backdrop-blur-md">
      <table className={cn("w-full caption-bottom text-xs text-left", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn("border-b border-white/[0.08] bg-white/[0.02] text-slate-400 uppercase tracking-wider font-sans font-semibold text-[11px]", className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("divide-y divide-white/[0.05]", className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn("hover:bg-white/[0.04] transition-colors duration-150 group", className)} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ className, children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn("h-11 px-5 py-3.5 align-middle font-semibold text-slate-300 whitespace-nowrap", className)} {...props}>
      {children}
    </th>
  );
}

export function TableCell({ className, children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("px-5 py-4 align-middle text-slate-200 font-sans group-hover:text-white transition-colors", className)} {...props}>
      {children}
    </td>
  );
}
