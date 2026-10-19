import React, { useState } from 'react';
import { useServer } from '../context/ServerContext';
import { 
  Gift, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Flame, 
  Copy, 
  Check, 
  ArrowLeft,
  Coins
} from 'lucide-react';
import { sound } from '../utils/sound';

export const RedeemCodeSection: React.FC = () => {
  const { redeemCodes, claimCode, showToast } = useServer();
  const [inputCode, setInputCode] = useState('');
  const [claimResult, setClaimResult] = useState<{
    success: boolean;
    message: string;
    reward?: string;
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const res = claimCode(inputCode.trim());
    setClaimResult(res);

    if (res.success) {
      showToast(res.message, 'success');
      setInputCode('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const copyCode = (code: string) => {
    sound.playClick();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setInputCode(code);
    showToast(`تم نسخ الكود "${code}" ووضعه في خانة الاستبدال!`, 'info');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="redeem" className="py-16 sm:py-20 bg-[#090d18] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Gift className="w-3.5 h-3.5" />
            <span>صندوق استبدال المكافآت والأكواد 2023</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-gaming tracking-wide">
            استبدال أكواد الجواهر والسكنات النادرة
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            احصل على جواهر مجانية، سكن كوبرا MP40، وبدل الهيب هوب الكلاسيكية الصالحة في سيرفر فري فاير 2023.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Box */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#111728] to-[#0c101d] border-2 border-amber-500/40 shadow-xl space-y-5 text-right">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">إدخال كود الهدية (Redeem Code)</h3>
                <p className="text-xs text-slate-400">أدخل الكود بالإنجليزية واضغط استبدال</p>
              </div>
            </div>

            <form onSubmit={handleRedeem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  رمز الكود (مثال: BOOYAH2023)
                </label>
                <div className="relative">
                  <Flame className="w-4 h-4 text-amber-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => { setInputCode(e.target.value); setClaimResult(null); }}
                    placeholder="BOOYAH2023"
                    className="w-full pr-10 pl-4 py-3 text-sm bg-slate-950 border border-slate-700 rounded-xl text-amber-400 font-mono font-bold tracking-widest uppercase focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>استبدال الكود والحصول على المكافأة</span>
              </button>
            </form>

            {/* Claim result alert */}
            {claimResult && (
              <div className={`p-4 rounded-xl border space-y-2 animate-in fade-in ${
                claimResult.success 
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs">
                  {claimResult.success ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span>{claimResult.message}</span>
                </div>
                {claimResult.reward && (
                  <div className="p-2.5 rounded-lg bg-black/40 border border-emerald-500/30 text-amber-300 font-bold text-xs">
                    🎁 تم فتح: {claimResult.reward}
                  </div>
                )}
              </div>
            )}

            <div className="text-[11px] text-slate-500 leading-relaxed pt-2 border-t border-slate-800">
              * الأكواد مجانية 100% ويتم تجديدها أسبوعياً بواسطة إدارة ومطور فري فاير 2023.
            </div>
          </div>

          {/* Active Codes List */}
          <div className="lg:col-span-7 space-y-4 text-right">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-400" />
                <span>أكواد 2023 المتاحة حالياً للمطالبة</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {redeemCodes.filter((c) => c.isActive).length} أكواد نشطة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {redeemCodes.map((codeItem) => (
                <div
                  key={codeItem.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    codeItem.isActive 
                      ? 'bg-slate-900/80 border-slate-700/80 hover:border-amber-500/40' 
                      : 'bg-slate-950/40 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-sm font-black font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30 tracking-wider">
                      {codeItem.code}
                    </span>
                    <button
                      onClick={() => copyCode(codeItem.code)}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700"
                    >
                      {copiedCode === codeItem.code ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode === codeItem.code ? 'تم النسخ' : 'نسخ واستعمال'}</span>
                    </button>
                  </div>

                  <p className="text-xs font-bold text-slate-200 mt-2.5">
                    {codeItem.reward}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                    <span>متبقي: <strong className="text-amber-400 font-mono">{codeItem.usesLeft}</strong> استخدام</span>
                    <span>{codeItem.expiresAt}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                هل لديك كود خاص من بطولات ديسكورد؟ الصقه في خانة الاستبدال لترقية حسابك مباشرة في السيرفر!
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
