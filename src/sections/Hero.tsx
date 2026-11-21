import { lazy, Suspense } from 'react'
import { nextEvent } from '@/content/next-event'
import { site } from '@/content/site'
import { NextEventBlock } from './NextEventBlock'

const HeroScene = lazy(() => import('@/three/HeroScene'))

export function Hero() {
  return (
    <header id="inicio" className="relative isolate flex min-h-svh items-center overflow-hidden">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      <div className="mx-auto grid w-full max-w-5xl gap-8 px-6">
        <div>
          <p className="text-sm text-muted-foreground">{site.organizacao}</p>
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">{site.nome}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{site.descricao}</p>
        </div>
        <div className="max-w-md">
          <NextEventBlock event={nextEvent} />
        </div>
      </div>
    </header>
  )
}
