"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleClick = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  return (
    <button
      className="w-full cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold transition-all duration-200 ease-in-out hover:bg-black hover:text-white"
      onClick={handleClick}
    >
      Log out
    </button>
  );
}
