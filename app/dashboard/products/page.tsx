"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Pencil, Plus, Package, AlertCircle, Trash2 } from "lucide-react";
import StatCard from "@/src/components/admin-dashboard/sale-cards";
import Link from "next/link";

interface Variant {
  name: string;
  image: string;
}

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  isInStock: boolean;
  variants: Variant[];
}

const ProductListingPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({ total: 0, outOfStock: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleInStock = async (id: string, currentStatus: boolean) => {
    try {
      // Optimistic update
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, isInStock: !currentStatus } : p,
        ),
      );

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isInStock: !currentStatus }),
      });

      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/products/${productToDelete._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
        fetchProducts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const getCategoryStyles = (cat: string) => {
    switch (cat) {
      case "DISPOSABLE":
        return "bg-blue-100 text-blue-600";
      case "KITS":
        return "bg-purple-100 text-purple-600";
      case "E-LIQUID":
        return "bg-orange-100 text-orange-600";
      case "ACCESSORIES":
        return "bg-cyan-100 text-cyan-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full max-w-300 mx-auto pb-10 px-3 md:px-4 pt-5">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-slate-900 mb-1">
            Product Listing
          </h1>
          <p className="text-xs md:text-[13px] font-medium text-slate-500">
            Manage inventory and status across all channels.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8 w-full lg:w-auto">
          <div className="flex flex-wrap gap-4 w-full sm:w-auto overflow-x-auto pb-1 hide-scrollbar">
            {/* Stats Card 1: Total Products */}
            <div className="w-full sm:w-48 shrink-0">
              <StatCard
                title="TOTAL PRODUCTS"
                value={stats.total}
                icon={Package}
                iconBgColor="bg-blue-50"
                iconColor="text-blue-600"
              />
            </div>

            {/* Stats Card 2: Out of Stock */}
            <div className="w-full sm:w-48 shrink-0">
              <StatCard
                title="OUT OF STOCK"
                value={stats.outOfStock}
                icon={AlertCircle}
                iconBgColor="bg-red-50"
                iconColor="text-red-500"
              />
            </div>
          </div>

          <Link
            href="/dashboard/products/add"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-4 rounded-2xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 shrink-0 self-stretch sm:self-center"
          >
            <Plus size={18} /> Add Product
          </Link>
        </div>
      </div>

      {/* --- FILTERS TODO: APPLY FILTERS LIKE VAPES, E LIQUIDS, DISPOSABLES, PODS, ACCESSORIES --- */}

      {/* --- LISTING AREA --- */}

      {/* 1. MOBILE CARD VIEW (Visible below md) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {isLoading ? (
          <div className="text-center py-10 text-slate-500 font-bold text-sm">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-slate-500 font-bold text-sm">
            No products found.
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl relative border border-slate-200 overflow-hidden flex items-center justify-center pt-2 px-2">
                    {product.variants?.[0]?.image ? (
                      <Image
                        src={product.variants[0].image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <Package size={20} className="text-slate-300" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 leading-tight">
                      {product.name}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide">
                      {product.brand}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deleteProduct(product)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50 mb-3">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    PRICE
                  </p>
                  <p className="text-sm font-black text-slate-800">
                    ${product.price}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    INSTOCK
                  </p>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        toggleInStock(product._id, product.isInStock)
                      }
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                        product.isInStock ? "bg-emerald-500" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          product.isInStock ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest ${getCategoryStyles(product.category)}`}
                >
                  {product.category}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 2. DESKTOP TABLE VIEW (Visible on md and above) */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto w-full hide-scrollbar">
          <table className="w-full text-left min-w-225">
            <thead className="border-b border-slate-100 bg-slate-50/50">
              <tr>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  PRODUCT
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  BRAND
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  CATEGORY
                </th>

                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  PRICE
                </th>
                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  INSTOCK
                </th>

                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  EDIT
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-slate-500 font-bold text-sm"
                  >
                    Loading products...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-slate-500 font-bold text-sm"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 bg-slate-100 rounded-full shrink-0 border border-slate-200 overflow-hidden flex items-center justify-center p-2">
                          {product.variants?.[0]?.image ? (
                            <Image
                              src={product.variants[0].image}
                              alt={product.name}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <Package size={20} className="text-slate-300" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 mb-0.5">
                            {product.name}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400">
                            ID: #{product._id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <p className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                        {product.brand}
                      </p>
                    </td>
                    <td className="py-5 px-6">
                      <span
                        className={`px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest ${getCategoryStyles(product.category)}`}
                      >
                        {product.category}
                      </span>
                    </td>

                    <td className="py-5 px-6">
                      <p className="text-sm font-black text-slate-800">
                        ${product.price.toFixed(2)}
                      </p>
                    </td>
                    <td className="py-5 px-6">
                      <button
                        onClick={() =>
                          toggleInStock(product._id, product.isInStock)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                          product.isInStock ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            product.isInStock
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>

                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/dashboard/products/edit/${product._id}`}
                          className="flex items-center justify-end gap-1.5 text-blue-600 hover:text-blue-700 transition-colors group/edit bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm disabled:opacity-50"
                        >
                          <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">
                            Edit
                          </span>
                          <Pencil size={12} className="shrink-0" />
                        </Link>
                        <button
                          onClick={() => deleteProduct(product)}
                          className="flex items-center justify-center p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="p-8 pb-6">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                <Trash2 className="text-red-500" size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">
                Delete Product?
              </h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                You are about to remove{" "}
                <span className="text-slate-900 font-bold">
                  &quot;{productToDelete?.name}&quot;
                </span>{" "}
                from your inventory. This action cannot be reversed.
              </p>
            </div>
            <div className="p-4 bg-slate-50 flex items-center gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="flex-1 px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-500 bg-slate-200 hover:bg-slate-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest bg-red-500 text-white hover:bg-red-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? "Deleting..." : "Delete Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
