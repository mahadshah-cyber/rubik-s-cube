import React from 'react';
import { motion } from 'motion/react';
import { Brain, Cpu, Zap, Target, MousePointer2, Eye, Layout } from 'lucide-react';

export function TrainingLab() {
    const modules = [
        { title: 'F2L INFUSION', icon: Zap, desc: 'Master the first two layers with advanced pair techniques.', level: 'INTERMEDIATE' },
        { title: 'OLL MATRIX', icon: Brain, desc: 'Full algorithm database for last layer orientation.', level: 'ADVANCED' },
        { title: 'PLL NEURAL', icon: Cpu, desc: 'Permutation speed drills and recognition patterns.', level: 'ADVANCED' },
        { title: 'CROSS PRECISION', icon: Target, desc: 'Highly efficient white cross construction paths.', level: 'ROOKIE' },
        { title: 'FINGER CORE', icon: MousePointer2, desc: 'Optimize your mechanical grip and move execution.', level: 'ALL LEVELS' },
        { title: 'LOOKAHEAD', icon: Eye, desc: 'See the future. Predictive piece tracking system.', level: 'PRO' },
    ];

    return (
        <div className="w-full h-full max-w-6xl mx-auto flex flex-col pointer-events-auto">
            <div className="mb-12">
                <h2 className="text-5xl font-black italic tracking-tighter flex items-center gap-4">
                    <Layout className="text-cyan-500" /> TRAINING_LAB
                </h2>
                <p className="text-zinc-500 font-bold tracking-widest text-xs mt-2 uppercase">Neural training environment // Simulated progress system</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group p-8 bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-[2.5rem] hover:border-cyan-500/50 transition-all cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all" />
                        
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all mb-6">
                             <m.icon size={32} />
                        </div>

                        <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-[8px] font-black tracking-widest text-zinc-400 mb-4 group-hover:text-white transition-colors">
                            {m.level}
                        </div>

                        <h3 className="text-2xl font-black tracking-tighter mb-3 transition-colors group-hover:text-cyan-400">{m.title}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed font-medium group-hover:text-zinc-300 transition-colors">
                            {m.desc}
                        </p>

                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-black tracking-widest text-zinc-600">UNSTABLE_VERSION</span>
                            <button className="text-[10px] font-black tracking-widest text-cyan-500 hover:text-white transition-colors">INIT_MODULE //</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

import { cn } from '../../lib/utils';
