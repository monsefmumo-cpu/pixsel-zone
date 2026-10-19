import React from 'react';
import { useServer } from '../context/ServerContext';
import { Calendar, Trophy, Users, PlusCircle, Flame, Gamepad } from 'lucide-react';
import { sound } from '../utils/sound';

export const EventsSection: React.FC<{ onOpenAnnouncementManager?: () => void }> = ({ onOpenAnnouncementManager }) => {
  const { announcements, isAdmin } = useServer();

  return (
    <section id="events" className="py-16 sm:py-24 border-b border-slate-800 bg-[#0c0f1d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div className="space-y-3 text-right max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5" />
              <span>بطولات فري فاير 2023 وسكريمات الرومات</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-gaming tracking-wide">
              البطولات الرسمية والتحديثات الأسبوعية
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              شارك في بطولات كلاش سكواد 4v4 وسولو القناصين مع فرق شمال إفريقيا والشرق الأوسط، وفز بجواهر حقيقية وسكنات نادرة.
            </p>
          </div>

          {isAdmin && onOpenAnnouncementManager && (
            <button
              onClick={() => { sound.playClick(); onOpenAnnouncementManager(); }}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-black bg-amber-500 hover:bg-amber-400 rounded-xl transition-all self-start md:self-auto shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة بطولة / تحديث من لوحة التحكم</span>
            </button>
          )}
        </div>

        {/* Events Grid */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((item) => {
            const isLive = item.status === 'active';
            const isUpcoming = item.status === 'upcoming';

            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#111728] to-[#0c101d] border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-lg text-right"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {item.tag}
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-400 flex items-center gap-1">
                      {isLive ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          <span>نشط حالياً 🔥</span>
                        </span>
                      ) : isUpcoming ? (
                        <span className="text-amber-400">قريباً ⏳</span>
                      ) : (
                        <span className="text-slate-500">منتهي ✅</span>
                      )}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {item.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-3">
                  {item.reward && (
                    <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/30 p-2.5 rounded-xl border border-amber-900/50">
                      <Trophy className="w-4 h-4 shrink-0 text-amber-400" />
                      <span className="font-bold">الجوائز: {item.reward}</span>
                    </div>
                  )}

                  {item.participantsCount && (
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        <span>الفرق واللاعبين:</span>
                      </div>
                      <span className="font-mono font-bold text-slate-200 tabular-nums">
                        {item.participantsCount} مسجل
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
