import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/mongoose";
import Order from "@/src/models/Order";
import Product from "@/src/models/Product";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Check for required fields
    const { 
        firstName, lastName, address, state, zipCode, country, 
        paymentMethod, deliveryCharges, items, totalPrice, phoneNo, email 
    } = body;

    if (!firstName || !lastName || !address || !items || !totalPrice || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // --- STOCK VALIDATION ---
    for (const item of items) {
       const product = await Product.findById(item.productId);
       if (!product) {
         return NextResponse.json({ error: `Product '${item.name}' not found.` }, { status: 404 });
       }
       if (!product.isInStock) {
         return NextResponse.json({ error: `Item '${item.name}' is currently out of stock.` }, { status: 400 });
       }
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
        paymentMethod,
        deliveryCharges,
        items,
        totalPrice,
        status: "PENDING"
    });

    await newOrder.save();

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
