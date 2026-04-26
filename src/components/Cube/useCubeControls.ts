import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { playSound } from '../../services/audio';

// Map keys to face rotations
const MOVE_MAP: Record<string, string> = {
  KeyR: 'R', KeyL: 'L', KeyU: 'U', KeyD: 'D', KeyF: 'F', KeyB: 'B',
  KeyI: 'R', KeyE: 'L', KeyJ: 'U', KeyF_alt: 'D', // Alternative keys for left/right hands
};

export function useCubeControls(cubeRef: React.RefObject<THREE.Group>) {
  const { isSolving } = useStore();
  const queue = useRef<string[]>([]);
  const isRotating = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // Prevent moves during inspection or if typing in a field (none yet)
        const move = MOVE_MAP[e.code];
        if (move) {
            let rotation = move;
            if (e.shiftKey) rotation += "'";
            applyMove(rotation);
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const applyMove = (move: string) => {
    if (!cubeRef.current) return;
    
    // We'll implement a simplified layer rotation logic
    // For a real production app, we need to track local axes
    // But for this MVP, let's just trigger a sound and visual feedback
    playSound('click');
    
    // Rotate the whole cube slightly for feedback if we don't have full layer logic yet
    // In a full implementation, we'd select cubies where pos.x === 1 for 'R', etc.
  };

  return { applyMove };
}
