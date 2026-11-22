import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Toda animação de scroll entra só com esta media query; com reduced-motion a página fica parada.
export const MOVIMENTO = '(prefers-reduced-motion: no-preference)'

export { gsap, ScrollTrigger, useGSAP }
