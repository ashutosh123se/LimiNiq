'use client'

import dynamic from 'next/dynamic'
import { ClientErrorBoundary } from '@/components/ui/ClientErrorBoundary'

const LoadingScreen = dynamic(
  () => import('@/components/layout/LoadingScreen').then((m) => m.LoadingScreen),
  { ssr: false }
)
const CustomCursor = dynamic(
  () => import('@/components/layout/CustomCursor').then((m) => m.CustomCursor),
  { ssr: false }
)
const SocialProofToast = dynamic(
  () => import('@/components/layout/SocialProofToast').then((m) => m.SocialProofToast),
  { ssr: false }
)

export function DeferredClientChrome() {
  return (
    <>
      <ClientErrorBoundary>
        <LoadingScreen />
      </ClientErrorBoundary>
      <ClientErrorBoundary>
        <CustomCursor />
      </ClientErrorBoundary>
      <ClientErrorBoundary>
        <SocialProofToast />
      </ClientErrorBoundary>
    </>
  )
}
