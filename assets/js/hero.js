/* ============================================================
   HERO — Particle canvas (alpine mist / starfield effect)
   ============================================================ */
(() => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], animId;
  const COUNT = 90;

  const resize = () => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.5 + .3;
      this.vx = (Math.random() - .5) * .15;
      this.vy = -(Math.random() * .4 + .1);
      this.alpha = Math.random() * .4 + .1;
      this.life  = 0;
      this.maxLife = Math.random() * 300 + 150;
    }
    update() {
      this.x += this.vx; this.y += this.vy; this.life++;
      const t = this.life / this.maxLife;
      this.alpha = t < .15 ? (t / .15) * .45 : t > .75 ? ((1-t)/.25) * .45 : .45;
      if (this.life > this.maxLife || this.y < -10) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = '#4ec9c0';
      ctx.shadowBlur = 6; ctx.shadowColor = '#4ec9c0';
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fill(); ctx.restore();
    }
  }

  const init = () => {
    resize();
    particles = Array.from({ length: COUNT }, () => new Particle());
    window.addEventListener('resize', resize);
  };

  /* Subtle animated gradient overlay */
  let gradT = 0;
  const drawGrad = () => {
    gradT += .002;
    const x = W * (.3 + Math.sin(gradT) * .15);
    const y = H * (.5 + Math.cos(gradT * .7) * .1);
    const g = ctx.createRadialGradient(x, y, 0, x, y, W * .55);
    g.addColorStop(0,   'rgba(78,201,192,.035)');
    g.addColorStop(.5,  'rgba(30,60,90,.02)');
    g.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  };

  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    drawGrad();
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  };

  init(); loop();
})();
