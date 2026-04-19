import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/mongoose";
import Product, { IProduct } from "@/src/models/Product";
import { QueryFilter } from "mongoose";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const query: QueryFilter<IProduct> = {};
    if (brand) query.brand = brand;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Filtered products
    const products = await Product.find(query).sort({ createdAt: -1 });

    // Global stats (calculate based on all products regardless of filters)
    const allProducts = await Product.find({});
    const total = allProducts.length;
    const outOfStock = allProducts.filter((p) => !p.isInStock).length;

    return NextResponse.json(
      {
        products,
        stats: { total, outOfStock },
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const newProduct = new Product(body);
    await newProduct.save();

    return NextResponse.json(
      { success: true, product: newProduct },
      { status: 201 },
    );
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          error:
            "A product with a similar name already exists (slug conflict).",
        },
        { status: 400 },
      );
    }
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
