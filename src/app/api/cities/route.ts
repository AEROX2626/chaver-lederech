import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json([]);
  }

  try {
    const res = await fetch(`https://www.hebcal.com/complete?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch from hebcal" }, { status: 500 });
  }
}
