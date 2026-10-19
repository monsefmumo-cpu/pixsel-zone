import React, { useState } from 'react';
import { DISCORD_INVITE_URL } from '../data/pixselZoneData';
import { Sparkles, Film, Star, ExternalLink, ShieldCheck, Zap, Bot, RefreshCw } from 'lucide-react';

export const AutoQuestSection: React.FC = () => {
  const [simulatedToken, setSimulatedToken] = useState<string>('PX-VID-9824-OK');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSampleToken = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const rand = Math.floor(1000 + Math.random() * 9000);
      setSimulatedToken(`PX-ORB-${rand}-FASTPASS`);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <section id="auto-quest" className="py-20 bg-[#020612] border-t border-[#00f2fe]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081528] border border-[#00f2fe]/30 text-xs font-tech text-[#00f2fe] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>✨ || AUTO QUEST & TOKEN SYSTEMS || ✨</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-brand font-black text-white tracking-wide mb-3">
            أدوات AUTO QUEST الحصرية
          </h2>
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            وداعاً لإضاعة الوقت في مشاهدة إعلانات الألعاب اليدوية. بوتات سيرفر PIXSEL SERVER تجمع لك التوكنات وكرات الـ Orbs تلقائياً.
          </p>
        </div>

        {/* 2-Column Feature Cards: Token-video & Auto-Orbs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Token-video-🎬 */}
          <div className="p-8 rounded-2xl bg-[#071329] border border-[#00f2fe]/30 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#00f2fe] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f2fe]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#00f2fe]/15 border border-[#00f2fe]/40 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(0,242,254,0.3)]">
                  🎥
                </div>
                <span className="text-xs font-tech text-[#00f2fe] bg-black/40 px-3 py-1 rounded-full border border-white/10">
                  قناة #Token-video-🎬
                </span>
              </div>

              <h3 className="text-2xl font-brand font-black text-white mb-2">
                توكنات الفيديوهات التلقائية (Token Video)
              </h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed mb-6">
                بوت ديسكورد ذكي يقوم بإنهاء مهمات الفيديو الإعلانية فورياً وتوليد أكواد التوكن المعتمدة دون الحاجة للانتظار، مع حماية مشفرة ضد كشف الحسابات.
              </p>

              <div className="space-y-2.5 text-xs text-gray-200 font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
                  <span>توليد أكثر من 50 توكن يومياً لحسابك</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
                  <span>تخطي إعلانات الانتظار (Skip Ad Delay)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe]" />
                  <span>أوامر سريعة وسهلة داخل الروم عبر البوت</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#0284c7] hover:from-[#38bdf8] hover:to-[#00f2fe] text-[#030712] font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
              >
                <span>دخول قناة Token-video في الديسكورد</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Auto-Orbs */}
          <div className="p-8 rounded-2xl bg-[#071329] border border-[#00f2fe]/30 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#00f2fe] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#eab308]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#eab308]/15 border border-[#eab308]/40 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                  ⭐
                </div>
                <span className="text-xs font-tech text-[#eab308] bg-black/40 px-3 py-1 rounded-full border border-white/10">
                  قناة #Auto-Orbs
                </span>
              </div>

              <h3 className="text-2xl font-brand font-black text-white mb-2">
                نظام حصد وتجميع كرات الـ Orbs
              </h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed mb-6">
                نظام آلي متكامل لحصاد كرات الـ Orbs ورفع مستوى الحسابات لفتح السكنات الحصرية والجوائز الموسمية بدون أي جهد يدوي، بمعدل نجاح 100%.
              </p>

              <div className="space-y-2.5 text-xs text-gray-200 font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eab308]" />
                  <span>تجميع مستمر في الخلفية (24/7 Cloud Farm)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eab308]" />
                  <span>توزيع نقاط إضافية لأعضاء ديسكورد Pixsel Zone</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#eab308]" />
                  <span>تقارير فورية بالكمية المستلمة في حسابك</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#eab308] to-[#ca8a04] hover:from-[#facc15] hover:to-[#eab308] text-[#030712] font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
              >
                <span>دخول قناة Auto-Orbs في الديسكورد</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Live Token Simulator Widget */}
        <div className="p-6 rounded-2xl bg-[#040c1a] border border-[#00f2fe]/35 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-xl bg-[#00f2fe]/20 border border-[#00f2fe] flex items-center justify-center text-[#00f2fe]">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-tech text-[#00f2fe] uppercase block">
                مجرّب التوكن التلقائي (Token Generator Demo)
              </span>
              <h4 className="text-lg font-brand font-black text-white">
                كود التوكن التجريبي: <span className="text-[#00f2fe] font-mono">{simulatedToken}</span>
              </h4>
            </div>
          </div>

          <button
            onClick={handleGenerateSampleToken}
            disabled={isGenerating}
            className="px-6 py-3 rounded-xl bg-[#081938] hover:bg-[#0c244f] border border-[#00f2fe]/50 text-white font-tech text-xs tracking-wider uppercase transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#00f2fe] ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'جاري التوليد...' : 'توليد كود جديد'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
