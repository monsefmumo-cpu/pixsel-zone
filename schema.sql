-- ==============================================================================
-- FREE FIRE COMMUNITY & ADMIN BACKEND - SQL SCHEMA (SQLite / PostgreSQL Compatible)
-- ==============================================================================

-- 1. جدول مديري النظام والمشرفين (Admins & Staff)
CREATE TABLE IF NOT EXISTS staff_users (
    id VARCHAR(64) PRIMARY KEY,
    username VARCHAR(64) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- مشفرة باستخدام bcrypt
    role VARCHAR(32) NOT NULL DEFAULT 'moderator', -- 'owner' أو 'moderator'
    display_name VARCHAR(128) NOT NULL,
    email VARCHAR(128),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    failed_attempts INT DEFAULT 0,
    lock_until BIGINT NULL
);

-- 2. جدول إصدارات اللعبة وملفات التحميل (Game Releases & Download Info)
CREATE TABLE IF NOT EXISTS game_releases (
    id VARCHAR(64) PRIMARY KEY,
    version VARCHAR(64) NOT NULL,
    apk_url TEXT NOT NULL,
    obb_url TEXT NOT NULL,
    pc_emulator_url TEXT,
    apk_size VARCHAR(32) NOT NULL,
    obb_size VARCHAR(32) NOT NULL,
    release_notes TEXT NOT NULL,
    force_update BOOLEAN DEFAULT FALSE,
    min_supported_version VARCHAR(64) DEFAULT 'v1.0.0',
    checksum_md5 VARCHAR(64),
    checksum_sha256 VARCHAR(128),
    download_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. جدول حالة الصيانة العامة (Maintenance Mode)
CREATE TABLE IF NOT EXISTS server_maintenance (
    id INT PRIMARY KEY DEFAULT 1,
    is_maintenance BOOLEAN DEFAULT FALSE,
    message TEXT NOT NULL,
    started_at TIMESTAMP NULL,
    estimated_end TIMESTAMP NULL,
    updated_by VARCHAR(64)
);

-- 4. جدول الأخبار والتحديثات والإعلانات (News & Updates)
CREATE TABLE IF NOT EXISTS community_news (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(64) NOT NULL DEFAULT 'update', -- 'update', 'event', 'maintenance', 'community'
    tag VARCHAR(64) NOT NULL,
    reward VARCHAR(128) NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    views_count INT DEFAULT 0,
    author_name VARCHAR(128) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. جدول سجل النشاط الإداري والعمليات (Audit Logs)
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    admin_username VARCHAR(64) NOT NULL,
    admin_role VARCHAR(32) NOT NULL,
    action VARCHAR(64) NOT NULL, -- e.g. 'LOGIN', 'VERSION_UPDATE', 'MAINTENANCE_TOGGLE'
    details TEXT NOT NULL,
    ip_address VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. جدول حسابات اللاعبين وحظر الحسابات (Player Accounts & Bans)
CREATE TABLE IF NOT EXISTS player_accounts (
    id VARCHAR(64) PRIMARY KEY,
    player_uid VARCHAR(32) UNIQUE NOT NULL, -- UID فري فاير
    nickname VARCHAR(64) NOT NULL,
    level INT DEFAULT 1,
    rank_tier VARCHAR(64) DEFAULT 'Bronze',
    diamonds INT DEFAULT 0,
    gold INT DEFAULT 0,
    device_model VARCHAR(128),
    ip_address VARCHAR(64),
    is_banned BOOLEAN DEFAULT FALSE,
    ban_reason TEXT NULL,
    ban_type VARCHAR(32) NULL, -- 'permanent' أو 'temporary'
    banned_at TIMESTAMP NULL,
    banned_by VARCHAR(64) NULL,
    suspicion_score INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- 7. جدول مفاتيح الوصول لديسكورد (Discord VIP Access Keys)
CREATE TABLE IF NOT EXISTS discord_access_keys (
    id VARCHAR(64) PRIMARY KEY,
    access_key VARCHAR(128) UNIQUE NOT NULL,
    role_name VARCHAR(64) NOT NULL,
    assigned_to VARCHAR(128),
    discord_id VARCHAR(64),
    uses_left INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. جدول الإحصائيات العامة (System Traffic Stats)
CREATE TABLE IF NOT EXISTS site_stats (
    id INT PRIMARY KEY DEFAULT 1,
    total_visitors BIGINT DEFAULT 0,
    total_downloads BIGINT DEFAULT 0,
    total_api_queries BIGINT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج البيانات الافتراضية الأولية (Default Seed Data)
INSERT INTO server_maintenance (id, is_maintenance, message) 
VALUES (1, FALSE, 'السيرفر يعمل بكامل طاقته بدون صيانة.');

INSERT INTO site_stats (id, total_visitors, total_downloads, total_api_queries)
VALUES (1, 28940, 14280, 124300);
