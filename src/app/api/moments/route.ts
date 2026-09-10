import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import DayMemory from "@/models/DayMemory";
import Moment from "@/models/Moment";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    const userId = await getCurrentUser();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const dayMemories = await DayMemory.find({ userId });
    const dateByDayMemory = new Map(
      dayMemories.map((d) => [d._id.toString(), d.date]),
    );
    const dayMemoryIds = dayMemories.map((d) => d._id);

    const moments = await Moment.find({
      userId,
      dayMemoryId: { $in: dayMemoryIds },
    }).sort({ createdAt: 1 });

    return NextResponse.json({
      moments: moments.map((m) => ({
        id: m._id.toString(),
        title: m.title,
        description: m.description,
        time: m.time || "",
        emoji: m.emoji || "",
        date: dateByDayMemory.get(m.dayMemoryId.toString()) ?? "",
      })),
    });
  } catch (error) {
    console.error("Error fetching all moments:", error);
    return NextResponse.json(
      { message: "Error fetching all moments" },
      { status: 500 },
    );
  }
}