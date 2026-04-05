import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/mongoose";
import Order from "@/src/models/Order";

export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 });

    // Calculate Admin stats for the Orders page
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const pendingOrders = orders.filter((o) => o.status === "PENDING").length;
    const totalOrders = orders.length;

    return NextResponse.json({ 
        orders, 
        stats: { totalRevenue, pendingOrders, totalOrders } 
    }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
