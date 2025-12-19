import React, { Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, Environment, ContactShadows } from "@react-three/drei";

export function GLB({ url, scale=1, position=[0,0,0], rotation=[0,0,0] }){
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} position={position} rotation={rotation} />;
}

export function SceneWrapper({ children, camera=[0,1.2,4], orbit=true, shadows=true }){
  return (
    <Canvas camera={{ position: camera }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3,5,2]} intensity={1} castShadow />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        {children}
        {shadows && <ContactShadows position={[0,-0.7,0]} opacity={0.55} scale={10} blur={2.4} far={3} />}
      </Suspense>
      {orbit && <OrbitControls enableZoom={false} />}
    </Canvas>
  );
}
