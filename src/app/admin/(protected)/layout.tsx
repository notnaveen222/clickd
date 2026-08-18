import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto overflow-x-auto">
        {children}
      </main>
    </div>
  );
}
