import React, { useState } from 'react';
import { useServer } from '../context/ServerContext';
import { ServerRole } from '../types';
import { Check, ShieldAlert, Award, Star, Settings, Flame, Users } from 'lucide-react';
import { sound } from '../utils/sound';

export const RolesSection: React.FC = () => {
  const { roles } = useServer();
  const [selectedRole, setSelectedRole] = useState<ServerRole | null>(null);

  return (
    <section id="roles" className="py-16 sm:py-24 border-b border-slate-800 bg-[#0b0e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800">
          <div className="space-y-3 text-right max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>هرمية الرتب وشارات الشرف</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-gaming tracking-wide">
              رتب سيرفر ومجتمع فري فاير 2023
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              تعرّف على مستويات السيرفر من مطور النسخة إلى أساطير الغراند ماستر ومنظمي الرومات، واكتشف كيفية ترقية رتبتك.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            {roles.length} رتب معتمدة
          </div>
        </div>

        {/* Roles Grid */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#111628] to-[#0c101d] border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group shadow-lg text-right space-y-4"
              style={{
                borderColor: role.isSpecial ? `${role.color}60` : undefined
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{role.badge}</span>
                  <span 
                    className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: role.bgColor,
                      borderColor: role.borderColor,
                      color: role.color
                    }}
                  >
                    {role.nameEn}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {role.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] font-bold text-slate-300 block mb-1">الصلاحيات والمميزات:</span>
                  {role.permissions.map((perm, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{perm}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>الأعضاء: <strong className="text-white font-mono">{role.memberCount}</strong></span>
                </div>
                <span className="text-[11px] text-amber-400/80">{role.howToGet}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
