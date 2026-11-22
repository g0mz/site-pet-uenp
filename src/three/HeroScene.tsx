import { Environment, Float, Lightformer } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '@/motion/useReducedMotion'

// Objetos de ciência com cara de massinha, feitos só com geometria do three.js.
// Flutuam, seguem o mouse e se espalham conforme o hero sai da tela (progresso vem do GSAP).
// Export default para o React.lazy.

const COR = {
  pena: '#ffcf33',
  crista: '#e8423f',
  grama: '#2fae5b',
  lilas: '#8b7cf6',
  tinta: '#14213d',
  papel: '#ffffff',
  vidro: '#d8f0ff',
}

function Massinha({ cor }: { cor: string }) {
  return <meshStandardMaterial color={cor} roughness={0.55} metalness={0} envMapIntensity={0.7} />
}

function Vidro() {
  return <meshStandardMaterial color={COR.vidro} roughness={0.1} transparent opacity={0.45} />
}

function Dna() {
  const pares = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        a: i * 0.55,
        y: (i - 5.5) * 0.24,
      })),
    [],
  )
  return (
    <group rotation={[0, 0, 0.45]}>
      {pares.map(({ a, y }) => (
        <group key={y}>
          <mesh position={[Math.cos(a) * 0.45, y, Math.sin(a) * 0.45]}>
            <sphereGeometry args={[0.13, 24, 16]} />
            <Massinha cor={COR.pena} />
          </mesh>
          <mesh position={[-Math.cos(a) * 0.45, y, -Math.sin(a) * 0.45]}>
            <sphereGeometry args={[0.13, 24, 16]} />
            <Massinha cor={COR.crista} />
          </mesh>
          <mesh position={[0, y, 0]} rotation={[0, -a, Math.PI / 2]}>
            <cylinderGeometry args={[0.045, 0.045, 0.9, 12]} />
            <Massinha cor={COR.papel} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Planeta() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.5, 48, 32]} />
        <Massinha cor={COR.lilas} />
      </mesh>
      <mesh rotation={[1.2, 0.2, 0]}>
        <torusGeometry args={[0.8, 0.06, 16, 64]} />
        <Massinha cor={COR.pena} />
      </mesh>
    </group>
  )
}

function Lupa() {
  return (
    <group rotation={[0.2, -0.3, -0.6]}>
      <mesh>
        <torusGeometry args={[0.42, 0.09, 20, 48]} />
        <Massinha cor={COR.tinta} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.03, 48]} />
        <Vidro />
      </mesh>
      <mesh position={[0, -0.86, 0]}>
        <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
        <Massinha cor={COR.crista} />
      </mesh>
    </group>
  )
}

function Folha() {
  const geometria = useMemo(() => {
    const forma = new THREE.Shape()
    forma.moveTo(0, -0.6)
    forma.bezierCurveTo(0.55, -0.3, 0.45, 0.4, 0, 0.7)
    forma.bezierCurveTo(-0.45, 0.4, -0.55, -0.3, 0, -0.6)
    const geo = new THREE.ExtrudeGeometry(forma, {
      depth: 0.05,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelSegments: 4,
      curveSegments: 32,
    })
    geo.center()
    return geo
  }, [])
  return (
    <group rotation={[0.3, 0.4, -0.5]}>
      <mesh geometry={geometria}>
        <Massinha cor={COR.grama} />
      </mesh>
      <mesh position={[0, -0.05, 0.08]}>
        <cylinderGeometry args={[0.025, 0.035, 1.15, 8]} />
        <Massinha cor="#1f8a45" />
      </mesh>
    </group>
  )
}

function Tubo() {
  return (
    <group rotation={[0, 0, -0.5]}>
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 1.05, 32, 1, true]} />
        <Vidro />
      </mesh>
      <mesh position={[0, -0.52, 0]}>
        <sphereGeometry args={[0.2, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <Vidro />
      </mesh>
      <mesh position={[0, -0.24, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.55, 32]} />
        <Massinha cor={COR.grama} />
      </mesh>
      <mesh position={[0, -0.52, 0]}>
        <sphereGeometry args={[0.17, 32, 16]} />
        <Massinha cor={COR.grama} />
      </mesh>
      <mesh position={[0, 0.53, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.21, 0.04, 12, 32]} />
        <Massinha cor={COR.papel} />
      </mesh>
    </group>
  )
}

interface PecaProps {
  base: [number, number, number]
  fuga: [number, number, number] // para onde a peça voa quando o hero sai da tela
  escala?: number
  parado: boolean
  progresso: RefObject<number>
  children: ReactNode
}

function Peca({ base, fuga, escala = 1, parado, progresso, children }: PecaProps) {
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!ref.current) return
    const p = parado ? 0 : progresso.current
    ref.current.position.set(base[0] + fuga[0] * p, base[1] + fuga[1] * p, base[2] + fuga[2] * p)
    ref.current.rotation.z = p * fuga[0] * 0.8
  })

  return (
    <group ref={ref} position={base} scale={escala}>
      <Float enabled={!parado} speed={1.6} rotationIntensity={0.7} floatIntensity={0.9}>
        {children}
      </Float>
    </group>
  )
}

// Reflexo suave de estúdio, gerado na hora com painéis de luz (sem baixar HDR).
function Ambiente() {
  return (
    <Environment resolution={128}>
      <Lightformer intensity={2} position={[0, 5, -2]} scale={[10, 5, 1]} />
      <Lightformer intensity={1} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
      <Lightformer intensity={1} position={[5, 1, -1]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
    </Environment>
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
      <Peca base={[-0.2, 0.1, 0]} fuga={[0, 2.5, 1]} {...comum}>
        <Dna />
      </Peca>
      <Peca base={[1.45, 1.25, -0.6]} fuga={[2.5, 2, 0]} {...comum}>
        <Planeta />
      </Peca>
      <Peca base={[1.35, -1.15, 0.6]} fuga={[2.5, -1.5, 0.5]} escala={1.05} {...comum}>
        <Lupa />
      </Peca>
      <Peca base={[-1.5, -1.25, 0.3]} fuga={[-2.5, -1.5, 0]} {...comum}>
        <Folha />
      </Peca>
      <Peca base={[-1.45, 1.3, -0.4]} fuga={[-2.5, 2, 0]} {...comum}>
        <Tubo />
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
        <Ambiente />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 4]} intensity={1.8} />
        <Cena parado={reduzido} progresso={progresso} ponteiro={ponteiro} />
      </Canvas>
    </div>
  )
}
