import React from 'react';
import { useServer } from '../context/ServerContext';
import { Gamepad2, ShieldCheck, Flame, Zap, Trophy, Heart } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { serverInfo } = useServer();

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-slate-800 bg-[#0a0d18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>قصة مشروع نسخة فري فاير 2023</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white font-gaming tracking-wide">
              لماذا عدنا إلى نسخة 2023؟
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              {serverInfo.fullStory}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold text-sm block">خوادم مخصصة بدون تقطيع</span>
                <span className="text-xs text-slate-400">بينغ مستقر (20-35ms) لجميع دول شمال إفريقيا والشرق الأوسط.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold text-sm block">مجانية ومتاحة للجميع</span>
                <span className="text-xs text-slate-400">لا اشتراكات ولا مبالغ مدفوعة، اللعبة والملفات والرومات مفتوحة.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#12182c] via-[#0f1422] to-[#1a1210] border-2 border-amber-500/30 shadow-2xl space-y-6 text-right">
              <h3 className="text-lg font-black text-white flex items-center gap-2 font-gaming">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>أبرز ما تم تعديله وإصلاحه في هذه النسخة:</span>
              </h3>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                  <div>
                    <strong className="text-white block mb-0.5">إعادة ضرر الون تاب لسلاح M1887 و MP40:</strong>
                    <span>تم ضبط القيم الحسابية للضرر ومسافة الرصاص لتعيد إحساس الاحتراف والمهارة العالية القديمة.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                  <div>
                    <strong className="text-white block mb-0.5">حذف الإعلانات والمؤثرات الزائدة:</strong>
                    <span>تسريع فتح اللعبة بنسبة 300% بدون شاشات تحميل طويلة أو فعاليات إعلانية تثقل المعالج.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                  <div>
                    <strong className="text-white block mb-0.5">أصوات اللوبي وموسيقى 2023 الحنين:</strong>
                    <span>الموسيقى الأسطورية التي رافقت ملايين اللاعبين في اللوبي ورومات الانتظار.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
