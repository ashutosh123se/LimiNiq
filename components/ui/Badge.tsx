import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("pill-badge", className)}>{children}</span>;
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="pill-badge mb-4">
      <span style={{ color: "var(--accent)" }}>✦</span> {children}
    </div>
  );
}

export function Card({
  children,
  className,
  premium,
}: {
  children: React.ReactNode;
  className?: string;
  premium?: boolean;
}) {
  return (
    <div className={cn(premium ? "glass-card-premium" : "glass-card", "p-6", className)}>
      {children}
    </div>
  );
}
