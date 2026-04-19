import Link from "next/link";

interface OrderItem {
  id: string;
  customer: string;
  initial: string;
  date: string;
  amount: string;
  status: string;
  color: string;
}

const RecentOrders = ({ orders }: { orders?: OrderItem[] }) => {
  const displayOrders = orders || [];

  return (
    <div className="bg-white rounded-2xl md:rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 pb-4">
        <h3 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">
          Recent Orders
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-50 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">
              <th className="px-8 py-5">Order ID</th>
              <th className="px-8 py-5">Customer</th>
              <th className="px-8 py-5">Date</th>
              <th className="px-8 py-5">Amount</th>
              <th className="px-8 py-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {displayOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-8 py-5 text-[14px] font-bold text-slate-700">
                  {order.id}
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black
                      ${order.color === "blue" ? "bg-blue-50 text-blue-600" : ""}
                      ${order.color === "orange" ? "bg-orange-50 text-orange-600" : ""}
                      ${order.color === "emerald" ? "bg-emerald-50 text-emerald-600" : ""}
                    `}>
                      {order.initial}
                    </div>
                    <span className="text-[14px] font-bold text-slate-700">
                      {order.customer}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5 text-[14px] font-medium text-gray-400">
                  {order.date}
                </td>
                <td className="px-8 py-5 text-[15px] font-black text-slate-800">
                  {order.amount}
                </td>
                <td className="px-8 py-5">
                  <span
                    className={`
                    px-4 py-1.5 rounded-full text-[11px] font-bold
                    ${order.color === "blue" ? "bg-blue-50 text-blue-600" : ""}
                    ${order.color === "orange" ? "bg-orange-50 text-orange-600" : ""}
                    ${order.color === "emerald" ? "bg-emerald-50 text-emerald-600" : ""}
                  `}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {displayOrders.length === 0 && (
          <div className="py-10 text-center text-slate-400 text-sm font-bold uppercase tracking-widest">
            No orders found
          </div>
        )}
      </div>

      {/* Button at the bottom */}
      <div className="p-4 border-t border-gray-50">
        <Link
          href="/dashboard/orders"
          className="block w-full text-center py-3.5 bg-blue-50/50 text-[#4A90E2] text-xs font-bold uppercase tracking-widest rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors"
        >
          View All Orders
        </Link>
      </div>
    </div>
  );
};

export default RecentOrders;
