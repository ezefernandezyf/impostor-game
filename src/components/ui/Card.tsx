import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps): ReactElement {
  return (
    <section className={`rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}
