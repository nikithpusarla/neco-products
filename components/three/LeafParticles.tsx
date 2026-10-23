'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField: React.FC<{ count: number }> = ({ count }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Geometry: subtle curled leaf petal shape
  const leafGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.15);
    shape.quadraticCurveTo(0.12, 0, 0, 0.22);
    shape.quadraticCurveTo(-0.12, 0, 0, -0.15);

    const geo = new THREE.ShapeGeometry(shape);
    return geo;
  }, []);

  // Particle positions, rotations, and individual speeds
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 12,
        z: (Math.random() - 0.5) * 8,
        speedY: 0.2 + Math.random() * 0.4,
        rotSpeedX: (Math.random() - 0.5) * 1.5,
        rotSpeedY: (Math.random() - 0.5) * 2,
        rotSpeedZ: (Math.random() - 0.5) * 1.5,
        swayOffset: Math.random() * Math.PI * 2,
        scale: 0.4 + Math.random() * 0.6,
      });
    }
    return data;
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      // Fall down slowly
      p.y -= p.speedY * delta;
      // Gentle horizontal sway
      const swayX = Math.sin(time + p.swayOffset) * 0.008;

      if (p.y < -6) {
        p.y = 6;
        p.x = (Math.random() - 0.5) * 16;
      }

      dummy.position.set(p.x + swayX, p.y, p.z);
      dummy.rotation.x += p.rotSpeedX * delta;
      dummy.rotation.y += p.rotSpeedY * delta;
      dummy.rotation.z += p.rotSpeedZ * delta;
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[leafGeometry, undefined, count]}
      dispose={null}
    >
      <meshStandardMaterial
        color="#C9A46A"
        side={THREE.DoubleSide}
        transparent
        opacity={0.4}
        roughness={0.8}
      />
    </instancedMesh>
  );
};

export const LeafParticles: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [count, setCount] = useState(120);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCount(40);
    } else {
      setCount(120);
    }
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[0, 5, 5]} intensity={1} color="#DFC392" />
        <ParticleField count={count} />
      </Canvas>
    </div>
  );
};
