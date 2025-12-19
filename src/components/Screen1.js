import React, { useState, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { GLB, SceneWrapper } from "./Model";

const HEART_URL = "https://assets.codepen.io/74321/heart.glb";

function RandomHearts({ count = 800 }) {
  const heartsRef = useRef(
    Array.from({ length: count }, () => ({
      scale: 0.2 + Math.random() * 0.15,
      speedX: (Math.random() - 0.5) * 0.02,
      speedY: (Math.random() - 0.5) * 0.02,
      speedZ: (Math.random() - 0.5) * 0.02,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 0.02,
      rotSpeedY: (Math.random() - 0.5) * 0.02,
      rotSpeedZ: (Math.random() - 0.5) * 0.02,
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 6,
    }))
  );

  const meshRefs = useRef([]);

  useFrame(() => {
    heartsRef.current.forEach((heart, i) => {
      if (meshRefs.current[i]) {
        heart.x += heart.speedX;
        heart.y += heart.speedY;
        heart.z += heart.speedZ;

        heart.rotX += heart.rotSpeedX;
        heart.rotY += heart.rotSpeedY;
        heart.rotZ += heart.rotSpeedZ;

        // Wrap around boundaries
        if (Math.abs(heart.x) > 12) heart.speedX *= -1;
        if (Math.abs(heart.y) > 10) heart.speedY *= -1;
        if (Math.abs(heart.z) > 8) heart.speedZ *= -1;

        meshRefs.current[i].position.set(heart.x, heart.y, heart.z);
        meshRefs.current[i].rotation.set(heart.rotX, heart.rotY, heart.rotZ);
      }
    });
  });

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => (meshRefs.current[i] = el)}
          position={[heartsRef.current[i].x, heartsRef.current[i].y, heartsRef.current[i].z]}
          rotation={[heartsRef.current[i].rotX, heartsRef.current[i].rotY, heartsRef.current[i].rotZ]}
        >
          <GLB
            url={HEART_URL}
            scale={heartsRef.current[i].scale}
            position={[0, 0, 0]}
          />
        </mesh>
      ))}
    </>
  );
}

export default function Screen1({ onUnlock }) {
  const [code, setCode] = useState("");
  const correct = "0425";

  const press = (n) => setCode((prev) => (prev + String(n)).slice(0, 4));
  const backspace = () => setCode((prev) => prev.slice(0, -1));
  const submit = () =>
    code === correct
      ? onUnlock()
      : (alert("Clave incorrecta ❌"), setCode(""));

  return (
    <div className="screen screen1">
      <div className="canvas-wrap floating-heart-bg fullscreen-canvas">
        <SceneWrapper camera={[0, 0, 5]} orbit={false} shadows={false}>
          <RandomHearts count={800} />
        </SceneWrapper>
      </div>

      <div className="overlay-content">
        <h1 style={{ color: "#ff85b3", marginBottom: "10px" }}>
          💖 Hola, hermosa 💖
        </h1>
        <div
          className="note"
          style={{ color: "#ffcce6", fontSize: "18px", marginBottom: "20px" }}
        >
          Escribe tu clave para abrir la sorpresa ✨
        </div>
        <div className="code-display">{code.padEnd(4, "•")}</div>
        <div className="keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button key={n} onClick={() => press(n)}>{n}</button>
          ))}
          <button onClick={backspace}>⌫</button>
          <button onClick={() => press(0)}>0</button>
          <button onClick={submit}>OK</button>
        </div>
      </div>
    </div>
  );
}
