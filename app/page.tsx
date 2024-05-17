'use client'

import { FormEventHandler, useState } from 'react'

export default function Home() {
  const [file, setFile] = useState<File>()

  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      if (!res.ok) throw new Error(await res.text())
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          name='file'
          id='file'
          onChange={e => setFile(e.target.files?.[0])}
        />
        <button>Upload</button>
      </form>
    </main>
  )
}
