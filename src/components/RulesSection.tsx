import React, { useState } from 'react';
import { useServer } from '../context/ServerContext';
import { ShieldAlert, BookOpen, ShieldCheck, Gamepad2, Monitor, Users } from 'lucide-react';
import { sound } from '../utils/sound';

export const RulesSection: React.FC = () => {
  const { rules } = useServer();
  const [activeCategory, setActiveCategory] = useState<'all' | 'anticheat' | 'rooms' | 'emulator' | 'general'>('all');

  const filteredRules = activeCategory === 'all'
    ? rules
    : rules.filter((r) => r.category === activeCategory);

  return (
    <section id="rules" className="py-16 sm:py-24 border-b border-slate-800 bg-[#090c16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div className="space-y-3 text-right max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>ميثاق اللعب النظيف والأمان 2023</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-gaming tracking-wide">
              قوانين السيرفر وسياسة مكافحة الغش
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              لحماية متعة المنافسة والبوياه النزيهة لجميع اللاعبين، نطبق نظام حظر صارم ومباشر على أي محاولة غش أو استخدام ملفات مشبوهة.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto overflow-x-auto text-xs">
            <button
              onClick={() => { sound.playClick(); setActiveCategory('all'); }}
              className={`px-3 py-1.5 font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'all' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              الكل ({rules.length})
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveCategory('anticheat'); }}
              className={`px-3 py-1.5 font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'anticheat' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              مكافحة الغش 🛡️
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveCategory('rooms'); }}
              className={`px-3 py-1.5 font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'rooms' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              قوانين الرومات ⚔️
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveCategory('emulator'); }}
              className={`px-3 py-1.5 font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'emulator' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              المحاكي 💻
            </button>
            <button
              onClick={() => { sound.playClick(); setActiveCategory('general'); }}
              className={`px-3 py-1.5 font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'general' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              عامة
            </button>
          </div>
        </div>

        {/* Rules Grid */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRules.map((rule) => (
            <div
              key={rule.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#0f1424] border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-4 text-right"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-black text-base flex items-center justify-center shrink-0">
                {rule.number}
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white leading-snug">
                    {rule.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
