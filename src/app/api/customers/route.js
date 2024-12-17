import { getCustomers } from "@/app/actions/customers";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const pageSize = parseInt(searchParams.get("pageSize") ?? 10);

    const include = "addresses,passport";

    const customers = await getCustomers(
      pageSize,
      page,
      { customerId: "asc" },
      {},
      include
    );
    return NextResponse.json(customers.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch customers",
      },
      { status: 500 }
    );
  }
}
