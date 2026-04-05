import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/mongoose";
import Order from "@/src/models/Order";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const { status } = await req.json();

    if (!["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ 
        success: true, 
        status: updatedOrder.status,
        message: `Order status updated to ${updatedOrder.status}` 
    }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
