import { NextResponse } from "next/server";
import specs from "../../../swagger";

export async function GET() {
  return NextResponse.json(specs);
}
