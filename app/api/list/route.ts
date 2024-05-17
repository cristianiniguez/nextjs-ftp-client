import { getFiles } from "@/ftp";
import { NextResponse } from "next/server";

export async function GET() {
  const files = await getFiles()
  return NextResponse.json({ files })
}