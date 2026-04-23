import { NextResponse } from "next/server";
import { getBanners, addBanner, deleteBanner, updateBanner } from "../../../lib/firebase";

export async function GET() {
  try {
    const banners = await getBanners();
    return NextResponse.json(banners);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBanner = await addBanner(body);
    return NextResponse.json(newBanner, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menambah banner" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) throw new Error("ID diperlukan");
    await deleteBanner(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus banner" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await updateBanner(body.id, body);
    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengupdate banner" }, { status: 500 });
  }
}