import React from 'react';
import { FAQ_ITEMS, DISCORD_INVITE_URL } from '../data/pixselZoneData';
import { HelpCircle, ExternalLink, Sparkles, MessageSquare } from 'lucide-react';

export const PixselFAQ: React.FC = () => {
  return (
    <section id="faq" className="py-20 bg-[#030816] border-t border-[#00f2fe]/20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081528] border border-[#00f2fe]/30 text-xs font-tech text-[#00f2fe] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS · الأسئلة الشائعة</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-brand font-black text-white tracking-wide mb-3">
            كل ما تود معرفته عن PIXSEL SERVER
          </h2>
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            إجابات واضحة ومباشرة لأهم استفسارات الأعضاء واللاعبين الجدد.
          </p>
        </div>

        {/* FAQ Accordion / Cards Grid */}
        <div className="space-y-4 mb-16">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#071329] border border-[#00f2fe]/25 text-right space-y-2 hover:border-[#00f2fe] transition-all"
            >
              <h4 className="text-base sm:text-lg font-brand font-bold text-white flex items-center gap-2">
                 <span className="text-[#00f2fe] font-mono text-sm">0{idx + 1}.</span>
                <span>{item.q}</span>
              </h4>
              <p className="text-sm text-gray-300 font-sans leading-relaxed pr-6">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* Big Join Discord Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#071c3d] via-[#0b2959] to-[#071c3d] border-2 border-[#00f2fe]/50 shadow-[0_0_50px_rgba(0,242,254,0.35)] text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#00f2fe]/20 border border-[#00f2fe] mx-auto flex items-center justify-center text-3xl shadow-[0_0_20px_#00f2fe]">
              ⚡
            </div>

            <h3 className="text-3xl sm:text-4xl font-brand font-black text-white">
              جاهز للانضمام إلى نخبة لاعبي PIXSEL SERVER؟
            </h3>

            <p className="text-sm text-gray-200 font-sans">
              انضم الآن لأكثر من 12,000 لاعب واحصل فوراً على أقوى البانلات، توكنات الفيديو التلقائية، وشارك في رومات وسكريمات فريق Apostado!
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00f2fe] to-[#38bdf8] hover:from-[#38bdf8] hover:to-[#00f2fe] text-[#030712] font-tech font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(0,242,254,0.5)] flex items-center gap-2 active:scale-95"
              >
                <span>انقر هنا للانضمام إلى الديسكورد مجاناً</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <span className="text-xs text-gray-400 font-tech block pt-2">
              الرابط المباشر الرسمي: https://discord.gg/Qahdywj2Q
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
