import { forwardRef } from "react";
import type { ReactElement, SelectHTMLAttributes } from "react";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ className = "", children, ...props }, ref): ReactElement {
  return (
    <select
      ref={ref}
      className={`w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20 ${className}`.trim()}
      {...props}
    >
      {children}
    </select>
  );
});
