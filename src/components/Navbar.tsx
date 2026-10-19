import React from 'react';
import { Volume2, VolumeX, Flame, Bell, Clock } from 'lucide-react';

interface NavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenReminder: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMuted,
  onToggleMute,
  onOpenReminder,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#050507]/90 backdrop-blur-md border-b border-[#ff3b00]/25 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('player')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-[#ff3b00] flex items-center justify-center text-black font-stamp text-xl font-black shadow-[0_0_15px_#ff3b00] group-hover:scale-105 transition-transform">
              🔥
            </div>
            <div>
              <span className="font-stamp text-2xl sm:text-3xl font-black tracking-wider text-white group-hover:text-[#ffaa00] transition-colors block leading-none">
                FREE FIRE 2026
              </span>
              <span className="text-[10px] font-tech text-[#ff6a00] tracking-[0.25em] uppercase block">
                ESPORTS GRAND FINALS
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-tech font-bold uppercase tracking-wider">
          <button
            onClick={() => onNavigate('player')}
            className={`whitespace-nowrap transition-colors relative py-1 ${
              activeSection === 'player' ? 'text-[#ffaa00]' : 'text-[#a3a3b2] hover:text-white'
            }`}
          >
            30s Trailer
            {activeSection === 'player' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff3b00]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('storyboard')}
            className={`whitespace-nowrap transition-colors relative py-1 ${
              activeSection === 'storyboard' ? 'text-[#ffaa00]' : 'text-[#a3a3b2] hover:text-white'
            }`}
          >
            Scene Breakdown
            {activeSection === 'storyboard' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff3b00]" />
            )}
          </button>

          <button
            onClick={() => onNavigate('match-center')}
            className={`whitespace-nowrap transition-colors relative py-1 ${
              activeSection === 'match-center' ? 'text-[#ffaa00]' : 'text-[#a3a3b2] hover:text-white'
            }`}
          >
            4v4 Squad Rosters
            {activeSection === 'match-center' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff3b00]" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Audio Control */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMute}
            className={`p-2.5 rounded-full border transition-all ${
              isMuted
                ? 'border-white/10 text-white/40 hover:text-white'
                : 'border-[#ff3b00]/60 text-[#ffaa00] bg-[#ff3b00]/15 shadow-[0_0_12px_rgba(255,59,0,0.3)]'
            }`}
            title={isMuted ? 'Unmute Epic Bass Drop' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenReminder}
            className="px-4 py-2 text-xs font-tech font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-[#ff3b00] to-[#ff7700] hover:from-[#ff5500] hover:to-[#ff9900] rounded-lg transition-all shadow-[0_0_20px_rgba(255,59,0,0.4)] whitespace-nowrap active:scale-95 flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>21:30 GMT+1</span>
          </button>
        </div>
      </div>
    </header>
  );
};
