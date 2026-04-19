import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/src/lib/mongoose";
import Order from "@/src/models/Order";
import Product from "@/src/models/Product";
import { sendStatusEmail } from "@/src/lib/nodemailer";
import { getOrderEmailTemplate } from "@/src/lib/emailTemplates";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Check for required fields
    const {
      firstName, lastName, address, state, zipCode, country,
      paymentMethod, deliveryCharges, items, totalPrice, phoneNo, email
    } = body;

    if (!firstName || !lastName || !address || !items || !totalPrice || !email || !country) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Map payment method to standard internal values if needed
    let sanitizedPaymentMethod = paymentMethod;
    if (paymentMethod && paymentMethod.includes("Bank Transfer")) {
      sanitizedPaymentMethod = "BANK_TRANSFER";
    } else if (paymentMethod === "COD") {
      sanitizedPaymentMethod = "COD";
    } else {
      sanitizedPaymentMethod = "ONLINE"; // Default fallback
    }

    const processedItems = [];

    // --- STOCK VALIDATION & PROVISIONING ---
    for (const item of items) {
      let product;
      
      // Handle compound IDs (prodID-varID) from the detail page
      let lookupId = item.productId || "";
      if (lookupId.includes('-') && !mongoose.Types.ObjectId.isValid(lookupId)) {
        const parts = lookupId.split('-');
        if (mongoose.Types.ObjectId.isValid(parts[0])) {
          lookupId = parts[0];
        }
      }

      // 1. Try Lookup by MongoDB ID
      if (mongoose.Types.ObjectId.isValid(lookupId)) {
        product = await Product.findById(lookupId);
      }
      
      // 2. Try Lookup by Slug
      if (!product) {
        product = await Product.findOne({ slug: item.productId });
      }

      // 3. Try Lookup by NameFallback (using item.name)
      if (!product && item.name) {
        product = await Product.findOne({ 
          name: { $regex: new RegExp(`^${item.name}$`, "i") } 
        });
      }

      // 4. Try Lookup by ProductId as a potential name fallback
      if (!product && item.productId) {
        product = await Product.findOne({ 
          name: { $regex: new RegExp(`^${item.productId}$`, "i") } 
        });
      }

      if (!product) {
        return NextResponse.json({ error: `Product '${item.name}' not found in our records.` }, { status: 404 });
      }
      if (!product.isInStock) {
        return NextResponse.json({ error: `Item '${item.name}' is out of stock.` }, { status: 400 });
      }

      // Remove image from item for Order model compatibility
      const { image, ...itemWithoutImage } = item;
      processedItems.push({
        ...itemWithoutImage,
        productId: product._id.toString() // Ensure we store the actual ID in the order
      });
    }
    // ------------------------

    const newOrder = new Order({
      firstName,
      lastName,
      email,
      phone: phoneNo,
      address,
      state,
      zipCode,
      country,
      paymentMethod: sanitizedPaymentMethod,
      deliveryCharges,
      items: processedItems,
      totalPrice,
      status: "PENDING"
    });

    await newOrder.save();

    // Send "Order Confirmed" Email
    try {
      const emailHtml = getOrderEmailTemplate(newOrder, "PENDING");
      await sendStatusEmail(
        newOrder.email,
        `Order Confirmed: ${newOrder.orderId}`,
        emailHtml
      );
    } catch (emailError) {
      // Log the error but don't fail the checkout process
      console.error("Failed to send confirmation email:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder
    }, { status: 201 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
