import Sidebar from "../components/admin-dashboard/sidebar";
import AdminHeader from "../components/admin-dashboard/header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#F9FBFC] overflow-x-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 w-full">
                <AdminHeader />
                <main className="p-3 md:p-8 w-full flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}