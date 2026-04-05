import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/mongoose";
import Order from "@/src/models/Order";

export async function GET() {
  try {
    await dbConnect();

    const customers = await Order.aggregate([
      {
        $sort: { createdAt: 1 } // Sort by date ascending to get the latest info via $last
      },
      {
        $group: {
          _id: "$email",
          firstName: { $last: "$firstName" },
          lastName: { $last: "$lastName" },
          phone: { $last: "$phone" },
          address: { $last: "$address" },
          state: { $last: "$state" },
          zipCode: { $last: "$zipCode" },
          country: { $last: "$country" },
          totalSpent: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
          lastOrderDate: { $max: "$createdAt" },
        }
      },
      {
        $project: {
          _id: 0,
          email: "$_id",
          name: { $concat: ["$firstName", " ", "$lastName"] },
          phone: 1,
          location: { $concat: ["$state", ", ", "$country"] },
          fullAddress: "$address",
          totalSpent: 1,
          totalOrders: 1,
          lastOrderDate: 1,
        }
      },
      {
        $sort: { totalSpent: -1 } // Most valuable customers first
      }
    ]);

    // Calculate global stats
    const totalCustomers = customers.length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgLTV = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;
    const activeCustomers = customers.filter(c => c.status === "ACTIVE").length;

    return NextResponse.json({ 
      customers,
      stats: {
        totalCustomers,
        avgLTV,
        activeCustomers,
      }
    }, { status: 200 });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
