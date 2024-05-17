import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file = data.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ success: false })
  }
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filePath = path.join(__dirname, 'tmp', file.name)
  await new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, buffer, (error) => {
      error ? reject(error) : resolve()
    })
  })
  console.log(`open ${filePath} to see the uploaded file`)
  return NextResponse.json({ success: true })
}
