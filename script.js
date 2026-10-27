/* EDIT ME: links. Third item = text copied on tap (Discord) */
const LINKS=[['GitHub','https://github.com/montel07'],['TikTok','https://tiktok.com/@re_incarnate'],['X','https://x.com/hazreith'],['Email','mailto:reincarnate071@gmail.com'],['Discord','#','reincarnate07']];
const D=60,SEC=12;
const $=id=>document.getElementById(id),mon=$('mon'),panel=$('panel'),strip=$('strip'),tl=$('tl');
const sp=(s,o=0)=>{let n=o;return s.split('|').map(l=>[...l].map(c=>`<i style="--c:${n++}">${c===' '?'&nbsp;':c}</i>`).join('')).join('<br>')};
const chip=a=>a.map((x,i)=>`<span class="chip r" style="--i:${i+3}">${x}</span>`).join('');
const lk=LINKS.map((l,i)=>`<a class="lk r" style="--i:${i+3}" href="${l[1]}" ${l[2]?`data-copy="${l[2]}"`:''} ${l[1].startsWith('mailto')?'':'target="_blank" rel="noopener"'}>${l[0]}${l[2]?' · '+l[2]:''}</a>`).join('');
let p5=false,rew=false,live=false,T5=[];
function shuf(){const o=document.createElement('div');o.style.cssText='position:absolute;inset:0;z-index:3;display:flex;align-items:center;justify-content:center;font:800 clamp(40px,12vw,120px) system-ui;letter-spacing:-.04em;color:#fff;pointer-events:none';mon.appendChild(o);const N='AND FOR HOW TO REACH ME HERE YOU GO!'.split(' '),C=['#ff4d5e','#7c5cff','#ff9f1c','#2ec4b6','#c77dff','#3d8bff','#ff4d9a','#16a867','#ff4d5e'];let i=0;const step=()=>{if(i>=N.length){o.remove();if(cur===S.length-1)panel.innerHTML=S[S.length-1].f();return}o.style.background=C[i%C.length];o.textContent=N[i];i++;setTimeout(step,i===N.length?400:100)};step()}
const S=[
{n:'INTRO',c:'#ff4d5e',h:200,f:()=>`<div class="tag" style="--i:0">Scene 01 · Intro</div><h1>${sp('Hi, I’m|Thomas')}</h1><p class="r" style="--i:6">I’m as curious as they come. I’m an autodidact in HTML and CSS (but if we're being real, YouTube helped). Exceptionally good at prompting AI to get the results I want. I also write. And clients I've worked with were all really satisfied. I’m a rookie video editor, mostly because I have no idea what they feed the other editors. So yeah, I’m generally just a chill guy.</p><div class="chips"><span class="chip glass r" style="--i:8">Drag or scroll the timeline below</span></div>`},
{n:'WHAT I DO',c:'#7c5cff',h:255,f:()=>`<div class="tag">Scene 02 · Clips</div><h2>${sp('Few skills, one dude')}</h2><div class="card r" style="--i:6"><b>Build</b><span>Websites in HTML,CSS, AND JS, steered by sharp AI prompting.</span></div><div class="card r" style="--i:7"><b>Playtest</b><span> Tested a game during its early development, finding bugs, evaluating gameplay and providing feedback to improve the experience before its eventual release on Steam.</span></div><div class="card r" style="--i:8"><b>Edit</b><span>Rookie video editing that taught me pacing and storyboarding.</span></div><div class="card r" style="--i:9"><b>Write</b><span>I know literally everyone can write. But can they write like i do?</span></div>`},
{n:'PROJECTS',c:'#ff9f1c',h:35,f:()=>`<div class="tag">Scene 03 · Selected Work</div><h2>${sp('Things I’ve shipped')}</h2><div class="card r" style="--i:6"><b>Word Forge</b><span>A browser word game.</span></div><div class="card r" style="--i:7"><b>Monanymous</b><span>Shipped and live.</span></div><div class="card r" style="--i:8"><b>Private works</b><span>Under NDA so the details stay <s class="rd">████████████</s></span></div>`},
{n:'IN THE MIX',c:'#2ec4b6',h:170,f:()=>`<div class="tag">Scene 04 · Overlays</div><h2>${sp('What’s in the mix')}</h2><div class="chips">${chip(['HTML','CSS','AI prompting','QA testing','Social media management','Video editing','Problem solving','Graphics design','Writing'])}</div>`},
{n:'CONTACT',c:'#ff4d5e',h:350,f:()=>{if(!p5&&!rew){p5=true;shuf()}return `<div class="tag">Scene 05 · Credits</div><h2>${sp('Let’s make something')}</h2><p class="r" style="--i:6">Tapping Discord copies my username.</p><div class="chips">${lk}</div>`}}
];
let pps=90,t=0,disp=0,vel=0,playing=false,cur=-1,drag=false,moved=0,lx=0,lastGl=0,mut=false;
/* audio */
let AC,M,wh,lp;
function au(){if(AC){AC.resume&&AC.resume();return}try{AC=new(window.AudioContext||window.webkitAudioContext)();M=AC.createGain();M.gain.value=mut?0:VOL;M.connect(AC.destination);lp=AC.createBiquadFilter();lp.frequency.value=400;const dg=AC.createGain();dg.gain.value=.05;lp.connect(dg);dg.connect(M);[55,82.4,110.3].forEach(f=>{const o=AC.createOscillator();o.type='sawtooth';o.frequency.value=f;o.connect(lp);o.start()});
const b=AC.createBuffer(1,AC.sampleRate,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;const s=AC.createBufferSource();s.buffer=b;s.loop=true;const bp=AC.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1800;wh=AC.createGain();wh.gain.value=0;s.connect(bp);bp.connect(wh);wh.connect(M);s.start()}catch(e){}}
function bl(){}function _unused(f,d,ty,v){if(!AC)return;const n=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type=ty;o.frequency.setValueAtTime(f,n);o.frequency.exponentialRampToValueAtTime(Math.max(20,f/2),n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(M);o.start();o.stop(n+d)}
$('mu').onclick=()=>{au();mut=!mut;if(M)M.gain.value=mut?0:VOL;$('mu').innerHTML=ic(mut?'mute':'vol')};
function tst(m){const T=$('toast');T.textContent=m;T.style.opacity=1;clearTimeout(T.k);T.k=setTimeout(()=>T.style.opacity=0,1400)}
function noiseBurst(d,fq,v,cr){if(!AC)return;const n=AC.currentTime,len=Math.floor(AC.sampleRate*d),b=AC.createBuffer(1,len,AC.sampleRate),a=b.getChannelData(0);let h=0;for(let i=0;i<len;i++){if(i%cr===0)h=Math.random()*2-1;a[i]=h*(1-i/len)}const s=AC.createBufferSource();s.buffer=b;const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=fq;f.Q.value=3;const g2=AC.createGain();g2.gain.value=v;s.connect(f);f.connect(g2);g2.connect(M);s.start()}
const glitch=a=>noiseBurst(.05+Math.random()*.07,600+Math.random()*3500,.05+a*.07,2+Math.floor(Math.random()*30));
const clk=()=>{noiseBurst(.018,2800,.18,1);if(AC){const n=AC.currentTime,o=AC.createOscillator(),g2=AC.createGain();o.frequency.setValueAtTime(1500,n);o.frequency.exponentialRampToValueAtTime(400,n+.03);g2.gain.setValueAtTime(.1,n);g2.gain.exponentialRampToValueAtTime(.001,n+.04);o.connect(g2);g2.connect(M);o.start();o.stop(n+.05)}};
$('bar').addEventListener('pointerdown',e=>{if(e.target.closest('button')){au();clk()}});
let VOL=.8;$('vol').addEventListener('input',e=>{VOL=e.target.value/100;au();if(M)M.gain.value=mut?0:VOL});
let bt=[];const bug=$('bug');
tl.addEventListener('pointerup',e=>{if(!live||moved>=6||Math.abs(e.clientX-innerWidth/2)>26)return;const n=performance.now();bt=bt.filter(x=>n-x<2500);bt.push(n);if(bt.length>=5){bt=[];emergency()}});
let em=false;
function emergency(){if(em)return;em=true;au();const E=$('emg'),els=[$('mon'),$('bar'),$('tl')],bars=[...E.querySelectorAll('.bar')],tx=E.querySelector('.etx'),id=400+Math.floor(Math.random()*500);E.querySelector('.esub').textContent='BUG-'+id+' · CRITICAL · ALL SYSTEMS AFFECTED';E.classList.add('on');

const r=Math.random,iv=setInterval(()=>{els.forEach(e=>{e.style.transform=`translate(${(r()-.5)*34}px,${(r()-.5)*12}px) skewX(${(r()-.5)*8}deg)`;e.style.filter=`hue-rotate(${r()*360}deg) contrast(${1.2+r()}) saturate(${1+r()*2})`});tx.style.transform=`translate(${(r()-.5)*26}px,${(r()-.5)*8}px)`;bars.forEach(b=>{b.style.top=r()*100+'%';b.style.height=(2+r()*14)+'%';b.style.transform=`translateX(${(r()-.5)*140}px)`;b.style.opacity=r()>.4?.9:0})},70);
setTimeout(()=>{clearInterval(iv);els.forEach(e=>{e.style.transform='';e.style.filter=''});tx.style.transform='';E.classList.add('out');setTimeout(()=>{E.classList.remove('on','out');em=false;showBug()},280)},3500)}
function showBug(){bug.innerHTML=`<div class="bh"><span>BUG-${400+Math.floor(Math.random()*500)}</span><em>FILED</em></div><b>Playhead tapped five times</b><p>Steps: tap the playhead, then repeat four more times</p><p>Expected: nothing happens</p><p>Actual: you found the easter egg</p><div class="bs">STATUS · CLOSED, WORKS AS INTENDED</div>`;bug.classList.remove('show');void bug.offsetWidth;bug.classList.add('show');mon.classList.add('gl');setTimeout(()=>mon.classList.remove('gl'),230);clearTimeout(bug.k);bug.k=setTimeout(()=>bug.classList.remove('show'),5200)}
/* timeline */
function layout(){pps=Math.max(70,Math.min(120,innerWidth/7));strip.style.width=D*pps+innerWidth+'px'}
function build(){let h='';
 for(let i=0;i<=D;i++)h+=`<div class="tk" style="left:${i*pps}px;height:${i%5?10:26}px">${i%5?'':i+'s'}</div>`;
 const tr=(y,x)=>`<div class="tr" style="top:${y}px">${x}</div>`;
 h+=tr(30,S.map((s,i)=>`<div class="cl" data-s="${i}" style="left:${i*SEC*pps+2}px;width:${SEC*pps-4}px;background:${s.c}cc;cursor:pointer">${s.n}</div>`).join(''));
 h+=tr(76,[['WORD FORGE',24,'#ff9f1c99'],['MONANYMOUS',28,'#ff9f1c99'],['PRIVATE ████',32,'#55555599']].map(p=>`<div class="cl" style="left:${p[1]*pps+2}px;width:${4*pps-4}px;background:${p[2]}">${p[0]}</div>`).join(''));
 h+=tr(122,`<div class="cl wf" style="left:${36*pps}px;width:${12*pps}px;background-color:#2ec4b622;color:#2ec4b6">SKILLS · audio</div><div class="cl wf" style="left:0;width:${12*pps}px;background-color:#ffffff10;color:#8b91a5">ambient</div>`);
 h+=tr(168,LINKS.map((l,i)=>`<a class="cl" href="${l[1]}" ${l[2]?`data-copy="${l[2]}"`:''} ${l[1].startsWith('mailto')?'':'target="_blank" rel="noopener"'} style="left:${(48+i*2.4)*pps+2}px;width:${2.2*pps}px;background:#ff4d5ecc">${l[0]}</a>`).join(''));
 strip.innerHTML=h;$('lbl').innerHTML=['V1','V2','A1','LNK'].map((n,i)=>`<div style="top:${30+i*46}px">${n}</div>`).join('');cur=-1}
function show(i){cur=i;T5.forEach(clearTimeout);T5=[];panel.innerHTML=S[i].f();$('sec').textContent=`${String(i+1).padStart(2,'0')}/05 · ${S[i].n}`;document.documentElement.style.setProperty('--h',S[i].h);
 strip.querySelectorAll('[data-s]').forEach(e=>e.classList.toggle('on',+e.dataset.s===i));bl(260+i*70,.15)}
const tc=x=>{const f=Math.floor((x%1)*24),s=Math.floor(x)%60,m=Math.floor(x/60);return[m,s,f].map(v=>String(v).padStart(2,'0')).join(':')};
const IC={first:'<path d="M6 5v14"/><path d="M19 5L9 12l10 7z"/>',prev:'<path d="M12 5L3 12l9 7zM21 5l-9 7 9 7z"/>',play:'<path d="M7 4l13 8-13 8z"/>',pause:'<path d="M7 4h4v16H7zM13 4h4v16h-4z"/>',next:'<path d="M12 5l9 7-9 7zM3 5l9 7-9 7z"/>',last:'<path d="M18 5v14"/><path d="M5 5l10 7L5 19z"/>',vol:'<path d="M4 9v6h4l5 4V5L8 9z"/><path fill="none" d="M16.5 8.5a5 5 0 010 7"/>',mute:'<path d="M4 9v6h4l5 4V5L8 9z"/><path fill="none" d="M17 9l4 6M21 9l-4 6"/>'};
const ic=k=>`<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">${IC[k]}</svg>`;
for(const [k,v] of [['b0','first'],['b1','prev'],['b2','next'],['b3','last'],['mu','vol']])$(k).innerHTML=ic(v);
const ui=()=>$('pp').innerHTML=ic(playing?'pause':'play');
const go=x=>{au();lastS=performance.now();playing=false;ui();t=Math.max(0,Math.min(D-.01,x))};
$('b0').onclick=()=>go(0);$('b3').onclick=()=>go(D-.01);
$('b2').onclick=()=>go((Math.floor(disp/SEC)+1)*SEC);
$('b1').onclick=()=>go(disp%SEC>1?Math.floor(disp/SEC)*SEC:(Math.floor(disp/SEC)-1)*SEC);
$('pp').onclick=()=>{au();if(t>=D-.05)t=0;playing=!playing;ui()};
tl.addEventListener('pointerdown',e=>{if(!live)return;au();drag=true;moved=0;lx=e.clientX;playing=false;ui()});
addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-lx;lx=e.clientX;moved+=Math.abs(dx);lastS=performance.now();t=Math.max(0,Math.min(D-.01,t-dx/pps))});
addEventListener('pointerup',e=>{if(!drag)return;drag=false;if(moved<6){const c=e.target.closest&&e.target.closest('[data-s]');if(c)t=+c.dataset.s*SEC}});
addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a');if(a&&moved>6){e.preventDefault();moved=0;return}const c=e.target.closest&&e.target.closest('[data-copy]');if(c){e.preventDefault();try{navigator.clipboard.writeText(c.dataset.copy)}catch(x){}tst('Copied '+c.dataset.copy)}},true);
addEventListener('wheel',e=>{if(!live)return;au();lastS=performance.now();playing=false;ui();t=Math.max(0,Math.min(D-.01,t+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)/pps*1.2))},{passive:true});
addEventListener('keydown',e=>{if(!live)return;au();if(e.code==='Space'){e.preventDefault();$('pp').click()}if(e.code==='ArrowRight')go(t+2);if(e.code==='ArrowLeft')go(t-2)});
/* intro: image button */
(function(){const I=$('intro'),pw=$('pw'),pg=$('pg'),ps=$('ps'),cn=$('pr'),c=cn.getContext('2d'),mc=document.createElement('canvas');mc.width=640;mc.height=540;const m=mc.getContext('2d'),ri=new Image(),P={"cx": 320.4102564102564, "cy": 270.35897435897436, "a": 203.07692307692307, "b": 154.66666666666666, "r": 182.52220432700634, "lw": 40.98586999962153};let hold=false,prog=0,pd=-1,st=0,w=0,sc=1,started=false,ok=false,lt=performance.now(),ho,hgn;
ri.onload=()=>{ok=true;pd=-1};ri.src='images/ring.jpg';
function draw(p){c.clearRect(0,0,640,540);if(p<.003||!ok)return;m.clearRect(0,0,640,540);m.save();m.translate(P.cx,P.cy);m.scale(1,P.b/P.a);m.lineCap='round';m.lineWidth=P.lw;m.strokeStyle='#fff';m.beginPath();m.arc(0,0,P.r,-Math.PI/2,-Math.PI/2+(p>=1?6.2832:p*6.2832));m.stroke();m.restore();c.globalCompositeOperation='source-over';c.drawImage(mc,0,0);c.globalCompositeOperation='source-in';c.drawImage(ri,0,0);c.globalCompositeOperation='source-over'}
function hum(){if(!AC||!M||ho)return;ho=AC.createOscillator();ho.type='sine';ho.frequency.value=55;hgn=AC.createGain();hgn.gain.value=0;ho.connect(hgn);hgn.connect(M);ho.start()}
pw.addEventListener('contextmenu',e=>e.preventDefault());
pw.addEventListener('pointerdown',e=>{if(st)return;au();hum();hold=true;try{pw.setPointerCapture(e.pointerId)}catch(x){}});
const up=()=>{hold=false};pw.addEventListener('pointerup',up);pw.addEventListener('pointercancel',up);
function go(){const fl=$('fl'),app=$('app');fl.style.transition='opacity 90ms ease-out';fl.style.opacity=1;setTimeout(()=>{I.style.transition='none';I.classList.add('off');I.style.display='none';live=true;t=disp=0;playing=true;ui();cur=-1;app.classList.add('tvon');fl.style.transition='opacity .6s ease-out';fl.style.opacity=0;if(hgn)hgn.gain.setTargetAtTime(0,AC.currentTime,.2)},110)}
function loop(now){const dt=Math.min(.05,(now-lt)/1000);lt=now;
if(st===0){prog=hold?Math.min(1,prog+dt/1.4):Math.max(0,prog-dt*(.4+prog*1.6));if(prog!==pd){draw(prog);pg.style.setProperty('--p',(prog*376)+'deg');pd=prog}if(prog>=1){st=1;hold=false;ps.style.opacity=1}}
if(st===1){w+=dt;if(w>.3&&!started){started=true;go()}}
sc+=(((hold||st)?.985:1)-sc)*Math.min(1,dt*14);pw.style.transform=`translate(-50%,-50%) scale(${sc})`;
if(hgn){hgn.gain.setTargetAtTime(st===0?.015+.1*prog:0,AC.currentTime,.12);ho.frequency.setTargetAtTime(55+prog*80,AC.currentTime,.1)}
if(!started)requestAnimationFrame(loop)}
requestAnimationFrame(loop)})();
/* intro: hold to power on */
(function(){const I=$('intro');return;
const T=THREE,V=T.Vector3,R=new T.WebGLRenderer({canvas:$('c3'),antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio||1,2));R.outputEncoding=T.sRGBEncoding;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.1;R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap;
const sc=new T.Scene(),cam=new T.PerspectiveCamera(32,1,.1,100),es=new T.Scene();es.background=new T.Color(0x07080b);
[[0,8,2,10,2,0xffffff],[-7,3,3,1.2,6,0xffffff],[7,3,3,1.2,6,0xcfe0ff],[0,2,-8,12,1.5,0xffffff],[0,1,8,8,.8,0xffe2c0]].forEach(a=>{const m=new T.Mesh(new T.PlaneGeometry(a[3],a[4]),new T.MeshBasicMaterial({color:a[5],side:T.DoubleSide}));m.position.set(a[0],a[1],a[2]);m.lookAt(0,0,0);es.add(m)});
sc.environment=new T.PMREMGenerator(R).fromScene(es,.02).texture;
const tx=(()=>{const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');x.fillStyle='#2a2d34';x.fillRect(0,0,256,256);for(let i=0;i<5000;i++){const v=20+Math.random()*60|0;x.fillStyle=`rgb(${v},${v},${v+4})`;x.fillRect(Math.random()*256,Math.random()*256,1.5,1.5)}x.strokeStyle='rgba(0,0,0,.35)';for(let i=0;i<256;i+=16){x.beginPath();x.moveTo(i,0);x.lineTo(i,256);x.moveTo(0,i);x.lineTo(256,i);x.stroke()}const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(10,10);t.anisotropy=8;t.encoding=T.sRGBEncoding;return t})();
const grp=new T.Group();sc.add(grp);
const sf=new T.Mesh(new T.CylinderGeometry(12,12,.6,64),new T.MeshStandardMaterial({color:0x6a6d75,map:tx,bumpMap:tx,bumpScale:1.2,metalness:.6,roughness:.55}));sf.position.y=-.3;grp.add(sf);
const ch=new T.Mesh(new T.TorusGeometry(1.75,.24,48,128),new T.MeshStandardMaterial({color:0xffffff,metalness:1,roughness:.04,envMapIntensity:1.8}));ch.rotation.x=Math.PI/2;ch.position.y=.02;grp.add(ch);
const ch2=new T.Mesh(new T.TorusGeometry(2.08,.05,24,128),new T.MeshStandardMaterial({color:0x9a9ea8,metalness:1,roughness:.2}));ch2.rotation.x=Math.PI/2;ch2.position.y=.02;grp.add(ch2);
const bt=new T.Group();grp.add(bt);
bt.add(new T.Mesh(new T.LatheGeometry([[0,.14],[1.2,.14],[1.4,.12],[1.5,.05],[1.5,-.3],[0,-.3]].map(p=>new T.Vector2(p[0],p[1])),96),new T.MeshStandardMaterial({color:0x0b0b0d,metalness:.2,roughness:.65,bumpMap:tx,bumpScale:.4,side:T.DoubleSide})));
const im=new T.MeshStandardMaterial({color:0x1d2026,emissive:0x000000,emissiveIntensity:0,metalness:.3,roughness:.45}),ig=new T.Group();ig.rotation.x=-Math.PI/2;ig.position.y=.15;bt.add(ig);
const ar=new T.Mesh(new T.TorusGeometry(.42,.06,16,64,Math.PI*2-1.3),im);ar.rotation.z=Math.PI/2+.65;ig.add(ar);
const ln=new T.Mesh(new T.CylinderGeometry(.06,.06,.48,16),im);ln.position.y=.22;ig.add(ln);
const N=120,sg=[],sgeo=new T.BoxGeometry(.07,.025,.045);for(let i=0;i<N;i++){const a=i/N*Math.PI*2,m=new T.Mesh(sgeo,new T.MeshBasicMaterial({color:0x16191f,toneMapped:false}));m.position.set(Math.sin(a)*1.02,.15,-Math.cos(a)*1.02);m.rotation.y=-a;bt.add(m);sg.push(m)}
const hm=new T.MeshBasicMaterial({color:0x3dff9a,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false,toneMapped:false}),hr=new T.Mesh(new T.RingGeometry(.7,1.3,64),hm);hr.rotation.x=-Math.PI/2;hr.position.y=.16;bt.add(hr);
function seg(p){const k=Math.round(p*N);sg.forEach((m,i)=>m.material.color.setHex(i<k?0xcfe0ff:0x16191f))}
function full(){sg.forEach(m=>m.material.color.setHex(0x3dff9a));im.color.setHex(0x0b3a22);im.emissive.setHex(0x3dff9a);im.emissiveIntensity=2.6;hm.opacity=.4;gl.color.setHex(0x3dff9a)}
grp.traverse(o=>{if(o.isMesh&&o.material.type!=='MeshBasicMaterial'){o.castShadow=o.receiveShadow=true}});
const dl=new T.DirectionalLight(0xffffff,1.1);dl.position.set(3,6,4);dl.castShadow=true;dl.shadow.mapSize.set(2048,2048);dl.shadow.bias=-.0004;Object.assign(dl.shadow.camera,{left:-5,right:5,top:5,bottom:-5,near:1,far:20});dl.shadow.camera.updateProjectionMatrix();sc.add(dl);
const rm=new T.PointLight(0x6688ff,.9,14);rm.position.set(-4,1.5,-3);sc.add(rm);const wf=new T.PointLight(0xffd9b0,.5,14);wf.position.set(4,1,5);sc.add(wf);const gl=new T.PointLight(0x000000,0,7);gl.position.set(0,1.1,0);sc.add(gl);
let started=false,st=0,hold=false,prog=0,pp=-1,w=0,q=0,tm=0,d=8,asp=1.6,on=true,lt=performance.now(),ho,hgn;
const rz=()=>{const W=I.clientWidth,H=I.clientHeight;R.setSize(W,H,false);asp=W/H;cam.aspect=asp;cam.updateProjectionMatrix();d=Math.max(7.2,3/(.2867*asp))};rz();addEventListener('resize',rz);
function hum(){if(!AC||!M||ho)return;ho=AC.createOscillator();ho.type='sine';ho.frequency.value=55;hgn=AC.createGain();hgn.gain.value=0;ho.connect(hgn);hgn.connect(M);ho.start()}
const cv=$('c3');cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('pointerdown',e=>{if(st)return;au();hum();hold=true;cv.setPointerCapture(e.pointerId)});
const up=()=>{hold=false};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
function fin(){if(hgn)hgn.gain.setTargetAtTime(0,AC.currentTime,.2);I.classList.add('off');live=true;t=disp=0;playing=true;ui();cur=-1;setTimeout(()=>{on=false;R.dispose()},1700)}
function loop(now){if(!on)return;const dt=Math.min(.05,(now-lt)/1000);lt=now;tm+=dt;
if(st===0){prog=hold?Math.min(1,prog+dt/2.5):Math.max(0,prog-dt*(.4+prog*1.6));if(prog>=1){st=1;hold=false;full();pp=1}else if(Math.abs(prog-pp)>.001){seg(prog);pp=prog}}
if(st===1){w+=dt;if(w>.35)q=Math.min(1,q+dt/1.4);if(q>.4&&!started){started=true;fin()}if(q>=1)st=2}
bt.position.y+=(((hold||st>=1)?-.07:0)-bt.position.y)*Math.min(1,dt*16);
if(st>=1)gl.intensity+=(3-gl.intensity)*Math.min(1,dt*5);
if(hgn){hgn.gain.setTargetAtTime(st===0?.015+.1*prog:0,AC.currentTime,.12);ho.frequency.setTargetAtTime(55+prog*80,AC.currentTime,.1)}
dl.position.x=3+Math.sin(tm*.4)*1.2;const e=q*q*(3-2*q);cam.position.lerpVectors(new V(0,d*.3,d*.95),new V(0,2.4,1.2),e);cam.lookAt(0,.25*(1-e),0);R.render(sc,cam);requestAnimationFrame(loop)}
requestAnimationFrame(loop)})();
(function(){const I=$('intro');return;
const T=THREE,V=T.Vector3,R=new T.WebGLRenderer({canvas:$('c3'),antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio||1,2));R.outputEncoding=T.sRGBEncoding;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.2;R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap;
const sc=new T.Scene(),cam=new T.PerspectiveCamera(32,1,.1,100),es=new T.Scene();es.background=new T.Color(0x0e1016);
[[0,9,2,9,3],[-8,3,4,2,7],[8,2,-3,2,7],[0,3,-9,10,2],[-4,5,-5,1,6],[5,5,5,1,6]].forEach(a=>{const m=new T.Mesh(new T.PlaneGeometry(a[3],a[4]),new T.MeshBasicMaterial({color:0xffffff,side:T.DoubleSide}));m.position.set(a[0],a[1],a[2]);m.lookAt(0,0,0);es.add(m)});
sc.environment=new T.PMREMGenerator(R).fromScene(es,.03).texture;
const bt=(()=>{const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');x.fillStyle='#9a9fac';x.fillRect(0,0,512,512);for(let i=0;i<3200;i++){const v=100+Math.random()*120|0,y=Math.random()*512;x.strokeStyle=`rgba(${v},${v},${v+8},${.06+Math.random()*.14})`;x.lineWidth=.3+Math.random()*1.3;x.beginPath();x.moveTo(0,y);x.lineTo(512,y+(Math.random()-.5)*3);x.stroke()}const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=8;t.encoding=T.sRGBEncoding;return t})();
const BM=(c,r)=>new T.MeshPhysicalMaterial({color:c,metalness:1,roughness:r,map:bt,roughnessMap:bt,bumpMap:bt,bumpScale:.8,clearcoat:.2,clearcoatRoughness:.35});
const grp=new T.Group();sc.add(grp);
grp.add(new T.Mesh(new T.CylinderGeometry(2.4,2.5,.3,96),BM(0x1b1d24,.75)));

const capg=new T.Group();capg.position.y=.3;grp.add(capg);
capg.add(new T.Mesh(new T.LatheGeometry([[0,.15],[1.75,.15],[1.93,.11],[2,0],[2,-.15],[0,-.15]].map(p=>new T.Vector2(p[0],p[1])),96),(()=>{const m=BM(0x3a3d48,.62);m.side=T.DoubleSide;return m})()));
const im=new T.MeshStandardMaterial({color:0x220a08,emissive:0xff8a3a,emissiveIntensity:1.6,metalness:.2,roughness:.4}),ig=new T.Group();ig.rotation.x=-Math.PI/2;ig.position.y=.16;capg.add(ig);
const ar=new T.Mesh(new T.TorusGeometry(.55,.085,16,64,Math.PI*2-1.3),im);ar.rotation.z=Math.PI/2+.65;ig.add(ar);
const ln=new T.Mesh(new T.CylinderGeometry(.085,.085,.6,16),im);ln.position.y=.26;ig.add(ln);
const N=144,sg=[],sgeo=new T.BoxGeometry(.09,.05,.06);for(let i=0;i<N;i++){const a=i/N*Math.PI*2,m=new T.Mesh(sgeo,new T.MeshBasicMaterial({color:0xff3030,toneMapped:false}));m.position.set(Math.sin(a)*1.55,.16,-Math.cos(a)*1.55);m.rotation.y=-a;capg.add(m);sg.push(m)}
const hm=new T.MeshBasicMaterial({color:0xff2e2e,transparent:true,opacity:.2,blending:T.AdditiveBlending,depthWrite:false,toneMapped:false}),hr=new T.Mesh(new T.RingGeometry(1.3,1.8,96),hm),hc=new T.Mesh(new T.CircleGeometry(.85,64),hm);hr.rotation.x=hc.rotation.x=-Math.PI/2;hr.position.y=.152;hc.position.y=.153;capg.add(hr,hc);
function seg(p,g){const k=Math.round(p*N);sg.forEach((m,i)=>m.material.color.setHex(g?0x3dff9a:p<.003?0xff3030:i<k?0xffc36b:0x7a1a20));hm.color.setHex(g?0x3dff9a:p<.003?0xff2e2e:0xffa24a)}seg(0,0);
grp.traverse(o=>{if(o.isMesh&&o.material.type!=='MeshBasicMaterial'){o.castShadow=o.receiveShadow=true}});
const fl=new T.Mesh(new T.PlaneGeometry(40,40),new T.ShadowMaterial({opacity:.6}));fl.rotation.x=-Math.PI/2;fl.position.y=-.9;fl.receiveShadow=true;sc.add(fl);
const dl=new T.DirectionalLight(0xffffff,1);dl.position.set(3,7,4);dl.castShadow=true;dl.shadow.mapSize.set(2048,2048);dl.shadow.bias=-.0004;Object.assign(dl.shadow.camera,{left:-5,right:5,top:5,bottom:-5,near:1,far:20});dl.shadow.camera.updateProjectionMatrix();sc.add(dl);
const hl=new T.PointLight(0xffffff,1.3,12);sc.add(hl);const gl=new T.PointLight(0xff4d5e,.6,8);gl.position.set(0,1.4,0);sc.add(gl);
let started=false,st=0,pressed=false,hold=false,prog=0,pp=-1,w=0,q=0,bump=0,tm=0,d=8,asp=1.6,mx=0,my=0,on=true,lt=performance.now(),ho,hgn;
const rz=()=>{const W=I.clientWidth,H=I.clientHeight;R.setSize(W,H,false);asp=W/H;cam.aspect=asp;cam.updateProjectionMatrix();d=Math.max(7.5,3.2/(.2867*asp))};rz();addEventListener('resize',rz);
function hum(){if(!AC||!M||ho)return;ho=AC.createOscillator();ho.type='sine';ho.frequency.value=55;hgn=AC.createGain();hgn.gain.value=0;ho.connect(hgn);hgn.connect(M);ho.start()}
function wake(){st=1;bump=1;hum();gl.color.setHex(0xaecbff);im.emissive.setHex(0xffd08a);I.querySelector('h3').textContent='Hey, I’m Thomas. Make yourself at home.'}
const cv=$('c3');cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
cv.addEventListener('pointerdown',e=>{if(st>1)return;au();pressed=true;if(st===1)hold=true;cv.setPointerCapture(e.pointerId)});
const up=()=>{if(st>1)return;if(st===0&&pressed)wake();pressed=false;hold=false};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
function fin(){if(hgn)hgn.gain.setTargetAtTime(0,AC.currentTime,.2);I.classList.add('off');live=true;t=disp=0;playing=true;ui();cur=-1;setTimeout(()=>{on=false;R.dispose()},1700)}
function loop(now){if(!on)return;const dt=Math.min(.05,(now-lt)/1000);lt=now;tm+=dt;
if(st===1){prog=hold?Math.min(1,prog+dt/2.2):Math.max(0,prog-dt*.4);if(prog>=1){st=2;hold=false;im.emissive.setHex(0x3dff9a);im.emissiveIntensity=2.2;gl.color.setHex(0x3dff9a);seg(1,1);pp=1}}
if(prog!==pp&&st===1){seg(prog,0);pp=prog}
if(st===2){w+=dt;if(w>.4)q=Math.min(1,q+dt/1.4);if(q>.4&&!started){started=true;fin()}if(q>=1)st=3}
capg.position.y+=(((pressed||st>=2)?.16:.3)-capg.position.y)*Math.min(1,dt*18);
if(st===0)im.emissiveIntensity=1.3+.5*Math.sin(tm*2.2);else if(st===1)im.emissiveIntensity=1.8;
gl.intensity+=((st===0?.6:st===1?1.1+prog*.8:2.6)-gl.intensity)*Math.min(1,dt*6);
hl.position.set(Math.cos(tm*.5)*3.2+mx*5,2.6,Math.sin(tm*.5)*3.2+my*5);grp.position.y=Math.sin(tm*1.2)*.05;grp.rotation.z=Math.sin(tm*.6)*.03;
if(hgn){bump=Math.max(0,bump-dt*.8);hgn.gain.setTargetAtTime(st===1?.015+.1*prog+.08*bump:0,AC.currentTime,.12);ho.frequency.setTargetAtTime(55+prog*80,AC.currentTime,.1)}
const e=q*q*(3-2*q);cam.position.lerpVectors(new V(0,d*.62,d*.78),new V(0,2.4,1.1),e);cam.lookAt(0,0,0);R.render(sc,cam);requestAnimationFrame(loop)}
requestAnimationFrame(loop)})();
(function(){const I=$('intro');return;
const T=THREE,V=T.Vector3,R=new T.WebGLRenderer({canvas:$('c3'),antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio||1,2));R.outputEncoding=T.sRGBEncoding;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.15;
const sc=new T.Scene(),cam=new T.PerspectiveCamera(32,1,.1,100),es=new T.Scene();es.background=new T.Color(0x14161d);
[[0,9,2,9,3],[-8,3,4,3,6],[8,2,-3,3,6],[0,3,-9,10,3]].forEach(a=>{const m=new T.Mesh(new T.PlaneGeometry(a[3],a[4]),new T.MeshBasicMaterial({color:0xffffff,side:T.DoubleSide}));m.position.set(a[0],a[1],a[2]);m.lookAt(0,0,0);es.add(m)});
sc.environment=new T.PMREMGenerator(R).fromScene(es,.03).texture;
const MT=(c,m,r)=>new T.MeshStandardMaterial({color:c,metalness:m,roughness:r}),grp=new T.Group();sc.add(grp);
grp.add(new T.Mesh(new T.CylinderGeometry(2.3,2.4,.3,96),MT(0x1b1e27,.85,.4)));
const bz=new T.Mesh(new T.TorusGeometry(1.42,.17,32,96),MT(0xd8dbe4,1,.15));bz.rotation.x=Math.PI/2;bz.position.y=.22;grp.add(bz);
const capg=new T.Group();capg.position.y=.3;grp.add(capg);
capg.add(new T.Mesh(new T.LatheGeometry([[0,.3],[.7,.28],[1.1,.2],[1.2,.1],[1.2,-.4],[0,-.4]].map(p=>new T.Vector2(p[0],p[1])),64),new T.MeshStandardMaterial({color:0x16181f,metalness:.6,roughness:.22,side:T.DoubleSide})));
const i0=document.createElement('canvas');i0.width=i0.height=256;const i2=i0.getContext('2d');i2.strokeStyle='#fff';i2.lineWidth=18;i2.lineCap='round';i2.beginPath();i2.arc(128,140,70,-Math.PI/2+.7,-Math.PI/2-.7+Math.PI*2);i2.moveTo(128,50);i2.lineTo(128,130);i2.stroke();
const ic=new T.Mesh(new T.PlaneGeometry(1.1,1.1),new T.MeshBasicMaterial({map:new T.CanvasTexture(i0),transparent:true,color:0x9aa0b4,toneMapped:false,depthWrite:false}));ic.rotation.x=-Math.PI/2;ic.position.y=.303;capg.add(ic);
const rc=document.createElement('canvas');rc.width=rc.height=512;const r2=rc.getContext('2d'),rtx=new T.CanvasTexture(rc);
function ring(p,g){r2.clearRect(0,0,512,512);r2.lineWidth=14;r2.lineCap='round';r2.strokeStyle='rgba(255,255,255,.14)';r2.beginPath();r2.arc(256,256,200,0,6.2832);r2.stroke();if(p>.003){r2.strokeStyle=g?'#3dff9a':'#eef0f6';r2.shadowColor=g?'#3dff9a':'#ffffff';r2.shadowBlur=22;r2.beginPath();r2.arc(256,256,200,-Math.PI/2,-Math.PI/2+p*6.2832);r2.stroke();r2.shadowBlur=0}rtx.needsUpdate=true}ring(0,0);
const rp=new T.Mesh(new T.PlaneGeometry(4.35,4.35),new T.MeshBasicMaterial({map:rtx,transparent:true,toneMapped:false,depthWrite:false}));rp.rotation.x=-Math.PI/2;rp.position.y=.18;grp.add(rp);
const gl=new T.PointLight(0xff4d5e,.6,8);gl.position.set(0,1.6,0);sc.add(gl);const dl=new T.DirectionalLight(0xffffff,.9);dl.position.set(3,6,4);sc.add(dl);
let st=0,pressed=false,hold=false,prog=0,pp=-1,w=0,q=0,bump=0,tm=0,d=8,asp=1.6,on=true,lt=performance.now(),ho,hgn;
const rz=()=>{const W=I.clientWidth,H=I.clientHeight;R.setSize(W,H,false);asp=W/H;cam.aspect=asp;cam.updateProjectionMatrix();d=Math.max(7.5,3.2/(.2867*asp))};rz();addEventListener('resize',rz);
function hum(){if(!AC||!M||ho)return;ho=AC.createOscillator();ho.type='sine';ho.frequency.value=55;hgn=AC.createGain();hgn.gain.value=0;ho.connect(hgn);hgn.connect(M);ho.start()}
function wake(){st=1;bump=1;hum();gl.color.setHex(0xaecbff);ic.material.color.setHex(0xeef0f6);ic.material.opacity=1;I.querySelector('h3').textContent='Welcome';const h=$('ih');h.style.opacity=0;setTimeout(()=>{h.textContent='Tap and hold the button to get in';h.style.opacity=1},350)}
const cv=$('c3');cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('pointerdown',e=>{if(st>1)return;au();pressed=true;if(st===1)hold=true;cv.setPointerCapture(e.pointerId)});
const up=()=>{if(st>1)return;if(st===0&&pressed)wake();pressed=false;hold=false};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
function fin(){if(hgn)hgn.gain.setTargetAtTime(0,AC.currentTime,.2);I.classList.add('off');live=true;t=disp=0;playing=true;ui();cur=-1;setTimeout(()=>{on=false;R.dispose()},900)}
function loop(now){if(!on)return;const dt=Math.min(.05,(now-lt)/1000);lt=now;tm+=dt;
if(st===1){prog=hold?Math.min(1,prog+dt/2.2):Math.max(0,prog-dt*.4);if(prog>=1){st=2;hold=false;ic.material.color.setHex(0x3dff9a);gl.color.setHex(0x3dff9a);ring(1,1);pp=1}}
if(prog!==pp&&st===1){ring(prog,0);pp=prog}
if(st===2){w+=dt;if(w>.5)q=Math.min(1,q+dt/1.1);if(q>=1){st=3;fin()}}
const ty=(pressed||st>=2)?.1:.3;capg.position.y+=(ty-capg.position.y)*Math.min(1,dt*18);
if(st===0)ic.material.opacity=.55+.25*Math.sin(tm*2.2);
const gt=st===0?.6:st===1?1.1+prog*.8:2.6;gl.intensity+=(gt-gl.intensity)*Math.min(1,dt*6);
if(hgn){bump=Math.max(0,bump-dt*.8);hgn.gain.setTargetAtTime(st===1?.015+.1*prog+.08*bump:0,AC.currentTime,.12);ho.frequency.setTargetAtTime(55+prog*80,AC.currentTime,.1)}
grp.rotation.z=Math.sin(tm*.6)*.03;const e=q*q*(3-2*q);cam.position.lerpVectors(new V(0,d*.62,d*.78),new V(0,2.4,1.1),e);cam.lookAt(0,0,0);R.render(sc,cam);requestAnimationFrame(loop)}
requestAnimationFrame(loop)})();
(function(){const I=$('intro');return;
const T=THREE,R=new T.WebGLRenderer({canvas:$('c3'),antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio||1,2));R.outputEncoding=T.sRGBEncoding;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.15;
const sc=new T.Scene(),cam=new T.PerspectiveCamera(32,1,.1,100),es=new T.Scene();es.background=new T.Color(0x14161d);
[[0,9,2,9,3],[-8,3,4,3,6],[8,2,-3,3,6],[0,3,-9,10,3]].forEach(a=>{const m=new T.Mesh(new T.PlaneGeometry(a[3],a[4]),new T.MeshBasicMaterial({color:0xffffff,side:T.DoubleSide}));m.position.set(a[0],a[1],a[2]);m.lookAt(0,0,0);es.add(m)});
sc.environment=new T.PMREMGenerator(R).fromScene(es,.03).texture;
const dl=new T.DirectionalLight(0xffffff,1.1);dl.position.set(3,6,4);sc.add(dl);const rl=new T.PointLight(0xff4d5e,.9,16);rl.position.set(-5,3,3);sc.add(rl);
const M=(c,m,r)=>new T.MeshStandardMaterial({color:c,metalness:m,roughness:r});
const rr=(w,d,r,h,b)=>{const s=new T.Shape(),x=-w/2,y=-d/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+d-r);s.quadraticCurveTo(x+w,y+d,x+w-r,y+d);s.lineTo(x+r,y+d);s.quadraticCurveTo(x,y+d,x,y+d-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);const g=new T.ExtrudeGeometry(s,{depth:h,bevelEnabled:true,bevelThickness:b,bevelSize:b,bevelSegments:3,curveSegments:8});g.translate(0,0,-h/2);return g};
const sk=document.createElement('canvas');sk.width=1024;sk.height=660;const c2=sk.getContext('2d'),stx=new T.CanvasTexture(sk);stx.encoding=T.sRGBEncoding;
function dr(s,p){c2.fillStyle='#000';c2.fillRect(0,0,1024,660);c2.textAlign='center';if(s===1){c2.fillStyle='#eef0f6';c2.font='700 64px system-ui';c2.fillText('THOMAS',512,300);c2.fillStyle='#262a36';c2.fillRect(362,360,300,6);c2.fillStyle='#ff4d5e';c2.fillRect(362,360,300*p,6)}
if(s===2){const g=c2.createLinearGradient(0,0,1024,660);g.addColorStop(0,'#0d1330');g.addColorStop(1,'#26307a');c2.fillStyle=g;c2.fillRect(0,0,1024,660);c2.textAlign='left';c2.fillStyle='#eef0f6';c2.font='800 84px system-ui';c2.fillText('Hi, I’m Thomas',70,260);c2.font='28px system-ui';c2.fillStyle='#c4c8d8';c2.fillText('Autodidact, rookie video editor and generally just a chill guy.',70,320);[['#ff4d5e',70,430,380],['#7c5cff',300,480,420],['#2ec4b6',150,530,300]].forEach(a=>{c2.fillStyle=a[0];c2.fillRect(a[1],a[2],a[3],34)});c2.fillStyle='#fff';c2.fillRect(520,400,4,190)}stx.needsUpdate=true}dr(0,0);
const lp=new T.Group();sc.add(lp);const al=M(0xcfd2db,1,.26),dk=M(0x12141a,.3,.55);
const base=new T.Mesh(rr(6,4.2,.28,.22,.04),al);base.rotation.x=-Math.PI/2;base.position.y=.11;lp.add(base);
const hg=new T.Group();hg.position.set(0,.36,-2.1);lp.add(hg);const lg=new T.Group();lg.position.z=2.1;hg.add(lg);
const lid=new T.Mesh(rr(6,4.2,.28,.1,.04),al);lid.rotation.x=-Math.PI/2;lg.add(lid);
const bz=new T.Mesh(new T.PlaneGeometry(5.9,3.95),new T.MeshBasicMaterial({color:0x050506}));bz.rotation.x=Math.PI/2;bz.position.y=-.092;lg.add(bz);
const scr=new T.Mesh(new T.PlaneGeometry(5.5,3.55),new T.MeshBasicMaterial({map:stx,toneMapped:false}));scr.rotation.x=Math.PI/2;scr.position.y=-.094;lg.add(scr);
const lo=new T.Mesh(new T.RingGeometry(.2,.28,48),new T.MeshBasicMaterial({color:0xeef0f6}));lo.rotation.x=-Math.PI/2;lo.position.y=.095;lg.add(lo);
const hn=new T.Mesh(new T.CylinderGeometry(.09,.09,3.6,24),dk);hn.rotation.z=Math.PI/2;hn.position.set(0,.34,-2.12);lp.add(hn);
const km=new T.InstancedMesh(new T.BoxGeometry(.3,.05,.3),M(0x15171e,.2,.6),70),dm=new T.Object3D();let ki=0;for(let r=0;r<5;r++)for(let c=0;c<14;c++){dm.position.set(-2.6+c*.4,.28,-1.3+r*.36);dm.updateMatrix();km.setMatrixAt(ki++,dm.matrix)}lp.add(km);
const tr1=new T.Mesh(new T.BoxGeometry(2.1,.008,1.4),dk),tr2=new T.Mesh(new T.BoxGeometry(2,.012,1.3),M(0xaeb3bf,.9,.3));tr1.position.set(0,.262,1.25);tr2.position.set(0,.265,1.25);lp.add(tr1,tr2);
const bc=document.createElement('canvas');bc.width=bc.height=128;const b2=bc.getContext('2d'),bg=b2.createRadialGradient(64,64,4,64,64,64);bg.addColorStop(0,'rgba(0,0,0,.7)');bg.addColorStop(1,'rgba(0,0,0,0)');b2.fillStyle=bg;b2.fillRect(0,0,128,128);
const sh=new T.Mesh(new T.PlaneGeometry(10,8),new T.MeshBasicMaterial({map:new T.CanvasTexture(bc),transparent:true,depthWrite:false}));sh.rotation.x=-Math.PI/2;sh.position.y=-.5;sc.add(sh);
let W,Hh,cz=10,asp=1.6,tm=0,ang=0,tg=0,ph=0,pr=0,q=0,fc=0,dn=false,py=0,t0=0,mv=0,on=true,lt=performance.now();const MX=1.92,cv=$('c3'),V=T.Vector3;
const rz=()=>{W=I.clientWidth;Hh=I.clientHeight;R.setSize(W,Hh,false);asp=W/Hh;cam.aspect=asp;cz=Math.max(10,4.4/(Math.tan(16*Math.PI/180)*asp));cam.updateProjectionMatrix()};rz();addEventListener('resize',rz);
cv.addEventListener('pointerdown',e=>{if(ph)return;au();dn=true;py=e.clientY;t0=tg;mv=0;cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointermove',e=>{if(!dn)return;mv+=Math.abs(e.movementY||1);tg=Math.max(0,Math.min(1,t0+(py-e.clientY)/(Hh*.45)))});
cv.addEventListener('pointerup',()=>{if(!dn)return;dn=false;tg=(mv<5||tg>.45)?1:0});
function fin(){I.classList.add('off');live=true;t=disp=0;playing=true;ui();cur=-1;setTimeout(()=>{on=false;R.dispose()},900)}
function loop(now){if(!on)return;const dt=Math.min(.05,(now-lt)/1000);lt=now;tm+=dt;fc++;
ang+=(tg*MX-ang)*Math.min(1,dt*6);hg.rotation.x=-ang;const o=ang/MX;lp.position.y=Math.sin(tm*1.3)*.08*(1-q);lp.rotation.y=Math.sin(tm*.5)*.18*(1-o);
if(ph===0&&ang>MX-.03){ph=1;pr=0;$('ih').style.opacity=0;dr(1,0)}
if(ph===1){pr=Math.min(1,pr+dt/1.6);if(fc%3===0)dr(1,pr);if(pr>=1){dr(2,1);ph=2}}
if(ph===2){q=Math.min(1,q+dt/1.3);if(q>=1){ph=3;fin()}}
const c=new V(0,.36+2.1*Math.sin(ang),-2.1+2.1*Math.cos(ang)),n=new V(0,-Math.cos(ang),Math.sin(ang)),e=q*q*(3-2*q),end=c.clone().addScaledVector(n,Math.max(5.2,2.9/(.2867*asp)));
cam.position.lerpVectors(new V(0,3.4,cz),end,e);cam.lookAt(new V(0,1.1,0).lerp(c,e));R.render(sc,cam);requestAnimationFrame(loop)}
requestAnimationFrame(loop)})();
(function(){const I=$('intro');return;
const T=THREE,R=new T.WebGLRenderer({canvas:$('c3'),antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio||1,2));
const sc=new T.Scene(),cam=new T.PerspectiveCamera(38,1,.1,80);
sc.add(new T.AmbientLight(0x8890b0,.8));const dl=new T.DirectionalLight(0xffffff,1.2);dl.position.set(3,5,4);sc.add(dl);const pl=new T.PointLight(0xff4d5e,1.4,14);pl.position.set(-1,1.5,3.5);sc.add(pl);
const M=(c,m,r)=>new T.MeshStandardMaterial({color:c,metalness:m,roughness:r});
const al=M(0xb9bfcc,.85,.32),port=new T.Mesh(new T.BoxGeometry(7,.7,3.6),al);port.position.set(-3.5,0,0);sc.add(port);
const ds=new T.Mesh(new T.PlaneGeometry(40,40),M(0x0e1017,.2,.65));ds.rotation.x=-Math.PI/2;ds.position.y=-.36;sc.add(ds);const gr=new T.GridHelper(40,40,0x2a2f45,0x171a24);gr.position.y=-.355;sc.add(gr);
const ka=.3,lid=new T.Mesh(new T.BoxGeometry(7,2.6,.1),al);lid.position.set(-3.5,.35+1.3*Math.cos(ka),-1.8-1.3*Math.sin(ka));lid.rotation.x=-ka;sc.add(lid);
const sc2=document.createElement('canvas');sc2.width=512;sc2.height=200;const y2=sc2.getContext('2d'),gd=y2.createLinearGradient(0,0,512,200);gd.addColorStop(0,'#0d1330');gd.addColorStop(1,'#26307a');y2.fillStyle=gd;y2.fillRect(0,0,512,200);[['#ff4d5e',30,60,200],['#7c5cff',150,110,230],['#2ec4b6',60,160,150]].forEach(c=>{y2.fillStyle=c[0];y2.fillRect(c[1],c[2]-24,c[3],22)});y2.fillStyle='#fff';y2.fillRect(250,0,3,200);
const scr=new T.Mesh(new T.PlaneGeometry(6.6,2.3),new T.MeshBasicMaterial({map:new T.CanvasTexture(sc2)}));scr.position.z=.052;lid.add(scr);
const km=new T.InstancedMesh(new T.BoxGeometry(.28,.05,.28),M(0x1c1f2a,.4,.5),70),dm=new T.Object3D();let ki=0;for(let r=0;r<5;r++)for(let c=0;c<14;c++){dm.position.set(-6.4+c*.34+(r%2)*.05,.37,-1.2+r*.36);dm.updateMatrix();km.setMatrixAt(ki++,dm.matrix)}sc.add(km);
const tp2=new T.Mesh(new T.BoxGeometry(1.8,.01,1.1),M(0x2a2f3c,.5,.4));tp2.position.set(-3.5,.355,1.15);sc.add(tp2);
const dk=new T.MeshBasicMaterial({color:0x050607}),ua=new T.Mesh(new T.BoxGeometry(.07,.2,.7),dk),uc=new T.Mesh(new T.BoxGeometry(.07,.12,.4),dk);ua.position.set(.036,-.02,1.1);uc.position.set(.036,0,-1.2);sc.add(ua,uc);
const rl=new T.PointLight(0x4d7cff,1.6,14);rl.position.set(-4,2,-3);sc.add(rl);
const fr=new T.Mesh(new T.BoxGeometry(.06,.3,1.3),M(0x7d8394,.9,.3));fr.position.set(.03,0,0);sc.add(fr);
const sl=new T.Mesh(new T.BoxGeometry(.07,.14,1.12),new T.MeshBasicMaterial({color:0}));sl.position.set(.035,0,0);sc.add(sl);
const led=new T.Mesh(new T.SphereGeometry(.05,16,16),new T.MeshStandardMaterial({color:0x330000,emissive:0xff2233,emissiveIntensity:.6}));led.position.set(.03,.17,1.35);sc.add(led);
const sh=new T.Shape();sh.moveTo(-.5,-.7);sh.lineTo(.5,-.7);sh.lineTo(.5,.45);sh.lineTo(.25,.7);sh.lineTo(-.5,.7);sh.closePath();
const cg=new T.ExtrudeGeometry(sh,{depth:.07,bevelEnabled:true,bevelSize:.02,bevelThickness:.015,bevelSegments:2});cg.translate(0,0,-.035);
const inner=new T.Group();inner.rotation.set(-Math.PI/2,0,Math.PI/2);inner.add(new T.Mesh(cg,M(0x2b3050,.35,.4)));
const lc=document.createElement('canvas');lc.width=256;lc.height=224;const x=lc.getContext('2d');x.fillStyle='#e9ecf5';x.fillRect(0,0,256,224);x.fillStyle='#ff4d5e';x.fillRect(0,0,256,48);x.fillStyle='#111';x.textAlign='center';x.font='700 38px monospace';x.fillText('THOMAS',128,118);x.font='24px monospace';x.fillText('128GB PRO',128,160);
const lb=new T.Mesh(new T.PlaneGeometry(.8,.7),new T.MeshStandardMaterial({map:new T.CanvasTexture(lc),roughness:.5}));lb.position.set(0,-.15,.053);inner.add(lb);
for(let i=0;i<6;i++){const k=new T.Mesh(new T.BoxGeometry(.07,.2,.01),M(0xffc857,1,.25));k.position.set(-.4+i*.12,.5,-.052);inner.add(k)}
const hd=new T.Group();hd.add(inner);sc.add(hd);
const N=90,pa=new Float32Array(N*3);for(let i=0;i<N*3;i++)pa[i]=(Math.random()-.5)*14;const pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(pa,3));const dust=new T.Points(pg,new T.PointsMaterial({size:.04,color:0x8890b0}));sc.add(dust);
let W,Hh,sx=3.6,cz=5.2,p=0,tp=0,ph=0,q=0,dn=false,px=0,p0=0,mv=0,mx=0,my=0,on=true,tm=0,lt=performance.now();
const rz=()=>{W=I.clientWidth;Hh=I.clientHeight;R.setSize(W,Hh,false);cam.aspect=W/Hh;cz=Math.max(5.2,3.4/(Math.tan(19*Math.PI/180)*cam.aspect));sx=cam.aspect<.8?2.6:3.6;cam.updateProjectionMatrix()};rz();addEventListener('resize',rz);
const cv=$('c3');
cv.addEventListener('pointerdown',e=>{if(ph)return;au();dn=true;px=e.clientX;p0=tp;mv=0;cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointermove',e=>{mx=e.clientX/W-.5;my=e.clientY/Hh-.5;if(!dn)return;mv+=Math.abs(e.movementX||1);tp=Math.max(0,Math.min(1,p0+(px-e.clientX)/(Math.min(W,700)*.7)))});
cv.addEventListener('pointerup',()=>{if(!dn)return;dn=false;if(mv<5||tp>.7)ins();else tp=0});
function ins(){ph=1;tp=1}
function fin(){on=false;R.dispose();I.classList.add('off');live=true;t=disp=D-.01;rew=true;cur=-1}
function loop(now){if(!on)return;const dt=Math.min(.05,(now-lt)/1000);lt=now;tm+=dt;
p+=(tp-p)*Math.min(1,dt*9);const f=1-p;
hd.position.set(sx-(sx+.2)*p,Math.sin(tm*1.6)*.18*f,0);hd.rotation.set(Math.sin(tm*.9)*.9*f,Math.sin(tm*.7)*.35*f,Math.cos(tm*1.1)*.12*f);
if(ph===1&&p>.985){ph=2;led.material.emissive.setHex(0x3dff9a);led.material.emissiveIntensity=2;pl.color.setHex(0x3dff9a)}
if(ph===2){q=Math.min(1,q+dt/1.1);if(q>=1){ph=3;$('pb').style.opacity=1;const b=$('pb').firstChild;b.style.transition='width 1s linear';b.style.width='100%';setTimeout(fin,1100)}}
const e=q*q*(3-2*q);cam.position.set(2.2*(1-e)+.6*e+mx*.8*(1-e),1.4*(1-e)+.2*e-my*.5*(1-e),cz*(1-e)+2.6*e);cam.lookAt(-.2*e,0,0);dust.rotation.y=tm*.03;
R.render(sc,cam);requestAnimationFrame(loop)}
requestAnimationFrame(loop)})();
(function(){if(window.THREE)return;const c=$('card');let dy=0,sy=0,dn=false,mv=0,done=false;
 const set=y=>{dy=Math.max(0,Math.min(120,y));c.style.transform=`translateY(${dy}px)`};
 c.addEventListener('pointerdown',e=>{if(done)return;au();dn=true;mv=0;sy=e.clientY-dy;c.classList.add('d');c.setPointerCapture(e.pointerId)});
 c.addEventListener('pointermove',e=>{if(!dn)return;mv++;set(e.clientY-sy)});
 c.addEventListener('pointerup',()=>{if(!dn)return;dn=false;c.classList.remove('d');if(dy>80||mv<3)ins();else set(0)});
 function ins(){if(done)return;done=true;set(120);bl(900,.06);setTimeout(()=>bl(500,.08),90);$('ih').style.display='none';$('pb').style.opacity=1;
  const L=['IMPORTING 3 CLIPS…','CLIP_001.MOV  OK','CLIP_002.MOV  OK','MONANYMOUS_FINAL.MOV  OK'];let n=0;
  const iv=setInterval(()=>{$('imp').innerHTML=L.slice(0,++n).join('<br>');bl(700+n*120,.05);$('pb').firstChild.style.width=n*25+'%';if(n>=4){clearInterval(iv);setTimeout(end,500)}},520)}
 function end(){bl(90,.8,'sawtooth',.25);$('intro').classList.add('off');live=true;t=disp=D-.01;rew=true;cur=-1}
})();
/* canvas */
const cv=$('cv'),g=cv.getContext('2d');let W,H,P=[...Array(90)].map(()=>({x:Math.random(),y:Math.random(),z:.2+Math.random()*.8}));
function rs(){const d=Math.min(devicePixelRatio||1,2);W=mon.clientWidth;H=mon.clientHeight;cv.width=W*d;cv.height=H*d;g.setTransform(d,0,0,d,0,0);layout();build()}
addEventListener('resize',rs);
let last=performance.now(),pmx=-999,pmy=-999,pm=0,lastG=0,lastS=0;const SP=[];
const tch=(e,n)=>{const r=mon.getBoundingClientRect();pmx=e.clientX-r.left;pmy=e.clientY-r.top;pm=.25;for(let i=0;i<n;i++){const a=Math.random()*6.28,v=60+Math.random()*180;SP.push({x:pmx,y:pmy,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:.25+Math.random()*.3})}};
mon.addEventListener('pointermove',e=>tch(e,2));mon.addEventListener('pointerdown',e=>tch(e,16));mon.addEventListener('pointerleave',()=>{pmx=pmy=-999});
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;
 if(rew){t=Math.max(0,t-D/2.6*dt);if(t<=0){rew=false;playing=true;ui()}}
 else if(playing){t+=dt;if(t>=D-.01){t=D-.01;playing=false;ui()}}
 const pd=disp;disp+=(t-disp)*(1-Math.pow(.0005,dt));vel+=(((disp-pd)/dt)-vel)*.2;
 strip.style.transform=`translate3d(${innerWidth/2-disp*pps}px,0,0)`;
 const i=Math.min(4,Math.floor(disp/SEC));if(i!==cur)show(i);
 $('tc').textContent=tc(disp);
 if(!rew&&live&&Math.abs(vel)>14&&now-lastGl>700){lastGl=now;mon.classList.add('gl');setTimeout(()=>mon.classList.remove('gl'),230);tst('Dropped frame, scrub slower')}
 if(lp)lp.frequency.setTargetAtTime(300+S[cur].h*2,AC.currentTime,.3);if(live&&!rew&&now-lastS<300&&Math.abs(vel)>2.5&&now-lastG>100){lastG=now;}pm=Math.max(0,pm-dt);
 g.clearRect(0,0,W,H);
 const sg=Math.sign(vel)||1,k=.012+Math.min(Math.abs(vel),30)*.012;g.strokeStyle=`hsl(${S[cur].h} 90% 62%)`;g.lineCap='round';
 const col=`hsl(${S[cur].h} 90% 62%)`;g.shadowColor=col;g.shadowBlur=12;for(const p of P){p.x-=sg*k*p.z*dt*8;if(p.x<-.1){p.x=1.1;p.h=[]}if(p.x>1.1){p.x=-.1;p.h=[]}let x=p.x*W,y=p.y*H;if(p.w===undefined)p.w=Math.random()<.5;if(p.w)y+=Math.sin(performance.now()/450+p.z*9+p.y*20)*(5+p.z*9);const dxp=x-pmx,dyp=y-pmy;if(pm>0&&dxp*dxp+dyp*dyp<12000)p.f=1;p.f=(p.f||0)*.9;const f=p.f;if(f>.02){x+=(Math.random()-.5)*14*f;y+=(Math.random()-.5)*14*f}(p.h=p.h||[]).push([x,y]);if(p.h.length>10)p.h.shift();if(p.h.length>1){g.globalAlpha=.12+p.z*.3;g.strokeStyle=col;g.lineWidth=p.z*1.6;g.beginPath();g.moveTo(p.h[0][0],p.h[0][1]);for(let j=1;j<p.h.length;j++)g.lineTo(p.h[j][0],p.h[j][1]);g.stroke()}g.globalAlpha=Math.min(1,.25+p.z*.6+f);g.strokeStyle=f>.1?'#fff':col;g.lineWidth=p.z*2.2+f*2;g.beginPath();g.moveTo(x,y);g.lineTo(x+sg*Math.min(80,Math.abs(vel)*5*p.z)+sg*2+(Math.random()-.5)*20*f,y+(Math.random()-.5)*8*f);g.stroke()}
 for(let i=SP.length-1;i>=0;i--){const s=SP[i];s.l-=dt;if(s.l<=0){SP.splice(i,1);continue}s.x+=s.vx*dt;s.y+=s.vy*dt;g.globalAlpha=Math.min(1,s.l*3);g.strokeStyle='#fff';g.lineWidth=1.5;g.beginPath();g.moveTo(s.x,s.y);g.lineTo(s.x-s.vx*.03,s.y-s.vy*.03);g.stroke()}
 g.shadowBlur=0;g.globalAlpha=.5;g.lineWidth=1.5;g.beginPath();
 for(let x=0;x<=W;x+=6){const y=H*.82+Math.sin(x*.02+disp*3)*(8+Math.min(Math.abs(vel),20)*3)*Math.sin(x*.004+disp);x?g.lineTo(x,y):g.moveTo(x,y)}g.stroke();g.globalAlpha=1;
 requestAnimationFrame(frame)}
rs();ui();requestAnimationFrame(frame);
