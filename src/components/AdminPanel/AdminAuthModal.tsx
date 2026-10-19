import React, { useState, useEffect } from 'react';
import { useServer } from '../../context/ServerContext';
import { 
  ShieldAlert, 
  Lock, 
  KeyRound, 
  User, 
  X, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Clock, 
  CheckCircle2, 
  Terminal, 
  Flame,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { sound } from '../../utils/sound';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginWithCredentials, isAdmin } = useServer();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  // Countdown timer for brute force lock
  useEffect(() => {
    if (!isLocked || remainingSeconds <= 0) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsLocked(false);
          setErrorMessage(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isLocked, remainingSeconds]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setIsLoading(true);
    setErrorMessage(null);

    const res = await loginWithCredentials(username, password);
    setIsLoading(false);

    if (res.success) {
      sound.playSuccess();
      onSuccess();
      onClose();
      setPassword('');
      setErrorMessage(null);
    } else {
      sound.playError();
      setErrorMessage(res.message);
      if (res.isLocked) {
        setIsLocked(true);
        setRemainingSeconds(res.remainingSeconds || 900);
      }
      if (res.attemptsLeft !== undefined) {
        setAttemptsLeft(res.attemptsLeft);
      }
    }
  };

  const handleFillMasterCredentials = () => {
    setUsername('admin');
    setPassword('Admin@FF2026!#');
    sound.playClick();
  };

  const formatLockTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in" dir="rtl">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#160d2b] to-[#0c0718] border-2 border-orange-500/40 p-5 sm:p-7 shadow-2xl shadow-purple-950/70 space-y-4 sm:space-y-5 text-right text-slate-100 overflow-hidden">
        
        {/* Glow ambient background effects */}
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => { sound.playClick(); onClose(); }}
          className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-xl bg-purple-950/40 border border-purple-800/40 hover:bg-purple-900/60 transition-colors cursor-pointer"
          title="إغلاق"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hacker Avatar Hero Section (Requested Image) */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="relative group">
            {/* Ambient neon pulsing ring */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-400 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
            
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-400/70 shadow-xl bg-black">
              <img 
                src="/src/assets/images/hacker_avatar_portal_1791477669523.jpg" 
                alt="Ghost Hacker Avatar" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Live Status Badge */}
            <div className="absolute -bottom-2 right-1/2 translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0a0514] border border-cyan-400/80 text-[10px] font-mono font-bold text-cyan-300 flex items-center gap-1 shadow-lg whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>ACCESS GATE</span>
            </div>
          </div>

          <div className="mt-3.5 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white font-gaming tracking-wide">
                بوابة تحكم وإدارة فري فاير
              </h3>
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            </div>
            <p className="text-xs text-purple-200/70 max-w-xs mx-auto">
              دخول مؤمّن ومشفّر (bcrypt + JWT) لمشرفي ومالك السيرفر
            </p>
          </div>
        </div>

        {/* Secret Master Password Info Box (Specially provided for the user) */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-950/40 via-purple-950/40 to-black/60 border border-orange-500/30 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-orange-400 font-bold">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>بيانات حساب المالك (خاص بك أنت فقط):</span>
            </span>
            <button
              type="button"
              onClick={handleFillMasterCredentials}
              className="text-[11px] underline text-cyan-400 hover:text-cyan-300 cursor-pointer font-medium"
            >
              ملء تلقائي
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 pt-0.5">
            <div className="bg-black/50 p-1.5 rounded-lg border border-purple-900/60">
              <span className="text-slate-400">المستخدم:</span> <span className="text-white font-bold">admin</span>
            </div>
            <div className="bg-black/50 p-1.5 rounded-lg border border-purple-900/60">
              <span className="text-slate-400">السر:</span> <span className="text-orange-300 font-bold">Admin@FF2026!#</span>
            </div>
          </div>
        </div>

        {/* Brute Force Lock Warning */}
        {isLocked && (
          <div className="p-3.5 rounded-2xl bg-rose-950/60 border-2 border-rose-600/80 text-rose-200 text-xs space-y-1.5 animate-pulse">
            <div className="flex items-center gap-2 font-bold text-rose-300">
              <Clock className="w-4 h-4 text-rose-400 animate-spin" />
              <span>الحساب مقفل مؤقتاً لحماية النظام من التخمين!</span>
            </div>
            <p className="text-[11px] text-rose-200/90">
              تم رصد 5 محاولات خاطئة متتالية. يرجى الانتظار: <span className="font-mono font-black text-white text-sm bg-rose-900 px-1.5 py-0.5 rounded">{formatLockTime(remainingSeconds)}</span>
            </p>
          </div>
        )}

        {/* Error Alert (non-lock) */}
        {!isLocked && errorMessage && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <div>
              <p>{errorMessage}</p>
              {attemptsLeft !== null && attemptsLeft > 0 && (
                <p className="text-[11px] text-rose-400 mt-0.5">
                  تنبيه: متبقي لديك <span className="font-bold text-white">{attemptsLeft}</span> محاولات قبل الحظر المؤقت لمدة 15 دقيقة.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Username */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              اسم المستخدم (Username)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-purple-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                disabled={isLocked}
                value={username}
                onChange={(e) => { setUsername(e.target.value); setErrorMessage(null); }}
                placeholder="أدخل اسم المستخدم (مثال: admin)"
                className="w-full pr-10 pl-3 py-2.5 text-xs sm:text-sm rounded-xl bg-[#0a0614] border border-purple-800/50 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white placeholder-slate-500 font-sans transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              كلمة المرور (Master Password)
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-orange-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                disabled={isLocked}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrorMessage(null); }}
                placeholder="أدخل كلمة المرور المشفرة..."
                className="w-full pr-10 pl-10 py-2.5 text-xs sm:text-sm rounded-xl bg-[#0a0614] border border-purple-800/50 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white placeholder-slate-500 font-mono tracking-wider transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLocked || isLoading}
              className="w-full py-3 text-xs sm:text-sm font-black text-black bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 rounded-xl transition-all shadow-lg shadow-orange-500/25 cursor-pointer flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>جاري التحقق من التشفير...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4" />
                  <span>دخول لوحة التحكم والتحكم بالنسخة</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security Footer Details */}
        <div className="pt-2 border-t border-purple-900/40 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>نظام الحماية: Rate-Limit (5 محاولات)</span>
          </span>
          <a
            href="https://discord.gg/m6etCxgUX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>سيرفر ديسكورد</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
};
