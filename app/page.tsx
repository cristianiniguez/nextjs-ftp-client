'use client'

import { FormEventHandler, useState } from 'react'
import Dropzone from './components/Dropzone'
import { Button } from 'flowbite-react'

export default function Home() {
  const [file, setFile] = useState<File>()
  console.log(file)

  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault()
    if (!file) return

    console.log('Sending File')
    
    try {
      const data = new FormData()
      data.set('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      if (!res.ok) throw new Error(await res.text())
      console.log('File Saved')
    } catch (e) {
      console.error('File Not Saved', e)
    }
  }

  return (
    <main className='p-4'>
      <div className='max-w-xl mx-auto'>
        <form onSubmit={handleSubmit}>
          <Dropzone name='file' onChange={e => setFile(e.target.files?.[0])} />
          <Button className='px-4' color='blue' type='submit'>Upload</Button>
        </form>
      </div>
    </main>
  )
}
