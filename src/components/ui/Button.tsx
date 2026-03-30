import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps): ReactElement {
  const baseClassName =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-60";
  const variantClassName =
    variant === "primary"
      ? "bg-white text-slate-950 hover:bg-white/90 active:bg-white/80"
      : "bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-600";

  return <button className={`${baseClassName} ${variantClassName} ${className}`.trim()} {...props} />;
}
