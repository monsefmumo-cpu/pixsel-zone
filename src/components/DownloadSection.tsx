import React, { useState } from 'react';
import { useServer } from '../context/ServerContext';
import { 
  Download, 
  Smartphone, 
  Monitor, 
  FileArchive, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertCircle, 
  HelpCircle, 
  ShieldCheck, 
  Lock,
  Flame,
  Users,
  Sparkles,
  Info,
  Calendar,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { sound } from '../utils/sound';
import { DiscordGateModal } from './DiscordGateModal';

export const DownloadSection: React.FC = () => {
  const { downloadInfo, isDiscordVerified, showToast, recordSiteDownload, siteStats } = useServer();
  const [copiedObbPath, setCopiedObbPath] = useState(false);
  
  // Discord Gate Modal state
  const [discordModalOpen, setDiscordModalOpen] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<{ url: string; title: string }>({
    url: '',
    title: ''
  });

  const obbTargetPath = 'Android/obb/com.dts.freefireth/';

  const copyObbPath = () => {
    sound.playClick();
    navigator.clipboard.writeText(obbTargetPath);
    setCopiedObbPath(true);
    showToast('تم نسخ مسار مجلد الـ OBB!', 'success');
    setTimeout(() => setCopiedObbPath(false), 2500);
  };

  const handleDownloadClick = (e: React.MouseEvent, url: string, title: string) => {
    e.preventDefault();
    sound.playClick();

    if (downloadInfo.requireDiscordJoin && !isDiscordVerified) {
      setPendingDownload({ url, title });
      setDiscordModalOpen(true);
    } else {
      sound.playSuccess();
      recordSiteDownload();
      window.open(url, '_blank', 'noopener,noreferrer');
      showToast(`جاري بدء تحميل ${title}...`, 'success');
    }
  };

  return (
    <section id="download" className="py-16 sm:py-24 bg-gradient-to-b from-[#0e071c] via-[#120a24] to-[#0c0618] border-b border-purple-900/40 relative overflow-hidden" dir="rtl">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-700/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold font-mono">
            <Download className="w-3.5 h-3.5" />
            <span>مركز التحميل الرسمي والمباشر</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-gaming tracking-wide">
            تحميل نسخة <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">فري فاير 2023 الأسطورية</span>
          </h2>
          <p className="text-sm sm:text-base text-purple-200/70 leading-relaxed">
            روابط مباشرة تدعم الاستكمال، متوافقة مع جميع أجهزة أندرويد من 2GB RAM ومحاكيات الكمبيوتر بدون روت أو ملفات ضارة.
          </p>
        </div>

        {/* Maintenance Alert Banner if Active */}
        {downloadInfo.isMaintenance && (
          <div className="max-w-4xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-amber-950/60 border-2 border-amber-500/80 text-amber-200 text-right space-y-2 shadow-2xl shadow-amber-950/50 animate-pulse">
            <div className="flex items-center gap-2 font-bold text-amber-300 text-sm sm:text-base">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>تنبيه هام: سيرفر اللعبة يخضع حالياً لأعمال الصيانة والترقية!</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed pr-7">
              {downloadInfo.maintenanceMessage || 'جاري ترقية خوادم كلاش سكواد وإضافة سكنات جديدة. التحميل متاح لكن قد تواجه انقطاعاً مؤقتاً في الرومات.'}
            </p>
          </div>
        )}

        {/* Force Update Banner if enabled */}
        {downloadInfo.forceUpdate && (
          <div className="max-w-4xl mx-auto mb-8 p-4 rounded-2xl bg-rose-950/50 border-2 border-rose-500/70 text-rose-200 text-right flex items-center gap-3 shadow-xl">
            <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-black text-white">إشعار تحديث إجباري (Force Update)</h4>
              <p className="text-xs text-rose-200/90 mt-0.5">
                يتطلب السيرفر تحميل هذا الإصدار ({downloadInfo.version}) كشرط إلزامي للدخول للرومات وحماية حسابك من عدم التوافق.
              </p>
            </div>
          </div>
        )}

        {/* Release Overview & Changelog Card */}
        <div className="max-w-4xl mx-auto mb-10 p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#170c2e] via-[#1a0f35] to-[#140a28] border border-purple-800/50 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-800/50 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/40">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-white font-gaming">
                    رقم الإصدار: {downloadInfo.version}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                    أحدث إصدار مستقر
                  </span>
                </div>
                <p className="text-xs text-purple-300/70 flex items-center gap-2 mt-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>تاريخ آخر تحديث: {downloadInfo.lastUpdated}</span>
                  <span>·</span>
                  <span>إجمالي التحميلات: {downloadInfo.downloadCount.toLocaleString()}</span>
                </p>
              </div>
            </div>

            {/* Checksums box */}
            <div className="text-left sm:text-left text-[11px] font-mono text-purple-300/80 bg-black/40 p-2.5 rounded-xl border border-purple-900/60">
              <div className="flex items-center gap-1.5 justify-end">
                <span className="text-slate-400">MD5:</span>
                <span className="text-orange-400 truncate max-w-[120px]">{downloadInfo.checksumMd5 || 'd41d8cd98f00b204...'}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-end mt-0.5">
                <span className="text-slate-400">الحجم الإجمالي:</span>
                <span className="text-cyan-300 font-bold">{downloadInfo.apkSize} + {downloadInfo.obbSize}</span>
              </div>
            </div>
          </div>

          {/* Changelog Release Notes */}
          <div>
            <h4 className="text-xs font-bold text-orange-400 mb-2 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ملاحظات التحديث والتغييرات (Patch Notes):</span>
            </h4>
            <div className="text-xs sm:text-sm text-purple-100/90 leading-relaxed bg-[#0b0516]/60 p-4 rounded-2xl border border-purple-900/40 whitespace-pre-line">
              {downloadInfo.releaseNotes || '• إرجاع خريطة بيرمودا 2023 الأصلية\n• ضبط ضرر شوتجان M1887 وسلاح MP40 الكلاسيكي\n• تفعيل نظام الحماية الآلي ضد الهاك'}
            </div>
          </div>
        </div>

        {/* Discord Gate Notification Banner */}
        <div className="max-w-4xl mx-auto mb-10">
          {downloadInfo.requireDiscordJoin && !isDiscordVerified ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1c1236] via-[#160d2e] to-[#1c1236] border-2 border-[#5865F2]/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#5865F2] text-white shrink-0 shadow-md">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white">التحقق من العضوية (Discord Access):</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5865F2]/20 text-[#9da5ff] border border-[#5865F2]/40 font-mono font-bold">
                      DISCORD GATE
                    </span>
                  </div>
                  <p className="text-xs text-purple-200/80 mt-0.5">
                    انضم إلى سيرفر ديسكورد الرسمي للحصول على كود الدخول اليومي وفتح التحميل السريع.
                  </p>
                </div>
              </div>

              <a
                href={downloadInfo.discordInviteUrl || "https://discord.gg/m6etCxgUX"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-4 py-2 text-xs font-bold text-white bg-[#5865F2] hover:bg-[#4752c4] rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer"
              >
                <span>الانضمام للديسكورد</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>أنت عضو مؤكد في سيرفر الديسكورد — كافة روابط التحميل مفتوحة ومباشرة!</span>
              </div>
              <span className="text-[11px] text-emerald-400/80 font-mono hidden sm:inline">
                VERIFIED PLAYER ✓
              </span>
            </div>
          )}
        </div>

        {/* 3 Main Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: APK File */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#180d32] to-[#100723] border-2 border-orange-500/50 shadow-xl flex flex-col justify-between hover:border-orange-400 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/40">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-orange-500 text-black font-bold">
                  APK FILE
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white">ملف اللعبة (APK الأصلي)</h3>
                <p className="text-xs text-purple-200/70 mt-1">
                  تطبيق اللعبة الرئيسي 2023 جاهز للتثبيت على جميع هواتف أندرويد بدون روت.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-purple-200/80 font-mono">
                <div className="flex justify-between border-b border-purple-900/40 pb-1">
                  <span className="text-slate-400">الحجم:</span>
                  <span className="text-white font-bold">{downloadInfo.apkSize}</span>
                </div>
                <div className="flex justify-between border-b border-purple-900/40 pb-1">
                  <span className="text-slate-400">التوافق:</span>
                  <span className="text-emerald-400">Android 5.0+ حتى 14</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">التحميل:</span>
                  <span className="text-orange-400 font-bold">رابط مباشر</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={(e) => handleDownloadClick(e, downloadInfo.apkUrl, 'ملف اللعبة APK')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 text-black font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer group-hover:scale-102"
              >
                <Download className="w-4 h-4" />
                <span>تحميل ملف APK الآن</span>
              </button>
            </div>
          </div>

          {/* Card 2: OBB Data File */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#180d32] to-[#100723] border border-purple-800/50 shadow-xl flex flex-col justify-between hover:border-purple-600 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                  <FileArchive className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  DATA 2023
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white">ملف الداتا (OBB الأصلي)</h3>
                <p className="text-xs text-purple-200/70 mt-1">
                  ملف الخرائط الكلاسيكية والأصوات وسكنات 2023 النادرة كاملة.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-purple-200/80 font-mono">
                <div className="flex justify-between border-b border-purple-900/40 pb-1">
                  <span className="text-slate-400">الحجم:</span>
                  <span className="text-white font-bold">{downloadInfo.obbSize}</span>
                </div>
                <div className="flex justify-between border-b border-purple-900/40 pb-1">
                  <span className="text-slate-400">المسار:</span>
                  <span className="text-cyan-400 font-mono truncate max-w-[150px]">Android/obb/</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">التحميل:</span>
                  <span className="text-cyan-400 font-bold">داتا كاملة</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={(e) => handleDownloadClick(e, downloadInfo.obbUrl, 'ملف الداتا OBB')}
                className="w-full py-3.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-white font-bold text-xs flex items-center justify-center gap-2 border border-purple-700/50 transition-all cursor-pointer group-hover:scale-102"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>تحميل ملف الـ OBB</span>
              </button>
            </div>
          </div>

          {/* Card 3: PC Emulator Package */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#180d32] to-[#100723] border border-purple-800/50 shadow-xl flex flex-col justify-between hover:border-purple-600 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
                  <Monitor className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  PC EMULATOR
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white">حزمة المحاكي للكمبيوتر (PC)</h3>
                <p className="text-xs text-purple-200/70 mt-1">
                  إعدادات جاهزة لمحاكيات BlueStacks و MSI App Player مع ضبط حساسية الهيدشوت 2023.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-purple-200/80 font-mono">
                <div className="flex justify-between border-b border-purple-900/40 pb-1">
                  <span className="text-slate-400">الفريمات:</span>
                  <span className="text-purple-300 font-bold">90 FPS ثابت</span>
                </div>
                <div className="flex justify-between border-b border-purple-900/40 pb-1">
                  <span className="text-slate-400">التحكم:</span>
                  <span className="text-white">أزرار مبرمجة</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">النظام:</span>
                  <span className="text-white">Windows 10 / 11</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={(e) => handleDownloadClick(e, downloadInfo.pcEmulatorUrl, 'إعدادات المحاكي PC')}
                className="w-full py-3.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 font-bold text-xs flex items-center justify-center gap-2 border border-purple-700/50 transition-all cursor-pointer group-hover:scale-102"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>تحميل إعدادات المحاكي</span>
              </button>
            </div>
          </div>

        </div>

        {/* Installation Step-by-Step Guide Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#140a2a] border border-purple-800/40 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-purple-900/50">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2 font-gaming">
              <HelpCircle className="w-5 h-5 text-orange-400" />
              <span>شرح طريقة التثبيت خطوة بخطوة (بدون أي أخطاء)</span>
            </h3>
            <button
              onClick={copyObbPath}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-purple-950/60 border border-purple-800/60 rounded-xl text-purple-200 hover:text-white cursor-pointer"
            >
              {copiedObbPath ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>نسخ مسار ملف الـ OBB</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-right">
            
            <div className="p-4 rounded-2xl bg-[#0f0720] border border-purple-900/40 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-orange-500 text-black font-black flex items-center justify-center text-sm font-mono">
                1
              </div>
              <h4 className="text-sm font-bold text-white">تحميل ملف الـ APK</h4>
              <p className="text-xs text-purple-300/70 leading-relaxed">
                اضغط على زر تحميل الـ APK وثبته على هاتفك، ولكن لا تفتح اللعبة قبل وضع ملف الـ OBB.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f0720] border border-purple-900/40 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500 text-black font-black flex items-center justify-center text-sm font-mono">
                2
              </div>
              <h4 className="text-sm font-bold text-white">تحميل ملف الـ OBB</h4>
              <p className="text-xs text-purple-300/70 leading-relaxed">
                حمّل ملف الـ OBB الكامل، إذا كان مضغوطاً فك الضغط عنه باستخدام تطبيق ZArchiver.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f0720] border border-purple-900/40 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500 text-white font-black flex items-center justify-center text-sm font-mono">
                3
              </div>
              <h4 className="text-sm font-bold text-white">نقل الملف إلى مسار اللعبة</h4>
              <p className="text-xs text-purple-300/70 leading-relaxed">
                انسخ ملف الـ OBB وانقله إلى: <br />
                <code className="text-orange-400 font-mono text-[11px] bg-black/60 px-1 py-0.5 rounded">
                  Android/obb/com.dts.freefireth/
                </code>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f0720] border border-purple-900/40 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 text-black font-black flex items-center justify-center text-sm font-mono">
                4
              </div>
              <h4 className="text-sm font-bold text-white">تشغيل اللعبة والبوياه!</h4>
              <p className="text-xs text-purple-300/70 leading-relaxed">
                افتح اللعبة واستمتع بسيرفر 2023 الحنين مع رومات كلاش سكواد وبيرمودا بدون لاق!
              </p>
            </div>

          </div>

          <div className="p-3.5 rounded-2xl bg-orange-950/30 border border-orange-500/30 flex items-center gap-3 text-xs text-orange-300">
            <AlertCircle className="w-4 h-4 text-orange-400 shrink-0" />
            <span>
              إذا واجهت شاشة سوداء أو مشكلة في قراءة ملف الـ OBB في نظام أندرويد 12 أو 13 أو 14، تأكد من منح تطبيق ZArchiver إذن الوصول لكامل الملفات.
            </span>
          </div>
        </div>

      </div>

      {/* Discord Verification Gate Modal */}
      <DiscordGateModal
        isOpen={discordModalOpen}
        onClose={() => setDiscordModalOpen(false)}
        pendingDownloadUrl={pendingDownload.url}
        pendingDownloadTitle={pendingDownload.title}
      />
    </section>
  );
};
