import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import connectDB from "@/lib/db";
import DayMemory from "@/models/DayMemory";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> },
) {
  try {
    const { date } = await params;
    const userId = await getCurrentUser();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { note } = await request.json();
    if (!note || !note.trim()) {
      return NextResponse.json(
        { message: "Note cannot be empty" },
        { status: 400 },
      );
    }

    const existingDayMemory = await DayMemory.findOne({ date, userId });
    if (existingDayMemory) {
      existingDayMemory.note = note.trim();
      await existingDayMemory.save();

      return NextResponse.json(
        { message: "Note updated successfully" },
        { status: 200 },
      );
    } else {
      const newDayMemory = new DayMemory({
        date,
        note: note.trim(),
        userId,
      });
      await newDayMemory.save();

      return NextResponse.json(
        { message: "Day memory created successfully" },
        { status: 201 },
      );
    }
  } catch (error) {
    console.error("Error saving note:", error);
    return NextResponse.json(
      { message: "Error saving note" },
      { status: 500 },
    );
  }
}
