import { NextResponse } from "next/server";
import { trackVisit } from "../../../lib/firebase";

export async function POST() {
  try {
    await trackVisit("/");
    return NextResponse.json({ success: true, tracked: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal mencatat kunjungan" }, { status: 500 });
  }
}
