"use client";

import React, { useState } from "react";
import ShippingAddress from "../../src/components/checkout/ShippingAddress";
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
    paymentMethod: "COD", // "COD" or "BANK_TRANSFER"
    accountNo: "", // Used when paymentMethod is BANK_TRANSFER
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Determine delivery charges based on payment method
  const deliveryCharges = formData.paymentMethod === "COD" ? 250 : 0;
  const totalAmount = cartTotal + deliveryCharges;

  // Disable place order button condition
  const isPlaceOrderDisabled =
    loading ||
    (formData.paymentMethod === "BANK_TRANSFER" && formData.accountNo.trim() === "");

  const handlePlaceOrder = async () => {
    // Validation
    if (!formData.firstName || !formData.email || !formData.address || !formData.phoneNo || !formData.city) {
      alert("Please fill in all required shipping fields.");
      return;
    }

    if (formData.paymentMethod === "BANK_TRANSFER" && !formData.accountNo.trim()) {
      alert("Please provide your IBAN/Account Number for verification.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      // Create Exact Payload for API
      const orderPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNo: formData.phoneNo,
        address: formData.address,
        state: formData.state || formData.city,
        zipCode: formData.zipCode,
        // country removed as requested
        paymentMethod: formData.paymentMethod === "COD" ? "COD" : `Bank Transfer (Acc: ${formData.accountNo})`,
        deliveryCharges: deliveryCharges,
        totalPrice: totalAmount,
        items: cartItems.map((item) => ({
          productId: item.id.split('-')[0],
          name: item.name,
          price: item.price,
          variant: item.variant || (item.name.includes('-') ? item.name.split(' - ')[1] : "Standard"),
          quantity: item.quantity,
          image: item.image,
        })),
      };

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const res = await fetch(`${baseUrl}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        clearCart();
        router.push(`/checkout/success?orderId=${result.order?.orderId || 'success'}`);
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
    <div className="max-w-[1200px] mx-auto px-4 py-12 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-black mb-10 text-center uppercase tracking-tight text-gray-900">
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Forms */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <ShippingAddress data={formData} onChange={handleInputChange} />

          <PaymentMethod
            selected={formData.paymentMethod}
            accountNo={formData.accountNo}
            onSelect={(val) => setFormData(prev => ({ ...prev, paymentMethod: val, accountNo: "" }))}
            onChange={handleInputChange}
          />
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 sticky top-12">
          <OrderSummarySidebar
            cartTotal={cartTotal}
            deliveryCharges={deliveryCharges}
            totalAmount={totalAmount}
            paymentMethod={formData.paymentMethod}
            onPlaceOrder={handlePlaceOrder}
            isDisabled={isPlaceOrderDisabled}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}