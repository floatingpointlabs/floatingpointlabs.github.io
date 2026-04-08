// Set the actual path length for a pixel-perfect draw animation
const path = document.getElementById('wave-path');
const len = path.getTotalLength();
path.style.strokeDasharray = len;
path.style.strokeDashoffset = len;

// Impact effects when the dot first hits at ~60% of drop-dot (1250ms delay + 390ms = 1640ms)
const DOT_LANDS_MS = 1640;

function createFlash(x, y) {
  const el = document.createElement('div');
  Object.assign(el.style, {
    position: 'fixed',
    left: x + 'px',
    top: y + 'px',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.45) 0%, rgba(99,102,241,0.18) 35%, transparent 70%)',
    transform: 'translate(-50%, -50%) scale(0)',
    pointerEvents: 'none',
    zIndex: '40',
  });
  document.body.appendChild(el);
  el.animate([
    { opacity: 1, transform: 'translate(-50%, -50%) scale(0)' },
    { opacity: 0.9, transform: 'translate(-50%, -50%) scale(1)', offset: 0.18 },
    { opacity: 0, transform: 'translate(-50%, -50%) scale(1.6)' },
  ], { duration: 900, easing: 'ease-out', fill: 'forwards' }).onfinish = () => el.remove();
}

function spawnParticles(x, y) {
  const palette = ['#8b5cf6', '#6366f1', '#a78bfa', '#c4b5fd', '#7c3aed', '#818cf8'];
  const count = 14;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const dist = 28 + Math.random() * 48;
    const size = 2 + Math.random() * 2.5;
    const color = palette[i % palette.length];
    const dur = 480 + Math.random() * 320;
    Object.assign(el.style, {
      position: 'fixed',
      left: x + 'px',
      top: y + 'px',
      width: size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      background: color,
      pointerEvents: 'none',
      zIndex: '60',
    });
    document.body.appendChild(el);
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    el.animate([
      { opacity: 1, transform: 'translate(-50%, -50%)' },
      { opacity: 0, transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))` },
    ], { duration: dur, easing: 'cubic-bezier(0.2, 0.6, 0.4, 1)', fill: 'forwards' }).onfinish = () => el.remove();
  }
}

function shakeWrap() {
  document.querySelector('.logo-wrap').animate([
    { transform: 'translate(0, 0)' },
    { transform: 'translate(-3px, 2px)' },
    { transform: 'translate(3px, -2px)' },
    { transform: 'translate(-2px, 1px)' },
    { transform: 'translate(1px, -1px)' },
    { transform: 'translate(0, 0)' },
  ], { duration: 280, easing: 'ease-out' });
}

setTimeout(() => {
  const dotEl = document.getElementById('dot');
  const r = dotEl.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;

  shakeWrap();
  createFlash(cx, cy);
  spawnParticles(cx, cy);
}, DOT_LANDS_MS);

// ── Glowing dots background ──────────────────────────────────────────────────
(function() {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '1',
  });
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const palette = ['#a78bfa', '#818cf8', '#c4b5fd', '#6366f1', '#8b5cf6'];

  const dots = Array.from({ length: 14 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: 1 + Math.random() * 1.5,
    vx: (Math.random() - 0.5) * 0.1,
    vy: (Math.random() - 0.5) * 0.1,
    color: palette[Math.floor(Math.random() * palette.length)],
    baseAlpha: 0.18 + Math.random() * 0.15,
    glowRadius: 6 + Math.random() * 8,
    twinkleSpeed: 0.0003 + Math.random() * 0.0005,
    twinklePhase: Math.random() * Math.PI * 2,
  }));

  let globalOpacity = 0;

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const d of dots) {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < -20) d.x = canvas.width + 20;
      if (d.x > canvas.width + 20) d.x = -20;
      if (d.y < -20) d.y = canvas.height + 20;
      if (d.y > canvas.height + 20) d.y = -20;

      const twinkle = 0.55 + 0.45 * Math.sin(t * d.twinkleSpeed + d.twinklePhase);
      const a = d.baseAlpha * twinkle * globalOpacity;
      if (a < 0.005) continue;

      ctx.save();
      ctx.fillStyle = d.color;
      // Soft outer glow
      ctx.globalAlpha = a * 0.35;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r + d.glowRadius, 0, Math.PI * 2);
      ctx.fill();
      // Tighter inner glow
      ctx.globalAlpha = a * 0.65;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r + d.glowRadius * 0.35, 0, Math.PI * 2);
      ctx.fill();
      // Bright core
      ctx.globalAlpha = a;
      ctx.shadowColor = d.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }

  setTimeout(() => {
    const t0 = performance.now();
    const FADE_DUR = 1400;
    function fade(now) {
      globalOpacity = Math.min(1, (now - t0) / FADE_DUR);
      if (globalOpacity < 1) requestAnimationFrame(fade);
    }
    requestAnimationFrame(fade);
    requestAnimationFrame(draw);
  }, 1900);
})();
