import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  role: 'owner' | 'moderator';
  displayName: string;
  email: string;
  createdAt: string;
  lastLogin: string | null;
  failedAttempts: number;
  lockUntil: number | null; // epoch ms
}

export interface VersionInfo {
  version: string;
  apkUrl: string;
  obbUrl: string;
  pcEmulatorUrl: string;
  apkSize: string;
  obbSize: string;
  releaseNotes: string;
  forceUpdate: boolean;
  minSupportedVersion: string;
  lastUpdated: string;
  checksumMd5: string;
  checksumSha256: string;
  downloadCount: number;
}

export interface MaintenanceInfo {
  isMaintenance: boolean;
  message: string;
  startedAt: string | null;
  estimatedEnd: string | null;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: 'update' | 'event' | 'maintenance' | 'community';
  tag: string;
  reward?: string;
  isPinned: boolean;
  date: string;
  author: string;
  views: number;
}

export interface AuditLog {
  id: string;
  adminUsername: string;
  adminRole: string;
  action: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface PlayerAccount {
  id: string;
  playerId: string; // Free Fire UID
  nickname: string;
  level: number;
  rank: string;
  diamonds: number;
  gold: number;
  deviceModel: string;
  ipAddress: string;
  isBanned: boolean;
  banReason?: string;
  banType?: 'permanent' | 'temporary' | 'mute';
  bannedAt?: string;
  bannedBy?: string;
  ownedSkins: string[];
  suspicionScore: number;
  createdAt: string;
  lastLogin: string;
}

export interface DiscordAccessKey {
  id: string;
  key: string;
  role: string;
  assignedTo: string;
  discordId: string;
  usesLeft: number;
  isActive: boolean;
  createdAt: string;
}

export interface AppStoreData {
  users: AdminUser[];
  version: VersionInfo;
  maintenance: MaintenanceInfo;
  news: NewsItem[];
  auditLogs: AuditLog[];
  players: PlayerAccount[];
  discordKeys: DiscordAccessKey[];
  stats: {
    visitors: number;
    downloads: number;
    apiQueries: number;
    lastVisit: string;
  };
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'freefire_data.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default seeding
function getDefaultStore(): AppStoreData {
  const initialAdminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'Admin@FF2026!#';
  const initialAdminUsername = process.env.INITIAL_ADMIN_USERNAME || 'admin';
  const salt = bcrypt.genSaltSync(10);
  const ownerHash = bcrypt.hashSync(initialAdminPassword, salt);
  const modHash = bcrypt.hashSync('Mod@2026Secure', salt);

  return {
    users: [
      {
        id: 'usr_owner_01',
        username: initialAdminUsername,
        passwordHash: ownerHash,
        role: 'owner',
        displayName: 'المالك المطور (Admin Owner)',
        email: 'monsefmumo@gmail.com',
        createdAt: '2026-01-01T00:00:00.000Z',
        lastLogin: null,
        failedAttempts: 0,
        lockUntil: null,
      },
      {
        id: 'usr_mod_02',
        username: 'mod_tarek',
        passwordHash: modHash,
        role: 'moderator',
        displayName: 'طارق المشرف (Moderator)',
        email: 'tarek.mod@freefire-community.dz',
        createdAt: '2026-02-15T12:00:00.000Z',
        lastLogin: null,
        failedAttempts: 0,
        lockUntil: null,
      },
    ],
    version: {
      version: 'v1.98.2 - التحديث الأسطوري',
      apkUrl: 'https://archive.org/download/free-fire-classic-2023/FreeFire_v1.98.2_Bermuda.apk',
      obbUrl: 'https://archive.org/download/free-fire-classic-2023/main.2019115982.com.dts.freefireth.obb',
      pcEmulatorUrl: 'https://www.bluestacks.com/download.html',
      apkSize: '89.4 MB',
      obbSize: '412.8 MB',
      releaseNotes: `• إرجاع خريطة بيرمودا 2023 الأصلية بدون تعديلات مزعجة\n• ضبط وتوازن ضرر الشوتجان المزدوج M1887 وضرر MP40 الكلاسيكي\n• تفعيل نظام الحماية ومكافحة الهاك والبرامج الخبيثة بنسبة 99.8%\n• دعم أجهزة أندرويد 7 إلى 14 مع أداء 60/90 إطار سلس للغاية`,
      forceUpdate: false,
      minSupportedVersion: 'v1.95.0',
      lastUpdated: new Date().toISOString().split('T')[0],
      checksumMd5: 'd41d8cd98f00b204e9800998ecf8427e',
      checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      downloadCount: 14280,
    },
    maintenance: {
      isMaintenance: false,
      message: 'السيرفر يخضع حالياً لترقية روتينية وصيانة دورية لتحسين استقرار البينغ. سنعود خلال وقت قصير!',
      startedAt: null,
      estimatedEnd: null,
    },
    news: [
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
        views: 3410,
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
        views: 2850,
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
        views: 1920,
      },
    ],
    auditLogs: [
      {
        id: 'log_01',
        adminUsername: initialAdminUsername,
        adminRole: 'owner',
        action: 'INIT_SYSTEM',
        details: 'تهيئة الخادم الأولي وضبط قواعد الحماية ومفاتيح التشفير',
        ipAddress: '127.0.0.1',
        timestamp: new Date().toISOString(),
      },
    ],
    players: [
      {
        id: 'p_101',
        playerId: '782910482',
        nickname: '🇩🇿 彡DZ_SNAKE彡',
        level: 72,
        rank: 'Heroic (بطولي) ⭐️⭐️⭐️',
        diamonds: 14500,
        gold: 89000,
        deviceModel: 'Xiaomi Poco F4 GT',
        ipAddress: '197.202.14.88',
        isBanned: false,
        ownedSkins: ['skin_sakura', 'skin_m1887_onepunch', 'skin_hiphop'],
        suspicionScore: 4,
        createdAt: '2026-01-10',
        lastLogin: '2026-10-08 14:22',
      },
      {
        id: 'p_102',
        playerId: '910283741',
        nickname: '⚡ B2K_LEGEND',
        level: 68,
        rank: 'Grandmaster (الأستاذ الأعظم)',
        diamonds: 8200,
        gold: 45000,
        deviceModel: 'Samsung Galaxy S23 Ultra',
        ipAddress: '105.101.42.19',
        isBanned: false,
        ownedSkins: ['skin_ak_dragon', 'skin_mp40_cobra'],
        suspicionScore: 8,
        createdAt: '2026-02-04',
        lastLogin: '2026-10-08 15:40',
      },
      {
        id: 'p_103',
        playerId: '648291029',
        nickname: '🚫 Hacker_X_Speed',
        level: 21,
        rank: 'Bronze I',
        diamonds: 999999,
        gold: 999999,
        deviceModel: 'Emulator / Rooted LDPlayer',
        ipAddress: '185.220.101.5',
        isBanned: true,
        banReason: 'استخدام ملفات Speed Hack وتعديل الذاكرة في الروم المخصص',
        banType: 'permanent',
        bannedAt: '2026-10-02',
        bannedBy: 'المالك المطور',
        ownedSkins: [],
        suspicionScore: 98,
        createdAt: '2026-09-28',
        lastLogin: '2026-10-02 20:15',
      },
      {
        id: 'p_104',
        playerId: '839201948',
        nickname: '👑 MOROCCAN_SNIPER',
        level: 65,
        rank: 'Heroic (بطولي)',
        diamonds: 3400,
        gold: 52000,
        deviceModel: 'iPhone 13 Pro',
        ipAddress: '196.206.88.12',
        isBanned: false,
        ownedSkins: ['skin_titan_scar'],
        suspicionScore: 2,
        createdAt: '2026-03-12',
        lastLogin: '2026-10-08 11:10',
      },
    ],
    discordKeys: [
      {
        id: 'key_01',
        key: 'FF-VIP-DISCORD-99X8',
        role: 'VIP Beta Tester',
        assignedTo: 'Mohamed_DZ#1102',
        discordId: '891028374615201938',
        usesLeft: 10,
        isActive: true,
        createdAt: '2026-10-01',
      },
      {
        id: 'key_02',
        key: 'FF-STAFF-ACCESS-77A1',
        role: 'Custom Room Host',
        assignedTo: 'Hamza_Host#4412',
        discordId: '761028374615201944',
        usesLeft: 999,
        isActive: true,
        createdAt: '2026-10-02',
      },
    ],
    stats: {
      visitors: 28940,
      downloads: 14280,
      apiQueries: 124300,
      lastVisit: new Date().toISOString(),
    },
  };
}

class Store {
  private data: AppStoreData;

  constructor() {
    this.data = this.load();
  }

  private load(): AppStoreData {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const content = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(content);
      }
    } catch (err) {
      console.error('Error loading data file, falling back to defaults:', err);
    }
    const defaults = getDefaultStore();
    this.saveData(defaults);
    return defaults;
  }

  private saveData(data: AppStoreData) {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving data to file:', err);
    }
  }

  public get(): AppStoreData {
    return this.data;
  }

  public update(updater: (data: AppStoreData) => void): AppStoreData {
    updater(this.data);
    this.saveData(this.data);
    return this.data;
  }

  public logAudit(adminUsername: string, adminRole: string, action: string, details: string, ipAddress: string) {
    const entry: AuditLog = {
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      adminUsername,
      adminRole,
      action,
      details,
      ipAddress,
      timestamp: new Date().toISOString(),
    };
    this.update((draft) => {
      draft.auditLogs.unshift(entry);
      if (draft.auditLogs.length > 500) {
        draft.auditLogs = draft.auditLogs.slice(0, 500); // keep recent 500
      }
    });
  }
}

export const dbStore = new Store();
