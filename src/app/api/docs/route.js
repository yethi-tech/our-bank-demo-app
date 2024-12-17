import { NextResponse } from "next/server";
import specs from "../../../swagger/config";

export async function GET() {
  return NextResponse.json(specs);
}
