import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const orders = [
    { id: '#ORD-9402', customer: 'John Doe', initial: 'JD', date: 'Oct 24, 2023', amount: '$124.50', status: 'Processing', color: 'blue' },
    { id: '#ORD-9398', customer: 'Sarah Miller', initial: 'SM', date: 'Oct 23, 2023', amount: '$56.00', status: 'Shipped', color: 'orange' },
    { id: '#ORD-9395', customer: 'Robert Taylor', initial: 'RT', date: 'Oct 23, 2023', amount: '$245.99', status: 'Delivered', color: 'emerald' },
    { id: '#ORD-9391', customer: 'Anna Brown', initial: 'AB', date: 'Oct 22, 2023', amount: '$89.20', status: 'Delivered', color: 'emerald' },
];

const RecentOrders = () => {
    return (
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-5 md:p-8 pb-4">
                <h3 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">Recent Orders</h3>
                <button className="text-[13px] font-bold text-[#4A90E2] hover:underline">
                    Download CSV
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-50 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">
                            <th className="px-8 py-5">Order ID</th>
                            <th className="px-8 py-5">Customer</th>
                            <th className="px-8 py-5">Date</th>
                            <th className="px-8 py-5">Amount</th>
                            <th className="px-8 py-5">Status</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-8 py-5 text-[14px] font-bold text-slate-700">{order.id}</td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[11px] font-black text-[#4A90E2]">
                                            {order.initial}
                                        </div>
                                        <span className="text-[14px] font-bold text-slate-700">{order.customer}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-[14px] font-medium text-gray-400">{order.date}</td>
                                <td className="px-8 py-5 text-[15px] font-black text-slate-800">{order.amount}</td>
                                <td className="px-8 py-5">
                                    <span className={`
                    px-4 py-1.5 rounded-full text-[11px] font-bold
                    ${order.color === 'blue' ? 'bg-blue-50 text-blue-600' : ''}
                    ${order.color === 'orange' ? 'bg-orange-50 text-orange-600' : ''}
                    ${order.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : ''}
                  `}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button className="p-2 text-gray-300 hover:text-slate-600 transition-colors">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrders;