"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Eye,
  Printer,
  TrendingUp,
  BarChart2,
  Clock,
  Star,
  CreditCard,
  MoreVertical,
  Loader2,
  X,
  ShoppingCart,
  MapPin,
  User,
} from "lucide-react";
import StatCard from "@/src/components/admin-dashboard/sale-cards";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  variant: string;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: "COD" | "ONLINE";
  deliveryCharges: number;
  items: OrderItem[];
  totalPrice: number;
  status: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
}

const OrderManagementPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ totalRevenue: 0, pendingOrders: 0, totalOrders: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders);
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(id);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsUpdating(null);
    }
  };

  const getInitials = (first: string, last: string) => {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };


  const getStatusStyles = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-600";
      case "SHIPPED":
        return "bg-blue-100 text-blue-600";
      case "DELIVERED":
        return "bg-emerald-100 text-emerald-600 border border-emerald-200";
      case "CANCELLED":
        return "bg-slate-100 text-slate-500";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const OrderDetailsModal = ({ order, onClose }: { order: Order; onClose: () => void }) => {
    if (!order) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg tracking-widest uppercase">
                  #{order.orderId}
                </span>
                <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${getStatusStyles(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-200/50 rounded-xl transition-colors text-slate-400 hover:text-slate-900"
            >
              <X size={20} />
            </button>
          </div>

          <div className="overflow-y-auto p-6 space-y-8 flex-1 custom-scrollbar">
            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <User size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Customer Details</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-sm font-black text-slate-900 mb-1">{order.firstName} {order.lastName}</p>
                  <p className="text-xs font-bold text-slate-500 mb-1">{order.email}</p>
                  <p className="text-xs font-bold text-slate-500">{order.phone}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Shipping Address</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">
                    {order.address}<br />
                    {order.state}, {order.zipCode}<br />
                    {order.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-400">
                <ShoppingCart size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Order Items ({order.items.length})</span>
              </div>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-white border border-slate-100 rounded-2xl hover:border-blue-100 transition-colors">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-50 bg-slate-50">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover" 
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-black text-slate-900 leading-tight mb-0.5">{item.name}</p>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{item.variant}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-slate-900">${item.price.toFixed(2)}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CreditCard size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Payment Summary</span>
              </div>
              <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl shadow-slate-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>${(order.totalPrice - (order.deliveryCharges || 0)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Delivery Charges</span>
                    <span>${order.deliveryCharges?.toFixed(2) || "0.00"}</span>
                  </div>
                  <div className="h-px bg-white/10 my-1"></div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Grand Total</span>
                    <span className="text-2xl font-black">${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1 px-2 rounded-lg bg-white/10 text-[9px] font-black tracking-widest uppercase">
                      {order.paymentMethod}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-300 mx-auto pb-10 px-3 md:px-4 pt-5">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-slate-900 mb-1">
            Order Management
          </h1>
          <p className="text-xs md:text-[13px] font-medium text-slate-500">
            Real-time overview of marketplace sales.
          </p>
        </div>
      </div>

      {/* --- SUMMARY STATS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="REVENUE"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={TrendingUp}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-500"
        />
        <StatCard
          title="AVG ORDER"
          value={`$${stats.totalOrders > 0 ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : "0.00"}`}
          icon={BarChart2}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-500"
        />
        <StatCard
          title="PENDING ORDERS"
          value={stats.pendingOrders.toString()}
          icon={Clock}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-500"
        />
        <StatCard
          title="TOTAL ORDERS"
          value={stats.totalOrders.toString()}
          icon={Star}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-500"
        />
      </div>

      {/* --- MAIN LISTING AREA --- */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">


        {/* 1. MOBILE CARD VIEW (md:hidden) */}
        <div className="grid grid-cols-1 gap-px md:hidden bg-slate-100">
          {isLoading ? (
            <div className="bg-white p-10 text-center">
              <Loader2 size={24} className="animate-spin text-blue-600 mx-auto mb-2" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-10 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
              No orders yet
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-blue-600">
                    #{order.orderId}
                  </span>
                  <div className="relative group/status flex items-center gap-2">
                    <select 
                      value={order.status}
                      disabled={isUpdating === order._id}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`appearance-none px-2 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest border-none focus:ring-1 focus:ring-blue-500 cursor-pointer transition-all ${getStatusStyles(order.status)}`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
                    <Image
                      src={order.items[0]?.image}
                      alt={order.items[0]?.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">
                      {order.firstName} {order.lastName}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                      Total
                    </p>
                    <p className="text-base font-black text-slate-900">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setSelectedOrder(order); setIsModalOpen(true); }}
                      className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                    <button className="p-2 bg-slate-50 rounded-lg text-slate-400">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 2. DESKTOP TABLE VIEW (md:block) */}
        <div className="hidden md:block w-full overflow-x-auto hide-scrollbar">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="border-b border-slate-100 bg-slate-50/50">
              <tr>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Order ID
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Product
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Customer
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Date
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Total
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Status
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <Loader2 size={24} className="animate-spin text-blue-600 mx-auto mb-2" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading orders...</p>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No orders found</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="py-5 px-6">
                      <span className="text-xs font-black text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">
                        #{order.orderId}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-100 shadow-sm bg-slate-50 group-hover:scale-105 transition-transform">
                          <Image
                            src={order.items[0]?.image}
                            alt={order.items[0]?.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-900 truncate max-w-[120px]">
                            {order.items[0]?.name}
                          </span>
                          {order.items.length > 1 && (
                            <span className="text-[9px] font-bold text-blue-500 uppercase">+{order.items.length - 1} more items</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center text-[10px] font-black border border-slate-200">
                          {getInitials(order.firstName, order.lastName)}
                        </div>
                        <span className="text-xs font-black text-slate-800">
                          {order.firstName} {order.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                        {formatDate(order.createdAt)}
                      </p>
                    </td>
                    <td className="py-5 px-6">
                      <p className="text-sm font-black text-slate-900">
                        ${order.totalPrice.toFixed(2)}
                      </p>
                    </td>
                    <td className="py-5 px-6">
                      <div className="relative group/status flex items-center">
                        <select 
                          value={order.status}
                          disabled={isUpdating === order._id}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className={`appearance-none px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all ${getStatusStyles(order.status)} ${isUpdating === order._id ? "opacity-50" : ""}`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setSelectedOrder(order); setIsModalOpen(true); }}
                          className="p-1.5 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all text-slate-400"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-all text-slate-400">
                          <Printer size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION AREA --- */}
        <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 gap-4 bg-slate-50/20">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Showing 1-10 of 2,451
          </p>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 hover:bg-white transition-all shadow-sm">
              Prev
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 text-white font-black text-[11px] shadow-lg shadow-slate-200">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 font-black text-[11px] hover:bg-slate-100 transition-all">
              2
            </button>
            <button className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 hover:bg-white transition-all shadow-sm">
              Next
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => { setIsModalOpen(false); setSelectedOrder(null); }} 
        />
      )}
    </div>
  );
};

export default OrderManagementPage;
