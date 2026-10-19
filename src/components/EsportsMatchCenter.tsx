import React, { useState } from 'react';
import {
  Shield,
  Zap,
  Target,
  Flame,
  Clock,
  Swords,
  Trophy,
  CheckCircle2,
  Bell,
  Share2,
} from 'lucide-react';
import { SQUAD_ALPHA, SQUAD_OMEGA, SquadMember } from '../data/trailerData';

interface EsportsMatchCenterProps {
  onOpenReminder: () => void;
}

export const EsportsMatchCenter: React.FC<EsportsMatchCenterProps> = ({ onOpenReminder }) => {
  const [selectedSquad, setSelectedSquad] = useState<'alpha' | 'omega'>('alpha');

  return (
    <section id="match-center" className="py-16 bg-[#060407] border-t border-[#ff3b00]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#120805] border border-[#ff3b00]/40 text-xs font-tech text-[#ff6a00] mb-3">
            <Swords className="w-3.5 h-3.5" />
            <span>THE 4v4 CHAMPIONSHIP SHOWDOWN</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-stamp font-black text-white tracking-wider uppercase mb-2">
            FREE FIRE 2026 · SQUAD ROSTER
          </h2>
          <p className="text-[#a3a3b2] font-sans text-sm sm:text-base">
            Two elite squads face off in the Ruined Arena tonight at <span className="text-[#ffaa00] font-bold">21:30 GMT+1</span>.
          </p>
        </div>

        {/* 4v4 Match Header Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0d1624] via-[#1a0808] to-[#240d0d] border border-[#ff3b00]/30 p-6 sm:p-8 mb-12 shadow-[0_0_50px_rgba(255,59,0,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Squad Alpha */}
          <div className="flex items-center gap-4 text-left">
            <div className="w-16 h-16 rounded-xl bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(59,130,246,0.4)]">
              🛡️
            </div>
            <div>
              <span className="text-xs font-tech text-blue-400 font-bold tracking-widest block uppercase">
                DEFENDING CHAMPIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-stamp font-black text-white uppercase tracking-wider">
                SQUAD ALPHA
              </h3>
              <span className="text-xs text-white/60 font-tech">4 OPERATIVES · 4.5 AVG KDA</span>
            </div>
          </div>

          {/* VS Flame Emblem */}
          <div className="flex flex-col items-center justify-center px-6">
            <div className="w-12 h-12 rounded-full bg-[#ff3b00]/25 border border-[#ff3b00] flex items-center justify-center text-xl font-stamp font-black text-white shadow-[0_0_20px_#ff3b00] animate-pulse">
              VS
            </div>
            <span className="text-[11px] font-tech text-[#ffaa00] mt-1 tracking-widest uppercase">
              21:30 GMT+1
            </span>
          </div>

          {/* Squad Omega */}
          <div className="flex items-center gap-4 text-right">
            <div>
              <span className="text-xs font-tech text-red-500 font-bold tracking-widest block uppercase">
                CHALLENGER UNIT
              </span>
              <h3 className="text-2xl sm:text-3xl font-stamp font-black text-white uppercase tracking-wider">
                SQUAD OMEGA
              </h3>
              <span className="text-xs text-white/60 font-tech">4 OPERATIVES · 4.7 AVG KDA</span>
            </div>
            <div className="w-16 h-16 rounded-xl bg-red-600/20 border-2 border-red-500 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(239,68,68,0.4)]">
              🔥
            </div>
          </div>
        </div>

        {/* Squad Selection Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-black border border-white/10">
            <button
              onClick={() => setSelectedSquad('alpha')}
              className={`px-5 py-2 rounded-lg text-xs font-tech font-bold transition-all ${
                selectedSquad === 'alpha'
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              SQUAD ALPHA ROSTER (4 PLAYERS)
            </button>
            <button
              onClick={() => setSelectedSquad('omega')}
              className={`px-5 py-2 rounded-lg text-xs font-tech font-bold transition-all ${
                selectedSquad === 'omega'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              SQUAD OMEGA ROSTER (4 PLAYERS)
            </button>
          </div>
        </div>

        {/* 4 Operatives Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(selectedSquad === 'alpha' ? SQUAD_ALPHA : SQUAD_OMEGA).map((player, idx) => (
            <div
              key={player.name}
              className={`p-5 rounded-xl border transition-all ${
                selectedSquad === 'alpha'
                  ? 'bg-[#09111c] border-blue-500/30 hover:border-blue-500'
                  : 'bg-[#150a0a] border-red-500/30 hover:border-red-500'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{player.avatar}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase ${
                    selectedSquad === 'alpha' ? 'bg-blue-500/20 text-blue-300' : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  SLOT 0{idx + 1}
                </span>
              </div>

              <h4 className="text-xl font-stamp font-black text-white uppercase tracking-wider mb-0.5">
                {player.name}
              </h4>
              <p className="text-xs font-tech text-[#ffaa00] mb-3">{player.role}</p>

              <div className="space-y-2 pt-3 border-t border-white/10 text-xs font-tech">
                <div className="flex justify-between text-white/70">
                  <span>CONFIRMED KILLS</span>
                  <span className="text-white font-bold">{player.kills}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>K/D RATIO</span>
                  <span className="text-white font-bold">{player.kda}</span>
                </div>
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] text-white/40 block">SIGNATURE WEAPON</span>
                  <span className="text-xs text-white font-semibold truncate block">
                    {player.signatureWeapon}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Match Time & Broadcast Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#090507] border border-[#ff3b00]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ff3b00]/20 border border-[#ff3b00] flex items-center justify-center text-[#ffaa00]">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-lg font-stamp font-black text-white uppercase tracking-wider">
                DON'T BE LATE – MATCH COMMENCES AT 21:30 GMT+1
              </h4>
              <p className="text-xs text-[#a3a3b2]">
                Global live broadcast with multi-camera spectator angles and live 4K stream.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenReminder}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#ff3b00] to-[#ff7700] hover:from-[#ff5500] hover:to-[#ff9900] text-black font-tech font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,59,0,0.4)] flex items-center gap-2 whitespace-nowrap active:scale-95"
          >
            <Bell className="w-4 h-4" />
            <span>Set Alarm / Reminder</span>
          </button>
        </div>
      </div>
    </section>
  );
};
