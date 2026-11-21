import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '@/motion/useReducedMotion'

// Amonite fóssil procedural: tubo em espiral logarítmica com voltas encostadas, costelas
// radiais e cor de arenito. Carregado com React.lazy. Gira devagar e rola com o scroll.

const VOLTAS = 4
const CRESCIMENTO = 0.17 // b da espiral r = a·e^(b·t)
const ESPESSURA = 0.53 // raio do tubo / raio da espiral; acima de ~0.49 as voltas se encostam
const SEGMENTOS = 640
const LADOS = 48
const COSTELAS_POR_VOLTA = 24

const ARENITO_ESCURO = new THREE.Color('#5c4526')
const ARENITO_CLARO = new THREE.Color('#e2cc95')

function criarAmonite(): THREE.BufferGeometry {
  const posicoes: number[] = []
  const cores: number[] = []
  const indices: number[] = []
  const tMax = VOLTAS * Math.PI * 2
  const cor = new THREE.Color()

  for (let i = 0; i <= SEGMENTOS; i++) {
    const t = (i / SEGMENTOS) * tMax
    const r = 0.05 * Math.exp(CRESCIMENTO * t)
    const centro = new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, 0)
    const radial = new THREE.Vector3(Math.cos(t), Math.sin(t), 0)
    const fase = (t / (Math.PI * 2)) * COSTELAS_POR_VOLTA
    const costela = Math.pow(0.5 + 0.5 * Math.cos(fase * Math.PI * 2), 3)

    for (let j = 0; j <= LADOS; j++) {
      const a = (j / LADOS) * Math.PI * 2
      // Costela mais alta no lado de fora (ventre) e quase nula perto do umbigo.
      const lado = 0.5 + 0.5 * Math.cos(a)
      const espessura = r * ESPESSURA * (1 + 0.09 * costela * lado)
      const p = centro
        .clone()
        .addScaledVector(radial, Math.cos(a) * espessura)
        .add(new THREE.Vector3(0, 0, Math.sin(a) * espessura * 0.72))
      posicoes.push(p.x, p.y, p.z)

      // Mais escuro no miolo e nos sulcos entre costelas, com um grão de pedra.
      const grao = 0.06 * Math.sin(i * 12.9898 + j * 78.233) * Math.sin(i * 0.7 + j * 3.1)
      cor.copy(ARENITO_ESCURO).lerp(ARENITO_CLARO, Math.min(1, 0.25 + (i / SEGMENTOS) * 0.75))
      cor.multiplyScalar(0.55 + 0.45 * costela + grao)
      cores.push(cor.r, cor.g, cor.b)
    }
  }

  for (let i = 0; i < SEGMENTOS; i++) {
    for (let j = 0; j < LADOS; j++) {
      const a = i * (LADOS + 1) + j
      const b = a + LADOS + 1
      indices.push(a, b, a + 1, b, b + 1, a + 1)
    }
  }

  // Tampa a boca da concha (fóssil preenchido de sedimento).
  const ultimo = SEGMENTOS * (LADOS + 1)
  const meio = posicoes.length / 3
  const tFim = tMax
  const rFim = 0.05 * Math.exp(CRESCIMENTO * tFim)
  posicoes.push(Math.cos(tFim) * rFim, Math.sin(tFim) * rFim, 0)
  cores.push(ARENITO_ESCURO.r * 0.8, ARENITO_ESCURO.g * 0.8, ARENITO_ESCURO.b * 0.8)
  for (let j = 0; j < LADOS; j++) indices.push(meio, ultimo + j, ultimo + j + 1)

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(posicoes, 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cores, 3))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  geo.center()
  geo.computeBoundingSphere()
  const escala = 1.4 / (geo.boundingSphere?.radius ?? 1)
  geo.scale(escala, escala, escala)
  return geo
}

function Amonite({ parado }: { parado: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  const geometria = useMemo(() => criarAmonite(), [])

  useFrame(({ clock }) => {
    if (parado || !ref.current) return
    // Giro lento próprio + o scroll da página fazendo a concha rolar.
    ref.current.rotation.z = -clock.elapsedTime * 0.08 - window.scrollY * 0.0022
    ref.current.rotation.y = 0.3 + Math.sin(clock.elapsedTime / 3) * 0.12
  })

  return (
    <mesh ref={ref} geometry={geometria} rotation={[-0.45, 0.3, 0]}>
      <meshStandardMaterial vertexColors roughness={0.9} metalness={0} side={THREE.DoubleSide} />
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
        <ambientLight intensity={0.2} />
        <directionalLight position={[3, 4, 5]} intensity={2.6} color="#fff3d6" />
        {/* Contraluz amarelo-pena recortando a borda contra o verde. */}
        <directionalLight position={[-4, 2, -3]} intensity={3} color="#f2c230" />
        <directionalLight position={[-3, -4, 2]} intensity={0.5} color="#0f6b3e" />
        <Amonite parado={reduzido} />
      </Canvas>
    </div>
  )
}
