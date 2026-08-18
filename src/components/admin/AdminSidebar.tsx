"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogoutButton from "@/components/AdminLogoutButton";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Orders" },
  { href: "/admin/prices", label: "Prices" },
  { href: "/admin/logs", label: "Logs" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r bg-white p-4">
      <div className="mb-6 px-2 text-lg font-semibold">Admin</div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-brand-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <AdminLogoutButton />
    </aside>
  );
}
