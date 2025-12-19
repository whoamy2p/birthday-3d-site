import React, { useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function heart3D(t) {
  const x = 16 * Math.sin(t) ** 3;
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  const z = Math.sin(t * 2) * 2; // Add depth for 3D effect
  return [x / 16, y / 16, z / 16];
}

function HeartCloud({ count = 12000 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2;
      const [hx, hy, hz] = heart3D(t);
      arr[i * 3 + 0] = hx + (Math.random() - 0.5) * 0.2;
      arr[i * 3 + 1] = hy + (Math.random() - 0.5) * 0.2;
      arr[i * 3 + 2] = hz + (Math.random() - 0.5) * 0.2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const { clock } = state;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] += Math.sin(t * 0.5 + i * 0.01) * 0.002;
      positions[i3 + 1] += Math.cos(t * 0.5 + i * 0.01) * 0.002;
      positions[i3 + 2] += Math.sin(t * 0.3 + i * 0.01) * 0.002;
    }
  });

  return (
    <Points positions={positions} stride={3} frustumCulled>
      <PointMaterial
        color={["#ff85b3", "#ffcce6", "#ffb3e6"][Math.floor(Math.random() * 3)]}
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.9}
      />
    </Points>
  );
}

export default function Screen2({ onNext }) {
  return (
    <div className="screen screen2">
      <div className="top-msg">¡Feliz cumpleaños, preciosa! 🎉</div>
      <h1>💝 Un corazón flotando en millones de puntos 💝</h1>
      <div className="sweet-msg">Eres única y especial, cada punto refleja un momento feliz contigo ✨</div>
      <div className="canvas-wrap">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <HeartCloud count={12000} />
        </Canvas>
      </div>
      <button onClick={onNext}>Descubre más 🎁</button>
    </div>
  );
}
