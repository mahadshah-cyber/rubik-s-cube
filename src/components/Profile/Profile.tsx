import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../../store/useStore';
import { User, Shield, Target, Zap, Clock, Activity, BarChart3, ChevronRight } from 'lucide-react';

export function Profile() {
    const { user } = useStore();

    if (!user) return (
        <div className="h-full flex flex-col items-center justify-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-zinc-900 flex items-center justify-center border border-white/5 animate-pulse">
                <User size={48} className="text-zinc-800" />
            </div>
            <h2 className="text-2xl font-black italic tracking-widest text-zinc-700">LINK_REQUIRED_TO_ACCESS_PILOT_DATA</h2>
        </div>
    )

    return (
        <div className="w-full max-w-6xl mx-auto space-y-12 pointer-events-auto pb-32">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="relative">
                    <motion.div 
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-20px] border border-cyan-500/10 rounded-full border-dashed"
                    />
                    <motion.div 
                        initial={{ rotate: 360 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-10px] border border-cyan-500/20 rounded-full"
                    />
                    <img 
                        src={user.photoURL} 
                        className="w-48 h-48 rounded-full border-2 border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.3)]"
                        alt="avatar"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-cyan-500 text-black text-[10px] font-black tracking-widest rounded-full skew-x-[-15deg]">
                        PILOT_READY
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-widest text-zinc-500 mb-6 italic uppercase">
                        <Activity size={12} className="text-cyan-500" /> NEURAL_LOAD_STABLE
                    </div>
                    <h2 className="text-6xl font-black italic tracking-tighter leading-none mb-4">{user.displayName?.toUpperCase()}</h2>
                    <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
                        <ProfileTag icon={Shield} label="RANK" value="NEXUS_LEGEND" />
                        <ProfileTag icon={Target} label="MISSION_TASKS" value="482 SOLVES" />
                        <ProfileTag icon={Zap} label="EFFICIENCY" value="94.2%" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <DataCard icon={Clock} title="TEMPORAL_SPEED" value="3.13s" sub="PERSONAL BEST" trend="+0.12s" />
                <DataCard icon={Activity} title="STABILITY" value="4.52s" sub="AVERAGE OF 100" trend="-0.04s" color="text-cyan-400" />
                <DataCard icon={Zap} title="THROUGHPUT" value="8.4" sub="TURNS PER SECOND" trend="+1.2" color="text-yellow-400" />
            </div>

            <div className="bg-white/5 border border-white/5 rounded-[3rem] p-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                     <BarChart3 size={200} />
                </div>
                <h3 className="text-2xl font-black italic tracking-widest mb-8 flex items-center gap-3">
                    <Activity className="text-cyan-500" /> RECENT_TELEMETRY
                </h3>
                <div className="space-y-4">
                    {[1,2,3,4,5].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-black/40 border border-white/5 rounded-2xl hover:border-cyan-500/20 transition-all cursor-pointer group">
                            <div className="flex items-center gap-6">
                                <div className="text-xs font-bold text-zinc-600">0{i+1}</div>
                                <div>
                                    <p className="text-sm font-black tracking-widest group-hover:text-cyan-400 transition-colors">7.42s // 42 MOVES</p>
                                    <p className="text-[10px] font-medium text-zinc-600 uppercase">SOLVED 2 HOURS AGO</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-zinc-800 group-hover:text-cyan-500 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ProfileTag({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <Icon size={14} className="text-zinc-500" />
            <div>
                <p className="text-[8px] font-bold text-zinc-600 tracking-widest leading-none mb-1">{label}</p>
                <p className="text-xs font-black text-zinc-200 tracking-widest leading-none">{value}</p>
            </div>
        </div>
    )
}

function DataCard({ icon: Icon, title, value, sub, trend, color = "text-white" }: { icon: any, title: string, value: string, sub: string, trend: string, color?: string }) {
    return (
        <div className="p-8 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] relative overflow-hidden group hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-cyan-400 transition-all">
                    <Icon size={24} />
                </div>
                <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-[10px] font-black tracking-widest text-cyan-400">
                    {trend}
                </div>
            </div>
            <p className="text-[10px] font-bold text-zinc-600 tracking-[0.3em] mb-2 uppercase">{title}</p>
            <h4 className={cn("text-5xl font-black italic tracking-tighter mb-2", color)}>{value}</h4>
            <p className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">{sub}</p>
        </div>
    )
}

import { cn } from '../../lib/utils';
