import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "Database connected successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error connecting to the database",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
