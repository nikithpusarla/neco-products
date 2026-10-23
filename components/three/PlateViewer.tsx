'use client';

import React, { useState, useRef, Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ArecaPlate, PlateShape } from './ArecaPlate';
import { Layers, Eye, Compass, RotateCcw } from 'lucide-react';
import gsap from 'gsap';

interface PlateViewerProps {
  initialShape?: PlateShape;
  allowShapeSwitch?: boolean;
}

// InstancedMesh Stack of 25 plates
const PlateStack: React.FC<{ count?: number }> = ({ count = 25 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Profile curve for round plate
  const geometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.01, 0));
    points.push(new THREE.Vector2(1.5, 0.02));
    points.push(new THREE.Vector2(1.9, 0.15));
    points.push(new THREE.Vector2(2.2, 0.38));
    points.push(new THREE.Vector2(2.28, 0.42));
    points.push(new THREE.Vector2(2.24, 0.44));
    points.push(new THREE.Vector2(1.85, 0.2));
    points.push(new THREE.Vector2(1.48, 0.06));
    points.push(new THREE.Vector2(0.01, 0.05));
    return new THREE.LatheGeometry(points, 48);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    const stepHeight = 0.07; // compact stack nesting
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, i * stepHeight - (count * stepHeight) / 2, 0);
      dummy.rotation.y = i * 0.08;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, dummy]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, count]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color="#D6B688"
        roughness={0.7}
        metalness={0.05}
      />
    </instancedMesh>
  );
};

export const PlateViewer: React.FC<PlateViewerProps> = ({
  initialShape = 'round',
  allowShapeSwitch = true,
}) => {
  const [selectedShape, setSelectedShape] = useState<PlateShape>(initialShape);
  const [viewMode, setViewMode] = useState<'perspective' | 'top' | 'side' | 'stack'>('perspective');
  const controlsRef = useRef<any>(null);

  const shapesList: { shape: PlateShape; label: string }[] = [
    { shape: 'round', label: 'Round' },
    { shape: 'square', label: 'Square' },
    { shape: 'rectangle', label: 'Rectangle' },
    { shape: 'hexagon', label: 'Hexagon' },
    { shape: 'heart', label: 'Heart' },
    { shape: 'bowl', label: 'Bowl' },
  ];

  const handleCameraView = (mode: 'perspective' | 'top' | 'side' | 'stack') => {
    setViewMode(mode);
    if (!controlsRef.current) return;

    const camera = controlsRef.current.object;
    let targetPos = { x: 0, y: 2.2, z: 4.5 };

    if (mode === 'top') {
      targetPos = { x: 0, y: 5.5, z: 0.01 };
    } else if (mode === 'side') {
      targetPos = { x: 0, y: 0.4, z: 4.8 };
    } else if (mode === 'stack') {
      targetPos = { x: 3.2, y: 1.5, z: 3.8 };
    }

    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.2,
      ease: 'power3.inOut',
      onUpdate: () => controlsRef.current.update(),
    });
  };

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] rounded-3xl bg-[#0C1611]/80 border border-gold/25 overflow-hidden shadow-2xl flex flex-col justify-between p-6">
      {/* 3D Canvas Viewport */}
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y" data-cursor="drag">
        <Canvas
          shadows
          camera={{ position: [0, 2.2, 4.5], fov: 45 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.4}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />
          <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#8FA58A" />

          <Suspense fallback={null}>
            {viewMode === 'stack' ? (
              <PlateStack count={25} />
            ) : (
              <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
                <ArecaPlate shape={selectedShape} scale={0.9} />
              </Float>
            )}

            <ContactShadows
              position={[0, -1.2, 0]}
              opacity={0.65}
              scale={8}
              blur={2.4}
              far={4}
              color="#070E0B"
            />
            <Environment preset="forest" />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            minDistance={2.5}
            maxDistance={7}
            maxPolarAngle={Math.PI / 2 + 0.1}
          />
        </Canvas>
      </div>

      {/* Top Header Controls: View mode selectors */}
      <div className="relative z-10 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 bg-[#13201A]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold/20 text-xs">
          <span className="w-2 h-2 rounded-full bg-sprout animate-pulse" />
          <span className="text-cream/90 font-medium">Interactive 3D Preview</span>
        </div>

        {/* Camera Preset Switchers */}
        <div className="flex items-center gap-1.5 bg-[#13201A]/80 backdrop-blur-md p-1 rounded-full border border-gold/20">
          <button
            onClick={() => handleCameraView('perspective')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              viewMode === 'perspective'
                ? 'bg-gold text-[#13201A]'
                : 'text-cream/70 hover:text-cream'
            }`}
            title="Free 3D Perspective"
          >
            <Compass className="w-3.5 h-3.5 inline mr-1" />
            3D
          </button>
          <button
            onClick={() => handleCameraView('top')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              viewMode === 'top'
                ? 'bg-gold text-[#13201A]'
                : 'text-cream/70 hover:text-cream'
            }`}
            title="Top Plating View"
          >
            <Eye className="w-3.5 h-3.5 inline mr-1" />
            Top
          </button>
          <button
            onClick={() => handleCameraView('side')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              viewMode === 'side'
                ? 'bg-gold text-[#13201A]'
                : 'text-cream/70 hover:text-cream'
            }`}
            title="Side Cavity Profile"
          >
            <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
            Side
          </button>
          <button
            onClick={() => handleCameraView('stack')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              viewMode === 'stack'
                ? 'bg-gold text-[#13201A]'
                : 'text-cream/70 hover:text-cream'
            }`}
            title="25x Export Nesting Stack"
          >
            <Layers className="w-3.5 h-3.5 inline mr-1" />
            25x Stack
          </button>
        </div>
      </div>

      {/* Bottom Shape Switcher Chips */}
      {allowShapeSwitch && (
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-auto bg-[#13201A]/85 backdrop-blur-lg p-3 rounded-2xl border border-gold/20">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {shapesList.map((item) => (
              <button
                key={item.shape}
                onClick={() => {
                  if (viewMode === 'stack') setViewMode('perspective');
                  setSelectedShape(item.shape);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  selectedShape === item.shape && viewMode !== 'stack'
                    ? 'bg-[#1F3A2B] text-gold border border-gold shadow-glow-gold'
                    : 'text-cream/75 hover:text-cream hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <p className="text-[11px] text-sage/80 hidden sm:block font-mono">
            DRAG TO ROTATE • PINCH TO ZOOM
          </p>
        </div>
      )}
    </div>
  );
};
