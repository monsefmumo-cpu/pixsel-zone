export interface GameDownloadInfo {
  apkUrl: string;
  obbUrl: string;
  pcEmulatorUrl: string;
  version: string;
  apkSize: string;
  obbSize: string;
  lastUpdated: string;
  downloadCount: number;
  isMaintenance: boolean;
  maintenanceMessage: string;
  forceUpdate?: boolean;
  minSupportedVersion?: string;
  releaseNotes?: string;
  checksumMd5?: string;
  checksumSha256?: string;
  requireDiscordJoin: boolean;
  discordInviteUrl: string;
}

export type AdminRoleType = 'owner' | 'moderator';

export interface StaffMember {
  id: string;
  username: string;
  displayName: string;
  role: AdminRoleType;
  email?: string;
  createdAt: string;
  lastLogin?: string | null;
}

export interface AuditLogItem {
  id: string;
  adminUsername: string;
  adminRole: string;
  action: string;
  details: string;
  ipAddress?: string;
  timestamp: string;
}

export interface NewsItemType {
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

export interface LiveRoomInfo {
  isActive: boolean;
  roomId: string;
  roomPassword: string;
  mode: string;
  hostName: string;
  notes: string;
  startedAt: string;
}

export interface RedeemCode {
  id: string;
  code: string;
  reward: string;
  usesLeft: number;
  isActive: boolean;
  expiresAt: string;
}

export interface ServerRole {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  bgColor: string;
  borderColor: string;
  badge: string;
  order: number;
  description: string;
  permissions: string[];
  howToGet: string;
  memberCount: number;
  isSpecial?: boolean;
}

export interface AdminReply {
  id: string;
  authorName: string;
  authorRole: string;
  avatarBadge?: string;
  content: string;
  createdAt: string;
}

export interface CommunityComment {
  id: string;
  authorName: string;
  authorTag: string; // e.g. Free Fire ID: 829104812
  avatarColor: string;
  avatarInitial: string;
  rating: number; // 1 to 5
  category: 'review' | 'suggestion' | 'bug' | 'scrim';
  content: string;
  createdAt: string;
  likes: number;
  isPinned: boolean;
  adminReply?: AdminReply | null;
}

export interface ServerAnnouncement {
  id: string;
  title: string;
  tag: string;
  date: string;
  content: string;
  reward?: string;
  status: 'upcoming' | 'active' | 'ended';
  participantsCount?: number;
}

export interface ServerRule {
  id: string;
  number: number;
  title: string;
  description: string;
  category: 'anticheat' | 'rooms' | 'emulator' | 'general';
}

export interface ServerInfo {
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  fullStory: string;
  discordInviteUrl: string;
  whatsappGroupUrl: string;
  telegramChannelUrl: string;
  youtubeUrl: string;
  onlinePlayers: number;
  totalDownloads: number;
  serverPing: string;
  serverRegion: string;
  bannerImage: string;
  logoImage: string;
  featuredFeatures: string[];
}

// ============================================
// FF 2023 GAME ADMIN & PLAYER MANAGEMENT TYPES
// ============================================

export interface PlayerSkinItem {
  id: string;
  name: string;
  category: 'weapon' | 'bundle' | 'emote' | 'gloo_wall';
  rarity: 'mythic' | 'legendary' | 'rare';
  icon: string;
  description: string;
}

export interface PlayerAccount {
  id: string;
  playerId: string; // Free Fire ID (numeric e.g. 71928410)
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
  ownedSkins: string[]; // List of PlayerSkinItem IDs
  suspicionScore: number; // 0 - 100 anti-cheat detection score
  createdAt: string;
  lastLogin: string;
}

export interface BanLogEntry {
  id: string;
  playerId: string;
  playerNickname: string;
  action: 'ban' | 'unban' | 'mute';
  reason: string;
  adminName: string;
  timestamp: string;
}

export interface GameServerConfig {
  versionBuild: string;
  m1887DamageMultiplier: number; // 1.0 - 2.0
  mp40FireRateMultiplier: number;
  awmQuickSwitchEnabled: boolean;
  antiCheatSensitivity: 'strict' | 'normal' | 'lenient';
  broadcastMessage: string;
  broadcastActive: boolean;
}
