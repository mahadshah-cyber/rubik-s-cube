import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Float } from '@react-three/drei';
import { Cube } from './components/Cube/Cube';
import { Sidebar } from './components/HUD/Sidebar';
import { Timer } from './components/Timer/Timer';
import { Leaderboard } from './components/Leaderboard/Leaderboard';
import { TrainingLab } from './components/Training/TrainingLab';
import { Profile } from './components/Profile/Profile';
import { useStore } from './store/useStore';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Zap, Award, Globe, Settings, Cpu } from 'lucide-react';

export default function App() {
  const { view, setView, user, setUser } = useStore();

  React.useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, [setUser]);

  return (
    <div className="h-screen w-screen bg-[#050608] text-gray-300 overflow-hidden font-sans flex flex-col p-6 selection:bg-cyan-500 selection:text-black">
      {/* Header: Nexus Core Global Navigation */}
      <header className="flex justify-between items-center mb-6 border-b border-white/10 pb-4 z-50">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('home')}>
          <div className="w-10 h-10 bg-cyan-500 rounded flex items-center justify-center font-bold text-black shadow-[0_0_20px_rgba(6,182,212,0.5)]">NX</div>
          <div>
            <h1 className="text-xl font-bold tracking-widest text-white uppercase italic">Nexus Core <span className="text-cyan-400">Global</span></h1>
            <p className="text-[10px] uppercase tracking-widest opacity-50 font-mono">Omega Supreme Edition // Build 0.9.4</p>
          </div>
        </div>
        <div className="flex gap-8 text-[11px] font-mono tracking-tighter">
          <div className="text-right hidden md:block">
            <p className="opacity-40 uppercase">Global Rank</p>
            <p className="text-cyan-400 text-sm font-bold">#1,242 <span className="text-[10px] text-gray-500 italic font-normal tracking-normal">(Top 0.1%)</span></p>
          </div>
          <div className="text-right hidden md:block">
            <p className="opacity-40 uppercase">Session PB</p>
            <p className="text-orange-500 text-sm font-bold underline decoration-orange-500/30">5.82s</p>
          </div>
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            {user ? (
               <>
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-900 to-black border border-cyan-500/50 overflow-hidden">
                    <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                 </div>
                 <p className="text-white font-bold tracking-normal hidden sm:block uppercase">{user.displayName?.split(' ')[0]}_PILOT</p>
               </>
            ) : (
                <button onClick={() => setView('profile')} className="text-cyan-400 font-bold tracking-widest border border-cyan-500/20 px-4 py-1.5 rounded bg-cyan-500/5 hover:bg-cyan-500/20 transition-all">CONNECT_</button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-6 overflow-hidden relative">
        {/* Left Navigation Bar */}
        <nav className="col-span-2 flex flex-col gap-2 z-20">
          <Sidebar />
          <div className="mt-auto p-3 border border-white/5 rounded bg-black/40">
            <p className="text-[9px] uppercase mb-2 opacity-40 font-mono">Network Status</p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
              <p className="text-[10px] font-mono tracking-tighter uppercase whitespace-nowrap">STABLE // 24MS</p>
            </div>
          </div>
        </nav>

        {/* Central 3D Simulator Interface */}
        <section className="col-span-7 flex flex-col relative z-10 group">
          <div className="bg-white/5 flex-1 rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center">
            {/* 3D Background Level moved here to be behind central section if needed, 
                but user wanted original logic preserved. Placing Canvas in the BG container */}
            <div className="absolute inset-0 z-0 opacity-80 group-hover:opacity-100 transition-opacity">
              <Canvas shadows>
                <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={45} />
                <OrbitControls 
                  enablePan={false} 
                  enableZoom={true} 
                  minDistance={4} 
                  maxDistance={12}
                  autoRotate={view === 'home'}
                  autoRotateSpeed={0.5}
                />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Suspense fallback={null}>
                  <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                      <Cube />
                  </Float>
                  <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>

            <AnimatePresence mode="wait">
              {view === 'solo' && (
                <motion.div 
                  key="solo"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="z-10 w-full h-full"
                >
                  <Timer />
                </motion.div>
              )}

              {view === 'rankings' && (
                <motion.div 
                  key="rankings"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="z-10 w-full h-full p-4 overflow-y-auto"
                >
                  <Leaderboard />
                </motion.div>
              )}

              {view === 'training' && (
                <motion.div 
                  key="training"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="z-10 w-full h-full p-4 overflow-y-auto"
                >
                  <TrainingLab />
                </motion.div>
              )}

              {view === 'profile' && (
                <motion.div 
                  key="profile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="z-10 w-full h-full p-4 overflow-y-auto"
                >
                  <Profile />
                </motion.div>
              )}

              {view === 'home' && (
                <motion.div 
                  key="home"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="z-10 w-full h-full flex flex-col justify-end p-12 pointer-events-none"
                >
                  <div className="space-y-4 max-w-lg pointer-events-auto">
                    <h2 className="text-7xl font-black tracking-tighter leading-none italic uppercase">
                      READY_FOR<br />
                      <span className="text-cyan-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)] tracking-normal">DEPLOYNENT</span>
                    </h2>
                    <p className="text-zinc-400 font-mono text-[11px] uppercase tracking-widest opacity-60">
                      Nexus protocol initialized. Global competitive state active.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <button 
                          onClick={() => setView('solo')}
                          className="px-8 py-3 bg-white text-black font-black tracking-widest text-xs hover:bg-cyan-500 transition-all skew-x-[-12deg] group"
                        >
                            <span className="inline-block skew-x-[12deg] flex items-center gap-2">
                                INIT_SESSION <Play size={14} className="fill-black" />
                            </span>
                        </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Right Analytics Panel (Static HUD Elements) */}
        <section className="col-span-3 flex flex-col gap-6 z-20">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-cyan-400 border-b border-white/10 pb-2">Live Telemetry</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[9px] opacity-40 uppercase mb-1 font-mono tracking-tight">TPS (Current)</p>
                <p className="text-lg font-mono text-white">12.42</p>
              </div>
              <div>
                <p className="text-[9px] opacity-40 uppercase mb-1 font-mono tracking-tight">Efficiency</p>
                <p className="text-lg font-mono text-orange-400">94.2%</p>
              </div>
            </div>
            <div className="h-16 flex items-end gap-1 px-1">
              {[40, 60, 55, 80, 95, 40, 30].map((h, i) => (
                <div key={i} className="flex-1 bg-cyan-500/20 group-hover:bg-cyan-500/40 transition-all" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="p-3 bg-black/40 rounded border border-white/5">
              <p className="text-[10px] text-cyan-300 font-mono italic mb-1 tracking-tight">AI_ADVISOR: Detection // Case #14</p>
              <p className="text-[10px] leading-tight opacity-60 font-medium">Stage identified: Cross complete. Suggesting optimal F2L insert: (U R U' R').</p>
            </div>
          </div>

          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-5 overflow-hidden flex flex-col">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold text-orange-400 border-b border-white/10 pb-2 mb-4">Quantum Leaderboard</h3>
            <div className="flex flex-col gap-3 font-mono text-[10px] tracking-tight">
              <div className="flex justify-between items-center opacity-40 italic">
                <span>PILOT</span>
                <span>TIME</span>
              </div>
              <div className="flex justify-between items-center text-white border-l-2 border-orange-500 pl-2 bg-orange-500/5 py-1">
                <span className="font-bold">1. MAX_PARK</span>
                <span className="text-orange-500 font-bold">03.13</span>
              </div>
              {[
                { name: 'YIHENG_WANG', time: '03.38' },
                { name: 'TYMON_KOLAS', time: '03.92' },
                { name: 'CUBE_REAPER', time: '04.10' },
                { name: 'VOID_SOLVER', time: '04.45' }
              ].map((p, i) => (
                <div key={i} className="flex justify-between items-center opacity-60 hover:opacity-100 transition-opacity">
                  <span>{i + 2}. {p.name}</span>
                  <span>{p.time}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setView('rankings')}
              className="mt-auto w-full py-2 text-[9px] uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-colors font-mono"
            >
              View All Rankings
            </button>
          </div>
        </section>
      </main>

      {/* Bottom Footer Utility Rail */}
      <footer className="mt-6 flex justify-between items-center text-[10px] font-mono tracking-widest border-t border-white/10 pt-4 z-50">
        <div className="flex gap-8">
          <p><span className="opacity-40">AO5:</span> <span className="text-white font-bold">7.42</span></p>
          <p><span className="opacity-40">AO12:</span> <span className="text-white font-bold">8.11</span></p>
          <p><span className="opacity-40">TOTAL SOLVES:</span> <span className="text-white font-bold">4,821</span></p>
        </div>
        <div className="flex gap-6 items-center">
          <p className="text-cyan-400 hidden sm:block animate-pulse font-bold tracking-tighter text-[9px]">// QUANTUM MATHEMATICS ENGINE: ACTIVE</p>
          <p className="opacity-60 font-bold text-zinc-500">PERMUTATIONS REMAINING: 43.2Q</p>
        </div>
      </footer>
    </div>
  );
}

function StatItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400">
                <Icon size={20} />
            </div>
            <div>
                <p className="text-[10px] font-bold text-zinc-500 tracking-widest leading-none mb-1">{label}</p>
                <p className="text-xl font-black text-white tracking-tighter leading-none">{value}</p>
            </div>
        </div>
    )
}
