import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleEmbersCanvasProps {
  intensity?: 'low' | 'medium' | 'high' | 'explosive';
}

export const ParticleEmbersCanvas: React.FC<ParticleEmbersCanvasProps> = ({
  intensity = 'medium',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = canvas.parentElement?.clientHeight || 450;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = intensity === 'explosive' ? 120 : intensity === 'high' ? 80 : intensity === 'medium' ? 45 : 25;
    const particles: Particle[] = [];

    const emberColors = ['#ff3b00', '#ff6a00', '#ffa600', '#ff2200', '#ffffff'];

    const createParticle = (isExplosion = false): Particle => {
      const color = emberColors[Math.floor(Math.random() * emberColors.length)];
      return {
        x: isExplosion ? width / 2 + (Math.random() - 0.5) * 200 : Math.random() * width,
        y: isExplosion ? height / 2 + (Math.random() - 0.5) * 150 : height + Math.random() * 20,
        size: Math.random() * (isExplosion ? 3.5 : 2.5) + 0.8,
        speedX: (Math.random() - 0.5) * (isExplosion ? 6 : 1.8),
        speedY: isExplosion ? (Math.random() - 0.5) * 6 : -(Math.random() * 2.2 + 0.8),
        opacity: Math.random() * 0.7 + 0.3,
        color,
        life: 0,
        maxLife: Math.random() * 120 + 80,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.life++;
        p.x += p.speedX;
        p.y += p.speedY;

        // Wave wobble
        p.x += Math.sin(p.life * 0.05) * 0.5;

        const currentOpacity = p.opacity * (1 - p.life / p.maxLife);

        ctx.save();
        ctx.globalAlpha = Math.max(0, currentOpacity);
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[idx] = createParticle();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
