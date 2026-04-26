import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Cubie } from './Cubie';
import { useStore } from '../../store/useStore';

const COLORS = {
  U: '#FFFFFF',
  D: '#FFFF00',
  F: '#FF0000',
  B: '#FFA500',
  L: '#0000FF',
  R: '#00FF00',
  X: '#111111',
};

export function Cube() {
  const groupRef = useRef<THREE.Group>(null);
  const [cubies, setCubies] = useState<any[]>([]);

  // Initialize the 27 cubies
  useEffect(() => {
    const newCubies = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          newCubies.push({
            position: [x, y, z] as [number, number, number],
            colors: {
              up: y === 1 ? COLORS.U : COLORS.X,
              down: y === -1 ? COLORS.D : COLORS.X,
              front: z === 1 ? COLORS.F : COLORS.X,
              back: z === -1 ? COLORS.B : COLORS.X,
              left: x === -1 ? COLORS.L : COLORS.X,
              right: x === 1 ? COLORS.R : COLORS.X,
            },
          });
        }
      }
    }
    setCubies(newCubies);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
        // Slow cinematic rotation when not active
        // groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {cubies.map((c, i) => (
        <Cubie key={i} position={c.position} colors={c.colors} />
      ))}
    </group>
  );
}
