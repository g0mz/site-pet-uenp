import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/motion/useReducedMotion'

// Cena procedural do hero. Carregada com React.lazy (three.js é pesado),
// pausa fora da tela e fica estática com reduced-motion.
export default function HeroScene() {
  const reduced = useReducedMotion()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const frameloop = reduced ? 'demand' : visible ? 'always' : 'never'

  return (
    <div ref={wrapperRef} className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas frameloop={frameloop} camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 5]} intensity={1.2} />
        <Float speed={reduced ? 0 : 1.5} floatIntensity={reduced ? 0 : 1.5}>
          <Icosahedron args={[1.4, 8]}>
            <MeshDistortMaterial color="#8b5cf6" distort={0.35} speed={reduced ? 0 : 2} />
          </Icosahedron>
        </Float>
      </Canvas>
    </div>
  )
}
