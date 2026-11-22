import { Environment, Float, Lightformer, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
import * as THREE from 'three'
import { clone as clonarComEsqueleto } from 'three/addons/utils/SkeletonUtils.js'
import { useReducedMotion } from '@/motion/useReducedMotion'

// Modelos prontos do poly.pizza em public/modelos/ (créditos no rodapé, ver App.tsx).
// Flutuam, seguem o mouse e se espalham conforme o hero sai da tela (progresso vem do GSAP).
// Export default para o React.lazy.

const modelo = (nome: string) => `${import.meta.env.BASE_URL}modelos/${nome}.glb`

const MODELOS = {
  dna: modelo('dna'),
  microscopio: modelo('microscopio'),
  frasco: modelo('frasco'),
  borboleta: modelo('borboleta'),
  triceratopo: modelo('triceratopo'),
}

// Carrega o modelo, centraliza e escala para caber num cubo de lado `tamanho`.
function Modelo({ url, tamanho, giro = [0, 0, 0] }: { url: string; tamanho: number; giro?: [number, number, number] }) {
  const { scene } = useGLTF(url)
  const objeto = useMemo(() => {
    // SkeletonUtils copia também o esqueleto (o tricerátopo é animado); a caixa precisa ser
    // precisa (vértice a vértice) porque a escala do modelo vem dos ossos.
    const copia = clonarComEsqueleto(scene)
    copia.updateMatrixWorld(true)
    const caixa = new THREE.Box3().setFromObject(copia, true)
    const medida = caixa.getSize(new THREE.Vector3())
    const centro = caixa.getCenter(new THREE.Vector3())
    const escala = tamanho / Math.max(medida.x, medida.y, medida.z)
    const grupo = new THREE.Group()
    copia.position.sub(centro)
    grupo.add(copia)
    grupo.scale.setScalar(escala)
    return grupo
  }, [scene, tamanho])
  return <primitive object={objeto} rotation={giro} />
}

interface PecaProps {
  base: [number, number, number]
  fuga: [number, number, number] // para onde a peça voa quando o hero sai da tela
  parado: boolean
  progresso: RefObject<number>
  children: ReactNode
}

function Peca({ base, fuga, parado, progresso, children }: PecaProps) {
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!ref.current) return
    const p = parado ? 0 : progresso.current
    ref.current.position.set(base[0] + fuga[0] * p, base[1] + fuga[1] * p, base[2] + fuga[2] * p)
    ref.current.rotation.z = p * fuga[0] * 0.6
  })

  return (
    <group ref={ref} position={base}>
      <Float enabled={!parado} speed={1.5} rotationIntensity={0.8} floatIntensity={0.9}>
        {children}
      </Float>
    </group>
  )
}

function Cena({ parado, progresso, ponteiro }: { parado: boolean; progresso: RefObject<number>; ponteiro: RefObject<{ x: number; y: number }> }) {
  const grupo = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!grupo.current || parado) return
    const { x, y } = ponteiro.current
    grupo.current.rotation.y = THREE.MathUtils.lerp(grupo.current.rotation.y, x * 0.35, 0.06)
    grupo.current.rotation.x = THREE.MathUtils.lerp(grupo.current.rotation.x, -y * 0.2, 0.06)
  })

  const comum = { parado, progresso }
  return (
    <group ref={grupo}>
      <Peca base={[0.1, 0.15, 0.3]} fuga={[0, 2.5, 1]} {...comum}>
        <Modelo url={MODELOS.dna} tamanho={2.9} giro={[0, 0, 0.35]} />
      </Peca>
      <Peca base={[-1.5, 1.15, -0.3]} fuga={[-2.5, 2, 0]} {...comum}>
        <Modelo url={MODELOS.microscopio} tamanho={1.5} giro={[0, 0.6, 0]} />
      </Peca>
      <Peca base={[1.55, 1.2, -0.4]} fuga={[2.5, 2, 0]} {...comum}>
        <Modelo url={MODELOS.borboleta} tamanho={1.3} giro={[0.5, -0.4, 0]} />
      </Peca>
      <Peca base={[1.5, -1.15, 0.4]} fuga={[2.5, -1.5, 0.5]} {...comum}>
        <Modelo url={MODELOS.frasco} tamanho={1.3} giro={[0, 0.3, -0.15]} />
      </Peca>
      <Peca base={[-1.45, -1.2, 0.3]} fuga={[-2.5, -1.5, 0]} {...comum}>
        <Modelo url={MODELOS.triceratopo} tamanho={1.7} giro={[0.1, 0.8, 0]} />
      </Peca>
    </group>
  )
}

export default function HeroScene({ progresso }: { progresso: RefObject<number> }) {
  const reduzido = useReducedMotion()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const ponteiro = useRef({ x: 0, y: 0 })
  const [visivel, setVisivel] = useState(true)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting))
    observer.observe(el)
    const mover = (e: PointerEvent) => {
      ponteiro.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 }
    }
    window.addEventListener('pointermove', mover, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('pointermove', mover)
    }
  }, [])

  const frameloop = reduzido ? 'demand' : visivel ? 'always' : 'never'

  return (
    <div ref={wrapperRef} className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      <Canvas frameloop={frameloop} camera={{ position: [0, 0, 6.5], fov: 38 }} dpr={[1, 2]}>
        {/* Reflexo de estúdio gerado na hora com painéis de luz (sem baixar HDR). */}
        <Environment resolution={128}>
          <Lightformer intensity={2} position={[0, 5, -2]} scale={[10, 5, 1]} />
          <Lightformer intensity={1} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
          <Lightformer intensity={1} position={[5, 1, -1]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
        </Environment>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={1.8} />
        <Suspense fallback={null}>
          <Cena parado={reduzido} progresso={progresso} ponteiro={ponteiro} />
        </Suspense>
      </Canvas>
    </div>
  )
}

Object.values(MODELOS).forEach((url) => useGLTF.preload(url))
