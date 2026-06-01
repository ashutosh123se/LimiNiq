import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0D1028" }}>
      <AdminSidebar />
      <main style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
        {children}
      </main>
    </div>
  );
}
