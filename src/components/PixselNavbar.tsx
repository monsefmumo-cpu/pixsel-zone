import React, { useState } from 'react';
import { DISCORD_INVITE_URL, PIXSEL_SERVER_LOGO } from '../data/pixselZoneData';
import { sound } from '../utils/sound';
import { ExternalLink, Sparkles, Zap, Swords, ShieldAlert, Menu, X, ChevronLeft, Bot } from 'lucide-react';

interface PixselNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const PixselNavbar: React.FC<PixselNavbarProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    sound.playClick();
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'discord-explorer', label: 'قنوات الديسكورد', icon: Sparkles },
    { id: 'panels', label: 'بانلات الأجهزة (PC / iOS / Android)', icon: Zap },
    { id: 'auto-quest', label: 'Auto Quest & Tokens', icon: Bot },
    { id: 'apostado', label: 'فريق Apostado والنتائج', icon: Swords },
    { id: 'banned-section', label: 'قائمة الحظر (Banned)', icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#030712]/95 backdrop-blur-md border-b border-[#00f2fe]/25 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Brand Wordmark & Circular Glowing Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 sm:gap-3 group text-right focus:outline-none"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#00f2fe] via-[#0284c7] to-[#38bdf8] shadow-[0_0_20px_rgba(0,242,254,0.6)] group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <img
                src={PIXSEL_SERVER_LOGO}
                alt="PIXSEL SERVER Official Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="font-brand text-lg sm:text-2xl font-black tracking-wider text-white group-hover:text-[#00f2fe] transition-colors block leading-none">
                PIXSEL ZONE
              </span>
              <span className="text-[9px] sm:text-[10px] font-tech text-[#00f2fe]/90 tracking-[0.15em] sm:tracking-[0.25em] uppercase block">
                DISCORD SERVER
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-tech font-bold uppercase tracking-wider">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`whitespace-nowrap transition-colors relative py-1 ${
                  isActive ? 'text-[#00f2fe]' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-[#00f2fe] shadow-[0_0_8px_#00f2fe]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: CTA & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#081528] border border-[#00f2fe]/30 text-[11px] font-tech text-[#00f2fe]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>3,890 متصل الآن</span>
          </div>

          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playReward()}
            className="hidden sm:flex px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#0284c7] hover:from-[#38bdf8] hover:to-[#00f2fe] text-[#030712] font-tech font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] whitespace-nowrap active:scale-95 items-center gap-1.5"
          >
            <span>دخول الديسكورد</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Hamburger Mobile Toggle Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="القائمة الرئيسية"
            className="lg:hidden p-2.5 rounded-xl bg-[#09172e] border border-[#00f2fe]/40 text-[#00f2fe] hover:bg-[#0c2349] transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Smooth Dropdown on Phones & Tablets) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#00f2fe]/20 bg-[#040a17]/98 backdrop-blur-xl px-4 py-4 space-y-2 animate-fade-in shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-xs font-tech text-[#00f2fe]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>3,890 عضو متصل في الديسكورد</span>
            </span>
            <span className="text-gray-400 font-sans">قائمة التصفح</span>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-tech transition-all text-right ${
                    isActive
                      ? 'bg-[#00f2fe]/15 text-[#00f2fe] font-bold border border-[#00f2fe]/40'
                      : 'text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#00f2fe]" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronLeft className="w-3.5 h-3.5 text-gray-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10">
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playReward()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#0284c7] text-[#030712] font-tech font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.4)] active:scale-95"
            >
              <span>دخول سيرفر الديسكورد الآن (Free)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
