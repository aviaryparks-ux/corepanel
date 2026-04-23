import { NextResponse } from "next/server";
import { getServices, addService, deleteService, updateService } from "../../../lib/firebase";

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newService = await addService(body);
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menambah service" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) throw new Error("ID diperlukan");
    await deleteService(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus service" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await updateService(body.id, body);
    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengupdate service" }, { status: 500 });
  }
}