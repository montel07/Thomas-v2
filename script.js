const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const phone = matchMedia('(max-width: 760px)');

const wins = $$('.win');
let zTop = 10, opened = 0;

/* ---------- Windows ---------- */
function raise(win) {
  win.style.zIndex = ++zTop;
  wins.forEach(w => w.classList.toggle('top', w === win));
}

function place(win) {
  const n = win.id === 'hello' ? 2 : opened++ % 5;
  win.style.setProperty('--x', `${Math.max(16, (innerWidth - win.offsetWidth) / 2 + (n - 2) * 46)}px`);
  win.style.setProperty('--y', `${Math.max(56, 84 + n * 34)}px`);
}

function show(win, on) {
  win.hidden = !on;
  $(`.dock [data-open="${win.id}"]`)?.classList.toggle('open', on);
  if (!on) return;
  if (phone.matches) wins.forEach(w => w !== win && !w.hidden && show(w, false));
  if (!win.dataset.placed) { place(win); win.dataset.placed = 1; }
  win.classList.remove('wake');
  void win.offsetWidth;
  win.classList.add('wake');
  raise(win);
  if (win.id === 'contact') playContactChat();
}

$$('[data-open]').forEach(btn => btn.addEventListener('click', () => {
  const win = $('#' + btn.dataset.open);
  show(win, win.hidden || !win.classList.contains('top'));
}));
$$('.x').forEach(x => x.addEventListener('click', () => show(x.closest('.win'), false)));
addEventListener('keydown', e => {
  const top = $('.win.top:not([hidden])');
  if (e.key === 'Escape' && top) show(top, false);
});

wins.forEach(win => {
  win.addEventListener('pointerdown', () => raise(win));
  win.addEventListener('pointermove', e => {                       // light that follows the cursor
    const r = win.getBoundingClientRect();
    win.style.setProperty('--mx', `${e.clientX - r.left}px`);
    win.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
  $('.tb', win).addEventListener('pointerdown', e => {              // drag by the title bar
    if (phone.matches || e.target.closest('button')) return;
    const dx = e.clientX - win.offsetLeft, dy = e.clientY - win.offsetTop;
    const move = m => {
      win.style.setProperty('--x', `${clamp(m.clientX - dx, 8, innerWidth - win.offsetWidth - 8)}px`);
      win.style.setProperty('--y', `${clamp(m.clientY - dy, 48, innerHeight - 90)}px`);
    };
    const stop = () => { removeEventListener('pointermove', move); removeEventListener('pointerup', stop); };
    addEventListener('pointermove', move);
    addEventListener('pointerup', stop);
  });
});

/* ---------- Dock magnification ---------- */
const dockItems = $$('.dock > *');
$('.dock').addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  dockItems.forEach(item => {
    const r = item.getBoundingClientRect();
    item.style.setProperty('--s', Math.max(0, 1 - Math.abs(e.clientX - (r.left + r.width / 2)) / 110).toFixed(2));
  });
});
$('.dock').addEventListener('pointerleave', () => dockItems.forEach(i => i.style.removeProperty('--s')));

/* ---------- Mood, clock and notifications ---------- */
const moods = ['dawn', 'day', 'night'];   // sunrise, afternoon, night
$('#mood').addEventListener('click', () => {
  const root = document.documentElement;
  root.dataset.mood = moods[(moods.indexOf(root.dataset.mood) + 1) % moods.length];
  $('#mood').classList.remove('go');
  void $('#mood').offsetWidth;
  $('#mood').classList.add('go');
});

const toast = $('#toast');
let toastTimer;
function notify(text) {
  toast.textContent = text;
  toast.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('on'), 3200);
}

const clock = $('#clock');
const tick = () => {
  const now = new Date(), time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  clock.textContent = time;
  const lockTime = $('#lk-time');                                    // the lock screen is removed after opening
  if (lockTime) lockTime.textContent = `${now.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })} · ${time}`;
};
tick();
setInterval(tick, 30000);

let clockTaps = [];                                                 // easter egg: tap the clock five times
clock.addEventListener('click', () => {
  const now = Date.now();
  clockTaps = [...clockTaps.filter(t => now - t < 3000), now];
  if (clockTaps.length < 5) return;
  clockTaps = [];
  notify(`BUG-${400 + Math.floor(Math.random() * 500)} filed: clock tapped five times. Status: closed, works as intended.`);
});

document.addEventListener('click', e => {                           // copy buttons
  const btn = e.target.closest('[data-copy]');
  if (!btn) return;
  navigator.clipboard?.writeText(btn.dataset.copy);
  notify(`Copied ${btn.dataset.copy}`);
});

/* ---------- Greeting: every letter waves and shifts colour ---------- */
let letter = 0;
[$('#hi'), $('#lk-name')].forEach(title => {
  title.setAttribute('aria-label', title.textContent);
  title.innerHTML = title.textContent.split(' ')
    .map(word => `<span style="white-space:nowrap">${[...word].map(ch => `<i style="--c:${letter++}">${ch}</i>`).join('')}</span>`)
    .join(' ');
});

/* ---------- Stagger indexes for the open animation ---------- */
$$('.body').forEach(body => [...body.children].forEach((el, i) => el.style.setProperty('--n', i)));
$$('.cards, .shots, .chips, .row').forEach(group => [...group.children].forEach((el, i) => el.style.setProperty('--k', i)));

/* ---------- Contact chat: three typing dots, then the message. Plays only the first time Contact is opened ---------- */
const contact = $('#contact');
const chatLines = $$('.chat-line', contact);
const socialLinks = $('.socials', contact);
let chatStarted = false;
function playContactChat() {
  if (chatStarted) return;                    // already played (or still playing in the background): just show it as it is
  chatStarted = true;
  chatLines.forEach(line => {
    line.textContent = '';
    line.classList.remove('shown', 'typing');
  });
  socialLinks.classList.remove('shown');
  let index = 0;
  const nextMessage = () => {
    if (index >= chatLines.length) {
      socialLinks.classList.add('shown');
      return;
    }
    const line = chatLines[index++];
    const message = line.dataset.message;
    line.innerHTML = '<span class="typing-dots" aria-hidden="true"><span></span><span></span><span></span></span>';
    line.classList.add('shown', 'typing');
    setTimeout(() => {
      line.textContent = message;
      line.classList.remove('typing');
      setTimeout(nextMessage, 450);
    }, 900 + Math.min(message.length * 22, 700));   // longer message, longer "typing"
  };
  setTimeout(nextMessage, 250);
}

/* ---------- Bubbles and stars drifting behind the glass ---------- */
const life = $('.life'), few = phone.matches;
const rand = (lo, hi) => lo + Math.random() * (hi - lo);
const pick = list => list[Math.floor(Math.random() * list.length)];
const HUES = [330, 190, 260, 45, 150, 210, 15];

/* Pieces of a burst. Each bubble pops in its own way. */
function fly(el, dx, dy, ms, turn = 0, ease = 'cubic-bezier(.1,.7,.3,1)') {
  life.append(el);
  el.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: `translate(${dx}px,${dy}px) rotate(${turn}deg)`, opacity: 0 }], { duration: ms, easing: ease }).onfinish = () => el.remove();
}
function piece(tag, x, y, size, css) {
  const el = document.createElement(tag);
  el.style.cssText = `left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;${css}`;
  return el;
}
function ring(x, y, w, hue, grow) {
  const el = piece('u', x, y, w, `border-color:hsl(${hue} 90% 85% / .8);box-shadow:0 0 18px hsl(${hue} 90% 80% / .4)`);
  life.append(el);
  el.animate([{ transform: 'scale(.9)', opacity: .9 }, { transform: `scale(${grow})`, opacity: 0 }], { duration: 450, easing: 'ease-out' }).onfinish = () => el.remove();
}
function drops(x, y, w, hue, count) {
  for (let k = 0, ang; k < count; k++) {
    ang = Math.random() * 6.28;
    fly(piece('s', x, y, rand(3, 7), `background:hsl(${hue} 90% 82%)`), Math.cos(ang) * w * rand(.5, 1.1), Math.sin(ang) * w * rand(.5, 1.1), 550);
  }
}
const BURSTS = {
  droplets: (x, y, w, hue) => { ring(x, y, w, hue, 1.7); drops(x, y, w, hue, 9); },
  ripple: (x, y, w, hue) => { ring(x, y, w, hue, 1.5); setTimeout(() => ring(x, y, w, hue, 2.3), 130); drops(x, y, w, hue, 4); },
  split: (x, y, w) => {                                            // breaks into tiny bubbles that float away
    for (let k = 0; k < 4; k++) {
      const mini = piece('s', x, y, w * rand(.16, .28), '');
      mini.className = 'mini';
      fly(mini, rand(-w, w), -rand(w * .6, w * 1.8), 1300, 0, 'ease-out');
    }
  },
  sparkle: (x, y, w, hue) => {                                     // bursts into little stars
    for (let k = 0, ang; k < 8; k++) {
      ang = k / 8 * 6.28 + rand(-.2, .2);
      const star = piece('s', x, y, rand(8, 16), `background:hsl(${hue} 100% 85%)`);
      star.className = 'star';
      fly(star, Math.cos(ang) * w * rand(.6, 1.1), Math.sin(ang) * w * rand(.6, 1.1), 700, rand(-180, 180));
    }
  },
};

function pop(bubble) {
  if (bubble.dataset.popped) return;
  bubble.dataset.popped = 1;
  const r = bubble.getBoundingClientRect(), bb = bubble.firstChild;
  bb.style.opacity = 0;
  bubble.style.pointerEvents = 'none';
  BURSTS[bubble.dataset.kind](r.left + r.width / 2, r.top + r.height / 2, r.width, +bubble.dataset.hue);
  setTimeout(() => { bb.style.opacity = ''; bubble.style.pointerEvents = ''; delete bubble.dataset.popped; }, 6000);   // a new bubble drifts back
}

for (let i = 0; i < (few ? 9 : 15); i++) {
  const bubble = document.createElement('i'), bb = document.createElement('span'), hue = pick(HUES), dwellMs = rand(1200, 3200), wobble = rand(.6, 1.4);
  bb.className = 'bb';
  Object.assign(bubble.dataset, { kind: pick(Object.keys(BURSTS)), hue });
  bubble.style.cssText = `--s:${rand(34, 90).toFixed(0)}px;--x:${rand(2, 94).toFixed(0)}%;--d:${rand(26, 48).toFixed(0)}s;--w:-${rand(0, 40).toFixed(0)}s;--o:${rand(-40, 40).toFixed(0)}px`;
  bb.style.cssText = `--h:${hue};--edge:${rand(.3, .6).toFixed(2)};--hx:${rand(24, 38).toFixed(0)}%;--hy:${rand(16, 30).toFixed(0)}%;--hr:${rand(-30, 30).toFixed(0)}deg;--film:${rand(6, 14).toFixed(1)}s;--fd:${i % 2 ? 'reverse' : 'normal'};--dw:${dwellMs.toFixed(0)}ms;--ig:${rand(1.2, 1.5).toFixed(2)}`;
  bubble.append(bb);
  life.append(bubble);
  let dwell;
  const rest = () => { clearTimeout(dwell); bb.classList.remove('dwell'); ['--tx', '--ty', '--rot', '--sx', '--sy'].forEach(v => bb.style.removeProperty(v)); };
  bubble.addEventListener('pointerenter', () => { bb.classList.add('dwell'); dwell = setTimeout(() => pop(bubble), dwellMs); });   // left alone for too long: it pops
  bubble.addEventListener('pointermove', e => {                                        // the skin squashes and stretches towards the pointer
    const r = bubble.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width * 2 - 1, dy = (e.clientY - r.top) / r.height * 2 - 1;
    bb.style.setProperty('--tx', `${(dx * r.width * .1 * wobble).toFixed(1)}px`);
    bb.style.setProperty('--ty', `${(dy * r.width * .1 * wobble).toFixed(1)}px`);
    bb.style.setProperty('--sx', (1 + (Math.abs(dx) * .2 - Math.abs(dy) * .1) * wobble).toFixed(3));
    bb.style.setProperty('--sy', (1 + (Math.abs(dy) * .2 - Math.abs(dx) * .1) * wobble).toFixed(3));
    bb.style.setProperty('--rot', `${(dx * dy * 14 * wobble).toFixed(1)}deg`);
  });
  bubble.addEventListener('pointerleave', rest);
  bubble.addEventListener('pointercancel', rest);
  bubble.addEventListener('pointerdown', () => { rest(); pop(bubble); });              // pressing pops it straight away
  bubble.addEventListener('click', () => pop(bubble));
  bubble.tabIndex = 0; bubble.setAttribute('role', 'button'); bubble.setAttribute('aria-label', 'Pop bubble');
  bubble.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); rest(); pop(bubble); } });
}
for (let i = 0; i < (few ? 22 : 40); i++) {
  const star = document.createElement('b');
  star.style.cssText = `--x:${rand(0, 100).toFixed(1)}%;--y:${rand(4, 90).toFixed(1)}%;--t:${rand(1.5, 4).toFixed(1)}s`;
  life.append(star);
}

/* ---------- Night: liquid glass edges (browsers that support SVG backdrop filters) ---------- */
const canBend = !!navigator.userAgentData?.brands.some(b => /Chromium|Chrome/.test(b.brand)) && !/iPhone|iPad/.test(navigator.userAgent);
if (canBend) {
  const NS = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(NS, 'svg');
  defs.setAttribute('width', 0); defs.setAttribute('height', 0); defs.style.position = 'fixed';
  document.body.append(defs);

  // Displacement map: near the rim the picture is pulled in from further inside, like the thick edge of a glass lens
  const glassMap = (w, h, radius, bezel) => {
    const cw = Math.ceil(w / 2), ch = Math.ceil(h / 2), canvas = document.createElement('canvas');
    canvas.width = cw; canvas.height = ch;
    const ctx = canvas.getContext('2d'), img = ctx.createImageData(cw, ch);
    for (let j = 0; j < ch; j++) for (let i = 0; i < cw; i++) {
      const x = (i + .5) * 2, y = (j + .5) * 2, qx = Math.abs(x - w / 2) - (w / 2 - radius), qy = Math.abs(y - h / 2) - (h / 2 - radius);
      const out = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)), depth = -(out + Math.min(Math.max(qx, qy), 0) - radius);
      const t = Math.min(1, Math.max(0, depth / bezel)), k = (1 - t) ** 2, sx = Math.sign(x - w / 2), sy = Math.sign(y - h / 2);
      let nx, ny;
      if (out > 0) { nx = Math.max(qx, 0) * sx / out; ny = Math.max(qy, 0) * sy / out; } else if (qx > qy) { nx = sx; ny = 0; } else { nx = 0; ny = sy; }
      const p = (j * cw + i) * 4;
      img.data[p] = 128 - 127 * nx * k; img.data[p + 1] = 128 - 127 * ny * k; img.data[p + 2] = 128; img.data[p + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    return canvas.toDataURL();
  };

  const liquid = (el, id, radius, bezel) => {
    const filter = document.createElementNS(NS, 'filter'), map = document.createElementNS(NS, 'feImage'), shift = document.createElementNS(NS, 'feDisplacementMap');
    filter.id = `lg-${id}`;
    filter.setAttribute('filterUnits', 'userSpaceOnUse'); filter.setAttribute('x', 0); filter.setAttribute('y', 0);
    filter.setAttribute('color-interpolation-filters', 'sRGB');
    map.setAttribute('preserveAspectRatio', 'none'); map.setAttribute('result', 'map');
    shift.setAttribute('in', 'SourceGraphic'); shift.setAttribute('in2', 'map'); shift.setAttribute('scale', 70);
    shift.setAttribute('xChannelSelector', 'R'); shift.setAttribute('yChannelSelector', 'G');
    filter.append(map, shift); defs.append(filter);
    el.style.setProperty('--lgf', `url(#lg-${id})`);
    new ResizeObserver(() => {
      const w = el.offsetWidth, h = el.offsetHeight;
      if (!w || !h) return;
      [filter, map].forEach(n => { n.setAttribute('width', w); n.setAttribute('height', h); });
      map.setAttribute('x', 0); map.setAttribute('y', 0);
      const url = glassMap(w, h, radius, bezel);
      map.setAttribute('href', url); map.setAttributeNS('http://www.w3.org/1999/xlink', 'href', url);
    }).observe(el);
  };

  wins.forEach(win => liquid(win, win.id, 26, 34));
  liquid($('.dock'), 'dock', 30, 26);
  document.documentElement.classList.add('lg');
}

/* ---------- Lock screen: swipe up (or tap, press Enter, scroll) to open ---------- */
const lock = $('#lock'), locked = [$('#desk'), $('.dock'), $('.bar')];
let startY = null, pull = 0;
locked.forEach(el => { el.inert = true; });

function unlock() {
  if (lock.classList.contains('gone')) return;
  lock.classList.remove('drag');
  lock.style.removeProperty('--pull');
  lock.classList.add('gone');
  locked.forEach(el => { el.inert = false; });
  document.body.classList.remove('locked');
  setTimeout(() => show($('#hello'), true), 450);
  setTimeout(() => lock.remove(), 1000);
}
lock.addEventListener('pointerdown', e => { startY = e.clientY; pull = 0; lock.classList.add('drag'); lock.setPointerCapture(e.pointerId); });
lock.addEventListener('pointermove', e => {
  if (startY === null) return;
  pull = Math.max(0, startY - e.clientY);
  lock.style.setProperty('--pull', pull);
});
const release = () => {
  if (startY === null) return;
  startY = null;
  lock.classList.remove('drag');
  if (pull > innerHeight * .16 || pull < 6) unlock();               // a real swipe, or a simple tap
  else lock.style.setProperty('--pull', 0);                          // not far enough: spring back
};
lock.addEventListener('pointerup', release);
lock.addEventListener('pointercancel', release);
lock.addEventListener('keydown', e => { if (['Enter', ' ', 'ArrowUp'].includes(e.key)) { e.preventDefault(); unlock(); } });
lock.addEventListener('wheel', e => { if (e.deltaY > 20) unlock(); }, { passive: true });
lock.focus({ preventScroll: true });

/* ---------- Start ---------- */
