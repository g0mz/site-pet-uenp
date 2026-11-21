import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '@/motion/useReducedMotion'

// Amonite procedural: um tubo em espiral logarítmica que engrossa e tem costelas,
// como os fósseis do sítio de Paleontologia. Carregado com React.lazy.

const VOLTAS = 3.2
const SEGMENTOS = 420
const LADOS = 40
const COSTELAS = 46

function criarAmonite(): THREE.BufferGeometry {
  const posicoes: number[] = []
  const indices: number[] = []
  const tMax = VOLTAS * Math.PI * 2
  const raioEspiral = (t: number) => 0.06 * Math.exp(0.19 * t)

  for (let i = 0; i <= SEGMENTOS; i++) {
    const t = (i / SEGMENTOS) * tMax
    const r = raioEspiral(t)
    const centro = new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, 0)
    const radial = new THREE.Vector3(Math.cos(t), Math.sin(t), 0)
    const eixoZ = new THREE.Vector3(0, 0, 1)
    // Costela: o tubo incha um pouco em intervalos regulares.
    const costela = 1 + 0.08 * Math.pow(Math.abs(Math.sin((t * COSTELAS) / (VOLTAS * 2))), 6)
    const espessura = r * 0.46 * costela

    for (let j = 0; j <= LADOS; j++) {
      const a = (j / LADOS) * Math.PI * 2
      const p = centro
        .clone()
        .addScaledVector(radial, Math.cos(a) * espessura)
        .addScaledVector(eixoZ, Math.sin(a) * espessura * 0.8)
      posicoes.push(p.x, p.y, p.z)
    }
  }

  for (let i = 0; i < SEGMENTOS; i++) {
    for (let j = 0; j < LADOS; j++) {
      const a = i * (LADOS + 1) + j
      const b = a + LADOS + 1
      indices.push(a, b, a + 1, b, b + 1, a + 1)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(posicoes, 3))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  geo.center()
  geo.computeBoundingSphere()
  const escala = 1.35 / (geo.boundingSphere?.radius ?? 1)
  geo.scale(escala, escala, escala)
  return geo
}

function Amonite({ parado }: { parado: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  const geometria = useMemo(() => criarAmonite(), [])

  useFrame((_, delta) => {
    if (parado || !ref.current) return
    ref.current.rotation.z -= delta * 0.12
    ref.current.rotation.y = Math.sin(performance.now() / 4000) * 0.25
  })

  return (
    <mesh ref={ref} geometry={geometria} rotation={[-0.35, 0.2, 0]}>
      <meshStandardMaterial color="#c9a227" roughness={0.55} metalness={0.15} />
    </mesh>
  )
}

export default function HeroScene() {
  const reduzido = useReducedMotion()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [visivel, setVisivel] = useState(true)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const frameloop = reduzido ? 'demand' : visivel ? 'always' : 'never'

  return (
    <div ref={wrapperRef} className="absolute inset-0" aria-hidden="true">
      <Canvas frameloop={frameloop} camera={{ position: [0, 0, 4.2], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#0f6b3e" />
        <Amonite parado={reduzido} />
      </Canvas>
    </div>
  )
}
