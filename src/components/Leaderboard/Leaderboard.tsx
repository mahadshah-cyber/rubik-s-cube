import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Globe, MapPin, School, ArrowUpRight } from 'lucide-react';

interface LeaderboardUser {
    displayName: string;
    photoURL: string;
    bestSingle: number;
    country: string;
    rank: string;
}

const MOCK_LEADERBOARD: LeaderboardUser[] = [
    { displayName: "MAX_PARK", photoURL: "", bestSingle: 3.13, country: "USA", rank: "NEXUS LEGEND" },
    { displayName: "YI_HENG", photoURL: "", bestSingle: 3.44, country: "CHN", rank: "QUANTUM PILOT" },
    { displayName: "FELIKS_Z", photoURL: "", bestSingle: 4.16, country: "AUS", rank: "GRANDMASTER" },
    { displayName: "TYMON_K", photoURL: "", bestSingle: 4.52, country: "POL", rank: "GRANDMASTER" },
    { displayName: "LUKE_G", photoURL: "", bestSingle: 4.67, country: "USA", rank: "MASTER" },
];

export function Leaderboard() {
    return (
        <div className="w-full flex-1 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col font-mono pointer-events-auto">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-orange-400 border-b border-white/10 pb-2 mb-6 flex items-center gap-2">
                 <Trophy size={14} /> Quantum Leaderboard
            </h3>
            <div className="flex flex-col gap-4 font-mono text-[11px] h-full overflow-y-auto">
                <div className="flex justify-between items-center opacity-40 italic px-2">
                    <span>PILOT_ID</span>
                    <span>CORE_TIME</span>
                </div>
                {MOCK_LEADERBOARD.map((user, i) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i}
                        className={cn(
                            "flex justify-between items-center py-3 px-3 transition-all cursor-pointer group",
                            i === 0 
                                ? "text-white border-l-2 border-orange-500 bg-orange-500/10" 
                                : "text-gray-300 opacity-70 hover:opacity-100 hover:bg-white/5 hover:border-l-2 hover:border-white/20"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <span className={cn("font-bold", i === 0 ? "text-orange-500" : "text-zinc-600")}>{i + 1}.</span>
                            <span className="font-bold tracking-widest">{user.displayName}</span>
                        </div>
                        <span className={cn("font-bold", i === 0 && "text-orange-500")}>
                            {user.bestSingle.toFixed(2)}
                            <ArrowUpRight size={12} className="inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                    </motion.div>
                ))}
            </div>
            <button className="mt-8 w-full py-3 text-[10px] uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-colors font-bold">
                REFRESH_SYNC_FEED //
            </button>
        </div>
    );
}

function Tab({ children, active = false }: { children: React.ReactNode, active?: boolean }) {
    return (
        <button className={cn(
            "px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] transition-all",
            active ? "bg-white text-black" : "bg-white/5 text-zinc-500 hover:bg-white/10"
        )}>
            {children}
        </button>
    );
}

import { cn } from '../../lib/utils';
