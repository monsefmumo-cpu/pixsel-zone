import React, { useState } from 'react';
import { useServer } from '../context/ServerContext';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Download, 
  ShieldAlert, 
  Copy, 
  Check, 
  Flame,
  ArrowLeft,
  Users
} from 'lucide-react';
import { sound } from '../utils/sound';

interface DiscordGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingDownloadUrl: string;
  pendingDownloadTitle: string;
}

export const DiscordGateModal: React.FC<DiscordGateModalProps> = ({
  isOpen,
  onClose,
  pendingDownloadUrl,
  pendingDownloadTitle,
}) => {
  const { downloadInfo, verifyDiscordJoin, showToast } = useServer();
  const [hasOpenedDiscord, setHasOpenedDiscord] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const discordUrl = downloadInfo.discordInviteUrl || 'https://discord.gg/m6etCxgUX';

  const handleOpenDiscord = () => {
    sound.playClick();
    window.open(discordUrl, '_blank', 'noopener,noreferrer');
    setHasOpenedDiscord(true);
    showToast('تم فتح رابط سيرفر الديسكورد! انضم للسيرفر ثم اضغط تأكيد التحميل.', 'info');
  };

  const handleConfirmAndDownload = () => {
    verifyDiscordJoin();
    onClose();
    sound.playSuccess();
    
    // Trigger download
    if (pendingDownloadUrl) {
      window.open(pendingDownloadUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyLink = () => {
    sound.playClick();
    navigator.clipboard.writeText(discordUrl);
    setCopiedLink(true);
    showToast('تم نسخ رابط الديسكورد!', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0e1324] border-2 border-[#5865F2]/60 shadow-2xl shadow-[#5865F2]/20 overflow-hidden text-right p-6 sm:p-7 space-y-6">
        
        {/* Glow ambient background */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#5865F2]/25 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => { sound.playClick(); onClose(); }}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#5865F2] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#5865F2]/40">
            <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#5865F2]/20 text-[#858eff] border border-[#5865F2]/40 font-mono">
                DISCORD GATEWAY
              </span>
              <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                <Flame className="w-3 h-3 fill-amber-400" /> شرط إلزامي
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white font-gaming tracking-wide mt-1">
              الانضمام لسيرفر الديسكورد قبل التحميل
            </h3>
          </div>
        </div>

        {/* Target file banner */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">الملف المطلوب تحميله:</span>
            <span className="text-white font-bold text-sm">{pendingDownloadTitle || 'نسخة فري فاير 2023'}</span>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold text-xs border border-amber-500/30">
            {downloadInfo.version}
          </span>
        </div>

        {/* Instruction details */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          للحصول على ملفات اللعبة، والتحديثات القادمة، وكلمات سر الرومات اليومية للعب معنا، <strong className="text-white">يجب أن تكون مسجلاً ومنضماً لسيرفر ديسكورد الرسمي</strong> الخاص بنا.
        </p>

        {/* Discord Server Link Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#171c35] to-[#12162a] border border-[#5865F2]/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-white">سيرفر ديسكورد فري فاير 2023</span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              discord.gg/m6etCxgUX
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 p-2.5 bg-black/40 rounded-xl border border-slate-800 text-xs">
            <span className="font-mono text-slate-300 truncate" dir="ltr">
              {discordUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors shrink-0"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedLink ? 'تم النسخ' : 'نسخ'}</span>
            </button>
          </div>
        </div>

        {/* Action Steps */}
        <div className="space-y-3 pt-1">
          
          {/* Step 1: Join Discord Button */}
          <button
            onClick={handleOpenDiscord}
            className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98 ${
              hasOpenedDiscord
                ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-300'
                : 'bg-[#5865F2] hover:bg-[#4752c4] text-white shadow-[#5865F2]/25'
            }`}
          >
            {hasOpenedDiscord ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>الخطوة 1: تم فتح سيرفر الديسكورد والانضمام ✓</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-5 h-5 text-white" />
                <span>الخطوة 1: اضغط هنا للانضمام إلى سيرفر الديسكورد</span>
              </>
            )}
          </button>

          {/* Step 2: Confirm and Proceed to Download */}
          <button
            onClick={handleConfirmAndDownload}
            className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98 ${
              hasOpenedDiscord
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black shadow-amber-500/25 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <Download className="w-5 h-5" />
            <span>
              {hasOpenedDiscord 
                ? 'الخطوة 2: تأكيد الانضمام وبدء التحميل الآن 🚀' 
                : 'أنا عضو بالفعل في السيرفر (بدء التحميل)'}
            </span>
          </button>
        </div>

        <div className="text-[11px] text-slate-500 text-center pt-2 border-t border-slate-800">
          بمجرد التأكيد لمرة واحدة، سيتم فتح كافة روابط التحميل في الموقع مباشرة.
        </div>

      </div>
    </div>
  );
};
