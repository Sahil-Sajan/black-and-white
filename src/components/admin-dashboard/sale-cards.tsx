import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  iconBgColor: string;
  iconColor: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
}: StatCardProps) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-3xl md:rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 w-full">
      {/* Top Row: Icon and Trend */}
      <div className="flex items-center justify-between">
        <p className="text-slate-500 font-semibold mb-1">{title}</p>
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBgColor}`}
        >
          <Icon className={iconColor} size={22} />
        </div>
      </div>

      {/* Bottom Row: Title and Value */}
      <div>
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;
