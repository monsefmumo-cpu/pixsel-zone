import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'PIXSEL SERVER Official Discord Community Portal',
    timestamp: new Date().toISOString(),
  });
});

// Pixsel Server Stats & Discord Info Endpoint
app.get('/api/v1/pixsel-zone/stats', (req: Request, res: Response) => {
  res.json({
    serverName: 'PIXSEL SERVER',
    discordUrl: 'https://discord.gg/Qahdywj2Q',
    memberCount: 12450,
    onlineCount: 3890,
    verifiedPanelUsers: 1200,
    categories: [
      '✨ || AUTO QUEST || ✨ (Token-video, Auto-Orbs, Important)',
      '⚡ PANEL ZONE (PC, iOS, Android, Maker Zone)',
      '🗡 APOSTADO TEAM (Match-Times, Result, Test, Show Time)',
      '🛑 Banned & Rules',
    ],
  });
});

// Start Server with Vite Integration
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Pixsel Zone Web Portal running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
