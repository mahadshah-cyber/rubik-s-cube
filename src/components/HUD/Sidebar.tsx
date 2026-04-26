import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { Play, RotateCcw, Award, BarChart3, Settings, User, Globe, Zap, Cpu, History } from 'lucide-react';
import { generateScramble } from '../../services/solver';
import { loginWithGoogle, logout, auth } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export function Sidebar() {
  const { view, setView } = useStore();

  const menuItems = [
    { id: 'home', label: 'Dashboard' },
    { id: 'solo', label: 'Solo Training' },
    { id: 'competition', label: 'Comp Arena' },
    { id: 'training', label: 'Training Lab' },
    { id: 'rankings', label: 'Ghost Battle' },
    { id: 'profile', label: 'Analytics Core' },
    { id: 'settings', label: 'AI Coach' },
  ];

  return (
    <div className="flex flex-col gap-2 w-full h-full">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as any)}
            className={cn(
              "p-3 text-left text-[10px] uppercase tracking-[0.2em] transition-all font-bold",
              view === item.id 
                ? "bg-white/5 border-l-2 border-cyan-500 text-white" 
                : "text-gray-300 opacity-50 hover:opacity-100 hover:bg-white/5"
            )}
          >
            {item.label}
          </button>
        ))}
    </div>
  );
}

function UserStatus() {
    const { user, setUser } = useStore();
    
    useEffect(() => {
        return onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
    }, [setUser]);

    if (!user) {
        return (
            <button 
                onClick={loginWithGoogle}
                className="w-full bg-white text-black p-3 rounded-xl font-bold text-xs tracking-widest hover:scale-105 transition-transform truncate"
            >
                CONNECT_
            </button>
        );
    }

    return (
        <div className="flex items-center gap-3 p-2 bg-white/5 rounded-2xl border border-white/10 group-hover:p-3 transition-all">
            <img 
                src={user.photoURL} 
                className="w-8 h-8 rounded-full border border-white/20"
                alt="profile"
                referrerPolicy="no-referrer"
            />
            <div className="hidden group-hover:block overflow-hidden">
                <p className="text-[10px] font-black tracking-widest text-white truncate">{user.displayName?.toUpperCase()}</p>
                <p className="text-[8px] font-bold text-cyan-400 tracking-widest">RANK: ELITE</p>
            </div>
        </div>
    );
}
