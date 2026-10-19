import React, { useState } from 'react';
import { X, Clock, Calendar, Check, Bell, Flame } from 'lucide-react';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({ isOpen, onClose }) => {
  const [selectedTz, setSelectedTz] = useState<string>('GMT+1');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const timezoneOffsets: Record<string, { label: string; timeString: string }> = {
    'GMT+1': { label: 'GMT+1 (Official Time / London Summer / Algiers / Lagos)', timeString: '21:30' },
    'UTC/GMT': { label: 'GMT+0 (UTC / London Winter)', timeString: '20:30' },
    'CET': { label: 'GMT+2 (CET / Paris / Berlin / Cairo)', timeString: '22:30' },
    'AST': { label: 'GMT+3 (Riyadh / Doha / Kuwait / Baghdad)', timeString: '23:30' },
    'GST': { label: 'GMT+4 (Dubai / Abu Dhabi)', timeString: '00:30 (Next Day)' },
    'EST': { label: 'GMT-4 (New York / Toronto / Miami)', timeString: '16:30' },
    'PST': { label: 'GMT-7 (Los Angeles / Vancouver)', timeString: '13:30' },
    'IST': { label: 'GMT+5:30 (New Delhi / Mumbai)', timeString: '02:00 (Next Day)' },
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0a0608] border border-[#ff3b00]/50 rounded-2xl shadow-[0_0_60px_rgba(255,59,0,0.4)] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#ff3b00]/25 flex items-center justify-between bg-black">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#ff3b00]" />
            <h3 className="text-lg font-stamp font-black text-white uppercase tracking-wider">
              DON'T BE LATE – 21:30 GMT+1
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {isSaved ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#ff3b00]/20 border-2 border-[#ff3b00] mx-auto flex items-center justify-center text-[#ffaa00]">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-stamp font-black text-white uppercase tracking-wider">
                ALARM LOCKED IN
              </h4>
              <p className="text-xs text-[#a3a3b2]">
                You will be notified 15 minutes before match kick-off at 21:30 GMT+1.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <p className="text-xs text-[#a3a3b2] font-sans">
                Free Fire 2026 4v4 Match Grand Finals starts promptly at 21:30 GMT+1. Select your timezone to confirm your local start time:
              </p>

              <div>
                <label className="block text-xs font-tech text-[#ffaa00] uppercase font-bold mb-1">
                  Select Your Local Timezone:
                </label>
                <select
                  value={selectedTz}
                  onChange={(e) => setSelectedTz(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-[#ff3b00]/40 text-sm font-tech text-white focus:outline-none focus:border-[#ff3b00]"
                >
                  {Object.entries(timezoneOffsets).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Local Time Banner */}
              <div className="p-4 rounded-xl bg-[#150805] border border-[#ff3b00]/30 text-center">
                <span className="text-[11px] font-tech text-white/60 block uppercase">
                  MATCH STARTS LOCALLY AT:
                </span>
                <span className="text-3xl font-tech font-black text-[#ffaa00] tracking-wider block mt-0.5">
                  {timezoneOffsets[selectedTz]?.timeString || '21:30'}
                </span>
                <span className="text-[10px] font-tech text-[#ff3b00]">
                  OFFICIAL KICK-OFF: 21:30 GMT+1
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#ff3b00] to-[#ff7700] hover:from-[#ff5500] hover:to-[#ff9900] text-black font-tech font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,59,0,0.5)] flex items-center justify-center gap-2 active:scale-95"
                >
                  <Bell className="w-4 h-4" />
                  <span>Confirm Match Alarm</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
