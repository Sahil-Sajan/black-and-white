"use client";

import React, { useState } from "react";
import ShippingAddress from "../../src/components/checkout/ShippingAddress";
import ShippingMethod from "../../src/components/checkout/ShippingMethod";
import PaymentMethod from "../../src/components/checkout/PaymentMethod";
import OrderSummarySidebar from "../../src/components/checkout/OrderSummarySidebar";
import { useCart } from "../../src/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    paymentMethod: "cod",
    shippingMethod: "standard",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    // Basic validation
    if (!formData.firstName || !formData.email || !formData.address || !formData.phoneNo) {
      alert("Please fill in all required fields (Name, Email, Phone, and Address).");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const shippingCharge = formData.shippingMethod === "express" ? 500 : formData.shippingMethod === "priority" ? 1000 : 0;
      const tax = cartTotal * 0.05;
      const total = cartTotal + shippingCharge + tax;

      const orderData = {
        ...formData,
        deliveryCharges: shippingCharge,
        totalPrice: total,
        items: cartItems.map((item) => ({
          productId: item.id.split('-')[0], // Extracting base ID if it was slug-variant
          name: item.name,
          price: item.price,
          variant: item.name.split(' - ')[1] || "Standard",
          quantity: item.quantity,
          image: item.image,
        })),
      };

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        clearCart();
        router.push(`/checkout/success?orderId=${result.order.orderId}`);
      } else {
        alert(result.error || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-12 font-sans bg-white min-h-screen">
      <h1 className="text-3xl font-black mb-10 text-center uppercase tracking-tighter">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Forms */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <ShippingAddress data={formData} onChange={handleInputChange} />
          <ShippingMethod selected={formData.shippingMethod} onSelect={(val) => setFormData(prev => ({ ...prev, shippingMethod: val }))} />
          <PaymentMethod selected={formData.paymentMethod} onSelect={(val) => setFormData(prev => ({ ...prev, paymentMethod: val }))} />
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 sticky top-12">
          <OrderSummarySidebar 
            onPlaceOrder={handlePlaceOrder} 
            loading={loading} 
            shippingMethod={formData.shippingMethod}
          />
        </div>
      </div>
    </div>
  );
}
