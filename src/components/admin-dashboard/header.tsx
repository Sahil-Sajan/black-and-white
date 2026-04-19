"use client";
import { usePathname } from "next/navigation";

const AdminHeader = () => {
  const pathname = usePathname();

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
    </header>
  );
};

export default AdminHeader;
