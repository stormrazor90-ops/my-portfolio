import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './ShaderBackground.module.css'

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
#define TWO_PI 6.2831853072
#define PI 3.14159265359
precision highp float;

uniform vec2 resolution;
uniform float time;

void main(void) {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
  float t = time * 0.05;
  float lineWidth = 0.002;
  vec3 color = vec3(0.0);

  for(int j = 0; j < 3; j++){
    for(int i = 0; i < 5; i++){
      color[j] += lineWidth * float(i * i) / abs(
        fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0
        - length(uv)
        + mod(uv.x + uv.y, 0.2)
      );
    }
  }

  gl_FragColor = vec4(color[0], color[1], color[2], 1.0);
}
`

export default function ShaderBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Scene setup
    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time:       { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    scene.add(new THREE.Mesh(geometry, material))

    // Pass the JSX-rendered canvas directly — no appendChild needed
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      // React owns the canvas element — no removeChild needed
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.bg} />
}
