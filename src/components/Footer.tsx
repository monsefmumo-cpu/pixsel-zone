import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenReminder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenReminder }) => {
  return (
    <footer className="bg-[#030304] border-t border-[#ff3b00]/20 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div>
            <span className="font-stamp text-2xl font-black tracking-wider text-white block">
              FREE FIRE 2026 // ESPORTS
            </span>
            <span className="text-xs uppercase tracking-widest text-[#ffaa00] font-tech block mt-1">
              "TODAY IS FIRE" · 4v4 MATCH · 21:30 GMT+1
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-tech text-[#a3a3b2]">
            <button onClick={() => onNavigate('player')} className="hover:text-[#ffaa00] transition-colors">
              30s Trailer
            </button>
            <button onClick={() => onNavigate('storyboard')} className="hover:text-[#ffaa00] transition-colors">
              Scene Breakdown
            </button>
            <button onClick={() => onNavigate('match-center')} className="hover:text-[#ffaa00] transition-colors">
              4v4 Squads
            </button>
            <button onClick={onOpenReminder} className="text-[#ffaa00] font-bold hover:text-white transition-colors">
              21:30 GMT+1 Alert
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-white/40">
          <div>
            © 2026 Free Fire Esports Championship. 4K Cinematic Announcement.
          </div>
          <div className="text-[#ffaa00]/70">
            DON'T BE LATE – 21:30 GMT+1
          </div>
        </div>
      </div>
    </footer>
  );
};
