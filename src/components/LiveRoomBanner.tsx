import React, { useState } from 'react';
import { useServer } from '../context/ServerContext';
import { 
  Radio, 
  Copy, 
  Check, 
  Flame, 
  Key, 
  User, 
  Gamepad, 
  Bell, 
  AlertTriangle,
  Clock,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/sound';

export const LiveRoomBanner: React.FC = () => {
  const { liveRoom, serverInfo, showToast } = useServer();
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  const copyId = () => {
    sound.playClick();
    navigator.clipboard.writeText(liveRoom.roomId);
    setCopiedId(true);
    showToast('تم نسخ رقم الروم إلى الحافظة!', 'success');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const copyPass = () => {
    sound.playClick();
    navigator.clipboard.writeText(liveRoom.roomPassword);
    setCopiedPass(true);
    showToast('تم نسخ كلمة سر الروم!', 'success');
    setTimeout(() => setCopiedPass(false), 2000);
  };

  return (
    <section id="liveroom" className="py-12 bg-[#0b0f1b] border-b border-amber-500/20 relative overflow-hidden">
      
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {liveRoom.isActive ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#161324] via-[#0f1422] to-[#1a1210] border-2 border-amber-500/60 shadow-2xl relative overflow-hidden">
            
            {/* Blazing corner badge */}
            <div className="absolute top-0 left-0 bg-gradient-to-r from-red-600 to-orange-500 text-white font-black text-[11px] px-4 py-1.5 rounded-br-2xl flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>روم مباشر الآن • LIVE CUSTOM ROOM</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-4 lg:pt-0">
              
              {/* Left Column: Room Info */}
              <div className="lg:col-span-7 space-y-4 text-right">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" />
                  <span>انضم الآن للعب مع مطور النسخة واللاعبين</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-white font-gaming">
                  {liveRoom.mode}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {liveRoom.notes}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>المضيف: <strong className="text-white">{liveRoom.hostName}</strong></span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">{liveRoom.startedAt}</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Credentials Box */}
              <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-2xl border border-amber-500/40 space-y-3">
                <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
                  <span>بيانات الدخول للروم في اللعبة:</span>
                  <span className="text-[10px] text-amber-400 font-mono">ROOM ACCESS</span>
                </div>

                {/* Room ID box */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 block">رقم الروم (ROOM ID)</span>
                    <span className="text-lg font-black font-mono text-amber-400 tracking-wider">
                      {liveRoom.roomId}
                    </span>
                  </div>
                  <button
                    onClick={copyId}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-all cursor-pointer shadow-sm"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? 'تم النسخ!' : 'نسخ الآيدي'}</span>
                  </button>
                </div>

                {/* Room Password box */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 block">كلمة السر (PASSWORD)</span>
                    <span className="text-lg font-black font-mono text-amber-400 tracking-wider">
                      {liveRoom.roomPassword}
                    </span>
                  </div>
                  <button
                    onClick={copyPass}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-all cursor-pointer border border-slate-700"
                  >
                    {copiedPass ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copiedPass ? 'تم النسخ!' : 'نسخ الرمز'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 text-center pt-1">
                  💡 افتح فري فاير 2023 ➔ Custom ➔ ابحث بالآيدي واكتب الرمز للدخول فوراً
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-[#0e1322] border border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
              <Radio className="w-6 h-6 text-slate-500" />
            </div>
            <h3 className="text-lg font-bold text-white">لا يوجد روم مباشر نشط في هذه اللحظة</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              يقوم المطور بفتح رومات كلاش سكواد وبيرمودا يومياً. تابع التحديثات أو انضم للديسكورد لتصلك كلمة السر فور بدء الروم القادم!
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
