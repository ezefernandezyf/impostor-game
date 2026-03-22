import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps): ReactElement {
  const baseClassName =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition";
  const variantClassName = variant === "primary" ? "bg-white text-slate-950" : "bg-slate-800 text-white";

  return <button className={`${baseClassName} ${variantClassName} ${className}`.trim()} {...props} />;
}