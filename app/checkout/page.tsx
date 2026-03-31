import React from "react";
import ShippingAddress from "../../src/components/checkout/ShippingAddress";
import ShippingMethod from "../../src/components/checkout/ShippingMethod";
import PaymentMethod from "../../src/components/checkout/PaymentMethod";
import OrderSummarySidebar from "../../src/components/checkout/OrderSummarySidebar";

export default function CheckoutPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-12 font-sans bg-white min-h-screen">
      <h1 className="text-3xl font-black mb-10 text-center uppercase tracking-tighter">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Forms */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <ShippingAddress />
          <ShippingMethod />
          <PaymentMethod />
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4 sticky top-12">
          <OrderSummarySidebar />
        </div>
      </div>
    </div>
  );
}
