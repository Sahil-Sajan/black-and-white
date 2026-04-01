import Sidebar from "../../src/components/admin-dashboard/sidebar";
import StatCard from "../../src/components/admin-dashboard/sale-cards";
import { TrendingUp, Users, CreditCard, Activity } from "lucide-react";
import RevenueForecastChart from "../../src/components/admin-dashboard/revenue";
import TopSellingProducts from "../../src/components/admin-dashboard/selling";
import RecentOrders from "../../src/components/admin-dashboard/recent-orders";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* SECTION 1: Top Row Stat Cards (4 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={TrendingUp}
          // trend="+20.1% from last month"
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />

        <StatCard
          title="Subscriptions"
          value="+2,350"
          icon={Users}
          // trend="+180.1% from last month"
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Sales"
          value="+12,234"
          icon={CreditCard}
          // trend="+19% from last month"
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />

        <StatCard
          title="Active Now"
          value="+573"
          icon={Activity}
          // trend="+201 since last hour"
          iconBgColor="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* SECTION 2: Large Components Row (Responsive Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Revenue Chart takes up 2 parts of the 3-column grid */}
        <div className="lg:col-span-2">
          <RevenueForecastChart />
        </div>

        {/* Top Selling Products takes up 1 part of the 3-column grid */}
        <div className="lg:col-span-1">
          <TopSellingProducts />
        </div>
      </div>

      {/* SECTION 3: Recent Orders Table */}
      <div className="w-full">
        <RecentOrders />
      </div>
    </div>
  );
}
