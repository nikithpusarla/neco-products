'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { exportOrigin, exportDestinations, ExportCountry } from '@/data/exportCountries';

const GLOBE_RADIUS = 2.4;

// Convert Lat/Lng to Vector3
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

const ArcLine: React.FC<{ start: THREE.Vector3; end: THREE.Vector3 }> = ({ start, end }) => {
  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    // Lift mid point outward proportional to distance
    mid.normalize().multiplyScalar(GLOBE_RADIUS + Math.min(1.2, distance * 0.28));
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [start, end]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 32, 0.012, 8, false]} />
      <meshBasicMaterial color="#DEBF8A" transparent opacity={0.7} />
    </mesh>
  );
};

// Globe Core with Dot Grid and Arcs
const GlobeScene: React.FC<{
  onSelectCountry: (c: ExportCountry) => void;
  selectedCountry: ExportCountry | null;
}> = ({ onSelectCountry, selectedCountry }) => {
  const globeGroupRef = useRef<THREE.Group>(null);

  const originVec = useMemo(
    () => latLngToVector3(exportOrigin.lat, exportOrigin.lng, GLOBE_RADIUS),
    []
  );

  // Generate dotted sphere grid
  const dotPoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const count = 1400;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = GLOBE_RADIUS * Math.cos(theta) * Math.sin(phi);
      const y = GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi);
      const z = GLOBE_RADIUS * Math.cos(phi);
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  const dotsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(dotPoints);
    return geo;
  }, [dotPoints]);

  useFrame((_, delta) => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* Dark Inner Core Sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS - 0.02, 48, 48]} />
        <meshBasicMaterial color="#0C1611" transparent opacity={0.95} />
      </mesh>

      {/* Dotted Wireframe Shell */}
      <points geometry={dotsGeometry}>
        <pointsMaterial size={0.035} color="#8FA58A" transparent opacity={0.45} />
      </points>

      {/* Origin Pin (Tamil Nadu, India) */}
      <mesh position={originVec}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#A3C25A" />
      </mesh>

      {/* Arcs and Destination Pins */}
      {exportDestinations.map((dest) => {
        const destVec = latLngToVector3(dest.lat, dest.lng, GLOBE_RADIUS);
        const isSelected = selectedCountry?.code === dest.code;
        return (
          <group key={dest.code}>
            <ArcLine start={originVec} end={destVec} />

            {/* Destination Pin */}
            <mesh
              position={destVec}
              onClick={(e) => {
                e.stopPropagation();
                onSelectCountry(dest);
              }}
            >
              <sphereGeometry args={[isSelected ? 0.08 : 0.05, 16, 16]} />
              <meshBasicMaterial color={isSelected ? '#C9A46A' : '#DEBF8A'} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export const Globe: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<ExportCountry | null>(
    exportDestinations[0]
  );

  return (
    <div className="relative w-full h-[560px] rounded-3xl bg-[#0C1611]/90 border border-gold/25 overflow-hidden shadow-2xl flex flex-col justify-between p-6">
      {/* 3D Canvas */}
      <div className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y">
        <Canvas
          camera={{ position: [0, 1.2, 5.2], fov: 45 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#DEBF8A" />

          <GlobeScene
            onSelectCountry={(c) => setSelectedCountry(c)}
            selectedCountry={selectedCountry}
          />

          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={3.5}
            maxDistance={7}
            autoRotate={false}
          />
        </Canvas>
      </div>

      {/* Header Overlay */}
      <div className="relative z-10 flex items-center justify-between pointer-events-auto">
        <div className="bg-[#13201A]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/20 text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sprout animate-ping" />
          <span className="text-cream font-medium">Dispatches from Tuticorin Port, Tamil Nadu</span>
        </div>
        <span className="text-[11px] text-sage/80 font-mono hidden sm:block">
          INTERACTIVE 3D GLOBAL ARCS
        </span>
      </div>

      {/* Selected Country Info Card */}
      {selectedCountry && (
        <div className="relative z-10 max-w-sm bg-[#13201A]/90 backdrop-blur-lg border border-gold/30 rounded-2xl p-4 shadow-xl pointer-events-auto">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-serif text-lg font-bold text-cream">
              {selectedCountry.name}
            </h4>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#1F3A2B] text-gold border border-gold/30">
              {selectedCountry.code}
            </span>
          </div>
          <p className="text-xs text-cream/80 mb-2 leading-relaxed">
            {selectedCountry.description}
          </p>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-sage">
            <span>Primary Gateway: <strong className="text-cream">{selectedCountry.city}</strong></span>
            <span className="text-gold font-semibold">{selectedCountry.volumeTons}</span>
          </div>
        </div>
      )}
    </div>
  );
};
