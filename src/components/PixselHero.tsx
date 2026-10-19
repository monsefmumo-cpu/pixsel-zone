import React, { useState } from 'react';
import { DISCORD_INVITE_URL, PIXSEL_SERVER_LOGO } from '../data/pixselZoneData';
import { sound } from '../utils/sound';
import { ExternalLink, Sparkles, Zap, Swords, ShieldCheck, ChevronDown, Copy, Check } from 'lucide-react';

interface PixselHeroProps {
  onExploreClick: () => void;
  onNavigateToPanels: () => void;
}

export const PixselHero: React.FC<PixselHeroProps> = ({
  onExploreClick,
  onNavigateToPanels,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    sound.playReward();
    navigator.clipboard.writeText(DISCORD_INVITE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 overflow-hidden bg-grid-cyber">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#00f2fe]/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[300px] bg-[#0284c7]/15 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Right Column (Arabic RTL: text intro first) */}
          <div className="lg:col-span-7 text-right space-y-6">
            {/* Server Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081528] border border-[#00f2fe]/40 text-xs font-tech text-[#00f2fe] shadow-[0_0_15px_rgba(0,242,254,0.2)]">
              <Sparkles className="w-4 h-4 text-[#00f2fe] animate-pulse" />
              <span>المجتمع الرسمي الأول للألعاب والبانلات والسكريمات</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-brand font-black tracking-tight text-white leading-tight">
              سيرفر <span className="neon-cyan-text">PIXSEL ZONE</span>
            </h1>

            <p className="text-sm sm:text-lg lg:text-xl text-gray-300 font-sans leading-relaxed max-w-2xl">
              المجتمع الاحترافي الأقوى لألعاب الموبايل والكمبيوتر. استمتع بأحدث{' '}
              <span className="text-[#00f2fe] font-bold">بانلات الحساسية (PC / iOS / Android)</span>، مهام الـ{' '}
              <span className="text-[#00f2fe] font-bold">Auto Quest والتوكنات التلقائية</span>، وبطولات وسكريمات{' '}
              <span className="text-[#00f2fe] font-bold">فريق Apostado Team</span> الحصرية.
            </p>

            {/* Feature Highlights Pills (unboxed clean text) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-tech text-gray-300 pt-1">
              <div className="flex items-center gap-1.5 bg-[#081427]/80 px-2.5 py-1 rounded-lg border border-[#00f2fe]/20">
                <Zap className="w-3.5 h-3.5 text-[#00f2fe]" />
                <span>بانلات PC و Android و iOS</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#081427]/80 px-2.5 py-1 rounded-lg border border-[#00f2fe]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#00f2fe]" />
                <span>أوتو كويست وتوكنات الفيديو</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#081427]/80 px-2.5 py-1 rounded-lg border border-[#00f2fe]/20">
                <Swords className="w-3.5 h-3.5 text-[#00f2fe]" />
                <span>سكريمات فريق Apostado</span>
              </div>
            </div>

            {/* CTAs: Responsive Stack on Mobile, Row on Desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playReward()}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#00f2fe] via-[#38bdf8] to-[#0284c7] hover:from-[#38bdf8] hover:to-[#00f2fe] text-[#030712] font-tech font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(0,242,254,0.5)] hover:shadow-[0_0_45px_rgba(0,242,254,0.7)] flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="text-lg">🚀</span>
                <span>دخول السيرفر فوراً (Discord)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 sm:flex-initial px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl bg-[#081528] hover:bg-[#0c223f] border border-[#00f2fe]/40 text-gray-200 hover:text-white font-tech font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
                  title="نسخ الرابط المباشر للديسكورد"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#00f2fe]" />}
                  <span>{copied ? 'تم النسخ!' : 'نسخ الرابط'}</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    onExploreClick();
                  }}
                  className="flex-1 sm:flex-initial px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-black/50 hover:bg-black/70 border border-white/15 text-gray-300 hover:text-white font-tech font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>استعراض الرومات</span>
                  <ChevronDown className="w-4 h-4 text-[#00f2fe]" />
                </button>
              </div>
            </div>

            {/* Trust and Activity stats: Responsive 3 Columns */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 border-t border-white/10 max-w-lg text-center sm:text-right">
              <div className="p-2 sm:p-0 rounded-lg bg-white/[0.02] sm:bg-transparent">
                <span className="text-xl sm:text-3xl font-brand font-black text-[#00f2fe] block">
                  12,450+
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-tech">عضو بالسيرفر</span>
              </div>
              <div className="p-2 sm:p-0 rounded-lg bg-white/[0.02] sm:bg-transparent">
                <span className="text-xl sm:text-3xl font-brand font-black text-emerald-400 block">
                  3,890+
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-tech">متصل الآن</span>
              </div>
              <div className="p-2 sm:p-0 rounded-lg bg-white/[0.02] sm:bg-transparent">
                <span className="text-xl sm:text-3xl font-brand font-black text-[#38bdf8] block">
                  100%
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-tech">حماية وأمان</span>
              </div>
            </div>
          </div>

          {/* Left Column (Official PIXSEL SERVER Logo & Glowing Presentation) */}
          <div className="lg:col-span-5 flex justify-center relative mt-6 lg:mt-0">
            <div className="relative w-56 sm:w-80 lg:w-96 aspect-square flex items-center justify-center max-w-full">
              {/* Spinning Orbital Energy Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00f2fe]/40 animate-orbit" />
              <div className="absolute inset-3 sm:inset-4 rounded-full border border-[#0284c7]/30" />
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#00f2fe]/20 to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* The Master Logo Emblem */}
              <div className="relative w-48 sm:w-72 lg:w-80 h-48 sm:h-72 lg:h-80 rounded-full p-2 bg-gradient-to-tr from-[#00f2fe] via-[#0284c7] to-[#38bdf8] shadow-[0_0_50px_rgba(0,242,254,0.55)] overflow-hidden">
                <img
                  src={PIXSEL_SERVER_LOGO}
                  alt="PIXSEL SERVER Official Logo"
                  className="w-full h-full object-cover rounded-full transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Floating Server Tag Chip */}
              <div className="absolute -bottom-3 sm:-bottom-4 bg-[#050f24] border border-[#00f2fe]/60 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-[0_0_20px_rgba(0,242,254,0.3)] flex items-center gap-2 text-[10px] sm:text-xs font-tech text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold">discord.gg/Qahdywj2Q</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
