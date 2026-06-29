import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
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
          width={150}
          height={150}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  )
}
