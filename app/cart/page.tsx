import CartItems from "../components/add-to-cart/cart";
import OrderSummary from "../components/add-to-cart/order-summarty";
import SimilarProducts from "../components/add-to-cart/similar-products";

export default function CartPage() {
    return (
        <div className="max-w-[1440px] mx-auto px-4 py-12 font-sans">
            <h1 className="text-2xl font-black mb-8">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8">
                    <CartItems />
                </div>
                <div className="lg:col-span-4">
                    <OrderSummary />
                </div>
            </div>
            <div className="mt-16">
                <SimilarProducts />
            </div>
        </div>
    );
}