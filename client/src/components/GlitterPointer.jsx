import { useEffect, useRef } from 'react';

export default function GlitterPointer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let sparkles = [];
    let frameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#FFFFFF', '#EC4186', '#EE544A', '#FFE4E6', '#F472B6'];

    const onMove = (e) => {
      for (let i = 0; i < 4; i++) {
        sparkles.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 0.8,
          size: Math.random() * 4 + 1.5,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.02,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.2
        });
      }
    };
    window.addEventListener('mousemove', onMove);

    const draw4PointStar = (cx, cy, spikes, outerRadius, innerRadius, color, alpha, rot) => {
      ctx.save();
      ctx.beginPath();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      let step = Math.PI / spikes;
      for (let i = 0; i < spikes * 2; i++) {
        let r = i % 2 === 0 ? outerRadius : innerRadius;
        let x = Math.cos(i * step) * r;
        let y = Math.sin(i * step) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 12;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.restore();
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;
        s.rotation += s.spin;
        s.size *= 0.96;

        if (s.alpha <= 0 || s.size <= 0.2) {
          sparkles.splice(i, 1);
        } else {
          draw4PointStar(s.x, s.y, 4, s.size * 2.2, s.size * 0.4, s.color, s.alpha, s.rotation);
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      frameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
}
