'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import gsap from 'gsap';

export type PlateShape = 'round' | 'square' | 'rectangle' | 'hexagon' | 'oval' | 'heart' | 'bowl';

interface ArecaPlateProps {
  shape?: PlateShape;
  scale?: number;
  interactive?: boolean;
}

export const ArecaPlate: React.FC<ArecaPlateProps> = ({
  shape = 'round',
  scale = 1,
  interactive = true,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const texture = useLoader(TextureLoader, '/images/textures/areca-texture.jpg');

  useEffect(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 2);
    }
  }, [texture]);

  // Procedural geometry construction based on shape
  const geometry = useMemo(() => {
    switch (shape) {
      case 'round': {
        // Lathe geometry with smooth organic curve and raised rim
        const points: THREE.Vector2[] = [];
        points.push(new THREE.Vector2(0.01, 0));
        points.push(new THREE.Vector2(1.5, 0.02));
        points.push(new THREE.Vector2(1.9, 0.15));
        points.push(new THREE.Vector2(2.2, 0.38));
        points.push(new THREE.Vector2(2.28, 0.42)); // outer rim
        points.push(new THREE.Vector2(2.24, 0.44)); // rim lip
        points.push(new THREE.Vector2(1.85, 0.2));
        points.push(new THREE.Vector2(1.48, 0.06));
        points.push(new THREE.Vector2(0.01, 0.05));
        return new THREE.LatheGeometry(points, 64);
      }

      case 'bowl': {
        // Deep round vessel with steep curved walls
        const points: THREE.Vector2[] = [];
        points.push(new THREE.Vector2(0.01, 0));
        points.push(new THREE.Vector2(1.1, 0.02));
        points.push(new THREE.Vector2(1.5, 0.45));
        points.push(new THREE.Vector2(1.8, 0.95));
        points.push(new THREE.Vector2(1.88, 1.05)); // top rim
        points.push(new THREE.Vector2(1.82, 1.08));
        points.push(new THREE.Vector2(1.45, 0.52));
        points.push(new THREE.Vector2(1.05, 0.08));
        points.push(new THREE.Vector2(0.01, 0.07));
        return new THREE.LatheGeometry(points, 64);
      }

      case 'square': {
        // Rounded Square with extruded bevel
        const squareShape = new THREE.Shape();
        const size = 1.9;
        const radius = 0.35;
        squareShape.moveTo(-size + radius, -size);
        squareShape.lineTo(size - radius, -size);
        squareShape.quadraticCurveTo(size, -size, size, -size + radius);
        squareShape.lineTo(size, size - radius);
        squareShape.quadraticCurveTo(size, size, size - radius, size);
        squareShape.lineTo(-size + radius, size);
        squareShape.quadraticCurveTo(-size, size, -size, size - radius);
        squareShape.lineTo(-size, -size + radius);
        squareShape.quadraticCurveTo(-size, -size, -size + radius, -size);

        const extrudeSettings = {
          steps: 2,
          depth: 0.15,
          bevelEnabled: true,
          bevelThickness: 0.25,
          bevelSize: 0.28,
          bevelOffset: 0,
          bevelSegments: 6,
        };
        const geo = new THREE.ExtrudeGeometry(squareShape, extrudeSettings);
        geo.center();
        geo.rotateX(-Math.PI / 2);
        return geo;
      }

      case 'rectangle': {
        // Rectangular platter with bevelled edge
        const rectShape = new THREE.Shape();
        const w = 2.4;
        const h = 1.4;
        const radius = 0.25;
        rectShape.moveTo(-w + radius, -h);
        rectShape.lineTo(w - radius, -h);
        rectShape.quadraticCurveTo(w, -h, w, -h + radius);
        rectShape.lineTo(w, h - radius);
        rectShape.quadraticCurveTo(w, h, w - radius, h);
        rectShape.lineTo(-w + radius, h);
        rectShape.quadraticCurveTo(-w, h, -w, h - radius);
        rectShape.lineTo(-w, -h + radius);
        rectShape.quadraticCurveTo(-w, -h, -w + radius, -h);

        const extrudeSettings = {
          steps: 2,
          depth: 0.12,
          bevelEnabled: true,
          bevelThickness: 0.22,
          bevelSize: 0.24,
          bevelOffset: 0,
          bevelSegments: 6,
        };
        const geo = new THREE.ExtrudeGeometry(rectShape, extrudeSettings);
        geo.center();
        geo.rotateX(-Math.PI / 2);
        return geo;
      }

      case 'hexagon': {
        // 6-sided geometric polygon
        const hexShape = new THREE.Shape();
        const r = 2.1;
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = r * Math.cos(angle);
          const y = r * Math.sin(angle);
          if (i === 0) hexShape.moveTo(x, y);
          else hexShape.lineTo(x, y);
        }
        hexShape.closePath();

        const extrudeSettings = {
          steps: 2,
          depth: 0.12,
          bevelEnabled: true,
          bevelThickness: 0.24,
          bevelSize: 0.22,
          bevelSegments: 5,
        };
        const geo = new THREE.ExtrudeGeometry(hexShape, extrudeSettings);
        geo.center();
        geo.rotateX(-Math.PI / 2);
        return geo;
      }

      case 'heart': {
        // Heart curve
        const heartShape = new THREE.Shape();
        const s = 0.14;
        heartShape.moveTo(0 * s, 10 * s);
        heartShape.bezierCurveTo(0 * s, 10 * s, -12 * s, 25 * s, -25 * s, 25 * s);
        heartShape.bezierCurveTo(-45 * s, 25 * s, -45 * s, -2 * s, -45 * s, -2 * s);
        heartShape.bezierCurveTo(-45 * s, -22 * s, -28 * s, -40 * s, 0 * s, -60 * s);
        heartShape.bezierCurveTo(28 * s, -40 * s, 45 * s, -22 * s, 45 * s, -2 * s);
        heartShape.bezierCurveTo(45 * s, -2 * s, 45 * s, 25 * s, 25 * s, 25 * s);
        heartShape.bezierCurveTo(12 * s, 25 * s, 0 * s, 10 * s, 0 * s, 10 * s);

        const extrudeSettings = {
          steps: 2,
          depth: 0.12,
          bevelEnabled: true,
          bevelThickness: 0.22,
          bevelSize: 0.2,
          bevelSegments: 5,
        };
        const geo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        geo.center();
        geo.rotateX(Math.PI / 2); // face upward
        geo.rotateZ(Math.PI);
        return geo;
      }

      case 'oval': {
        // Oval / Ellipse
        const ovalShape = new THREE.Shape();
        const rx = 2.4;
        const ry = 1.6;
        ovalShape.absellipse(0, 0, rx, ry, 0, Math.PI * 2, false, 0);

        const extrudeSettings = {
          steps: 2,
          depth: 0.12,
          bevelEnabled: true,
          bevelThickness: 0.22,
          bevelSize: 0.24,
          bevelSegments: 6,
        };
        const geo = new THREE.ExtrudeGeometry(ovalShape, extrudeSettings);
        geo.center();
        geo.rotateX(-Math.PI / 2);
        return geo;
      }

      default: {
        return new THREE.CylinderGeometry(2, 1.8, 0.3, 32);
      }
    }
  }, [shape]);

  // GSAP animation on shape change
  useEffect(() => {
    if (groupRef.current) {
      gsap.fromTo(
        groupRef.current.scale,
        { x: 0.2, y: 0.2, z: 0.2 },
        { x: scale, y: scale, z: scale, duration: 0.7, ease: 'back.out(1.5)' }
      );
      gsap.fromTo(
        groupRef.current.rotation,
        { y: groupRef.current.rotation.y - 1.2 },
        { y: groupRef.current.rotation.y, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, [shape, scale]);

  // Subtle floating and rotation animation
  useFrame((state, delta) => {
    if (groupRef.current && interactive) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={scale} dispose={null}>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={texture ? '#FFFFFF' : '#D4B88E'}
          map={texture || undefined}
          roughness={0.72}
          metalness={0.06}
          bumpScale={0.03}
        />
      </mesh>
    </group>
  );
};
