import { NextRequest, NextResponse } from "next/server";
import Redis from "ioredis";

let url: string = String(process.env.REDIS_URL);
let redis = new Redis(url);

export async function GET(req: NextRequest) {
  try {
    const rollNumber: string = String(
      req.nextUrl.searchParams.get("htno")?.toUpperCase(),
    );
    console.log(rollNumber);
    let cache: string | null = "";
    if (rollNumber === "NOTIFICATIONS") {
      cache = await redis.get("notifications");
    } else {
      cache = await redis.get(rollNumber);
    }
    if (cache) {
      const cacheData = JSON.parse(cache);

      return NextResponse.json(cacheData["data"], { status: 200 });
    }
    return NextResponse.json("Redis data not found", { status: 404 });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
