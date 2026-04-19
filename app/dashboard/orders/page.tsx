"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Package,
  CreditCard,
  MapPin,
  Clock,
  XCircle,
  AlertCircle,
  Truck,
  ArrowRight,
  User,
  X,
  Loader2,
} from "lucide-react";
import StatCard from "@/src/components/admin-dashboard/sale-cards";
import StatusDropdown from "@/src/components/admin-dashboard/status-dropdown";
import { motion, AnimatePresence } from "framer-motion";

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
  totalPrice: number;
  status: string;
  createdAt: string;
  deliveryCharges: number;
  items: OrderItem[];
  address: string;
  state: string;
  zipCode: string;
}

const OrderManagementPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Modals for Shipping and Cancellation
  const [shippingModal, setShippingModal] = useState<{ isOpen: boolean; orderId: string } | null>(null);
  const [cancelModal, setCancelModal] = useState<{ isOpen: boolean; orderId: string } | null>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (res.ok) {
        // The API returns { orders, stats }, adapting to current response structure
        setOrders(data.orders || data); 
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string, metadata?: any) => {
    setIsUpdating(id);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          status: newStatus,
          trackingNumber: metadata?.trackingNumber,
          cancellationReason: metadata?.cancellationReason
        }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsUpdating(null);
      setShippingModal(null);
      setCancelModal(null);
      setTrackingNumber("");
      setCancelReason("");
    }
  };

  const handleStatusChangeRequest = (orderId: string, newStatus: string) => {
    if (newStatus === "SHIPPED") {
      setShippingModal({ isOpen: true, orderId });
    } else if (newStatus === "CANCELLED") {
      setCancelModal({ isOpen: true, orderId });
    } else {
      updateStatus(orderId, newStatus);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-amber-100 text-amber-600";
      case "SHIPPED": return "bg-blue-100 text-blue-600";
      case "DELIVERED": return "bg-emerald-100 text-emerald-600 border border-emerald-200";
      case "CANCELLED": return "bg-slate-100 text-slate-500";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  };

  const OrderDetailsModal = ({ order, onClose }: { order: Order; onClose: () => void }) => {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 shadow-2xl">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
        <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden relative flex flex-col animate-in zoom-in-95 duration-200">
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                  {order.orderId}
                </span>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${getStatusStyles(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Order Details</h2>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all text-slate-400 hover:text-slate-900">
              <X size={20} />
            </button>
          </div>
          <div className="overflow-y-auto p-8 space-y-8 flex-1 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-slate-400"><User size={14} /><span className="text-[10px] font-black uppercase tracking-widest">Customer Details</span></div>
                <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-3">
                  <p className="text-sm font-black text-slate-900">{order.firstName} {order.lastName}</p>
                  <p className="text-xs font-bold text-slate-500">{order.email}</p>
                  <p className="text-xs font-bold text-slate-500">{order.phone}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400"><MapPin size={14} /><span className="text-[10px] font-black uppercase tracking-widest">Shipping Address</span></div>
                <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 uppercase tracking-tight text-xs font-bold text-slate-600 leading-relaxed">
                  {order.address}, {order.state} {order.zipCode}
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-slate-400"><Package size={14} /><span className="text-[10px] font-black uppercase tracking-widest">Order Summary</span></div>
              <div className="border border-slate-100 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <tr><th className="px-6 py-4">Product</th><th className="px-6 py-4 text-center">Qty</th><th className="px-6 py-4 text-right">Price</th><th className="px-6 py-4 text-right">Total</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {order.items.map((item, idx) => (
                      <tr key={idx} className="text-xs font-bold text-slate-700">
                        <td className="px-6 py-5"><div className="flex items-center gap-3"><span className="text-slate-950 font-black">{item.name}</span><span className="text-[9px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-500">{item.variant}</span></div></td>
                        <td className="px-6 py-5 text-center">{item.quantity}</td>
                        <td className="px-6 py-5 text-right">Rs {item.price.toFixed(2)}</td>
                        <td className="px-6 py-5 text-right font-black">Rs {(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bg-slate-50/50 border-t border-slate-100 p-6 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500"><span>Subtotal</span><span>Rs {(order.totalPrice - (order.deliveryCharges || 0)).toFixed(2)}</span></div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500"><span>Delivery Charges</span><span>Rs {order.deliveryCharges?.toFixed(2) || "0.00"}</span></div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200"><span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Grand Total</span><span className="text-lg font-black text-slate-950">Rs {order.totalPrice.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const revenue = orders.filter(o => o.status !== "CANCELLED").reduce((acc, curr) => acc + curr.totalPrice, 0);

  return (
    <div className="w-full max-w-300 mx-auto pb-10 px-3 md:px-4 pt-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-slate-900 mb-1">Order Management</h1>
          <p className="text-xs md:text-[13px] font-medium text-slate-500">Monitor and process customer orders efficiently.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-4 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm shrink-0">
          <Download size={18} /> Export List
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="TOTAL REVENUE" value={`Rs ${revenue.toLocaleString()}`} icon={CreditCard} iconBgColor="bg-emerald-50" iconColor="text-emerald-500" />
        <StatCard title="PENDING ORDERS" value={orders.filter(o => o.status === "PENDING").length.toString()} icon={Clock} iconBgColor="bg-amber-50" iconColor="text-amber-500" />
        <StatCard title="SHIPPED ORDERS" value={orders.filter(o => o.status === "SHIPPED").length.toString()} icon={Truck} iconBgColor="bg-blue-50" iconColor="text-blue-500" />
        <StatCard title="CANCELLED" value={orders.filter(o => o.status === "CANCELLED").length.toString()} icon={XCircle} iconBgColor="bg-red-50" iconColor="text-red-500" />
      </div>

      <div className="bg-white border border-slate-200 rounded-[28px] shadow-sm overflow-hidden mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4 border-b border-slate-50 bg-slate-50/30">
          <div className="relative w-full sm:w-80"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input type="text" placeholder="Search orders..." className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium focus:border-blue-500 outline-none" /></div>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-700 hover:shadow-md"><Filter size={16} /> Filters</button>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">ORDER ID</th>
                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">CUSTOMER</th>
                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">DATE</th>
                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">AMOUNT</th>
                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">STATUS</th>
                <th className="py-5 px-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={6} className="py-24 text-center"><Loader2 className="animate-spin inline-block mr-2" />Processing...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={6} className="py-24 text-center text-slate-400 font-black uppercase text-[10px]">No orders found</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/30 group">
                    <td className="py-5 px-6 font-black text-slate-950 text-xs">{order.orderId}</td>
                    <td className="py-5 px-6"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-[10px]">{order.firstName[0]}{order.lastName[0]}</div><span className="text-xs font-black text-slate-800">{order.firstName} {order.lastName}</span></div></td>
                    <td className="py-5 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-tight">{formatDate(order.createdAt)}</td>
                    <td className="py-5 px-6 font-black text-slate-900 text-sm">Rs {order.totalPrice.toFixed(2)}</td>
                    <td className="py-5 px-6"><StatusDropdown currentStatus={order.status} onStatusChange={(s) => handleStatusChangeRequest(order._id, s)} disabled={isUpdating === order._id} /></td>
                    <td className="py-5 px-6 text-right">
                      <button onClick={() => { setSelectedOrder(order); setIsDetailsModalOpen(true); }} className="p-3 bg-slate-50 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all text-slate-400">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-slate-100">
          {orders.map((order) => (
            <div key={order._id} className="p-6 space-y-4">
              <div className="flex justify-between items-center"><span className="text-xs font-black text-blue-600">{order.orderId}</span><StatusDropdown currentStatus={order.status} onStatusChange={(s) => handleStatusChangeRequest(order._id, s)} disabled={isUpdating === order._id} /></div>
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-black text-xs">{order.firstName[0]}{order.lastName[0]}</div><div><p className="text-sm font-black text-slate-900">{order.firstName} {order.lastName}</p><p className="text-[10px] font-bold text-slate-400 uppercase">{formatDate(order.createdAt)}</p></div></div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-50"><span className="text-lg font-black tracking-tight">Rs {order.totalPrice.toFixed(2)}</span><button onClick={() => { setSelectedOrder(order); setIsDetailsModalOpen(true); }} className="p-3 bg-slate-50 rounded-2xl"><ArrowRight size={20} /></button></div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isDetailsModalOpen && selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => { setIsDetailsModalOpen(false); setSelectedOrder(null); }} />}
      </AnimatePresence>

      {/* --- SHIPPING TRACKING MODAL --- */}
      <AnimatePresence>
        {shippingModal?.isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShippingModal(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden relative p-8">
              <div className="flex items-center gap-4 mb-6"><div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600"><Truck size={24} /></div><div><h3 className="text-xl font-black text-slate-900 tracking-tight">Ship Order</h3><p className="text-xs font-black text-blue-500 uppercase tracking-widest">Leopard Courier Service</p></div></div>
              <div className="space-y-6">
                <div><label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Tracking Number</label><input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} placeholder="e.g. LE-12345678" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-black text-slate-800 focus:bg-white focus:border-blue-500 outline-none" /></div>
                <div className="flex gap-3 pt-2"><button onClick={() => setShippingModal(null)} className="flex-1 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 bg-slate-50">Cancel</button><button disabled={!trackingNumber} onClick={() => updateStatus(shippingModal.orderId, "SHIPPED", { trackingNumber })} className="flex-1 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white bg-blue-600 shadow-lg shadow-blue-200 disabled:opacity-50">Confirm & Ship</button></div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CANCELLATION MODAL --- */}
      <AnimatePresence>
        {cancelModal?.isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-red-900/10 backdrop-blur-sm" onClick={() => setCancelModal(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden relative p-8">
              <div className="flex items-center gap-4 mb-6 text-red-600"><div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center"><AlertCircle size={24} /></div><div><h3 className="text-xl font-black text-slate-900 tracking-tight">Cancel Order</h3><p className="text-xs font-black text-red-500 uppercase tracking-widest">Confirmation Required</p></div></div>
              <div className="space-y-6">
                <div><label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Reason for Cancellation</label><textarea value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} rows={3} placeholder="Reason (optional)..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-red-500 outline-none resize-none" /></div>
                <div className="flex gap-3 pt-2"><button onClick={() => setCancelModal(null)} className="flex-1 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 bg-slate-50">Go Back</button><button onClick={() => updateStatus(cancelModal.orderId, "CANCELLED", { cancellationReason: cancelReason })} className="flex-1 px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white bg-red-600 shadow-lg shadow-red-200">Confirm Cancel</button></div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderManagementPage;
