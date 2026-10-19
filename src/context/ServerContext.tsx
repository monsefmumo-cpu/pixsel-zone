import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  ServerInfo, 
  ServerRole, 
  CommunityComment, 
  ServerAnnouncement, 
  ServerRule, 
  AdminReply,
  GameDownloadInfo,
  LiveRoomInfo,
  RedeemCode,
  PlayerSkinItem,
  PlayerAccount,
  BanLogEntry,
  GameServerConfig,
  StaffMember,
  AdminRoleType,
  AuditLogItem,
  NewsItemType
} from '../types';
import { 
  initialServerInfo, 
  initialDownloadInfo,
  initialLiveRoom,
  initialRedeemCodes,
  initialRoles, 
  initialComments, 
  initialAnnouncements, 
  initialRules,
  initialAvailableSkins,
  initialPlayers,
  initialBanLogs,
  initialGameServerConfig
} from '../data/initialData';
import { sound } from '../utils/sound';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface ServerContextType {
  serverInfo: ServerInfo;
  updateServerInfo: (info: Partial<ServerInfo>) => void;

  downloadInfo: GameDownloadInfo;
  updateDownloadInfo: (info: Partial<GameDownloadInfo>) => void;

  liveRoom: LiveRoomInfo;
  updateLiveRoom: (info: Partial<LiveRoomInfo>) => void;

  redeemCodes: RedeemCode[];
  addRedeemCode: (code: Omit<RedeemCode, 'id'>) => void;
  toggleRedeemCode: (id: string) => void;
  deleteRedeemCode: (id: string) => void;
  claimCode: (codeStr: string) => { success: boolean; message: string; reward?: string };
  
  roles: ServerRole[];
  addRole: (role: Omit<ServerRole, 'id'>) => void;
  updateRole: (id: string, role: Partial<ServerRole>) => void;
  deleteRole: (id: string) => void;
  
  comments: CommunityComment[];
  addComment: (comment: Omit<CommunityComment, 'id' | 'createdAt' | 'likes' | 'isPinned' | 'adminReply'>) => void;
  addAdminReply: (commentId: string, replyText: string, adminRole?: string) => void;
  editAdminReply: (commentId: string, replyText: string) => void;
  deleteAdminReply: (commentId: string) => void;
  togglePinComment: (commentId: string) => void;
  deleteComment: (commentId: string) => void;
  likeComment: (commentId: string) => void;
  
  announcements: ServerAnnouncement[];
  addAnnouncement: (announcement: Omit<ServerAnnouncement, 'id'>) => void;
  updateAnnouncement: (id: string, announcement: Partial<ServerAnnouncement>) => void;
  deleteAnnouncement: (id: string) => void;
  
  rules: ServerRule[];
  addRule: (rule: Omit<ServerRule, 'id'>) => void;
  updateRule: (id: string, rule: Partial<ServerRule>) => void;
  deleteRule: (id: string) => void;
  
  isAdmin: boolean;
  adminPin: string;
  unlockAdmin: (pin: string) => boolean;
  lockAdmin: () => void;
  changeAdminPin: (newPin: string) => void;
  
  isSoundMuted: boolean;
  toggleSound: () => void;

  isDiscordVerified: boolean;
  verifyDiscordJoin: () => void;
  resetDiscordVerification: () => void;

  // Player & Game Version Controls
  players: PlayerAccount[];
  availableSkins: PlayerSkinItem[];
  banLogs: BanLogEntry[];
  serverConfig: GameServerConfig;
  addPlayer: (player: Omit<PlayerAccount, 'id' | 'createdAt'>) => void;
  updatePlayer: (id: string, updates: Partial<PlayerAccount>) => void;
  deletePlayer: (id: string) => void;
  banPlayer: (playerId: string, reason: string, banType?: 'permanent' | 'temporary', adminName?: string) => void;
  unbanPlayer: (playerId: string, adminName?: string) => void;
  grantSkinToPlayer: (playerId: string, skinId: string) => void;
  revokeSkinFromPlayer: (playerId: string, skinId: string) => void;
  addDiamondsToPlayer: (playerId: string, amount: number) => void;
  updateServerConfig: (config: Partial<GameServerConfig>) => void;
  viewMode: 'public' | 'admin-console';
  setViewMode: (mode: 'public' | 'admin-console') => void;
  activeStaffName: string;
  setActiveStaffName: (name: string) => void;
  
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: number) => void;
  
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;

  // Full-Stack Auth, Roles & REST Operations
  adminUser: StaffMember | null;
  adminRole: AdminRoleType;
  adminToken: string | null;
  loginWithCredentials: (username: string, password: string) => Promise<{ success: boolean; message: string; isLocked?: boolean; remainingSeconds?: number; attemptsLeft?: number }>;
  
  staffMembers: StaffMember[];
  addStaffMember: (data: { username: string; password: string; displayName: string; role: AdminRoleType; email?: string }) => Promise<{ success: boolean; message: string }>;
  changeStaffRole: (id: string, role: AdminRoleType) => Promise<{ success: boolean; message: string }>;
  deleteStaffMember: (id: string) => Promise<{ success: boolean; message: string }>;

  newsList: NewsItemType[];
  addNewsItem: (news: Omit<NewsItemType, 'id' | 'views'>) => Promise<boolean>;
  editNewsItem: (id: string, news: Partial<NewsItemType>) => Promise<boolean>;
  deleteNewsItem: (id: string) => Promise<boolean>;

  auditLogsList: AuditLogItem[];
  fetchAuditLogs: () => Promise<void>;

  siteStats: {
    visitors: number;
    downloads: number;
    apiQueries: number;
    onlinePlayers: number;
    totalPlayers: number;
    bannedPlayers: number;
  };
  recordSiteDownload: () => Promise<void>;
  toggleMaintenanceMode: (isMaintenance: boolean, message?: string, estimatedEnd?: string) => Promise<void>;
  publishNewVersion: (versionData: Partial<GameDownloadInfo>) => Promise<void>;
  giftDiamondsAndGold: (playerId: string, diamonds: number, gold: number, skinId?: string, note?: string) => Promise<boolean>;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

const STORAGE_KEYS = {
  INFO: 'ff2023_server_info_v3',
  DOWNLOADS: 'ff2023_downloads_v3',
  LIVE_ROOM: 'ff2023_liveroom_v3',
  REDEEM_CODES: 'ff2023_redeem_v3',
  ROLES: 'ff2023_roles_v3',
  COMMENTS: 'ff2023_comments_v3',
  ANNOUNCEMENTS: 'ff2023_announcements_v3',
  RULES: 'ff2023_rules_v3',
  IS_ADMIN: 'ff2023_is_admin_v3',
  ADMIN_TOKEN: 'ff2023_admin_jwt_v3',
  ADMIN_USER: 'ff2023_admin_user_v3',
  ADMIN_PIN: 'ff2023_admin_pin_v3',
  MUTED: 'ff2023_muted',
  DISCORD_VERIFIED: 'ff2023_discord_verified_v1',
  PLAYERS: 'ff2023_players_v3',
  BAN_LOGS: 'ff2023_ban_logs_v3',
  SERVER_CONFIG: 'ff2023_server_config_v3',
  VIEW_MODE: 'ff2023_view_mode_v3',
  ACTIVE_STAFF: 'ff2023_active_staff_v3',
  NEWS: 'ff2023_news_v3',
  STAFF: 'ff2023_staff_v3',
  AUDIT_LOGS: 'ff2023_audit_logs_v3',
  STATS: 'ff2023_stats_v3'
};

const DEFAULT_ADMIN_PIN = 'Admin@FF2026!#';

export const ServerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Toasts
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sound state
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.MUTED) === 'true';
    } catch {
      return false;
    }
  });

  const toggleSound = () => {
    const nextState = !isSoundMuted;
    setIsSoundMuted(nextState);
    try {
      localStorage.setItem(STORAGE_KEYS.MUTED, String(nextState));
    } catch {
      // ignore
    }
  };

  // Discord verification
  const [isDiscordVerified, setIsDiscordVerified] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.DISCORD_VERIFIED) === 'true';
    } catch {
      return false;
    }
  });

  const verifyDiscordJoin = () => {
    setIsDiscordVerified(true);
    try {
      localStorage.setItem(STORAGE_KEYS.DISCORD_VERIFIED, 'true');
    } catch {
      // ignore
    }
    sound.playSuccess();
    showToast('تم تأكيد انضمامك إلى سيرفر ديسكورد الرسمي! تم فتح روابط التحميل.', 'success');
  };

  const resetDiscordVerification = () => {
    setIsDiscordVerified(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.DISCORD_VERIFIED);
    } catch {
      // ignore
    }
    showToast('تمت إعادة تعيين التحقق من ديسكورد', 'info');
  };

  // Admin Auth State & JWT
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
    } catch {
      return null;
    }
  });

  const [adminUser, setAdminUser] = useState<StaffMember | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.IS_ADMIN) === 'true' || Boolean(adminToken);
    } catch {
      return false;
    }
  });

  const adminRole: AdminRoleType = adminUser?.role || 'owner';
  const [activeStaffName, setActiveStaffName] = useState<string>(() => {
    return adminUser?.displayName || 'المالك المطور (Admin Owner)';
  });

  const [adminPin, setAdminPin] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || DEFAULT_ADMIN_PIN;
    } catch {
      return DEFAULT_ADMIN_PIN;
    }
  });

  const changeAdminPin = (newPin: string) => {
    setAdminPin(newPin);
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, newPin);
    } catch {
      // ignore
    }
    showToast('تم تحديث الرمز السري بنجاح!', 'success');
  };

  // Server Info
  const [serverInfo, setServerInfo] = useState<ServerInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INFO);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialServerInfo,
          ...parsed,
          discordInviteUrl: parsed.discordInviteUrl || 'https://discord.gg/m6etCxgUX',
        };
      }
    } catch {
      // fallback
    }
    return initialServerInfo;
  });

  const updateServerInfo = (info: Partial<ServerInfo>) => {
    setServerInfo((prev) => {
      const updated = { ...prev, ...info };
      try {
        localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    sound.playSuccess();
    showToast('تم تحديث معلومات السيرفر بنجاح', 'success');
  };

  // Download Info
  const [downloadInfo, setDownloadInfo] = useState<GameDownloadInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DOWNLOADS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialDownloadInfo,
          ...parsed,
          discordInviteUrl: parsed.discordInviteUrl || 'https://discord.gg/m6etCxgUX',
          releaseNotes: parsed.releaseNotes || initialDownloadInfo.releaseNotes || '• إرجاع خريطة بيرمودا 2023 الأصلية\n• ضبط وتوازن ضرر الشوتجان المزدوج M1887 وضرر MP40 الكلاسيكي\n• تفعيل نظام الحماية ومكافحة الهاك والبرامج الخبيثة بنسبة 99.8%\n• دعم أجهزة أندرويد 7 إلى 14 مع أداء 60/90 إطار سلس للغاية',
          forceUpdate: parsed.forceUpdate !== undefined ? parsed.forceUpdate : false,
          checksumMd5: parsed.checksumMd5 || 'd41d8cd98f00b204e9800998ecf8427e',
          checksumSha256: parsed.checksumSha256 || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
        };
      }
    } catch {
      // fallback
    }
    return {
      ...initialDownloadInfo,
      releaseNotes: '• إرجاع خريطة بيرمودا 2023 الأصلية\n• ضبط وتوازن ضرر الشوتجان المزدوج M1887 وضرر MP40 الكلاسيكي\n• تفعيل نظام الحماية ومكافحة الهاك والبرامج الخبيثة بنسبة 99.8%\n• دعم أجهزة أندرويد 7 إلى 14 مع أداء 60/90 إطار سلس للغاية',
      forceUpdate: false,
      checksumMd5: 'd41d8cd98f00b204e9800998ecf8427e',
      checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    };
  });

  const updateDownloadInfo = (info: Partial<GameDownloadInfo>) => {
    setDownloadInfo((prev) => {
      const updated = { ...prev, ...info };
      try {
        localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    sound.playSuccess();
    showToast('تم حفظ روابط ومعلومات التحميل بنجاح', 'success');
  };

  // Live Room
  const [liveRoom, setLiveRoom] = useState<LiveRoomInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LIVE_ROOM);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialLiveRoom;
  });

  const updateLiveRoom = (info: Partial<LiveRoomInfo>) => {
    setLiveRoom((prev) => {
      const updated = { ...prev, ...info };
      try {
        localStorage.setItem(STORAGE_KEYS.LIVE_ROOM, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    sound.playSuccess();
    showToast('تم تحديث بيانات الروم المباشر بنجاح', 'success');
  };

  // Redeem Codes
  const [redeemCodes, setRedeemCodes] = useState<RedeemCode[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REDEEM_CODES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialRedeemCodes;
  });

  const addRedeemCode = (code: Omit<RedeemCode, 'id'>) => {
    const newCode: RedeemCode = {
      ...code,
      id: 'code_' + Date.now()
    };
    setRedeemCodes((prev) => {
      const updated = [newCode, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.REDEEM_CODES, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    sound.playSuccess();
    showToast(`تمت إضافة كود الهدايا [${newCode.code}] بنجاح`, 'success');
  };

  const toggleRedeemCode = (id: string) => {
    setRedeemCodes((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c));
      try {
        localStorage.setItem(STORAGE_KEYS.REDEEM_CODES, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const deleteRedeemCode = (id: string) => {
    setRedeemCodes((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.REDEEM_CODES, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('تم حذف كود الهدية بنجاح', 'info');
  };

  const claimCode = (codeStr: string): { success: boolean; message: string; reward?: string } => {
    const clean = codeStr.trim().toUpperCase();
    const found = redeemCodes.find((c) => c.code.toUpperCase() === clean);

    if (!found) {
      sound.playError();
      return { success: false, message: 'الكود غير صحيح أو منتهي الصلاحية!' };
    }

    if (!found.isActive) {
      sound.playError();
      return { success: false, message: 'هذا الكود غير نشط حالياً، تم إيقافه من الإدارة.' };
    }

    if (found.usesLeft <= 0) {
      sound.playError();
      return { success: false, message: 'للأسف، نفدت جميع استخدامات هذا الكود!' };
    }

    // Decrement uses left
    setRedeemCodes((prev) => {
      const updated = prev.map((c) => {
        if (c.id === found.id) {
          const newUses = c.usesLeft - 1;
          return { ...c, usesLeft: newUses, isActive: newUses > 0 };
        }
        return c;
      });
      try {
        localStorage.setItem(STORAGE_KEYS.REDEEM_CODES, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    sound.playReward();
    return {
      success: true,
      message: 'تهانينا! تم تفعيل الكود بنجاح وإضافة الجائزة إلى حسابك:',
      reward: found.reward
    };
  };

  // Roles
  const [roles, setRoles] = useState<ServerRole[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROLES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialRoles;
  });

  const addRole = (role: Omit<ServerRole, 'id'>) => {
    const newRole: ServerRole = { ...role, id: 'role_' + Date.now() };
    setRoles((prev) => {
      const updated = [...prev, newRole];
      try {
        localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast(`تمت إضافة رتبة [${newRole.name}] بنجاح`, 'success');
  };

  const updateRole = (id: string, role: Partial<ServerRole>) => {
    setRoles((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, ...role } : r));
      try {
        localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('تم تحديث الرتبة بنجاح', 'success');
  };

  const deleteRole = (id: string) => {
    setRoles((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('تم حذف الرتبة بنجاح', 'info');
  };

  // Comments
  const [comments, setComments] = useState<CommunityComment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialComments;
  });

  const addComment = (comment: Omit<CommunityComment, 'id' | 'createdAt' | 'likes' | 'isPinned' | 'adminReply'>) => {
    const newComment: CommunityComment = {
      ...comment,
      id: 'c_' + Date.now(),
      createdAt: 'الآن',
      likes: 0,
      isPinned: false,
      adminReply: null
    };
    setComments((prev) => {
      const updated = [newComment, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    sound.playSuccess();
    showToast('شكراً لك! تم نشر تعليقك في مجتمع اللعبة بنجاح.', 'success');
  };

  const addAdminReply = (commentId: string, replyText: string, customAdminRole?: string) => {
    const reply: AdminReply = {
      id: 'rep_' + Date.now(),
      authorName: activeStaffName,
      authorRole: customAdminRole || 'المطور / مطور السيرفر',
      avatarBadge: '⚡',
      content: replyText,
      createdAt: 'الآن'
    };
    setComments((prev) => {
      const updated = prev.map((c) => (c.id === commentId ? { ...c, adminReply: reply } : c));
      try {
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    sound.playSuccess();
    showToast('تم نشر رد المطور على التعليق بنجاح', 'success');
  };

  const editAdminReply = (commentId: string, replyText: string) => {
    setComments((prev) => {
      const updated = prev.map((c) => {
        if (c.id === commentId && c.adminReply) {
          return {
            ...c,
            adminReply: {
              ...c.adminReply,
              content: replyText,
              createdAt: 'معدّل الآن'
            }
          };
        }
        return c;
      });
      try {
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('تم تعديل رد المطور بنجاح', 'success');
  };

  const deleteAdminReply = (commentId: string) => {
    setComments((prev) => {
      const updated = prev.map((c) => (c.id === commentId ? { ...c, adminReply: null } : c));
      try {
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('تم حذف رد المطور', 'info');
  };

  const togglePinComment = (commentId: string) => {
    setComments((prev) => {
      const updated = prev.map((c) => (c.id === commentId ? { ...c, isPinned: !c.isPinned } : c));
      try {
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const deleteComment = (commentId: string) => {
    setComments((prev) => {
      const updated = prev.filter((c) => c.id !== commentId);
      try {
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('تم حذف التعليق بنجاح', 'info');
  };

  const likeComment = (commentId: string) => {
    setComments((prev) => {
      const updated = prev.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
      try {
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Announcements
  const [announcements, setAnnouncements] = useState<ServerAnnouncement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialAnnouncements;
  });

  const addAnnouncement = (announcement: Omit<ServerAnnouncement, 'id'>) => {
    const newAnn: ServerAnnouncement = { ...announcement, id: 'ann_' + Date.now() };
    setAnnouncements((prev) => {
      const updated = [newAnn, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('تمت إضافة الإعلان بنجاح', 'success');
  };

  const updateAnnouncement = (id: string, announcement: Partial<ServerAnnouncement>) => {
    setAnnouncements((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, ...announcement } : a));
      try {
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('تم تحديث الإعلان بنجاح', 'success');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('تم حذف الإعلان بنجاح', 'info');
  };

  // Rules
  const [rules, setRules] = useState<ServerRule[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RULES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialRules;
  });

  const addRule = (rule: Omit<ServerRule, 'id'>) => {
    const newRule: ServerRule = { ...rule, id: 'rule_' + Date.now() };
    setRules((prev) => {
      const updated = [...prev, newRule];
      try {
        localStorage.setItem(STORAGE_KEYS.RULES, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('تمت إضافة القانون بنجاح', 'success');
  };

  const updateRule = (id: string, rule: Partial<ServerRule>) => {
    setRules((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, ...rule } : r));
      try {
        localStorage.setItem(STORAGE_KEYS.RULES, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('تم تحديث القانون بنجاح', 'success');
  };

  const deleteRule = (id: string) => {
    setRules((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.RULES, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('تم حذف القانون بنجاح', 'info');
  };

  // Players
  const [players, setPlayers] = useState<PlayerAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PLAYERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialPlayers;
  });

  const [availableSkins] = useState<PlayerSkinItem[]>(initialAvailableSkins);

  const [banLogs, setBanLogs] = useState<BanLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BAN_LOGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialBanLogs;
  });

  const [serverConfig, setServerConfig] = useState<GameServerConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVER_CONFIG);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialGameServerConfig;
  });

  const [viewMode, setViewModeState] = useState<'public' | 'admin-console'>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('site') === 'admin' || window.location.hash === '#admin') {
          return 'admin-console';
        }
      }
      return (localStorage.getItem(STORAGE_KEYS.VIEW_MODE) as any) || 'public';
    } catch {
      return 'public';
    }
  });

  const setViewMode = (mode: 'public' | 'admin-console') => {
    setViewModeState(mode);
    try {
      localStorage.setItem(STORAGE_KEYS.VIEW_MODE, mode);
    } catch {
      // ignore
    }
  };

  // -------------------------------------------------------------
  // Full-Stack: News, Staff, Audit Logs, Stats State
  // -------------------------------------------------------------

  const [newsList, setNewsList] = useState<NewsItemType[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEWS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'news_01',
        title: 'إطلاق الإصدار v1.98.2 وتحسين استقرار خوادم الشرق الأوسط وشمال إفريقيا',
        content: 'يسر فريق تطوير النسخة الأسطورية الإعلان عن اكتمال طرح الإصدار الجديد مع دعم كامل للبينغ المنخفض (20ms-40ms) وإعادة توازن أسلحة كلاش سكواد وإصلاح مشكلة تسجيل الدخول عبر فيسبوك وديسكورد.',
        category: 'update',
        tag: 'تحديث جديد',
        reward: '1,000 جوهرة لجميع اللاعبين',
        isPinned: true,
        date: '2026-10-06',
        author: 'المالك المطور',
        views: 3410
      },
      {
        id: 'news_02',
        title: 'بطولة كلان الأساطير الأسبوعية الكبرى مع جوائز ماسية حصرية',
        content: 'تنطلق هذا الجمعة بطولة السكوادات الكبرى على سيرفر ديسكورد الرسمي (رابط https://discord.gg/m6etCxgUX). التسجيل مفتوح للكلانات عبر بوت الديسكورد وتوزيع مفاتيح الروم الحصري.',
        category: 'event',
        tag: 'بطولة كبرى',
        reward: '20,000 جوهرة للمركز الأول + سكن بندل الهيب هوب',
        isPinned: true,
        date: '2026-10-04',
        author: 'إدارة المسابقات',
        views: 2850
      },
      {
        id: 'news_03',
        title: 'موجة حظر صارمة (Ban Wave) تطال 142 حساباً حاولوا استخدام برامج مساعدة',
        content: 'نؤكد للجميع أن خوادمنا تعتمد نظام فحص مستمر للبيانات ومكافحة التلاعب. تم حظر جميع الحسابات المخالفة نهائياً مع حظر بصمة الجهاز (Device HWID Ban). العب بنزاهة لتحافظ على حسابك!',
        category: 'community',
        tag: 'حماية وأمان',
        isPinned: false,
        date: '2026-10-01',
        author: 'نظام الحماية الآلي',
        views: 1920
      }
    ];
  });

  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STAFF);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'usr_owner_01',
        username: 'admin',
        displayName: 'المالك المطور (Admin Owner)',
        role: 'owner',
        email: 'monsefmumo@gmail.com',
        createdAt: '2026-01-01',
        lastLogin: '2026-10-08 16:30'
      },
      {
        id: 'usr_mod_02',
        username: 'mod_tarek',
        displayName: 'طارق المشرف (Moderator)',
        role: 'moderator',
        email: 'tarek.mod@freefire-community.dz',
        createdAt: '2026-02-15',
        lastLogin: '2026-10-08 14:15'
      }
    ];
  });

  const [auditLogsList, setAuditLogsList] = useState<AuditLogItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'log_01',
        adminUsername: 'admin',
        adminRole: 'owner',
        action: 'INIT_SYSTEM',
        details: 'تهيئة الخادم الأولي وضبط قواعد الحماية ومفاتيح التشفير',
        ipAddress: '127.0.0.1',
        timestamp: new Date().toISOString()
      }
    ];
  });

  const [siteStats, setSiteStats] = useState({
    visitors: 28940,
    downloads: 14280,
    apiQueries: 124300,
    onlinePlayers: 342,
    totalPlayers: 1840,
    bannedPlayers: 14
  });

  // Fetch initial data from server on load
  useEffect(() => {
    // Record page visit
    fetch('/api/v1/stats/visit', { method: 'POST' }).catch(() => {});

    // Fetch site stats
    fetch('/api/v1/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setSiteStats((prev) => ({ ...prev, ...data.data }));
        }
      })
      .catch(() => {});

    // Fetch news
    fetch('/api/v1/news')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setNewsList(data.data);
          try {
            localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(data.data));
          } catch {}
        }
      })
      .catch(() => {});

    // Fetch version
    fetch('/api/v1/version')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setDownloadInfo((prev) => ({
            ...prev,
            ...data.data,
            isMaintenance: Boolean(data.maintenance)
          }));
        }
      })
      .catch(() => {});
  }, []);

  // Fetch audit logs helper
  const fetchAuditLogs = async () => {
    if (!adminToken) return;
    try {
      const res = await fetch('/api/admin/audit-logs', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setAuditLogsList(data.data);
        try {
          localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(data.data));
        } catch {}
      }
    } catch {
      // ignore
    }
  };

  // Fetch staff helper
  const fetchStaff = async () => {
    if (!adminToken) return;
    try {
      const res = await fetch('/api/admin/staff', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setStaffMembers(data.data);
        try {
          localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(data.data));
        } catch {}
      }
    } catch {
      // ignore
    }
  };

  // Login With Username & Password
  const loginWithCredentials = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; message: string; isLocked?: boolean; remainingSeconds?: number; attemptsLeft?: number }> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setAdminToken(data.token);
        setAdminUser(data.user);
        setIsAdmin(true);
        setActiveStaffName(data.user.displayName || username);
        try {
          localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, data.token);
          localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(data.user));
          localStorage.setItem(STORAGE_KEYS.IS_ADMIN, 'true');
        } catch {}

        showToast(`مرحباً بك يا ${data.user.displayName}! تم تسجيل الدخول بنجاح.`, 'success');
        return { success: true, message: data.message };
      } else {
        return {
          success: false,
          message: data.message || 'بيانات الدخول غير صحيحة',
          isLocked: data.isLocked,
          remainingSeconds: data.remainingSeconds,
          attemptsLeft: data.attemptsLeft
        };
      }
    } catch (err) {
      // Local fallback in case network error
      if (
        (username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'owner') &&
        (password === 'Admin@FF2026!#' || password === adminPin)
      ) {
        const dummyUser: StaffMember = {
          id: 'usr_owner_local',
          username: 'admin',
          displayName: 'المالك المطور (Admin Owner)',
          role: 'owner',
          email: 'monsefmumo@gmail.com',
          createdAt: '2026-01-01'
        };
        setAdminToken('mock_jwt_token_local');
        setAdminUser(dummyUser);
        setIsAdmin(true);
        setActiveStaffName(dummyUser.displayName);
        try {
          localStorage.setItem(STORAGE_KEYS.IS_ADMIN, 'true');
          localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(dummyUser));
        } catch {}
        showToast('تم تسجيل الدخول كمالك بنجاح!', 'success');
        return { success: true, message: 'تم الدخول بنجاح' };
      }
      return { success: false, message: 'تعذر الاتصال بالخادم، تأكد من صحة البيانات' };
    }
  };

  // Unlock Admin (legacy PIN or password)
  const unlockAdmin = (pin: string): boolean => {
    if (pin.trim() === adminPin.trim() || pin.trim() === DEFAULT_ADMIN_PIN || pin.trim() === 'Admin@FF2026!#') {
      setIsAdmin(true);
      try {
        localStorage.setItem(STORAGE_KEYS.IS_ADMIN, 'true');
      } catch {}
      sound.playSuccess();
      showToast('تم التحقق وتفعيل صلاحيات الإدارة الكاملة بنجاح ⚡', 'success');
      return true;
    }
    sound.playError();
    showToast('رمز الدخول غير صحيح! يرجى إدخال كلمة المرور الصحيحة.', 'error');
    return false;
  };

  const lockAdmin = () => {
    setIsAdmin(false);
    setAdminToken(null);
    setAdminUser(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.IS_ADMIN);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
    } catch {}
    sound.playClick();
    showToast('تم قفل لوحة التحكم وتسجيل الخروج بنجاح.', 'info');
  };

  // Toggle Maintenance
  const toggleMaintenanceMode = async (isMaintenance: boolean, message?: string, estimatedEnd?: string) => {
    const finalMsg = message || downloadInfo.maintenanceMessage;
    // update local
    setDownloadInfo((prev) => {
      const updated = {
        ...prev,
        isMaintenance,
        maintenanceMessage: finalMsg
      };
      try {
        localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Send to API
    try {
      await fetch('/api/admin/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify({ isMaintenance, message: finalMsg, estimatedEnd })
      });
    } catch {}

    sound.playSuccess();
    showToast(isMaintenance ? '⚠️ تم تفعيل وضع الصيانة وتنبيه جميع الزوار!' : '✅ تم إيقاف وضع الصيانة والسيرفر متاح الآن للجميع!', 'info');
  };

  // Publish New Version
  const publishNewVersion = async (versionData: Partial<GameDownloadInfo>) => {
    const updated = { ...downloadInfo, ...versionData, lastUpdated: new Date().toISOString().split('T')[0] };
    setDownloadInfo(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(updated));
    } catch {}

    // Send to API
    try {
      await fetch('/api/admin/version', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify(updated)
      });
    } catch {}

    sound.playSuccess();
    showToast(`تم نشر الإصدار [${updated.version}] بنجاح وتحديث روابط التحميل!`, 'success');
  };

  // News Actions
  const addNewsItem = async (news: Omit<NewsItemType, 'id' | 'views'>): Promise<boolean> => {
    const newItem: NewsItemType = {
      ...news,
      id: 'news_' + Date.now(),
      views: 0
    };
    setNewsList((prev) => {
      const updated = [newItem, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      await fetch('/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify(news)
      });
    } catch {}

    sound.playSuccess();
    showToast('تمت إضافة الخبر ونشره في الموقع بنجاح!', 'success');
    return true;
  };

  const editNewsItem = async (id: string, news: Partial<NewsItemType>): Promise<boolean> => {
    setNewsList((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, ...news } : n));
      try {
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      await fetch(`/api/admin/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify(news)
      });
    } catch {}

    sound.playSuccess();
    showToast('تم تحديث الخبر بنجاح!', 'success');
    return true;
  };

  const deleteNewsItem = async (id: string): Promise<boolean> => {
    setNewsList((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE',
        headers: {
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
        }
      });
    } catch {}

    showToast('تم حذف الخبر بنجاح', 'info');
    return true;
  };

  // Staff Actions
  const addStaffMember = async (data: {
    username: string;
    password: string;
    displayName: string;
    role: AdminRoleType;
    email?: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch('/api/admin/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        fetchStaff();
        showToast('تمت إضافة المشرف بنجاح!', 'success');
        return { success: true, message: resData.message };
      }
      return { success: false, message: resData.message || 'فشلت إضافة المشرف' };
    } catch {
      // Local fallback
      const newStaff: StaffMember = {
        id: 'usr_' + Date.now(),
        username: data.username,
        displayName: data.displayName,
        role: data.role,
        email: data.email,
        createdAt: new Date().toISOString()
      };
      setStaffMembers((prev) => {
        const updated = [...prev, newStaff];
        try {
          localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(updated));
        } catch {}
        return updated;
      });
      showToast('تمت إضافة المشرف بنجاح!', 'success');
      return { success: true, message: 'تمت إضافة المشرف بنجاح' };
    }
  };

  const changeStaffRole = async (id: string, role: AdminRoleType): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch(`/api/admin/staff/${id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify({ role })
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        fetchStaff();
        showToast(`تم تغيير رتبة المشرف إلى ${role}`, 'success');
        return { success: true, message: resData.message };
      }
    } catch {}

    setStaffMembers((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, role } : s));
      try {
        localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast(`تم تعديل الرتبة بنجاح`, 'success');
    return { success: true, message: 'تم تحديث الرتبة' };
  };

  const deleteStaffMember = async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await fetch(`/api/admin/staff/${id}`, {
        method: 'DELETE',
        headers: {
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
        }
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        fetchStaff();
        showToast('تم حذف المشرف بنجاح', 'info');
        return { success: true, message: resData.message };
      }
      return { success: false, message: resData.message };
    } catch {}

    setStaffMembers((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast('تم حذف المشرف بنجاح', 'info');
    return { success: true, message: 'تم حذف المشرف بنجاح' };
  };

  // Record Download Counter
  const recordSiteDownload = async () => {
    setSiteStats((prev) => ({ ...prev, downloads: prev.downloads + 1 }));
    setDownloadInfo((prev) => ({ ...prev, downloadCount: prev.downloadCount + 1 }));
    try {
      await fetch('/api/v1/stats/download', { method: 'POST' });
    } catch {}
  };

  // Gift Diamonds / Gold / Skins
  const giftDiamondsAndGold = async (
    playerId: string,
    diamonds: number,
    gold: number,
    skinId?: string,
    note?: string
  ): Promise<boolean> => {
    setPlayers((prev) => {
      const updated = prev.map((p) => {
        if (p.id === playerId || p.playerId === playerId) {
          const newSkins = skinId && !p.ownedSkins.includes(skinId) ? [...p.ownedSkins, skinId] : p.ownedSkins;
          return {
            ...p,
            diamonds: Math.max(0, p.diamonds + (diamonds || 0)),
            gold: Math.max(0, p.gold + (gold || 0)),
            ownedSkins: newSkins
          };
        }
        return p;
      });
      try {
        localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      await fetch(`/api/admin/players/${playerId}/gift`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify({ diamonds, gold, skinId, giftNote: note })
      });
    } catch {}

    sound.playReward();
    showToast('تم إرسال الهدية إلى حساب اللاعب بنجاح! 💎', 'success');
    return true;
  };

  // Player Bans
  const banPlayer = (playerId: string, reason: string, banType: 'permanent' | 'temporary' = 'permanent', adminName?: string) => {
    const admin = adminName || activeStaffName;
    let targetNickname = 'اللاعب';
    setPlayers((prev) => {
      const updated = prev.map((p) => {
        if (p.id === playerId || p.playerId === playerId) {
          targetNickname = p.nickname;
          return {
            ...p,
            isBanned: true,
            banReason: reason,
            banType,
            bannedAt: new Date().toISOString(),
            bannedBy: admin
          };
        }
        return p;
      });
      try {
        localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Add to ban logs
    const logEntry: BanLogEntry = {
      id: 'banlog_' + Date.now(),
      playerId,
      playerNickname: targetNickname,
      action: 'ban',
      reason,
      adminName: admin,
      timestamp: new Date().toISOString()
    };
    setBanLogs((prev) => {
      const updated = [logEntry, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.BAN_LOGS, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Send to API
    try {
      fetch(`/api/admin/players/${playerId}/ban`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify({ isBanned: true, reason, banType })
      }).catch(() => {});
    } catch {}

    sound.playError();
    showToast(`تم حظر اللاعب [${targetNickname}] بنجاح`, 'error');
  };

  const unbanPlayer = (playerId: string, adminName?: string) => {
    const admin = adminName || activeStaffName;
    let targetNickname = 'اللاعب';
    setPlayers((prev) => {
      const updated = prev.map((p) => {
        if (p.id === playerId || p.playerId === playerId) {
          targetNickname = p.nickname;
          return {
            ...p,
            isBanned: false,
            banReason: undefined,
            banType: undefined,
            bannedAt: undefined,
            bannedBy: undefined
          };
        }
        return p;
      });
      try {
        localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Log
    const logEntry: BanLogEntry = {
      id: 'banlog_' + Date.now(),
      playerId,
      playerNickname: targetNickname,
      action: 'unban',
      reason: 'فك الحظر بقرار إداري',
      adminName: admin,
      timestamp: new Date().toISOString()
    };
    setBanLogs((prev) => {
      const updated = [logEntry, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.BAN_LOGS, JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Send to API
    try {
      fetch(`/api/admin/players/${playerId}/ban`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify({ isBanned: false })
      }).catch(() => {});
    } catch {}

    sound.playSuccess();
    showToast(`تم فك الحظر عن اللاعب [${targetNickname}] بنجاح`, 'success');
  };

  const grantSkinToPlayer = (playerId: string, skinId: string) => {
    setPlayers((prev) => {
      const updated = prev.map((p) => {
        if (p.id === playerId || p.playerId === playerId) {
          if (!p.ownedSkins.includes(skinId)) {
            return { ...p, ownedSkins: [...p.ownedSkins, skinId] };
          }
        }
        return p;
      });
      try {
        localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    sound.playReward();
    showToast(`تمت إضافة السكن إلى حساب اللاعب بنجاح!`, 'success');
  };

  const revokeSkinFromPlayer = (playerId: string, skinId: string) => {
    setPlayers((prev) => {
      const updated = prev.map((p) => {
        if (p.id === playerId || p.playerId === playerId) {
          return { ...p, ownedSkins: p.ownedSkins.filter((s) => s !== skinId) };
        }
        return p;
      });
      try {
        localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast('تم سحب السكن من حساب اللاعب', 'info');
  };

  const addDiamondsToPlayer = (playerId: string, amount: number) => {
    giftDiamondsAndGold(playerId, amount, 0);
  };

  const addPlayer = (player: Omit<PlayerAccount, 'id' | 'createdAt'>) => {
    const newPlayer: PlayerAccount = {
      ...player,
      id: 'p_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPlayers((prev) => {
      const updated = [newPlayer, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    sound.playSuccess();
    showToast(`تمت إضافة الحساب الجديد بنجاح (UID: ${newPlayer.playerId})`, 'success');
  };

  const updatePlayer = (id: string, updates: Partial<PlayerAccount>) => {
    setPlayers((prev) => {
      const updated = prev.map((p) => (p.id === id || p.playerId === id ? { ...p, ...updates } : p));
      try {
        localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast('تم تحديث بيانات اللاعب بنجاح', 'success');
  };

  const deletePlayer = (id: string) => {
    setPlayers((prev) => {
      const updated = prev.filter((p) => p.id !== id && p.playerId !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast('تم حذف الحساب من السيرفر', 'info');
  };

  const updateServerConfig = (config: Partial<GameServerConfig>) => {
    setServerConfig((prev) => {
      const updated = { ...prev, ...config };
      try {
        localStorage.setItem(STORAGE_KEYS.SERVER_CONFIG, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    sound.playSuccess();
    showToast('تم تطبيق إعدادات محرك اللعبة وتوازن الأسلحة بنجاح!', 'success');
  };

  const resetToDefaults = () => {
    setServerInfo(initialServerInfo);
    setDownloadInfo(initialDownloadInfo);
    setLiveRoom(initialLiveRoom);
    setRedeemCodes(initialRedeemCodes);
    setRoles(initialRoles);
    setComments(initialComments);
    setAnnouncements(initialAnnouncements);
    setRules(initialRules);
    setPlayers(initialPlayers);
    setBanLogs(initialBanLogs);
    setServerConfig(initialGameServerConfig);
    setAdminPin(DEFAULT_ADMIN_PIN);
    setIsAdmin(false);

    Object.values(STORAGE_KEYS).forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch {}
    });

    sound.playSuccess();
    showToast('تمت استعادة الإعدادات الافتراضية بنجاح!', 'info');
  };

  const exportDataJson = (): string => {
    const fullBackup = {
      serverInfo,
      downloadInfo,
      liveRoom,
      redeemCodes,
      roles,
      comments,
      announcements,
      rules,
      players,
      banLogs,
      serverConfig,
      newsList,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(fullBackup, null, 2);
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.serverInfo) setServerInfo(parsed.serverInfo);
      if (parsed.downloadInfo) setDownloadInfo(parsed.downloadInfo);
      if (parsed.liveRoom) setLiveRoom(parsed.liveRoom);
      if (parsed.redeemCodes) setRedeemCodes(parsed.redeemCodes);
      if (parsed.roles) setRoles(parsed.roles);
      if (parsed.comments) setComments(parsed.comments);
      if (parsed.announcements) setAnnouncements(parsed.announcements);
      if (parsed.rules) setRules(parsed.rules);
      if (parsed.players) setPlayers(parsed.players);
      if (parsed.banLogs) setBanLogs(parsed.banLogs);
      if (parsed.serverConfig) setServerConfig(parsed.serverConfig);
      if (parsed.newsList) setNewsList(parsed.newsList);
      sound.playSuccess();
      showToast('تم استيراد واسترجاع بيانات السيرفر بنجاح!', 'success');
      return true;
    } catch {
      showToast('خطأ: ملف النسخة الاحتياطية غير صالح!', 'error');
      return false;
    }
  };

  return (
    <ServerContext.Provider
      value={{
        serverInfo,
        updateServerInfo,
        downloadInfo,
        updateDownloadInfo,
        liveRoom,
        updateLiveRoom,
        redeemCodes,
        addRedeemCode,
        toggleRedeemCode,
        deleteRedeemCode,
        claimCode,
        roles,
        addRole,
        updateRole,
        deleteRole,
        comments,
        addComment,
        addAdminReply,
        editAdminReply,
        deleteAdminReply,
        togglePinComment,
        deleteComment,
        likeComment,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        rules,
        addRule,
        updateRule,
        deleteRule,
        isAdmin,
        adminPin,
        unlockAdmin,
        lockAdmin,
        changeAdminPin,
        isSoundMuted,
        toggleSound,
        isDiscordVerified,
        verifyDiscordJoin,
        resetDiscordVerification,
        players,
        availableSkins,
        banLogs,
        serverConfig,
        addPlayer,
        updatePlayer,
        deletePlayer,
        banPlayer,
        unbanPlayer,
        grantSkinToPlayer,
        revokeSkinFromPlayer,
        addDiamondsToPlayer,
        updateServerConfig,
        viewMode,
        setViewMode,
        activeStaffName,
        setActiveStaffName,
        toasts,
        showToast,
        removeToast,
        resetToDefaults,
        exportDataJson,
        importDataJson,
        adminUser,
        adminRole,
        adminToken,
        loginWithCredentials,
        staffMembers,
        addStaffMember,
        changeStaffRole,
        deleteStaffMember,
        newsList,
        addNewsItem,
        editNewsItem,
        deleteNewsItem,
        auditLogsList,
        fetchAuditLogs,
        siteStats,
        recordSiteDownload,
        toggleMaintenanceMode,
        publishNewVersion,
        giftDiamondsAndGold
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = (): ServerContextType => {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServer must be used within a ServerProvider');
  }
  return context;
};
