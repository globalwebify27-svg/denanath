import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#f4f7fb] overflow-hidden" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-[#f4f7fb]/50">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
