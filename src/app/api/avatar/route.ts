import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import connectDB from "@/lib/db";
import User from "@/models/User";

const ALLOWED_AVATAR_HOSTNAMES = new Set([
  "lh3.googleusercontent.com",
  "lh4.googleusercontent.com",
  "lh5.googleusercontent.com",
  "lh6.googleusercontent.com",
]);

function isAllowedAvatarUrl(rawUrl: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return false;
  }
  return (
    parsed.protocol === "https:" &&
    ALLOWED_AVATAR_HOSTNAMES.has(parsed.hostname)
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ message: "Missing url" }, { status: 400 });
  }

  if (!isAllowedAvatarUrl(url)) {
    return NextResponse.json({ message: "Invalid avatar url" }, { status: 400 });
  }

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch avatar" },
        {
          status: res.status,
        },
      );
    }

    const blob = await res.blob();
    const headers = new Headers();
    const contentType = res.headers.get("content-type") || "image/jpeg";
    headers.set("content-type", contentType);
    headers.set("cache-control", "public, max-age=86400");

    return new NextResponse(blob, { status: 200, headers });
  } catch (error) {
    console.error("Avatar proxy error:", error);
    return NextResponse.json(
      { message: "Error proxying avatar" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await getCurrentUser();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { avatarUrl } = await request.json();

    if (!avatarUrl) {
      return NextResponse.json({ message: "Missing avatar" }, { status: 400 });
    }

    if (!avatarUrl.startsWith("data:image/")) {
      return NextResponse.json(
        { message: "Invalid avatar format" },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findByIdAndUpdate(
      userId,
      { avatarUrl },
      { new: true },
    ).select("avatarUrl");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Avatar updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating avatar:", error);

    return NextResponse.json(
      { message: "Error updating avatar" },
      { status: 500 },
    );
  }
}
