import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const size = { width: 48, height: 48 }
export const contentType = 'image/png'

export default async function Icon() {
  const file = await readFile(
    path.join(process.cwd(), 'public/images/logo-v2.png')
  )
  const src = `data:image/png;base64,${file.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#040508',
        }}
      >
        <img
          src={src}
          alt="LIMINIQ"
          width={42}
          height={42}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  )
}
