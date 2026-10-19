import React, { useState } from 'react';
import { DISCORD_INVITE_URL } from '../data/pixselZoneData';
import { ShieldAlert, Search, ShieldCheck, CheckCircle2, ExternalLink, AlertTriangle } from 'lucide-react';

interface BannedEntry {
  uid: string;
  nickname: string;
  reason: string;
  date: string;
  type: string;
}

export const BannedListSection: React.FC = () => {
  const [searchUid, setSearchUid] = useState<string>('');
  const [checkResult, setCheckResult] = useState<{ checked: boolean; isBanned: boolean; entry?: BannedEntry } | null>(null);

  const sampleBannedList: BannedEntry[] = [
    { uid: '189340192', nickname: 'Ghost_Fake', reason: 'استخدام سكريبت هيد شوت غير مصرح به في روم 4v4', date: '17 أكتوبر', type: 'حظر نهائي' },
    { uid: '298371940', nickname: 'Toxic_Player99', reason: 'التلاعب بنتيجة الروم وعدم احترام الخصم', date: '15 أكتوبر', type: 'حظر نهائي' },
    { uid: '304918239', nickname: 'Noob_Lagger', reason: 'استخدام برامج تغيير الـ IP وتجميد السيرفر', date: '12 أكتوبر', type: 'حظر دائم' },
    { uid: '482910485', nickname: 'Fake_Apostado', reason: 'انتحال اسم فريق Apostado ونشر روابط مشبوهة', date: '10 أكتوبر', type: 'حظر عام' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchUid.trim()) return;

    const found = sampleBannedList.find(
      (b) => b.uid === searchUid.trim() || b.nickname.toLowerCase().includes(searchUid.trim().toLowerCase())
    );

    if (found) {
      setCheckResult({ checked: true, isBanned: true, entry: found });
    } else {
      setCheckResult({ checked: true, isBanned: false });
    }
  };

  return (
    <section id="banned-section" className="py-20 bg-[#02050e] border-t border-[#00f2fe]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#160a0a] border border-red-500/40 text-xs font-tech text-red-400 mb-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
            <span>🛑 || BANNED & FAIR PLAY PROTOCOL || 🛑</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-brand font-black text-white tracking-wide mb-3">
            نظام مكافحة الغش وقائمة الحظر
          </h2>
          <p className="text-gray-300 font-sans text-sm sm:text-base">
            سيرفر PIXSEL SERVER يضمن بيئة لعب نظيفة وتنافسية عادلة. تحقق من أي آيدي (UID) قبل بدء الرومات والتحديات.
          </p>
        </div>

        {/* UID Check Search Bar */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-12">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl bg-[#071329] border border-[#00f2fe]/35 shadow-2xl">
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-gray-400 absolute right-4 pointer-events-none" />
              <input
                type="text"
                placeholder="أدخل آيدي اللاعب (UID) أو الاسم للتحقق من سجله..."
                value={searchUid}
                onChange={(e) => setSearchUid(e.target.value)}
                className="w-full pr-12 pl-4 py-3 rounded-xl bg-black/40 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00f2fe] hover:bg-[#38bdf8] text-[#030712] font-tech font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)] whitespace-nowrap active:scale-95"
            >
              فحص الآيدي
            </button>
          </form>

          {/* Search Result Feedback */}
          {checkResult && (
            <div className="mt-4 animate-fade-in">
              {checkResult.isBanned && checkResult.entry ? (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500 text-right">
                  <div className="flex items-center gap-2 text-red-400 font-tech font-bold text-sm mb-1">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>تنبيه: هذا الحساب محظور في سيرفر PIXSEL ZONE!</span>
                  </div>
                  <div className="text-xs text-gray-300 font-sans space-y-1">
                    <div><span className="text-gray-400">الاسم والآيدي:</span> {checkResult.entry.nickname} ({checkResult.entry.uid})</div>
                    <div><span className="text-gray-400">سبب الحظر:</span> {checkResult.entry.reason}</div>
                    <div><span className="text-gray-400">تاريخ الحظر:</span> {checkResult.entry.date} · {checkResult.entry.type}</div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500 text-right flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-tech font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>الآيدي نظيف 100% وغير موجود في قائمة الحظر. مؤهل للعب!</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Public Banned Table / Cards Container */}
        <div className="rounded-2xl border border-white/10 bg-[#071022] overflow-hidden shadow-2xl">
          <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <h4 className="text-base sm:text-lg font-brand font-black text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <span>أحدث حالات الحظر المسجلة (#Banned 🛑)</span>
            </h4>
            <span className="text-[11px] sm:text-xs text-gray-400 font-tech">تحديث تلقائي</span>
          </div>

          {/* Desktop & Tablet Table (Hidden on small phones) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-black/40 text-gray-400 font-tech uppercase border-b border-white/10">
                <tr>
                  <th className="p-4">اللاعب</th>
                  <th className="p-4">آيدي الحساب (UID)</th>
                  <th className="p-4">سبب الحظر</th>
                  <th className="p-4">التاريخ</th>
                  <th className="p-4">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {sampleBannedList.map((row) => (
                  <tr key={row.uid} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-white">{row.nickname}</td>
                    <td className="p-4 font-mono text-[#00f2fe]">{row.uid}</td>
                    <td className="p-4 text-gray-300">{row.reason}</td>
                    <td className="p-4 text-gray-400 font-tech">{row.date}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-tech font-bold">
                        {row.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards (Shown on phones < 768px for supreme readability) */}
          <div className="md:hidden divide-y divide-white/5 p-3 space-y-3">
            {sampleBannedList.map((row) => (
              <div key={row.uid} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2 text-right">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-tech font-bold">
                    {row.type}
                  </span>
                  <div>
                    <span className="font-bold text-white text-sm block">{row.nickname}</span>
                    <span className="font-mono text-[#00f2fe] text-xs">UID: {row.uid}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  <span className="text-gray-400 font-bold">السبب: </span>{row.reason}
                </p>
                <div className="text-[10px] text-gray-400 font-tech">
                  تاريخ الحظر: {row.date}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-black/40 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 text-center sm:text-right">
            <span>لتقديم بلاغ ضد لاعب مخالف أو طلب استئناف، تواصل مع المشرفين في ديسكورد:</span>
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00f2fe] hover:underline flex items-center justify-center gap-1 font-tech font-bold"
            >
              <span>فتح تذكرة في السيرفر</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
