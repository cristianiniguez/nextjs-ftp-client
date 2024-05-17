import { NextRequest, NextResponse } from 'next/server'
import { addFile } from '@/ftp'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file = data.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ success: false })
  }
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  await addFile(buffer, file.name)
  return NextResponse.json({ success: true })
}
