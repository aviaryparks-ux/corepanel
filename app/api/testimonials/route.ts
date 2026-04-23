import { NextResponse } from "next/server";

let testimonials = [
  { id: 1, name: "Andi Wijaya", role: "HR Manager", text: "Sistem yang dibuat sangat membantu pekerjaan kami, rapi, cepat, dan sesuai kebutuhan. Highly recommended!", rating: 5 },
  { id: 2, name: "Siti Nurhaliza", role: "Administrator", text: "Dashboard yang dibuat sangat informatif dan memudahkan kami dalam mengambil keputusan.", rating: 5 },
  { id: 3, name: "Budi Santoso", role: "Direktur", text: "Tim profesional, pengerjaan cepat, dan hasilnya memuaskan. Sistem sangat membantu operasional perusahaan.", rating: 5 }
];

export async function GET() {
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTestimonial = { id: testimonials.length + 1, ...body };
  testimonials.push(newTestimonial);
  return NextResponse.json(newTestimonial, { status: 201 });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.searchParams.get("id") || "0");
  testimonials = testimonials.filter(t => t.id !== id);
  return NextResponse.json({ success: true });
}