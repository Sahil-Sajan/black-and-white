import dbConnect from "./mongoose";
import Order from "../models/Order";
import Product from "../models/Product";

export async function getDashboardStats() {
  await dbConnect();

  // 1. Total Revenue (non-cancelled orders)
  const revenueAggregation = await Order.aggregate([
    { $match: { status: { $ne: "CANCELLED" } } },
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);
  const totalRevenue = revenueAggregation[0]?.total || 0;

  // 2. Pending Orders
  const pendingOrders = await Order.countDocuments({ status: "PENDING" });

  // 3. Total Orders
  const totalOrders = await Order.countDocuments();

  // 4. Active Products (In Stock)
  const activeProducts = await Product.countDocuments({ isInStock: true });

  // 5. Recent Orders (Top 5)
  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("orderId firstName lastName totalPrice status createdAt");

  // 6. Recent Products (Top 4)
  const recentProducts = await Product.find()
    .sort({ createdAt: -1 })
    .limit(4)
    .select("name price variants");

  // 6. Monthly Revenue (Last 6 Months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const monthlyAggregation = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: sixMonthsAgo },
        status: { $ne: "CANCELLED" },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        revenue: { $sum: "$totalPrice" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  // Format monthly data for Recharts
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const monthlyData = [];
  
  const revenueMap = new Map();
  monthlyAggregation.forEach(item => {
    const key = `${item._id.year}-${item._id.month}`;
    revenueMap.set(key, item.revenue);
  });

  for (let i = 0; i < 6; i++) {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const key = `${year}-${month}`;
    
    monthlyData.push({
      name: monthNames[month - 1],
      revenue: revenueMap.get(key) || 0,
    });
  }

  return {
    stats: {
      totalRevenue,
      pendingOrders,
      totalOrders,
      activeProducts,
    },
    monthlyData,
    recentOrders: recentOrders.map(order => ({
      id: order.orderId,
      customer: `${order.firstName} ${order.lastName}`,
      initial: order.firstName.charAt(0) + order.lastName.charAt(0),
      date: new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      amount: `Rs ${order.totalPrice.toFixed(2)}`,
      status: order.status.charAt(0) + order.status.slice(1).toLowerCase(),
      color: order.status === "PENDING" ? "orange" : order.status === "DELIVERED" ? "emerald" : "blue"
    })),
    recentProducts: recentProducts.map(product => ({
      name: product.name,
      price: `Rs ${product.price.toFixed(2)}`,
      imageUrl: product.variants?.[0]?.image || "/cards/card1.webp",
      sold: 0 // We don't have sales tracking yet, defaulting to 0 or could be mock
    })),
  };
}
