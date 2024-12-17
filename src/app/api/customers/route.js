/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Retrieve a paginated list of customers
 *     description: Fetches customers with pagination support. Returns customer data along with pagination details.
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: Successfully retrieved customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The customer's unique identifier
 *                   name:
 *                     type: string
 *                     description: The customer's full name
 *                   email:
 *                     type: string
 *                     description: The customer's email address
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp of when the customer was created
 *       500:
 *         description: Server error while fetching customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Failed to fetch customers
 */

import { getCustomers } from "@/app/actions/customers";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") ?? "1");
    const pageSize = parseInt(searchParams.get("pageSize") ?? 10);

    const customers = await getCustomers(pageSize, page);
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
