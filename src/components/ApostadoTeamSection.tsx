import React, { useState } from 'react';
import {
  DISCORD_INVITE_URL,
  RECENT_MATCH_RESULTS,
  UPCOMING_MATCH_SCHEDULE,
} from '../data/pixselZoneData';
import { sound } from '../utils/sound';
import {
  Swords,
  Trophy,
  Calendar,
  Clock,
  Mic,
  Users,
  ExternalLink,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';

export const ApostadoTeamSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'results' | 'tryouts'>('schedule');

  return (
    <section id="apostado" className="py-20 bg-[#030612] border-t border-[#00f2fe]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#120808] border border-red-500/40 text-xs font-tech text-red-400 mb-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <Swords className="w-3.5 h-3.5 text-red-500" />
            <span>------------ 🗡 APOSTADO TEAM 🗡 ------------</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-brand font-black text-white tracking-wide mb-3">
            فريق وبطولات APOSTADO TEAM
          </h2>
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            الفريق الرسمي لسيرفر PIXSEL SERVER للمنافسات والسكريمات الكبرى. تابع مواعيد الرومات اليومية، النتائج، وتجارب الأداء.
          </p>
        </div>

        {/* Visual Banner Showcase */}
        <div className="relative rounded-2xl overflow-hidden border border-[#00f2fe]/30 mb-8 sm:mb-12 shadow-[0_0_40px_rgba(0,242,254,0.15)] group">
          <img
            src="/src/assets/images/apostado_tournament_clash_1792345447963.jpg"
            alt="Apostado Tournament Clash"
            className="w-full h-48 sm:h-72 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050e] via-black/50 to-transparent" />

          <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <div className="text-right">
              <span className="text-[10px] sm:text-xs font-tech text-[#00f2fe] uppercase block">
                FREE FIRE 4v4 CLASH SQUAD ARENA
              </span>
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-brand font-black text-white">
                تحديات يومية برومات مخصصة وجوائز مالية
              </h3>
            </div>

            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playReward()}
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-red-600 to-[#ff3b00] hover:from-red-500 hover:to-red-600 text-white font-tech font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(239,68,68,0.5)] flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
            >
              <Swords className="w-4 h-4" />
              <span>تسجيل سكواد في السكريمات</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Segmented Control for Schedule / Results / Voice Rooms */}
        <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto pb-1">
          <div className="flex p-1 rounded-xl bg-black/90 border border-[#00f2fe]/30 max-w-full overflow-x-auto gap-1">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('schedule');
              }}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs font-tech font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                activeTab === 'schedule'
                  ? 'bg-[#00f2fe] text-[#030712] shadow-[0_0_15px_#00f2fe]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>MATCH-TIMES (المواعيد)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('results');
              }}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs font-tech font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                activeTab === 'results'
                  ? 'bg-[#00f2fe] text-[#030712] shadow-[0_0_15px_#00f2fe]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>RESULT (النتائج)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('tryouts');
              }}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs font-tech font-bold transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                activeTab === 'tryouts'
                  ? 'bg-[#00f2fe] text-[#030712] shadow-[0_0_15px_#00f2fe]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>TEST & SHOW TIME (صوتي)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Match Schedule */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            {UPCOMING_MATCH_SCHEDULE.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-xl bg-[#071329] border border-[#00f2fe]/25 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-[#00f2fe] transition-all"
              >
                <div className="text-right">
                  <div className="flex items-center gap-2 text-xs font-tech text-[#00f2fe] mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                    <span>·</span>
                    <span className="text-emerald-400">{item.status}</span>
                  </div>
                  <h4 className="text-xl font-brand font-black text-white">{item.title}</h4>
                  <p className="text-xs text-gray-300 font-sans mt-0.5">{item.roomType}</p>
                </div>

                <a
                  href={DISCORD_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-[#00f2fe]/15 hover:bg-[#00f2fe]/25 border border-[#00f2fe]/40 text-[#00f2fe] text-xs font-tech font-bold transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  <span>استلام كود الروم في ديسكورد</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Results */}
        {activeTab === 'results' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECENT_MATCH_RESULTS.map((res) => (
              <div
                key={res.id}
                className="p-6 rounded-xl bg-[#071329] border border-[#00f2fe]/25 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 font-tech mb-2">
                    <span>{res.format}</span>
                    <span>{res.date}</span>
                  </div>
                  <h4 className="text-lg font-brand font-black text-white mb-2">{res.matchTitle}</h4>
                  <div className="text-3xl font-brand font-black text-[#00f2fe] my-2">{res.score}</div>
                  <div className="text-xs text-emerald-400 font-tech font-bold">
                    الفائز: {res.winner}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 text-xs text-gray-300 font-sans space-y-1">
                  <div>
                    <span className="text-gray-400">أفضل لاعب (MVP):</span> {res.mvp}
                  </div>
                  <div>
                    <span className="text-gray-400">الخريطة:</span> {res.map}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Voice Rooms TEST & SHOW TIME */}
        {activeTab === 'tryouts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room 1: TEST */}
            <div className="p-6 rounded-2xl bg-[#09152b] border border-[#00f2fe]/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-brand font-black text-white">🔊 『🗡』 TEST</h4>
                  <span className="text-xs text-emerald-400 font-tech">روم اختبار وانضمام اللاعبين (Tryouts)</span>
                </div>
              </div>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                هل تمتلك مهارة فائقة في الـ 4v4 وتريد تمثيل فريق Apostado؟ ادخل هذا الروم للتواصل مع قائد الكلان واختبار سرعتك ودقة الهيد شوت.
              </p>
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-tech text-[#00f2fe] hover:underline"
              >
                <span>دخول روم TEST في الديسكورد</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Room 2: SHOW TIME */}
            <div className="p-6 rounded-2xl bg-[#150a0a] border border-red-500/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500 flex items-center justify-center text-red-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-brand font-black text-white">🔊 『🗡』 SHOW TIME</h4>
                  <span className="text-xs text-red-400 font-tech">روم التعليق المباشر والبث الحماسي</span>
                </div>
              </div>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                استمتع بمتابعة أقوى السكريمات مباشرة مع تعليق صوتي فوري وأجواء حماسية لا تضاهى أثناء مباريات فريق Apostado.
              </p>
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-tech text-red-400 hover:underline"
              >
                <span>دخول روم SHOW TIME في الديسكورد</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
