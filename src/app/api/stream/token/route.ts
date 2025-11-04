import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { StreamClient } from "@stream-io/node-sdk";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
  const apiSecret = process.env.STREAM_API_SECRET!;
  const session = await getServerSession(authOptions);

  if (!session || !session.user?._id || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user._id;
  const client = new StreamClient(apiKey, apiSecret);
  const token = client.generateUserToken({
    user_id: userId,
    exp: Math.floor(Date.now() / 1000) + 3600,
  });

  return NextResponse.json({ token, userId, apiKey });
}
