import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;
    let t = 0;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Create 75 tiny, elegant glass bubbles with specular light rings
    const bubbles = Array.from({ length: 75 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 6 + 2.5, // Tiny & subtle (2.5px to 8.5px)
      speedY: Math.random() * 0.6 + 0.25,
      wobbleSpeed: Math.random() * 0.03 + 0.015,
      wobbleAmp: Math.random() * 1.8 + 0.6,
      wobbleOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.45 + 0.25,
      color: Math.random() > 0.4 ? '#EC4186' : '#EE544A'
    }));

    const render = () => {
      t += 0.01;

      // Deep, cozy velvet base gradient
      const bg = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.35, 60,
        canvas.width * 0.5, canvas.height * 0.75, canvas.width * 0.85
      );
      bg.addColorStop(0, '#2b0938');
      bg.addColorStop(0.45, '#38124A');
      bg.addColorStop(0.85, '#170321');
      bg.addColorStop(1, '#0c0111');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Warm cursor aura
      const mouseAura = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 350);
      mouseAura.addColorStop(0, 'rgba(236, 65, 134, 0.16)');
      mouseAura.addColorStop(0.5, 'rgba(238, 84, 74, 0.05)');
      mouseAura.addColorStop(1, 'transparent');
      ctx.fillStyle = mouseAura;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Tiny Floating Glass Bubbles
      bubbles.forEach((b) => {
        b.y -= b.speedY;
        b.x += Math.sin(t * b.wobbleSpeed * 60 + b.wobbleOffset) * b.wobbleAmp * 0.4;

        // Mouse repelling physics
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110 && dist > 0) {
          const force = (110 - dist) / 110;
          b.x += (dx / dist) * force * 1.5;
          b.y += (dy / dist) * force * 1.5;
        }

        // Wrap around bottom when reaching top
        if (b.y < -20) {
          b.y = canvas.height + 20;
          b.x = Math.random() * canvas.width;
        }
        if (b.x < -20) b.x = canvas.width + 20;
        if (b.x > canvas.width + 20) b.x = -20;

        // Bubble Outer Glowing Ring
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = b.opacity;
        ctx.shadowBlur = 6;
        ctx.shadowColor = b.color;
        ctx.stroke();

        // Tiny Specular Reflection inside the bubble
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.35, b.y - b.radius * 0.35, b.radius * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = b.opacity * 0.85;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#FFFFFF';
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[-1]" />;
}
