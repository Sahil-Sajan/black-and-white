import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/mongoose";
import Order from "@/src/models/Order";
import { sendStatusEmail } from "@/src/lib/nodemailer";
import { getOrderEmailTemplate } from "@/src/lib/emailTemplates";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const { status, trackingNumber, cancellationReason } = await req.json();

    if (!["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updateData: any = { status };
    if (status === "SHIPPED" && trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }
    if (status === "CANCELLED" && cancellationReason) {
      updateData.cancellationReason = cancellationReason;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Send Email Notification
    const emailHtml = getOrderEmailTemplate(
      updatedOrder, 
      status, 
      trackingNumber, 
      cancellationReason
    );
    
    await sendStatusEmail(
      updatedOrder.email,
      `Order Update: ${status} - ${updatedOrder.orderId}`,
      emailHtml
    );

    return NextResponse.json({ 
        success: true, 
        status: updatedOrder.status,
        message: `Order status updated to ${updatedOrder.status} and email sent.` 
    }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
