import React, { useState } from 'react';
import { useServer } from '../context/ServerContext';
import { 
  Download, 
  Radio, 
  Flame, 
  Copy, 
  Check, 
  MessageSquare, 
  ArrowLeft, 
  ShieldCheck, 
  Wifi, 
  Users, 
  Gamepad2,
  Lock,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/sound';

interface HeroProps {
  onNavigateToComments: () => void;
  onOpenAdmin: () => void;
  onOpenConsole?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToComments, onOpenAdmin, onOpenConsole }) => {
  const { serverInfo, downloadInfo, liveRoom, isAdmin, showToast } = useServer();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyApkLink = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(downloadInfo.apkUrl);
      setCopiedLink(true);
      showToast('تم نسخ رابط تحميل اللعبة إلى الحافظة!', 'success');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const scrollToSection = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-6 pb-14 sm:pt-12 sm:pb-20 overflow-hidden border-b border-amber-500/20">
      
      {/* Dynamic ambient battle sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[32rem] h-[32rem] bg-amber-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-24 left-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-red-600/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Kicker badge */}
            <div className="flex items-center gap-2.5 text-xs text-slate-300 flex-wrap">
              <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-400 font-bold flex items-center gap-1.5 shadow-sm">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>إصدار الحنين المستقر 2023 (OB39)</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span>السيرفر شغال بامتياز</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 font-mono">سلاسة 60-90 FPS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              نسخة فري فاير <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 font-gaming">2023</span> الأصلية
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-amber-300/90 font-bold mt-2">
                عصر البوياه الذهبي بدون لاق وتقطيع!
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
              {serverInfo.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
              {serverInfo.description}
            </p>

            {/* Live Stats Row */}
            <div className="pt-3 pb-3 grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-slate-800 bg-slate-900/40 px-4 rounded-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-amber-400">
                  {serverInfo.onlinePlayers.toLocaleString('ar-DZ')}+
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-500" />
                  <span>لاعب متصل الآن</span>
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-emerald-400">
                  {serverInfo.serverPing}
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span>سرعة استجابة البينغ</span>
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-cyan-400">
                  {downloadInfo.downloadCount.toLocaleString('ar-DZ')}+
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>عملية تحميل</span>
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-orange-400">
                  90 FPS
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>ثبات الفريمات</span>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollToSection('download')}
                className="px-6 py-3.5 rounded-xl text-sm font-black text-black bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 transition-all shadow-xl shadow-amber-500/25 flex items-center gap-2 group cursor-pointer active:scale-98"
              >
                <Download className="w-5 h-5 text-black" />
                <span>تحميل اللعبة APK و OBB (مباشر)</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>

              <a
                href={downloadInfo.discordInviteUrl || "https://discord.gg/m6etCxgUX"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playSuccess()}
                className="px-4 py-3.5 rounded-xl text-sm font-bold text-white bg-[#5865F2] hover:bg-[#4752c4] transition-all flex items-center gap-2 shadow-lg shadow-[#5865F2]/25 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>سيرفر الديسكورد الرسمي</span>
              </a>

              {liveRoom.isActive && (
                <button
                  onClick={() => scrollToSection('liveroom')}
                  className="px-4 py-3.5 rounded-xl text-sm font-bold text-white bg-slate-900 border border-orange-500/50 hover:bg-orange-950/40 transition-all flex items-center gap-2 group cursor-pointer shadow-md"
                >
                  <Radio className="w-4 h-4 text-orange-400 animate-pulse" />
                  <span>كود الروم المباشر ({liveRoom.roomId})</span>
                </button>
              )}

              {/* Only show Admin Console access in Hero if logged in as Admin */}
              {isAdmin && (
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onOpenConsole) onOpenConsole();
                  }}
                  className="px-4 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-rose-700 border border-red-500 shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 cursor-pointer"
                  title="بوابة كونسول إدارة النسخة واللاعبين بالآيدي والسكنات والباند (خاص بالمطور والإدارة فقط)"
                >
                  <ShieldCheck className="w-4 h-4 text-red-300" />
                  <span>موقع إدارة السيرفر واللاعبين ⚡</span>
                </button>
              )}

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateToComments();
                }}
                className="px-4 py-3.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <span>آراء اللاعبين</span>
              </button>
            </div>

            {/* Featured Bullet points */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 flex-wrap">
              <span className="text-amber-400 font-bold">مميزات حصرية:</span>
              {serverInfo.featuredFeatures.slice(0, 3).map((feat, i) => (
                <React.Fragment key={feat}>
                  <span className="text-slate-300">{feat}</span>
                  {i < 2 && <span className="text-slate-600">·</span>}
                </React.Fragment>
              ))}
            </div>

          </div>

          {/* Visual Anchor Box */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-[#0e1322]">
              
              {/* Image banner */}
              <div className="relative aspect-[16/10] overflow-hidden group">
                <img
                  src={serverInfo.bannerImage}
                  alt="Free Fire 2023 Hero Battle"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-[#090d18]/40 to-transparent" />
                
                {/* Logo badge overlay */}
                <div className="absolute bottom-4 right-4 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-amber-400 shadow-xl bg-slate-950 p-0.5">
                    <img
                      src={serverInfo.logoImage}
                      alt="Free Fire 2023 Emblem"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <span className="font-gaming font-black text-sm text-white block">FREE FIRE 2023</span>
                    <span className="text-[11px] text-amber-400 font-mono font-semibold">NOSTALGIA EDITION</span>
                  </div>
                </div>

                {/* Live server tag overlay */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/40 text-xs text-amber-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-[11px] font-bold">OB39 STABLE • DZ & MENA</span>
                </div>
              </div>

              {/* Sub-panel overview */}
              <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>تحديث الأسلحة الكلاسيكية: سويتش سريع وضرر حقيقي</span>
                </div>
                <button
                  onClick={handleCopyApkLink}
                  className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono text-[11px]"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'تم النسخ' : 'نسخ الرابط'}</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
