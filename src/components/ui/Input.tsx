import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactElement } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className = "", ...props }, ref): ReactElement {
  return (
    <input
      ref={ref}
      className={`w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20 ${className}`.trim()}
      {...props}
    />
  );
});
