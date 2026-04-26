import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../../store/useStore';
import { generateScramble, getOptimalSolve } from '../../services/solver';
import { playSound } from '../../services/audio';
import { RefreshCw, Zap, Cpu } from 'lucide-react';

export function Timer() {
    const { timerValue, setTimerValue, timerRunning, setTimerRunning, setCurrentScramble, currentScramble } = useStore();
    const startTimeRef = useRef<number>(0);
    const [inspection, setInspection] = useState(0);
    const [phase, setPhase] = useState<'idle' | 'inspection' | 'solving'>('idle');

    useEffect(() => {
        let interval: any;
        if (phase === 'solving') {
            startTimeRef.current = performance.now();
            interval = setInterval(() => {
                setTimerValue(performance.now() - startTimeRef.current);
            }, 10);
        } else if (phase === 'inspection') {
            setInspection(15);
            interval = setInterval(() => {
                setInspection(prev => Math.max(0, prev - 1));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [phase, setTimerValue]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (phase === 'idle') {
                    setPhase('inspection');
                } else if (phase === 'inspection') {
                    setPhase('solving');
                } else if (phase === 'solving') {
                    setPhase('idle');
                    // Save logic would go here
                    playSound('solve');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [phase]);

    const formatTime = (ms: number) => {
        const seconds = (ms / 1000).toFixed(2);
        return seconds;
    };

    return (
        <div className="absolute inset-0 flex flex-col pointer-events-none select-none z-20 p-8">
            {/* Scramble at Top */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center w-full max-w-2xl">
                 <p className="text-[10px] uppercase opacity-40 mb-1 tracking-widest font-mono">Official Scramble</p>
                 <p className="text-xl font-mono tracking-widest text-zinc-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    {currentScramble || "READY_FOR_BOOT_"}
                 </p>
            </div>

            {/* Inspection / Phase Indicator in center if needed */}
            {phase === 'inspection' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-9xl font-black text-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)] italic"
                    >
                        {inspection}
                    </motion.div>
                    <p className="text-xs font-mono text-cyan-500 tracking-[0.5em] mt-4 uppercase font-bold animate-pulse">Inspection Period</p>
                </div>
            )}

            {/* Bottom HUD */}
            <div className="mt-auto flex justify-between items-end p-2">
                <div className="font-mono">
                    <p className="text-[10px] opacity-40 uppercase tracking-widest mb-1">Current Session // Time</p>
                    <p className={cn(
                        "text-7xl font-bold text-white tracking-tighter italic",
                        phase === 'solving' && "text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    )}>
                        {formatTime(timerValue).padStart(5, '0')}
                    </p>
                </div>

                <div className="pointer-events-auto flex gap-3 pb-2">
                    <button 
                        onClick={async () => {
                            const solve = await getOptimalSolve(currentScramble);
                            console.log("AI Solve:", solve);
                        }}
                        className="px-6 py-2 border border-cyan-500/50 bg-cyan-500/10 text-cyan-400 text-xs uppercase tracking-widest font-bold rounded hover:bg-cyan-500 hover:text-black transition-all"
                    >
                        Auto-Solve
                    </button>
                    <button 
                        onClick={async () => {
                             const s = await generateScramble();
                             setCurrentScramble(s);
                             playSound('scramble');
                        }}
                        className="px-6 py-2 border border-white/20 bg-white/5 text-white text-xs uppercase tracking-widest font-bold rounded hover:bg-white/10 transition-all font-mono"
                    >
                        New Scramble
                    </button>
                </div>
            </div>
            
            {phase === 'idle' && (
                <div className="absolute top-2/3 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.4em] opacity-40 uppercase animate-pulse">
                    Hold [Space] to initialize
                </div>
            )}
        </div>
    );
}

import { cn } from '../../lib/utils';
