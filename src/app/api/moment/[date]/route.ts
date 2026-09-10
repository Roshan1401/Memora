import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import DayMemory from "@/models/DayMemory";
import Moment from "@/models/Moment";
import connectDB from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ date: string }> },
) {
  try {
    const { date } = await params;
    const userId = await getCurrentUser();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const dayMemory = await DayMemory.findOne({ date, userId });

    if (!dayMemory) {
      return NextResponse.json({ moments: [], note: "" });
    }

    const moments = await Moment.find({ dayMemoryId: dayMemory._id });

    return NextResponse.json({
      moments: moments.map((m) => ({
        id: m._id.toString(),
        title: m.title,
        description: m.description,
        time: m.time || "",
        emoji: m.emoji || "",
      })),
      note: dayMemory.note || "",
    });
  } catch (error) {
    console.error("Error fetching moments:", error);
    return NextResponse.json(
      { message: "Error fetching moments" },
      { status: 500 },
    );
  }
}

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

    const body = await request.json();

    const { title, description, time, emoji } = body;

    if (!title.trim()) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    let dayMemoryId;
    const existingDayMemory = await DayMemory.findOne({ date, userId });
    if (!existingDayMemory) {
      const newDayMemory = await DayMemory.create({ date, userId });
      dayMemoryId = newDayMemory._id;
    } else {
      dayMemoryId = existingDayMemory._id;
    }

    const createdMoment = await Moment.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      time: time,
      emoji: emoji ? String(emoji).trim() : "",
      dayMemoryId,
      userId: userId,
    });

    if (!createdMoment) {
      return NextResponse.json(
        { message: "Failed to create moment" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "Moment created successfully",
        moment: {
          id: createdMoment._id.toString(),
          title: createdMoment.title,
          description: createdMoment.description,
          time: createdMoment.time,
          emoji: createdMoment.emoji || "",
          dayMemoryId: createdMoment.dayMemoryId,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating moment:", error);
    return NextResponse.json(
      { message: "Error creating moment" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const momentId = searchParams.get("momentId");

    if (!momentId) {
      return NextResponse.json(
        { message: "Missing momentId in query parameters" },
        { status: 400 },
      );
    }

    const userId = await getCurrentUser();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { title, description, time, emoji } = body;

    if (title !== undefined && !String(title).trim()) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const moment = await Moment.findOne({ _id: momentId, userId });

    if (!moment) {
      return NextResponse.json(
        { message: "Moment not found or not authorized to update" },
        { status: 404 },
      );
    }

    if (title !== undefined) moment.title = String(title).trim();
    if (description !== undefined)
      moment.description = String(description).trim();
    if (time !== undefined) moment.time = time;
    if (emoji !== undefined) moment.emoji = String(emoji).trim();

    await moment.save();

    return NextResponse.json({
      message: "Moment updated successfully",
      moment: {
        id: moment._id.toString(),
        title: moment.title,
        description: moment.description,
        time: moment.time || "",
        emoji: moment.emoji || "",
      },
    });
  } catch (error) {
    console.error("Error updating moment:", error);
    return NextResponse.json(
      { message: "Error updating moment" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const momentId = searchParams.get("momentId");

    if (!momentId) {
      return NextResponse.json(
        { message: "Missing momentId in query parameters" },
        { status: 400 },
      );
    }

    const userId = await getCurrentUser();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const deletedMoment = await Moment.findOneAndDelete({
      _id: momentId,
      userId,
    });

    if (!deletedMoment) {
      return NextResponse.json(
        { message: "Moment not found or not authorized to delete" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Moment deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting moment:", error);
    return NextResponse.json(
      { message: "Error deleting moment" },
      { status: 500 },
    );
  }
}
