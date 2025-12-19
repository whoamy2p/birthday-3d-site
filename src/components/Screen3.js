import React from "react";
import { Float } from "@react-three/drei";
import { SceneWrapper } from "./Model";

export default function Screen3(){
  return (
    <div className="screen screen3">
      <div className="top-msg">Con cariño para una futura ingeniera ambiental 🌱</div>
      <h1>🎂 ¡Feliz Cumpleaños! 🎈</h1>
      <div className="canvas-wrap">
        <SceneWrapper camera={[0,1.4,5]}>
          {/* Cake - simple geometry fallback para garantizar render */}
          <Float speed={1.2} floatIntensity={0.5} rotationIntensity={0.3}>
            <mesh position={[0,-0.6,0]}>
              <cylinderGeometry args={[1.1,1.1,0.6,32]} />
              <meshStandardMaterial color="#ffd9b3" metalness={0.2} roughness={0.6} />
            </mesh>
            <mesh position={[0,-0.2,0]}>
              <sphereGeometry args={[0.25,24,24]} />
              <meshStandardMaterial color="#fff5ee" metalness={0.1} roughness={0.6} />
            </mesh>
          </Float>

          {/* Balloons */}
          <Float speed={2} floatIntensity={1.2}>
            <mesh position={[-1.6,1.2,-0.5]}> 
              <sphereGeometry args={[0.38,28,28]} />
              <meshStandardMaterial color="#ff9ccf" metalness={0.1} roughness={0.5} />
            </mesh>
          </Float>
          <Float speed={2.4} floatIntensity={1.3}>
            <mesh position={[1.4,1.4,0.4]}> 
              <sphereGeometry args={[0.34,28,28]} />
              <meshStandardMaterial color="#9bd3ff" metalness={0.1} roughness={0.5} />
            </mesh>
          </Float>
          <Float speed={1.8} floatIntensity={1.1}>
            <mesh position={[0.2,1.9,-0.8]}> 
              <sphereGeometry args={[0.3,28,28]} />
              <meshStandardMaterial color="#ffd1ec" metalness={0.1} roughness={0.5} />
            </mesh>
          </Float>

          {/* Gifts - simple boxes */}
          <mesh position={[-1.0,-0.65,0.8]}> 
            <boxGeometry args={[0.6,0.45,0.6]} />
            <meshStandardMaterial color="#b6f0d6" />
          </mesh>
          <mesh position={[1.1,-0.65,-0.6]}> 
            <boxGeometry args={[0.55,0.45,0.55]} />
            <meshStandardMaterial color="#ffd6a5" />
          </mesh>
        </SceneWrapper>
      </div>
      <div className="note">Hecho con 💚 pensando en el planeta: usa LED (luz eficiente), amor infinito y cero emisiones de CO₂ 😉</div>
    </div>
  );
}
