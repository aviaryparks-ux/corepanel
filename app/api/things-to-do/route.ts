import { NextResponse } from "next/server";

export async function GET() {
  // Data sementara
  const data = [
    { id: 1, title: "RESTAURANT", category: "Things To Do" },
    { id: 2, title: "JOURNEY", category: "Things To Do" },
  ];
  return NextResponse.json(data);
}