import React from 'react';
import { LucideIcon, TrendingUp, AlertTriangle } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendType?: 'positive' | 'warning';
    iconBgColor: string;
    iconColor: string;
}

const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendType = 'positive',
    iconBgColor,
    iconColor
}: StatCardProps) => {
    return (
        <div className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-sm flex flex-col gap-4 w-full">
            {/* Top Row: Icon and Trend */}
            <div className="flex items-center justify-between">
                <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBgColor}`}
                >
                    <Icon className={iconColor} size={22} />
                </div>

                {trend && (
                    <div className={`flex items-center gap-1 text-[13px] font-bold ${trendType === 'positive' ? 'text-emerald-500' : 'text-red-500'
                        }`}>
                        {trendType === 'positive' ? <TrendingUp size={14} /> : <AlertTriangle size={14} />}
                        {trend}
                    </div>
                )}
            </div>

            {/* Bottom Row: Title and Value */}
            <div>
                <p className="text-slate-400 text-[13px] font-semibold mb-1">{title}</p>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h3>
            </div>
        </div>
    );
};

export default StatCard;