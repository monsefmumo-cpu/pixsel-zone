import React, { useState, useEffect } from 'react';
import { useServer } from '../../context/ServerContext';
import { PlayerAccount, PlayerSkinItem, AdminRoleType, NewsItemType } from '../../types';
import { 
  Users, 
  ShieldAlert, 
  ShieldCheck, 
  Flame, 
  Search, 
  Plus, 
  Ban, 
  CheckCircle, 
  Gift, 
  Sparkles, 
  Sliders, 
  Radio, 
  Lock, 
  ArrowLeft, 
  Copy, 
  Check, 
  Trash2, 
  Edit3, 
  Coins, 
  Smartphone, 
  Activity, 
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  Trophy,
  Ticket,
  Download,
  DownloadCloud,
  Database,
  BarChart3,
  Server,
  Newspaper,
  UserCheck,
  FileText,
  Clock,
  Terminal,
  Code,
  Send,
  Zap,
  Power,
  Globe,
  Share2,
  AlertCircle
} from 'lucide-react';
import { sound } from '../../utils/sound';

export const AdminConsolePortal: React.FC = () => {
  const { 
    isAdmin,
    adminUser,
    adminRole,
    loginWithCredentials,
    lockAdmin,
    players, 
    addPlayer, 
    updatePlayer, 
    deletePlayer, 
    banPlayer, 
    unbanPlayer, 
    grantSkinToPlayer, 
    revokeSkinFromPlayer, 
    addDiamondsToPlayer,
    giftDiamondsAndGold,
    availableSkins,
    banLogs,
    serverConfig,
    updateServerConfig,
    setViewMode,
    activeStaffName,
    downloadInfo,
    publishNewVersion,
    toggleMaintenanceMode,
    liveRoom,
    updateLiveRoom,
    redeemCodes,
    addRedeemCode,
    toggleRedeemCode,
    deleteRedeemCode,
    newsList,
    addNewsItem,
    editNewsItem,
    deleteNewsItem,
    staffMembers,
    addStaffMember,
    changeStaffRole,
    deleteStaffMember,
    auditLogsList,
    fetchAuditLogs,
    siteStats,
    exportDataJson,
    importDataJson,
    resetToDefaults,
    showToast 
  } = useServer();

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'versions' | 'news' | 'players' | 'staff' | 'audit' | 'api' | 'discord' | 'rooms' | 'codes' | 'engine' | 'backup'
  >('overview');

  // Login Gate state (when !isAdmin)
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [lockCountdown, setLockCountdown] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);

  // Maintenance Toggle Form
  const [maintenanceForm, setMaintenanceForm] = useState({
    isMaintenance: downloadInfo.isMaintenance,
    message: downloadInfo.maintenanceMessage || 'السيرفر يخضع حالياً لترقية روتينية. سنعود قريباً!'
  });

  // Version Publishing Form
  const [versionForm, setVersionForm] = useState({
    version: downloadInfo.version || 'v1.98.2 - التحديث الأسطوري',
    apkUrl: downloadInfo.apkUrl || 'https://mediafire.com/download/freefire_2023_v1.98.2.apk',
    obbUrl: downloadInfo.obbUrl || 'https://mediafire.com/download/main.com.dts.freefireth.obb',
    pcEmulatorUrl: downloadInfo.pcEmulatorUrl || 'https://bluestacks.com/download',
    apkSize: downloadInfo.apkSize || '89.4 MB',
    obbSize: downloadInfo.obbSize || '412.8 MB',
    releaseNotes: downloadInfo.releaseNotes || '• إرجاع خريطة بيرمودا 2023 الأصلية\n• ضبط وتوازن ضرر دبل شوتجن M1887\n• نظام حماية متطور ضد ملفات الهيدشوت الزائفة',
    forceUpdate: downloadInfo.forceUpdate || false,
    checksumMd5: downloadInfo.checksumMd5 || 'd41d8cd98f00b204e9800998ecf8427e',
    checksumSha256: downloadInfo.checksumSha256 || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  });

  // News Create / Edit Form
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    category: 'update' as 'update' | 'event' | 'maintenance' | 'community',
    tag: 'تحديث جديد',
    reward: '',
    isPinned: false
  });

  // Staff Create Form
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staffForm, setStaffForm] = useState({
    username: '',
    password: '',
    displayName: '',
    email: '',
    role: 'moderator' as AdminRoleType
  });

  // Player Gift Modal
  const [giftPlayerTarget, setGiftPlayerTarget] = useState<PlayerAccount | null>(null);
  const [giftDiamondsInput, setGiftDiamondsInput] = useState(5000);
  const [giftGoldInput, setGiftGoldInput] = useState(20000);
  const [giftSkinSelected, setGiftSkinSelected] = useState<string>('');
  const [giftNoteInput, setGiftNoteInput] = useState('مكافأة بطولة كلاش سكواد');

  // Player Ban Modal
  const [banPlayerTarget, setBanPlayerTarget] = useState<PlayerAccount | null>(null);
  const [banReasonInput, setBanReasonInput] = useState('استخدام ملفات Aimlock / Regedit غير مصرح بها');
  const [banTypeInput, setBanTypeInput] = useState<'permanent' | 'temporary'>('permanent');

  // Add Player Modal
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [newPlayerForm, setNewPlayerForm] = useState({
    playerId: '',
    nickname: '',
    level: 60,
    rank: 'Diamond IV',
    diamonds: 2000,
    gold: 30000,
    deviceModel: 'Android Device (2023)',
    ipAddress: '105.101.55.20',
    isBanned: false,
    ownedSkins: ['skin_mp40_cobra'],
    suspicionScore: 0,
    lastLogin: 'مسجل الآن'
  });

  // Live Room Management Form
  const [roomForm, setRoomForm] = useState({
    roomId: liveRoom.roomId || '8472910',
    roomPassword: liveRoom.roomPassword || '2023',
    mode: liveRoom.mode || 'كلاش سكواد 4v4 (بيرمودا كلاسيك)',
    notes: liveRoom.notes || 'ممنوع الجل المحشور - اللعب النظيف فقط!',
    isActive: liveRoom.isActive
  });

  // Redeem Code Form
  const [codeForm, setCodeForm] = useState({
    code: '',
    reward: '2,500 جوهرة + سكن الساكورا النادر',
    usesLeft: 300,
    isActive: true,
    expiresAt: '2026-12-31'
  });

  // API Tester State
  const [apiEndpoint, setApiEndpoint] = useState<string>('/api/v1/version');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);

  // Search & Filter for players
  const [playerSearchQuery, setPlayerSearchQuery] = useState('');
  const [playerFilterStatus, setPlayerFilterStatus] = useState<'all' | 'active' | 'banned' | 'suspicious'>('all');

  // Backup modal
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [backupJsonText, setBackupJsonText] = useState('');

  // Lock countdown timer
  useEffect(() => {
    if (!isLocked || lockCountdown <= 0) return;
    const timer = setInterval(() => {
      setLockCountdown((prev) => {
        if (prev <= 1) {
          setIsLocked(false);
          setLoginError(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isLocked, lockCountdown]);

  // Sync maintenance form when context changes
  useEffect(() => {
    setMaintenanceForm({
      isMaintenance: downloadInfo.isMaintenance,
      message: downloadInfo.maintenanceMessage || 'السيرفر يخضع حالياً لترقية روتينية. سنعود قريباً!'
    });
  }, [downloadInfo.isMaintenance, downloadInfo.maintenanceMessage]);

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setLoginLoading(true);
    setLoginError(null);

    const res = await loginWithCredentials(loginUsername, loginPassword);
    setLoginLoading(false);

    if (res.success) {
      sound.playSuccess();
      setLoginError(null);
    } else {
      sound.playError();
      setLoginError(res.message);
      if (res.isLocked) {
        setIsLocked(true);
        setLockCountdown(res.remainingSeconds || 900);
      }
      if (res.attemptsLeft !== undefined) {
        setAttemptsLeft(res.attemptsLeft);
      }
    }
  };

  const handleFillMasterCredentials = () => {
    setLoginUsername('admin');
    setLoginPassword('Admin@FF2026!#');
    sound.playClick();
  };

  // Maintenance Toggle Action
  const handleToggleMaintenance = () => {
    sound.playClick();
    const nextState = !maintenanceForm.isMaintenance;
    setMaintenanceForm((prev) => ({ ...prev, isMaintenance: nextState }));
    toggleMaintenanceMode(nextState, maintenanceForm.message);
  };

  const handleSaveMaintenanceMessage = () => {
    sound.playClick();
    toggleMaintenanceMode(maintenanceForm.isMaintenance, maintenanceForm.message);
  };

  // Publish Version Action
  const handlePublishVersion = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    publishNewVersion({
      version: versionForm.version,
      apkUrl: versionForm.apkUrl,
      obbUrl: versionForm.obbUrl,
      pcEmulatorUrl: versionForm.pcEmulatorUrl,
      apkSize: versionForm.apkSize,
      obbSize: versionForm.obbSize,
      releaseNotes: versionForm.releaseNotes,
      forceUpdate: versionForm.forceUpdate,
      checksumMd5: versionForm.checksumMd5,
      checksumSha256: versionForm.checksumSha256
    });
  };

  // News Actions
  const handleOpenCreateNews = () => {
    setEditingNewsId(null);
    setNewsForm({
      title: '',
      content: '',
      category: 'update',
      tag: 'تحديث جديد',
      reward: '',
      isPinned: false
    });
    setShowNewsModal(true);
  };

  const handleOpenEditNews = (item: NewsItemType) => {
    setEditingNewsId(item.id);
    setNewsForm({
      title: item.title,
      content: item.content,
      category: item.category,
      tag: item.tag,
      reward: item.reward || '',
      isPinned: item.isPinned
    });
    setShowNewsModal(true);
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title.trim() || !newsForm.content.trim()) {
      showToast('يرجى كتابة عنوان ومحتوى الخبر', 'error');
      return;
    }

    if (editingNewsId) {
      await editNewsItem(editingNewsId, newsForm);
    } else {
      await addNewsItem({
        ...newsForm,
        date: new Date().toISOString().split('T')[0],
        author: activeStaffName
      });
    }
    setShowNewsModal(false);
  };

  const handleDeleteNews = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الخبر نهائياً؟')) {
      await deleteNewsItem(id);
    }
  };

  // Staff Actions
  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffForm.username.trim() || !staffForm.password.trim() || !staffForm.displayName.trim()) {
      showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
      return;
    }

    const res = await addStaffMember(staffForm);
    if (res.success) {
      setShowStaffModal(false);
      setStaffForm({
        username: '',
        password: '',
        displayName: '',
        email: '',
        role: 'moderator'
      });
    }
  };

  // Execute Ban
  const handleExecuteBan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!banPlayerTarget) return;
    banPlayer(banPlayerTarget.playerId, banReasonInput, banTypeInput, activeStaffName);
    setBanPlayerTarget(null);
  };

  // Execute Gift
  const handleExecuteGift = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftPlayerTarget) return;
    await giftDiamondsAndGold(
      giftPlayerTarget.playerId,
      Number(giftDiamondsInput),
      Number(giftGoldInput),
      giftSkinSelected || undefined,
      giftNoteInput
    );
    setGiftPlayerTarget(null);
  };

  // Create Player
  const handleCreateNewPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerForm.playerId.trim() || !newPlayerForm.nickname.trim()) return;

    if (players.some((p) => p.playerId === newPlayerForm.playerId.trim())) {
      showToast('رقم الآيدي هذا مسجل مسبقاً في السيرفر!', 'error');
      return;
    }

    addPlayer(newPlayerForm);
    setShowAddPlayerModal(false);
    setNewPlayerForm({
      playerId: '',
      nickname: '',
      level: 60,
      rank: 'Diamond IV',
      diamonds: 2000,
      gold: 30000,
      deviceModel: 'Android Device (2023)',
      ipAddress: '105.101.55.20',
      isBanned: false,
      ownedSkins: ['skin_mp40_cobra'],
      suspicionScore: 0,
      lastLogin: 'مسجل الآن'
    });
  };

  // Room update
  const handleUpdateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    updateLiveRoom(roomForm);
  };

  // Redeem Code create
  const handleCreateCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeForm.code.trim()) return;
    addRedeemCode({
      code: codeForm.code.trim().toUpperCase(),
      reward: codeForm.reward,
      usesLeft: Number(codeForm.usesLeft),
      isActive: codeForm.isActive,
      expiresAt: codeForm.expiresAt
    });
    setCodeForm({
      code: '',
      reward: '2,500 جوهرة + سكن الساكورا النادر',
      usesLeft: 300,
      isActive: true,
      expiresAt: '2026-12-31'
    });
  };

  // Test API endpoint
  const handleTestApi = async (url: string) => {
    setApiLoading(true);
    setApiEndpoint(url);
    try {
      const res = await fetch(url);
      const json = await res.json();
      setApiResponse(json);
    } catch (err: any) {
      setApiResponse({ error: err.message });
    } finally {
      setApiLoading(false);
    }
  };

  // Filtered Players
  const filteredPlayers = players.filter((p) => {
    if (playerFilterStatus === 'active' && p.isBanned) return false;
    if (playerFilterStatus === 'banned' && !p.isBanned) return false;
    if (playerFilterStatus === 'suspicious' && p.suspicionScore < 40) return false;

    if (playerSearchQuery.trim()) {
      const q = playerSearchQuery.toLowerCase();
      return (
        p.playerId.toLowerCase().includes(q) ||
        p.nickname.toLowerCase().includes(q) ||
        p.deviceModel.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // =========================================================================
  // 1. STANDALONE LOGIN GATE (When not authenticated)
  // Shows the requested Hacker Avatar Image + Password Form
  // =========================================================================
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0515] text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-black text-right" dir="rtl">
        {/* Minimal Top Header */}
        <header className="border-b border-purple-900/40 bg-[#0f0720]/95 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <div className="w-full h-full bg-[#0d071a] rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-orange-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-gaming font-black text-sm sm:text-base text-white tracking-wider">
                  بوابة إدارة فري فاير • ADMIN CONSOLE
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/40 font-bold">
                  AUTH REQUIRED
                </span>
              </div>
              <p className="text-[11px] text-purple-200/60">
                لوحة تحكم مشفرة ومؤمنة بـ bcrypt وجلسات JWT
              </p>
            </div>
          </div>

          <button
            onClick={() => setViewMode('public')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-purple-200 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 rounded-xl transition-all border border-purple-800/40 cursor-pointer shadow-md"
          >
            <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
            <span>العودة للموقع العام ↗</span>
          </button>
        </header>

        {/* Center Card with Requested Hacker Avatar Image */}
        <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Cyber glowing backgrounds */}
          <div className="absolute w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none -top-10 -right-10 animate-pulse" />
          <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none -bottom-10 -left-10" />

          <div className="w-full max-w-md relative z-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#170c2e] to-[#0c0618] border-2 border-orange-500/50 shadow-2xl shadow-purple-950/80 space-y-5">
            
            {/* Hacker Avatar Hero (The user's requested picture) */}
            <div className="flex flex-col items-center text-center">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-400 rounded-3xl blur-md opacity-80 animate-pulse" />
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-2xl bg-black">
                  <img 
                    src="/src/assets/images/hacker_avatar_portal_1791477669523.jpg" 
                    alt="Cyber Hacker Ghost Avatar" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute -bottom-2 right-1/2 translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black/90 border border-cyan-400/80 text-[10px] font-mono font-bold text-cyan-300 flex items-center gap-1 shadow-lg whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>MASTER ACCESS</span>
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <h2 className="text-xl font-black text-white font-gaming tracking-wide">
                  تسجيل دخول الإدارة والمشرفين
                </h2>
                <p className="text-xs text-purple-200/70 max-w-xs mx-auto">
                  التحكم بالنسخة، الحظر، إضافة الجواهر، وضع الصيانة، ونشر الإصدارات
                </p>
              </div>
            </div>

            {/* User Credentials Box */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-950/40 via-purple-950/40 to-black/60 border border-orange-500/30 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-orange-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>بيانات حسابك الخاص (مالك السيرفر):</span>
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
                  <span className="text-slate-400">كلمة المرور:</span> <span className="text-orange-300 font-bold">Admin@FF2026!#</span>
                </div>
              </div>
            </div>

            {/* Lockout Warning */}
            {isLocked && (
              <div className="p-3.5 rounded-2xl bg-rose-950/60 border-2 border-rose-600/80 text-rose-200 text-xs space-y-1.5 animate-pulse">
                <div className="flex items-center gap-2 font-bold text-rose-300">
                  <Clock className="w-4 h-4 text-rose-400 animate-spin" />
                  <span>الحساب مقفل مؤقتاً لحماية النظام من التخمين!</span>
                </div>
                <p className="text-[11px] text-rose-200/90">
                  تم رصد 5 محاولات خاطئة. يرجى الانتظار: <span className="font-mono font-black text-white text-sm bg-rose-900 px-1.5 py-0.5 rounded">{Math.floor(lockCountdown / 60)}:{(lockCountdown % 60).toString().padStart(2, '0')}</span>
                </p>
              </div>
            )}

            {/* Error Message */}
            {!isLocked && loginError && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <div>
                  <p>{loginError}</p>
                  {attemptsLeft !== null && attemptsLeft > 0 && (
                    <p className="text-[11px] text-rose-400 mt-0.5">
                      متبقي لديك <span className="font-bold text-white">{attemptsLeft}</span> محاولات قبل القفل المؤقت.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  اسم المستخدم (Username)
                </label>
                <input
                  type="text"
                  disabled={isLocked}
                  value={loginUsername}
                  onChange={(e) => { setLoginUsername(e.target.value); setLoginError(null); }}
                  placeholder="admin"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-black/60 border border-purple-800/50 rounded-xl text-white placeholder-slate-600 font-sans focus:outline-none focus:border-orange-500 disabled:opacity-50"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  كلمة المرور (Password)
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    disabled={isLocked}
                    value={loginPassword}
                    onChange={(e) => { setLoginPassword(e.target.value); setLoginError(null); }}
                    placeholder="••••••••••••"
                    className="w-full pr-3.5 pl-10 py-2.5 text-xs sm:text-sm bg-black/60 border border-purple-800/50 rounded-xl text-white placeholder-slate-600 font-mono focus:outline-none focus:border-orange-500 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLocked || loginLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 text-black font-black text-xs sm:text-sm shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loginLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>جاري التحقق من التشفير...</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    <span>دخول كونسول الإدارة ⚡</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 border-t border-purple-900/40 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>حماية القفل التلقائي: 5 محاولات</span>
              </span>
              <a
                href="https://discord.gg/m6etCxgUX"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline"
              >
                ديسكورد السيرفر
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED ADMIN CONSOLE
  // Full Dashboard with Navigation Tabs, Metrics, Maintenance, Versions, etc.
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#090514] text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-black text-right" dir="rtl">
      
      {/* Top Admin Security Bar */}
      <header className="sticky top-0 z-40 bg-[#120a24]/95 backdrop-blur-md border-b-2 border-orange-500/40 px-4 sm:px-8 py-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-cyan-400/80 shadow-lg shadow-orange-500/20 shrink-0">
              <img 
                src="/src/assets/images/hacker_avatar_portal_1791477669523.jpg" 
                alt="Ghost Avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-gaming font-black text-base sm:text-lg text-white tracking-wide">
                  لوحة تحكم فري فاير 2023 • MASTER OS
                </h1>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-black border ${
                  adminRole === 'owner'
                    ? 'bg-orange-500/20 text-orange-400 border-orange-500/50'
                    : 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                }`}>
                  {adminRole === 'owner' ? '👑 OWNER (مالك)' : '🛡️ MODERATOR (مشرف)'}
                </span>
              </div>
              <p className="text-[11px] text-purple-200/70">
                تسجيل الدخول كـ: <strong className="text-white">{adminUser?.displayName || activeStaffName}</strong>
              </p>
            </div>
          </div>

          {/* Quick Actions & Maintenance Indicator */}
          <div className="flex items-center gap-2.5">
            {/* Maintenance Mode Status Pill */}
            <button
              onClick={handleToggleMaintenance}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                downloadInfo.isMaintenance
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500 animate-pulse'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
              }`}
              title="اضغط لتشغيل أو إيقاف وضع الصيانة بضغطة واحدة"
            >
              <Power className="w-3.5 h-3.5" />
              <span>وضع الصيانة: {downloadInfo.isMaintenance ? 'مشغّل ⚠️' : 'متوقف ✓'}</span>
            </button>

            {/* Switch to Public Site */}
            <button
              onClick={() => setViewMode('public')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-purple-200 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 rounded-xl border border-purple-800/40 cursor-pointer transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">الموقع العام</span>
            </button>

            {/* Logout */}
            <button
              onClick={lockAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 rounded-xl border border-rose-800/40 cursor-pointer transition-colors"
              title="تسجيل الخروج وقفل اللوحة"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">خروج</span>
            </button>
          </div>

        </div>
      </header>

      {/* Navigation Sub-bar */}
      <nav className="bg-[#0e071c] border-b border-purple-900/40 px-4 sm:px-8 py-2 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          
          <button
            onClick={() => { sound.playClick(); setActiveTab('overview'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md shadow-orange-500/20'
                : 'text-purple-200/70 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>نظرة عامة والإحصائيات</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('versions'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'versions'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md shadow-orange-500/20'
                : 'text-purple-200/70 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <DownloadCloud className="w-4 h-4" />
            <span>إدارة الإصدارات والتحميل</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('news'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'news'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md shadow-orange-500/20'
                : 'text-purple-200/70 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>إدارة الأخبار والتحديثات</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('players'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'players'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md shadow-orange-500/20'
                : 'text-purple-200/70 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>حسابات اللاعبين والباند</span>
          </button>

          {/* Staff Management (Owner only) */}
          <button
            onClick={() => { sound.playClick(); setActiveTab('staff'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'staff'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md shadow-orange-500/20'
                : 'text-purple-200/70 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>إدارة المشرفين والأدوار</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('audit'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'audit'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md shadow-orange-500/20'
                : 'text-purple-200/70 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>سجل النشاط (Audit Log)</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('api'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'api'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md shadow-orange-500/20'
                : 'text-purple-200/70 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>واجهة برمجة التطبيقات (REST API)</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('rooms'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'rooms'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md shadow-orange-500/20'
                : 'text-purple-200/70 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>الرومات المباشرة</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('codes'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'codes'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md shadow-orange-500/20'
                : 'text-purple-200/70 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>أكواد الهدايا</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('backup'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'backup'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md shadow-orange-500/20'
                : 'text-purple-200/70 hover:text-white hover:bg-purple-900/40'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>النسخ الاحتياطي</span>
          </button>

        </div>
      </nav>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 space-y-8">
        
        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW & STATS & MAINTENANCE                     */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="p-5 rounded-3xl bg-gradient-to-b from-[#180d33] to-[#100724] border border-purple-800/50 shadow-xl">
                <div className="flex items-center justify-between text-xs text-purple-300 mb-2">
                  <span>إجمالي الزيارات</span>
                  <Globe className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-white">
                  {siteStats.visitors.toLocaleString()}
                </div>
                <div className="text-[11px] text-purple-300/60 mt-1">تتبع نشاط الزوار في الموقع العام</div>
              </div>

              <div className="p-5 rounded-3xl bg-gradient-to-b from-[#180d33] to-[#100724] border border-purple-800/50 shadow-xl">
                <div className="flex items-center justify-between text-xs text-purple-300 mb-2">
                  <span>إجمالي التحميلات</span>
                  <Download className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-orange-400">
                  {siteStats.downloads.toLocaleString()}
                </div>
                <div className="text-[11px] text-purple-300/60 mt-1">APK + OBB + محاكي PC</div>
              </div>

              <div className="p-5 rounded-3xl bg-gradient-to-b from-[#180d33] to-[#100724] border border-purple-800/50 shadow-xl">
                <div className="flex items-center justify-between text-xs text-purple-300 mb-2">
                  <span>استعلامات الـ REST API</span>
                  <Code className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-cyan-300">
                  {siteStats.apiQueries.toLocaleString()}
                </div>
                <div className="text-[11px] text-purple-300/60 mt-1">طلبات اللعبة وتطبيق الأندرويد</div>
              </div>

              <div className="p-5 rounded-3xl bg-gradient-to-b from-[#180d33] to-[#100724] border border-purple-800/50 shadow-xl">
                <div className="flex items-center justify-between text-xs text-purple-300 mb-2">
                  <span>الحسابات المسجلة</span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-emerald-300">
                  {players.length}
                </div>
                <div className="text-[11px] text-purple-300/60 mt-1">
                  المحظورين: <span className="text-rose-400 font-bold">{players.filter((p) => p.isBanned).length}</span>
                </div>
              </div>

            </div>

            {/* Maintenance Mode Command Center */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#1b0e38] via-[#160a2d] to-[#120724] border-2 border-orange-500/40 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl border ${
                    downloadInfo.isMaintenance
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  }`}>
                    <Power className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white font-gaming">
                      مفتاح وضع الصيانة الفوري (Maintenance Switch)
                    </h3>
                    <p className="text-xs text-purple-200/70">
                      تشغيل أو إيقاف وضع الصيانة بضغطة زر وتحديث حالة الـ API وتنبيه الزوار فوراً
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleToggleMaintenance}
                  className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all shadow-lg ${
                    downloadInfo.isMaintenance
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/20'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:from-amber-400 hover:to-orange-400 shadow-orange-500/20'
                  }`}
                >
                  <Power className="w-4 h-4" />
                  <span>{downloadInfo.isMaintenance ? 'إيقاف وضع الصيانة الآن' : 'تفعيل وضع الصيانة العام'}</span>
                </button>
              </div>

              {/* Maintenance message editor */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-orange-400">
                  رسالة الصيانة التي تظهر للاعبين والتطبيق:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={maintenanceForm.message}
                    onChange={(e) => setMaintenanceForm((prev) => ({ ...prev, message: e.target.value }))}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-purple-800/60 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    onClick={handleSaveMaintenanceMessage}
                    className="px-4 py-2.5 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-700/60 text-xs font-bold text-white cursor-pointer transition-colors"
                  >
                    حفظ الرسالة
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links / Discord Server Box */}
            <div className="p-6 rounded-3xl bg-[#130926] border border-purple-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/40">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">سيرفر ديسكورد المرتبط بالنسخة</h4>
                  <p className="text-xs text-purple-200/60 font-mono">https://discord.gg/m6etCxgUX</p>
                </div>
              </div>
              <a
                href="https://discord.gg/m6etCxgUX"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <span>فتح الديسكورد</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: VERSIONS & DOWNLOADS MANAGEMENT                    */}
        {/* ========================================================= */}
        {activeTab === 'versions' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#140a28] border border-purple-800/40 space-y-6">
            <div className="flex items-center justify-between border-b border-purple-900/50 pb-4">
              <div>
                <h3 className="text-lg font-black text-white font-gaming">
                  إدارة إصدارات اللعبة وملفات التحميل
                </h3>
                <p className="text-xs text-purple-200/70">
                  نشر إصدار جديد، كتابة ملاحظات التحديث (Changelog)، وضبط التحديث الإجباري
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/40 font-bold">
                الحالي: {downloadInfo.version}
              </span>
            </div>

            <form onSubmit={handlePublishVersion} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    رقم واسم الإصدار (Version Name)
                  </label>
                  <input
                    type="text"
                    value={versionForm.version}
                    onChange={(e) => setVersionForm({ ...versionForm, version: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs sm:text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    حجم ملف الـ APK
                  </label>
                  <input
                    type="text"
                    value={versionForm.apkSize}
                    onChange={(e) => setVersionForm({ ...versionForm, apkSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs sm:text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    رابط تحميل ملف الـ APK المباشر
                  </label>
                  <input
                    type="text"
                    value={versionForm.apkUrl}
                    onChange={(e) => setVersionForm({ ...versionForm, apkUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs sm:text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    رابط تحميل ملف الـ OBB المباشر
                  </label>
                  <input
                    type="text"
                    value={versionForm.obbUrl}
                    onChange={(e) => setVersionForm({ ...versionForm, obbUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs sm:text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    رابط حزمة المحاكي PC
                  </label>
                  <input
                    type="text"
                    value={versionForm.pcEmulatorUrl}
                    onChange={(e) => setVersionForm({ ...versionForm, pcEmulatorUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs sm:text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    حجم ملف الـ OBB
                  </label>
                  <input
                    type="text"
                    value={versionForm.obbSize}
                    onChange={(e) => setVersionForm({ ...versionForm, obbSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs sm:text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  ملاحظات التحديث (Release Notes / Changelog)
                </label>
                <textarea
                  rows={4}
                  value={versionForm.releaseNotes}
                  onChange={(e) => setVersionForm({ ...versionForm, releaseNotes: e.target.value })}
                  className="w-full p-3 rounded-xl bg-black/60 border border-purple-800/50 text-xs sm:text-sm text-white leading-relaxed"
                />
              </div>

              {/* Force Update Toggle Switch */}
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    تفعيل التحديث الإجباري (Force Update)
                  </h4>
                  <p className="text-[11px] text-purple-300/70">
                    عند التفعيل، سيُطلب من اللعبة إجبار اللاعب على تحديث نسخته للدخول إلى الخوادم.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={versionForm.forceUpdate}
                  onChange={(e) => setVersionForm({ ...versionForm, forceUpdate: e.target.checked })}
                  className="w-5 h-5 accent-orange-500 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-black font-black text-xs sm:text-sm hover:from-orange-300 hover:to-amber-400 transition-all cursor-pointer shadow-lg shadow-orange-500/25"
              >
                نشر وحفظ بيانات الإصدار ⚡
              </button>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: NEWS & ANNOUNCEMENTS MANAGEMENT                    */}
        {/* ========================================================= */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-black text-white font-gaming">
                  إدارة الأخبار والتحديثات الرسمية
                </h3>
                <p className="text-xs text-purple-200/70">
                  إضافة أخبار وملاحظات تصحيح ومكافآت تظهر في الصفحة الرئيسية
                </p>
              </div>

              <button
                onClick={handleOpenCreateNews}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-black text-xs font-black hover:from-orange-300 hover:to-amber-400 cursor-pointer transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة خبر جديد</span>
              </button>
            </div>

            {/* News List Table */}
            <div className="rounded-3xl bg-[#140a28] border border-purple-800/40 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#1b0e36] text-purple-300 font-bold border-b border-purple-900/60">
                    <tr>
                      <th className="p-4">العنوان</th>
                      <th className="p-4">القسم</th>
                      <th className="p-4">التاريخ</th>
                      <th className="p-4">الكاتب</th>
                      <th className="p-4">المكافأة</th>
                      <th className="p-4 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/30">
                    {newsList.map((item) => (
                      <tr key={item.id} className="hover:bg-purple-900/20 transition-colors">
                        <td className="p-4 font-bold text-white max-w-xs truncate">
                          {item.title}
                          {item.isPinned && (
                            <span className="mr-2 text-[10px] text-orange-400 font-bold bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/30">
                              مثبت
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-purple-300">{item.tag}</td>
                        <td className="p-4 font-mono text-purple-300/70">{item.date}</td>
                        <td className="p-4 text-purple-300">{item.author}</td>
                        <td className="p-4 text-orange-300 font-bold">{item.reward || '-'}</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEditNews(item)}
                              className="p-1.5 rounded-lg bg-purple-900/50 hover:bg-purple-800 text-purple-200 cursor-pointer"
                              title="تعديل"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteNews(item.id)}
                              className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 cursor-pointer"
                              title="حذف"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: PLAYER ACCOUNTS & BANS & GIFTS                     */}
        {/* ========================================================= */}
        {activeTab === 'players' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white font-gaming">
                  إدارة حسابات لاعبي النسخة (Free Fire Accounts)
                </h3>
                <p className="text-xs text-purple-200/70">
                  البحث بالـ UID، إرسال الجواهر والذهب، منح السكنات النادرة، والحظر ومكافحة الهاك
                </p>
              </div>

              <button
                onClick={() => setShowAddPlayerModal(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-black text-xs font-black hover:from-orange-300 hover:to-amber-400 cursor-pointer transition-all shadow-md self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>تسجيل حساب لاعب جديد</span>
              </button>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-purple-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={playerSearchQuery}
                  onChange={(e) => setPlayerSearchQuery(e.target.value)}
                  placeholder="ابحث بالـ UID أو اسم اللاعب أو نوع الجهاز..."
                  className="w-full pr-9 pl-4 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs sm:text-sm text-white placeholder-slate-500"
                />
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <button
                  onClick={() => setPlayerFilterStatus('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    playerFilterStatus === 'all' ? 'bg-orange-500 text-black' : 'bg-purple-950/60 text-purple-300'
                  }`}
                >
                  الكل ({players.length})
                </button>
                <button
                  onClick={() => setPlayerFilterStatus('active')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    playerFilterStatus === 'active' ? 'bg-emerald-500 text-black' : 'bg-purple-950/60 text-purple-300'
                  }`}
                >
                  نشط
                </button>
                <button
                  onClick={() => setPlayerFilterStatus('banned')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    playerFilterStatus === 'banned' ? 'bg-rose-500 text-black' : 'bg-purple-950/60 text-purple-300'
                  }`}
                >
                  محظور
                </button>
              </div>
            </div>

            {/* Players Table */}
            <div className="rounded-3xl bg-[#140a28] border border-purple-800/40 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#1b0e36] text-purple-300 font-bold border-b border-purple-900/60">
                    <tr>
                      <th className="p-4">UID / الآيدي</th>
                      <th className="p-4">الاسم (Nickname)</th>
                      <th className="p-4">المستوى والرتبة</th>
                      <th className="p-4">الجواهر والذهب</th>
                      <th className="p-4">الحالة</th>
                      <th className="p-4 text-center">التحكم والعمليات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/30">
                    {filteredPlayers.map((player) => (
                      <tr key={player.id} className="hover:bg-purple-900/20 transition-colors">
                        <td className="p-4 font-mono font-bold text-orange-400">
                          {player.playerId}
                        </td>
                        <td className="p-4 font-bold text-white">
                          {player.nickname}
                          <span className="block text-[11px] font-mono text-purple-300/60 mt-0.5">
                            {player.deviceModel}
                          </span>
                        </td>
                        <td className="p-4 text-purple-200">
                          <span className="font-mono font-bold">Lvl {player.level}</span> · {player.rank}
                        </td>
                        <td className="p-4">
                          <span className="text-cyan-300 font-mono font-bold">💎 {player.diamonds.toLocaleString()}</span>
                          <span className="text-amber-400 font-mono text-[11px] block">🪙 {player.gold.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          {player.isBanned ? (
                            <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
                              محظور: {player.banReason || 'حظر إداري'}
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                              حساب سليم ✓
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* Gift Diamonds / Gold */}
                            <button
                              onClick={() => {
                                setGiftPlayerTarget(player);
                                setGiftDiamondsInput(5000);
                                setGiftGoldInput(20000);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                              title="إرسال جواهر وهدايا"
                            >
                              <Gift className="w-3.5 h-3.5" />
                              <span>إرسال هدية</span>
                            </button>

                            {/* Ban / Unban */}
                            {player.isBanned ? (
                              <button
                                onClick={() => unbanPlayer(player.playerId, activeStaffName)}
                                className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>فك الحظر</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => setBanPlayerTarget(player)}
                                className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Ban className="w-3.5 h-3.5" />
                                <span>حظر</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: STAFF & ROLES MANAGEMENT (Owner Only)              */}
        {/* ========================================================= */}
        {activeTab === 'staff' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white font-gaming">
                  إدارة المشرفين وصلاحيات الأدوار
                </h3>
                <p className="text-xs text-purple-200/70">
                  إضافة مشرفين جدد، تغيير الأدوار (مالك / مشرف)، وحذف الحسابات مع تشفير bcrypt
                </p>
              </div>

              {adminRole === 'owner' && (
                <button
                  onClick={() => setShowStaffModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-black text-xs font-black hover:from-orange-300 hover:to-amber-400 cursor-pointer transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة مشرف جديد</span>
                </button>
              )}
            </div>

            {/* Staff Table */}
            <div className="rounded-3xl bg-[#140a28] border border-purple-800/40 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#1b0e36] text-purple-300 font-bold border-b border-purple-900/60">
                    <tr>
                      <th className="p-4">اسم المستخدم</th>
                      <th className="p-4">الاسم المعروض</th>
                      <th className="p-4">الرتبة والدور</th>
                      <th className="p-4">البريد الإلكتروني</th>
                      <th className="p-4">تاريخ الانضمام</th>
                      <th className="p-4 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/30">
                    {staffMembers.map((staff) => (
                      <tr key={staff.id} className="hover:bg-purple-900/20 transition-colors">
                        <td className="p-4 font-mono font-bold text-white">
                          @{staff.username}
                        </td>
                        <td className="p-4 font-bold text-orange-300">
                          {staff.displayName}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            staff.role === 'owner'
                              ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                              : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          }`}>
                            {staff.role === 'owner' ? '👑 مالك (Owner)' : '🛡️ مشرف (Moderator)'}
                          </span>
                        </td>
                        <td className="p-4 text-purple-300/70 font-mono">{staff.email || '-'}</td>
                        <td className="p-4 font-mono text-purple-300/70">{staff.createdAt.split('T')[0]}</td>
                        <td className="p-4 text-center">
                          {adminRole === 'owner' ? (
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => changeStaffRole(staff.id, staff.role === 'owner' ? 'moderator' : 'owner')}
                                className="px-2 py-1 rounded-lg bg-purple-900/50 hover:bg-purple-800 text-purple-200 text-[11px] font-bold cursor-pointer"
                                title="تبديل الرتبة"
                              >
                                تغيير الرتبة
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`هل أنت متأكد من حذف المشرف ${staff.displayName}؟`)) {
                                    deleteStaffMember(staff.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 cursor-pointer"
                                title="حذف"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <span className="text-purple-400/50 text-[11px]">مخصص للمالك فقط</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: AUDIT LOG (Who, What, When)                        */}
        {/* ========================================================= */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-black text-white font-gaming">
                  سجل النشاط الإداري والعمليات (Audit Log)
                </h3>
                <p className="text-xs text-purple-200/70">
                  توثيق دقيق لكل عملية يقوم بها أي مشرف (من قام بالعملية، ماذا فعل، ومتى، وعنوان IP)
                </p>
              </div>

              <button
                onClick={fetchAuditLogs}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/50 text-xs font-bold text-white cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>تحديث السجل</span>
              </button>
            </div>

            {/* Audit Logs List */}
            <div className="rounded-3xl bg-[#140a28] border border-purple-800/40 overflow-hidden shadow-xl">
              <div className="divide-y divide-purple-900/40">
                {auditLogsList.map((log) => (
                  <div key={log.id} className="p-4 sm:p-5 hover:bg-purple-900/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-orange-400">@{log.adminUsername}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300 font-mono">
                          {log.adminRole}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono font-bold">
                          {log.action}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white">{log.details}</p>
                    </div>

                    <div className="text-left sm:text-left text-purple-300/60 font-mono text-[11px] shrink-0">
                      <div>{new Date(log.timestamp).toLocaleString('ar-DZ')}</div>
                      {log.ipAddress && <div>IP: {log.ipAddress}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: REST API TESTER & DOCS                             */}
        {/* ========================================================= */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-white font-gaming">
                واجهة برمجة التطبيقات (REST API Endpoints)
              </h3>
              <p className="text-xs text-purple-200/70">
                واجهات برمجية واضحة جاهزة للاستهلاك من قبل تطبيق اللعبة أو ملف الـ APK المخصص
              </p>
            </div>

            {/* Endpoints Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-[#140a28] border border-purple-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">GET</span>
                  <code className="text-xs font-mono text-orange-400">/api/v1/version</code>
                </div>
                <p className="text-xs text-purple-200/80">
                  فحص رقم الإصدار الحالي، روابط التحميل، وملاحظات التحديث، والتحديث الإجباري.
                </p>
                <button
                  onClick={() => handleTestApi('/api/v1/version')}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 text-black text-xs font-bold cursor-pointer"
                >
                  تجربة الاستعلام (Test)
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#140a28] border border-purple-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">GET</span>
                  <code className="text-xs font-mono text-orange-400">/api/v1/maintenance</code>
                </div>
                <p className="text-xs text-purple-200/80">
                  فحص حالة وضع الصيانة، ورسالة الإشعار التنبيهي قبل فتح شاشة البداية باللعبة.
                </p>
                <button
                  onClick={() => handleTestApi('/api/v1/maintenance')}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 text-black text-xs font-bold cursor-pointer"
                >
                  تجربة الاستعلام (Test)
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#140a28] border border-purple-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">GET</span>
                  <code className="text-xs font-mono text-orange-400">/api/v1/news</code>
                </div>
                <p className="text-xs text-purple-200/80">
                  جلب قائمة الأخبار والتحديثات الرسمية والمكافآت المرفقة لعرضها داخل التطبيق.
                </p>
                <button
                  onClick={() => handleTestApi('/api/v1/news')}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 text-black text-xs font-bold cursor-pointer"
                >
                  تجربة الاستعلام (Test)
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-[#140a28] border border-purple-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">GET</span>
                  <code className="text-xs font-mono text-orange-400">/api/v1/stats</code>
                </div>
                <p className="text-xs text-purple-200/80">
                  إحصائيات الخادم المباشرة: عدد الزوار، عدد التحميلات، واللاعبين المتصلين.
                </p>
                <button
                  onClick={() => handleTestApi('/api/v1/stats')}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 text-black text-xs font-bold cursor-pointer"
                >
                  تجربة الاستعلام (Test)
                </button>
              </div>

            </div>

            {/* Live API Tester Output */}
            {apiResponse && (
              <div className="p-5 rounded-3xl bg-[#0b0516] border border-orange-500/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-orange-400 font-bold">استجابة المسار: {apiEndpoint}</span>
                  <span className="text-emerald-400">HTTP 200 OK</span>
                </div>
                <pre className="p-4 rounded-xl bg-black/80 text-emerald-400 font-mono text-xs overflow-x-auto max-h-80 text-left" dir="ltr">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 8: LIVE ROOMS BROADCASTER                             */}
        {/* ========================================================= */}
        {activeTab === 'rooms' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#140a28] border border-purple-800/40 space-y-6">
            <div>
              <h3 className="text-lg font-black text-white font-gaming">
                بث وإدارة الرومات الحية (Custom Rooms)
              </h3>
              <p className="text-xs text-purple-200/70">
                تحديث رقم الروم وكلمة السر ونشرها فورياً في شريط البث بالموقع للاعبين
              </p>
            </div>

            <form onSubmit={handleUpdateRoom} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">رقم الروم (Room ID)</label>
                  <input
                    type="text"
                    value={roomForm.roomId}
                    onChange={(e) => setRoomForm({ ...roomForm, roomId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs sm:text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">كلمة سر الروم (Password)</label>
                  <input
                    type="text"
                    value={roomForm.roomPassword}
                    onChange={(e) => setRoomForm({ ...roomForm, roomPassword: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs sm:text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">نمط الروم (Mode)</label>
                <input
                  type="text"
                  value={roomForm.mode}
                  onChange={(e) => setRoomForm({ ...roomForm, mode: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs sm:text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ملاحظات وقوانين الروم</label>
                <input
                  type="text"
                  value={roomForm.notes}
                  onChange={(e) => setRoomForm({ ...roomForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs sm:text-sm text-white"
                />
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">تفعيل إشعار الروم المباشر</h4>
                  <p className="text-[11px] text-purple-300/70">إظهار شريط الروم في أعلى الصفحة الرئيسية</p>
                </div>
                <input
                  type="checkbox"
                  checked={roomForm.isActive}
                  onChange={(e) => setRoomForm({ ...roomForm, isActive: e.target.checked })}
                  className="w-5 h-5 accent-orange-500 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-black text-xs cursor-pointer shadow-md"
              >
                تحديث وبث الروم الآن
              </button>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 9: REDEEM CODES                                       */}
        {/* ========================================================= */}
        {activeTab === 'codes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white font-gaming">أكواد الهدايا والجواهر (Redeem Codes)</h3>
                <p className="text-xs text-purple-200/70">إنشاء أكواد لاسترداد الجواهر والسكنات النادرة للاعبين</p>
              </div>
            </div>

            {/* Create Code Form */}
            <form onSubmit={handleCreateCode} className="p-6 rounded-3xl bg-[#140a28] border border-purple-800/40 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">رمز الكود (Code)</label>
                  <input
                    type="text"
                    value={codeForm.code}
                    onChange={(e) => setCodeForm({ ...codeForm, code: e.target.value.toUpperCase() })}
                    placeholder="BOOYAH-2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الجائزة الممنوحة</label>
                  <input
                    type="text"
                    value={codeForm.reward}
                    onChange={(e) => setCodeForm({ ...codeForm, reward: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">مرات الاستخدام المتاحة</label>
                  <input
                    type="number"
                    value={codeForm.usesLeft}
                    onChange={(e) => setCodeForm({ ...codeForm, usesLeft: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white font-mono"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-black text-xs cursor-pointer shadow-md"
              >
                توليد الكود ونشره
              </button>
            </form>

            {/* Codes List */}
            <div className="rounded-3xl bg-[#140a28] border border-purple-800/40 overflow-hidden shadow-xl">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#1b0e36] text-purple-300 font-bold border-b border-purple-900/60">
                  <tr>
                    <th className="p-4">الكود</th>
                    <th className="p-4">الجائزة</th>
                    <th className="p-4">المتبقي</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900/30">
                  {redeemCodes.map((c) => (
                    <tr key={c.id} className="hover:bg-purple-900/20">
                      <td className="p-4 font-mono font-bold text-orange-400">{c.code}</td>
                      <td className="p-4 text-white">{c.reward}</td>
                      <td className="p-4 font-mono">{c.usesLeft}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                          {c.isActive ? 'نشط' : 'معطل'}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => toggleRedeemCode(c.id)}
                            className="px-2 py-1 rounded bg-purple-900 text-purple-200 text-[10px] font-bold cursor-pointer"
                          >
                            {c.isActive ? 'إيقاف' : 'تفعيل'}
                          </button>
                          <button
                            onClick={() => deleteRedeemCode(c.id)}
                            className="p-1 rounded bg-rose-950 text-rose-300 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 10: BACKUP & DATABASE MANAGEMENT                      */}
        {/* ========================================================= */}
        {activeTab === 'backup' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#140a28] border border-purple-800/40 space-y-6">
            <div>
              <h3 className="text-lg font-black text-white font-gaming">النسخ الاحتياطي لقاعدة البيانات</h3>
              <p className="text-xs text-purple-200/70">
                تصدير كافة إعدادات اللعبة والحسابات والأخبار بملف JSON أو استرجاعها بضغطة زر
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const json = exportDataJson();
                  setBackupJsonText(json);
                  setShowBackupModal(true);
                }}
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-black text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
              >
                <DownloadCloud className="w-4 h-4" />
                <span>تصدير نسخة احتياطية (Export JSON)</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('تحذير: هل أنت متأكد من استعادة الإعدادات الافتراضية الأولية؟')) {
                    resetToDefaults();
                  }
                }}
                className="px-6 py-3 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-300 font-bold text-xs flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>استعادة ضبط المصنع الافتراضي</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* MODALS: GIFT, BAN, NEWS, STAFF, BACKUP                   */}
      {/* ========================================================= */}

      {/* Gift Modal */}
      {giftPlayerTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#180d32] to-[#0d071a] border-2 border-orange-500/50 p-6 space-y-4 text-right">
            <h3 className="text-base font-black text-white font-gaming">
              إرسال هدية للحساب: {giftPlayerTarget.nickname} (UID: {giftPlayerTarget.playerId})
            </h3>

            <form onSubmit={handleExecuteGift} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">عدد الجواهر (Diamonds 💎)</label>
                <input
                  type="number"
                  value={giftDiamondsInput}
                  onChange={(e) => setGiftDiamondsInput(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-cyan-300 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">الذهب (Gold 🪙)</label>
                <input
                  type="number"
                  value={giftGoldInput}
                  onChange={(e) => setGiftGoldInput(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-amber-300 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">منح سكن أسطوري اختياري:</label>
                <select
                  value={giftSkinSelected}
                  onChange={(e) => setGiftSkinSelected(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white"
                >
                  <option value="">-- بدون سكن إضافي --</option>
                  {availableSkins.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.rarity})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ملاحظة الهدية:</label>
                <input
                  type="text"
                  value={giftNoteInput}
                  onChange={(e) => setGiftNoteInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-black text-xs cursor-pointer shadow-md"
                >
                  تأكيد وإرسال الهدية 💎
                </button>
                <button
                  type="button"
                  onClick={() => setGiftPlayerTarget(null)}
                  className="px-4 py-2.5 rounded-xl bg-purple-950 text-purple-200 text-xs cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ban Modal */}
      {banPlayerTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#1c0a1a] to-[#0e040e] border-2 border-rose-500/70 p-6 space-y-4 text-right">
            <h3 className="text-base font-black text-white font-gaming text-rose-300">
              حظر اللاعب: {banPlayerTarget.nickname} (UID: {banPlayerTarget.playerId})
            </h3>

            <form onSubmit={handleExecuteBan} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">نوع الحظر:</label>
                <select
                  value={banTypeInput}
                  onChange={(e) => setBanTypeInput(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-rose-800/50 text-xs text-white"
                >
                  <option value="permanent">حظر دائم نهائي (Permanent Ban)</option>
                  <option value="temporary">حظر مؤقت لمدة 30 يوم (Temporary Ban)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">سبب الحظر:</label>
                <input
                  type="text"
                  value={banReasonInput}
                  onChange={(e) => setBanReasonInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-rose-800/50 text-xs text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs cursor-pointer shadow-md"
                >
                  تنفيذ الحظر الآن 🚫
                </button>
                <button
                  type="button"
                  onClick={() => setBanPlayerTarget(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* News Create/Edit Modal */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#160b2d] border-2 border-orange-500/50 p-6 space-y-4 text-right">
            <h3 className="text-base font-black text-white font-gaming">
              {editingNewsId ? 'تعديل الخبر' : 'إضافة خبر وتحديث جديد'}
            </h3>

            <form onSubmit={handleSaveNews} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">عنوان الخبر</label>
                <input
                  type="text"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="عنوان الإعلان..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">القسم</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white"
                  >
                    <option value="update">تحديث (Update)</option>
                    <option value="event">بطولة / حدث (Event)</option>
                    <option value="community">حماية ومجتمع (Community)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">شارة التصنيف (Tag)</label>
                  <input
                    type="text"
                    value={newsForm.tag}
                    onChange={(e) => setNewsForm({ ...newsForm, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">مكافأة مرفقة (اختياري)</label>
                <input
                  type="text"
                  value={newsForm.reward}
                  onChange={(e) => setNewsForm({ ...newsForm, reward: e.target.value })}
                  placeholder="مثال: 1,000 جوهرة مجانية"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">محتوى الخبر بالتفصيل</label>
                <textarea
                  rows={5}
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  placeholder="اكتب تفاصيل الإعلان والتحديث هنا..."
                  className="w-full p-3 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinNews"
                  checked={newsForm.isPinned}
                  onChange={(e) => setNewsForm({ ...newsForm, isPinned: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 cursor-pointer"
                />
                <label htmlFor="pinNews" className="text-xs text-slate-300 font-bold cursor-pointer">
                  تثبيت الخبر في أعلى الصفحة الرئيسية
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-black text-xs cursor-pointer shadow-md"
                >
                  {editingNewsId ? 'حفظ التعديلات' : 'نشر الخبر الآن'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-purple-950 text-purple-200 text-xs cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Staff Create Modal */}
      {showStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-md rounded-3xl bg-[#160b2d] border-2 border-orange-500/50 p-6 space-y-4 text-right">
            <h3 className="text-base font-black text-white font-gaming">إضافة مشرف أو مالك جديد</h3>

            <form onSubmit={handleCreateStaff} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">اسم المستخدم (Username)</label>
                <input
                  type="text"
                  value={staffForm.username}
                  onChange={(e) => setStaffForm({ ...staffForm, username: e.target.value.toLowerCase() })}
                  placeholder="mod_ahmed"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">الاسم المعروض (Display Name)</label>
                <input
                  type="text"
                  value={staffForm.displayName}
                  onChange={(e) => setStaffForm({ ...staffForm, displayName: e.target.value })}
                  placeholder="أحمد المشرف (Ahmed Mod)"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">كلمة المرور (مشفرة بـ bcrypt)</label>
                <input
                  type="password"
                  value={staffForm.password}
                  onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">البريد الإلكتروني (اختياري)</label>
                <input
                  type="email"
                  value={staffForm.email}
                  onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                  placeholder="ahmed@example.com"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">الرتبة والصلاحيات</label>
                <select
                  value={staffForm.role}
                  onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white"
                >
                  <option value="moderator">🛡️ مشرف (Moderator) - إدارة الأخبار واللاعبين</option>
                  <option value="owner">👑 مالك (Owner) - كافة الصلاحيات وإدارة المشرفين</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-black text-xs cursor-pointer shadow-md"
                >
                  تأكيد وإضافة المشرف
                </button>
                <button
                  type="button"
                  onClick={() => setShowStaffModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-purple-950 text-purple-200 text-xs cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Player Modal */}
      {showAddPlayerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-md rounded-3xl bg-[#160b2d] border-2 border-orange-500/50 p-6 space-y-4 text-right">
            <h3 className="text-base font-black text-white font-gaming">تسجيل حساب لاعب جديد</h3>

            <form onSubmit={handleCreateNewPlayer} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">رقم الآيدي (Free Fire UID)</label>
                <input
                  type="text"
                  value={newPlayerForm.playerId}
                  onChange={(e) => setNewPlayerForm({ ...newPlayerForm, playerId: e.target.value })}
                  placeholder="782910482"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">اسم اللاعب (Nickname)</label>
                <input
                  type="text"
                  value={newPlayerForm.nickname}
                  onChange={(e) => setNewPlayerForm({ ...newPlayerForm, nickname: e.target.value })}
                  placeholder="⚡ HERO_DZ"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">المستوى (Level)</label>
                  <input
                    type="number"
                    value={newPlayerForm.level}
                    onChange={(e) => setNewPlayerForm({ ...newPlayerForm, level: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الجواهر الأولية</label>
                  <input
                    type="number"
                    value={newPlayerForm.diamonds}
                    onChange={(e) => setNewPlayerForm({ ...newPlayerForm, diamonds: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-800/50 text-xs text-cyan-300 font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-black text-xs cursor-pointer shadow-md"
                >
                  تسجيل الحساب
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddPlayerModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-purple-950 text-purple-200 text-xs cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Backup JSON Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in" dir="rtl">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#140a28] border-2 border-orange-500/50 p-6 space-y-4 text-right">
            <h3 className="text-base font-black text-white font-gaming">النسخة الاحتياطية (JSON Backup)</h3>
            <textarea
              readOnly
              rows={10}
              value={backupJsonText}
              className="w-full p-3 rounded-xl bg-black/80 text-emerald-400 font-mono text-xs overflow-x-auto text-left"
              dir="ltr"
            />
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(backupJsonText);
                  showToast('تم نسخ ملف النسخة الاحتياطية للحافظة!', 'success');
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 text-black font-black text-xs cursor-pointer"
              >
                نسخ النص (Copy)
              </button>
              <button
                onClick={() => setShowBackupModal(false)}
                className="px-4 py-2 rounded-xl bg-purple-950 text-purple-200 text-xs cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
