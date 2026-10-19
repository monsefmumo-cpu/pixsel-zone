import React from 'react';
import { DISCORD_INVITE_URL, PIXSEL_SERVER_LOGO } from '../data/pixselZoneData';
import { sound } from '../utils/sound';
import { ExternalLink, Heart } from 'lucide-react';

interface PixselFooterProps {
  onNavigate: (sectionId: string) => void;
}

export const PixselFooter: React.FC<PixselFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#02040a] border-t border-[#00f2fe]/20 text-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div className="flex items-center gap-4 text-right">
            <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#00f2fe] via-[#0284c7] to-[#38bdf8] overflow-hidden shrink-0 shadow-[0_0_20px_rgba(0,242,254,0.4)]">
              <img
                src={PIXSEL_SERVER_LOGO}
                alt="PIXSEL SERVER Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="font-brand text-xl sm:text-2xl font-black tracking-wider text-white block">
                PIXSEL ZONE
              </span>
              <span className="text-[11px] sm:text-xs text-[#00f2fe] font-tech tracking-wider block">
                سيرفر ديسكورد الرسمي للألعاب، البانلات، والسكريمات
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-tech text-gray-300">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('discord-explorer');
              }}
              className="hover:text-[#00f2fe] transition-colors"
            >
              قنوات الديسكورد
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('panels');
              }}
              className="hover:text-[#00f2fe] transition-colors"
            >
              بانلات الأجهزة
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('auto-quest');
              }}
              className="hover:text-[#00f2fe] transition-colors"
            >
              Auto Quest
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('apostado');
              }}
              className="hover:text-[#00f2fe] transition-colors"
            >
              فريق Apostado
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('banned-section');
              }}
              className="hover:text-[#00f2fe] transition-colors"
            >
              قائمة الحظر
            </button>
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playReward()}
              className="text-[#00f2fe] font-bold hover:underline flex items-center gap-1"
            >
              <span>دخول الديسكورد</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-sans">
          <div>
            © {new Date().getFullYear()} PIXSEL SERVER COMMUNITY. جميع الحقوق محفوظة لعشاق الألعاب.
          </div>
          <div className="flex items-center gap-1 text-gray-400 font-tech">
            <span>رابط الدعوة المعتمد:</span>
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00f2fe] hover:underline"
            >
              discord.gg/Qahdywj2Q
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
