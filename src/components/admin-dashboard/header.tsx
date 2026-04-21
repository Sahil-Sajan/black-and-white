"use client";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logoutAdmin } from "../../lib/actions/auth";

const AdminHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/');
  };

  const getTitle = () => {
    const path = pathname.split("/").pop();
    if (!path || path === "admin" || path === "dashboard") return "Dashboard";

    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="h-20 w-full bg-[#F9FBFC] border-b border-gray-100 flex items-center justify-between px-4 md:px-8 lg:sticky top-0 z-10">
      {/* Left Side: Dynamic Title */}
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-black text-slate-800 leading-tight">
          {getTitle()}
        </h1>
        {/* Hidden on mobile to save vertical space */}
        <p className="text-[11px] md:text-[13px] font-medium text-slate-400 mt-0.5 hidden sm:block">
          Welcome back, Admin.
        </p>
      </div>
      {/* Right Side: Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-sm font-black text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
      >
        <LogOut size={18} />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  );
};

export default AdminHeader;
