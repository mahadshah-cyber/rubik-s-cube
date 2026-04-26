import { useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Box, RoundedBox } from '@react-three/drei';

const COLORS = {
  U: '#FFFFFF', // White
  D: '#FFFF00', // Yellow
  F: '#FF0000', // Red
  B: '#FFA500', // Orange
  L: '#0000FF', // Blue
  R: '#00FF00', // Green
  X: '#111111', // Internal/Black
};

interface CubieProps {
  position: [number, number, number];
  colors: {
    up: string;
    down: string;
    front: string;
    back: string;
    left: string;
    right: string;
  };
}

export function Cubie({ position, colors }: CubieProps) {
  const meshRef = useRef<THREE.Group>(null);

  return (
    <group ref={meshRef} position={position}>
      {/* Main Cubie Body */}
      <RoundedBox args={[0.95, 0.95, 0.95]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#000000" metalness={0.5} roughness={0.1} />
      </RoundedBox>

      {/* Stickers */}
      {/* Top */}
      <Box args={[0.8, 0.01, 0.8]} position={[0, 0.48, 0]}>
        <meshStandardMaterial color={colors.up} emissive={colors.up} emissiveIntensity={0.2} />
      </Box>
      {/* Bottom */}
      <Box args={[0.8, 0.01, 0.8]} position={[0, -0.48, 0]}>
        <meshStandardMaterial color={colors.down} emissive={colors.down} emissiveIntensity={0.2} />
      </Box>
      {/* Front */}
      <Box args={[0.8, 0.8, 0.01]} position={[0, 0, 0.48]}>
        <meshStandardMaterial color={colors.front} emissive={colors.front} emissiveIntensity={0.2} />
      </Box>
      {/* Back */}
      <Box args={[0.8, 0.8, 0.01]} position={[0, 0, -0.48]}>
        <meshStandardMaterial color={colors.back} emissive={colors.back} emissiveIntensity={0.2} />
      </Box>
      {/* Left */}
      <Box args={[0.01, 0.8, 0.8]} position={[-0.48, 0, 0]}>
        <meshStandardMaterial color={colors.left} emissive={colors.left} emissiveIntensity={0.2} />
      </Box>
      {/* Right */}
      <Box args={[0.01, 0.8, 0.8]} position={[0.48, 0, 0]}>
        <meshStandardMaterial color={colors.right} emissive={colors.right} emissiveIntensity={0.2} />
      </Box>
    </group>
  );
}
