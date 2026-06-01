'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Setup
    const w = mountRef.current.clientWidth
    const h = mountRef.current.clientHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Option B: Geometric Mesh Lines
    const geometry1 = new THREE.IcosahedronGeometry(3.5, 1)
    const material1 = new THREE.LineBasicMaterial({ 
      color: 0x3B5BFF, 
      transparent: true, 
      opacity: 0.15 
    })
    const wireframe1 = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry1), 
      material1
    )
    scene.add(wireframe1)

    const geometry2 = new THREE.IcosahedronGeometry(2.5, 1)
    const material2 = new THREE.LineBasicMaterial({ 
      color: 0x00C8A0, 
      transparent: true, 
      opacity: 0.10 
    })
    const wireframe2 = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry2), 
      material2
    )
    scene.add(wireframe2)

    // Mouse Interaction
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation Loop
    const clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()

      // Base rotation
      wireframe1.rotation.x += 0.05 * delta
      wireframe1.rotation.y += 0.08 * delta

      wireframe2.rotation.x -= 0.06 * delta
      wireframe2.rotation.y -= 0.07 * delta

      // Mouse influence
      wireframe1.rotation.x += mouseY * 0.01
      wireframe1.rotation.y += mouseX * 0.01
      
      wireframe2.rotation.x += mouseY * 0.015
      wireframe2.rotation.y -= mouseX * 0.015

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return
      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
      geometry1.dispose()
      geometry2.dispose()
      material1.dispose()
      material2.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="three-canvas" 
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} 
    />
  )
}
