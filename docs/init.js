function initStudy() {
const ac = new AbortController();
const canvasEl = document.getElementById('canvas');
if (!canvasEl) return function(){};
const nodesEl = document.getElementById('nodes');
const readingEl = document.getElementById('reading');
const stepsEl = document.getElementById('steps');
if (nodesEl) nodesEl.replaceChildren();
if (readingEl) readingEl.replaceChildren();
if (stepsEl) stepsEl.replaceChildren();

function token(name,fallback){
  const v=getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v||fallback;
}
function currentTheme(){
  return document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';
}
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  try{localStorage.setItem('btc-theme', theme)}catch{}
  const btn=$('theme-toggle');
  if(btn){
    const night=theme==='dark';
    btn.setAttribute('aria-pressed', String(night));
    btn.textContent=night?'Paper':'Night';
    btn.title=night?'Return to the paper study palette.':'Switch to a night palette for low light.';
  }
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta)meta.setAttribute('content', token('--theme-color', theme==='dark'?'#121916':'#f4f1e9'));
  schedule();
}
function initTheme(){
  let theme='light';
  try{
    const stored=localStorage.getItem('btc-theme');
    if(stored==='dark'||stored==='light') theme=stored;
    else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches) theme='dark';
  }catch{}
  applyTheme(theme);
  const btn=$('theme-toggle');
  if(btn) btn.onclick=()=>applyTheme(currentTheme()==='dark'?'light':'dark');
}
function initToc(signal){
  const sections=[
    {id:'explore', name:'Explore the model'},
    {id:'study-guide', name:'The twelve links'},
    {id:'study-deeper', name:'Study deeper'},
    {id:'further-reading', name:'Books & scholarship'},
  ];
  const indexEl=$('toc-index'), nameEl=$('toc-name');
  function setActive(id){
    const i=sections.findIndex(s=>s.id===id);
    if(i<0)return;
    if(indexEl) indexEl.textContent=`${i+1} of ${sections.length}`;
    if(nameEl) nameEl.textContent=sections[i].name;
    document.querySelectorAll('[data-toc]').forEach(a=>{
      if(a.getAttribute('data-toc')===id) a.setAttribute('aria-current','true');
      else a.removeAttribute('aria-current');
    });
  }
  const visible=new Map();
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(en=>visible.set(en.target.id, en.isIntersecting && en.intersectionRatio));
    let best=sections[0].id, bestScore=-1;
    sections.forEach(s=>{
      const score=visible.get(s.id)||0;
      if(score>bestScore){bestScore=score;best=s.id}
    });
    setActive(best);
  },{rootMargin:'-20% 0px -55% 0px', threshold:[0,0.15,0.4,0.7]});
  sections.forEach(s=>{const el=$(s.id); if(el) io.observe(el)});
  if(signal) signal.addEventListener('abort', ()=>io.disconnect());
}

// Canonical terms, paraphrased definitions, and clearly separated teaching illustrations.
const links=[
['Ignorance','Avijjā','Not understanding suffering, its origin, its cessation, and the path leading to its cessation.','Ignorance reaches deeper than missing information. It is a fundamental misunderstanding that shapes experience and action.','Ignorance is the first item in this formula, not a first cause of the universe.','Invite the audience to distinguish knowing a definition from understanding it in lived experience.'],
['Volitional formations','Saṅkhārā','Intentional activities of body, speech, and mind, conditioned here by ignorance.','These activities shape the continuation of experience and have karmic significance.','The word has different uses in Buddhist texts. Here it belongs to the dependent-arising formula.','Ask how repeated intentions can shape what someone notices and does. Label this an illustration.'],
['Consciousness','Viññāṇa','Consciousness associated with seeing, hearing, smelling, tasting, bodily sensing, and mental objects.','Consciousness is presented as conditioned, rather than as an independent observer or permanent self.','Other early sequences describe consciousness and name-and-form as mutually conditioning. This diagram follows SN 12.2.','Refer to SN 12.67 for the two bundles of reeds: a companion model, not an extra arrow silently added here.'],
['Name-and-form','Nāma-rūpa','Mental factors and physical form: the embodied complex involved in experience.','“Name” includes feeling, perception, intention, contact, and attention; “form” refers to material form.','Read “name” here as mental factors and “form” as materiality, beyond the everyday sense of naming an object’s appearance.','Pause here: consciousness and the mental–physical complex should not be mistaken for a soul and its container.'],
['Six sense bases','Saḷāyatana','The eye, ear, nose, tongue, body, and mind as the six bases of experience.','Mind is included because thoughts, memories, and other mental objects can be experienced.','This classification is a Buddhist account of experience, not a claim about the modern anatomical count of senses.','Invite the audience to notice that a remembered criticism can become a mental object without new speech occurring.'],
['Contact','Phassa','The meeting of a sense faculty, its object, and the corresponding consciousness.','An experience of contact provides a condition for a pleasant, unpleasant, or neutral feeling tone.','Hearing a sound and encountering a thought are also instances of contact.','Use hearing criticism as a partial illustration, while keeping the full rebirth-related sequence distinct.'],
['Feeling','Vedanā','The pleasant, unpleasant, or neutral tone of an experience.','Feeling provides a condition for craving when the relevant supporting conditions are present.','Anger involves more than feeling tone. Feeling continues in an awakened person without giving rise to craving.','This is a helpful place to open the daily-life example. Do not imply that mindfulness once equals complete liberation.'],
['Craving','Taṇhā','Thirst for experiences through the six senses; elsewhere also classified as craving for sensuality, existence, and nonexistence.','Pleasure may invite “more”; pain may invite “make it stop.” Craving can develop into clinging.','Wholesome aspiration and intention are distinguished from craving.','Distinguish wanting relief from discomfort and compulsively grasping at relief. Avoid diagnosing the audience.'],
['Clinging','Upādāna','Grasping at sensual pleasures, views, rules and observances, or doctrines of self.','Craving becomes a more entrenched holding on, supporting the continuation of becoming.','Ethical practice has its place. Clinging enters when practices are held to be sufficient for liberation in themselves.','“I must be right” can illustrate clinging to a view. It is one example, not an exhaustive definition.'],
['Becoming','Bhava','Existence or becoming in the sensual, form, and formless domains, conditioning birth.','Traditional analysis connects this with karmic activity and the existence it sustains.','Reducing this link to adopting a temporary identity would leave out the early texts’ rebirth framework.','Present the canonical definition first. Keep modern psychological applications explicitly separate.'],
['Birth','Jāti','The coming into existence of beings, including the appearance of the aggregates and acquisition of sense bases.','Birth is the condition for aging and death. In this framework it includes renewed birth.','“Birth of an ego-state” offers an interpretive application. SN 12.2 has a broader account of birth.','Do not ask the audience to accept rebirth as scientifically demonstrated. Explain what the early Buddhist text teaches.'],
['Aging-and-death','Jarāmaraṇa','Aging and dying, together with the sorrow, lamentation, pain, distress, and despair described in the formula.','The sequence concludes with the arising of this whole mass of suffering.','There is no additional “death causes ignorance” arrow in the standard formula. The ring is intentionally open.','Close the arising journey by switching to cessation. This teaching is also about the possibility of release.']
];
const cessationNotes=["Wisdom addresses ignorance. The cessation formula begins with ignorance fading completely; a single intellectual insight is not equated with full liberation.", "Formations conditioned by ignorance cease. Wholesome intention and ordinary activity remain possible for a living awakened person.", "The formula concerns consciousness conditioned within this sequence, rather than an exercise in becoming unconscious. Schools explain its timing and scope differently.", "Release concerns the process sustaining suffering and renewed existence. Bodily destruction is no part of this instruction.", "Existing embodied life continues after awakening, including sight, hearing, and the other senses.", "Contact still occurs for a living awakened person. The full cessation formula is broader than suppressing contact in a moment of ordinary experience.", "Feeling can be experienced without craving. Reducing reactivity in daily life illustrates an aspect of practice; it is not identical to completion of the entire cessation sequence.", "When craving no longer sustains clinging, the sequence loses a crucial support. Repressing a desire temporarily is not the same as uprooting craving.", "With clinging ended, it no longer sustains becoming in this account. Releasing one opinion is a useful illustration, not proof of complete liberation.", "The formula concerns becoming that conditions birth. It retains the early texts’ concern with renewed existence, rather than referring only to changes in personality.", "Without renewed birth, the aging and death of that future life have no basis. An existing body remains mortal after awakening.", "The cessation formula concludes with suffering’s ending. It describes release through the ending of its sustaining conditions, not the annihilation of a permanent self."];
const $=id=>document.getElementById(id), sn='https://www.accesstoinsight.org/tipitaka/sn/sn12/sn12.002.than.html', mn148='https://www.accesstoinsight.org/tipitaka/mn/mn.148.than.html', reed='https://www.accesstoinsight.org/tipitaka/sn/sn12/sn12.067.than.html', upanisa='https://www.accesstoinsight.org/tipitaka/sn/sn12/sn12.023.than.html', bodhiPath='https://www.accesstoinsight.org/lib/authors/bodhi/wheel277.html', sc=uid=>`https://suttacentral.net/${uid}`;
function dual(ati,uid,label){return `<a href="${ati}" target="_blank" rel="noopener">${label} ↗</a> · <a href="${sc(uid)}" target="_blank" rel="noopener">SuttaCentral ↗</a>`}
let selected=-1,mode='arising',reading=false,angle=0,tilt=.34,drag=null,positions=[],edgePositions=[],width=0,height=0,raf=0,returnFocus=null;
const canvas=$('canvas'),ctx=canvas.getContext('2d'),nodeButtons=[],readingButtons=[],stepButtons=[];
links.forEach((d,i)=>{
 const b=document.createElement('button');b.className='node';b.innerHTML=`<span class="orb">${String(i+1).padStart(2,'0')}</span><span class="label">${d[0]}</span>`;b.setAttribute('aria-label',`Link ${i+1}: ${d[0]}, ${d[1]}`);b.onclick=()=>{select(i);if(innerWidth<821){$('detail-panel').scrollIntoView({block:'start'});$('detail-panel').focus({preventScroll:true})}};$('nodes').append(b);nodeButtons.push(b);
 const r=document.createElement('button');r.innerHTML=`<span>${String(i+1).padStart(2,'0')} · <span lang="pi">${d[1]}</span></span>${d[0]}`;r.onclick=()=>select(i);$('reading').append(r);readingButtons.push(r);
 const s=document.createElement('button');s.setAttribute('aria-label',`Go to link ${i+1}: ${d[0]}`);s.title=`${i+1}. ${d[0]}`;s.onclick=()=>select(i);$('steps').append(s);stepButtons.push(s);
});
function relation(i){if(mode==='arising')return i<11?`${links[i][0]} ${[1,4].includes(i)?'are':'is'} a condition for ${links[i+1][0].toLowerCase()}.`:'Thus arises this whole mass of suffering.';return i<11?`With the cessation of ${links[i][0].toLowerCase()} comes the cessation of ${links[i+1][0].toLowerCase()}.`:'Thus this whole mass of suffering ceases.';}
function renderPanel(){
 if(selected<0){$('panel').innerHTML=`<div class="panel-top"><span class="eyebrow">Before you begin</span><span class="counter">○</span></div><h2>How suffering is sustained — and how it can end.</h2><div class="pali" lang="pi">Paṭiccasamuppāda</div><p class="definition">Twelve linked conditions from an early Buddhist discourse (SN 12.2). Select a numbered link, or start the guided journey. The ring is open on purpose: the formula does not draw an arrow from death back to ignorance.</p><div class="relation"><div class="eyebrow">Read each arrow as</div><p>“With this as a condition…”</p></div><p class="note">Several conditions may contribute to an outcome. The sequence specifies relationships rather than a timetable or a first cause of the universe.</p><details><summary>Why is the ring open?</summary><p>The standard formula does not add an arrow from aging-and-death to ignorance. The opening preserves that distinction.</p></details><details><summary>What does cessation mean?</summary><p>The cessation view follows the text’s formula for the ending of the conditions sustaining suffering and renewed existence. An awakened living person retains sensory experience and feeling.</p></details>`;}
 else{const d=links[selected];$('panel').innerHTML=`<div class="panel-top"><span class="eyebrow">${mode==='arising'?'Understanding the link':'Understanding cessation'}</span><span class="counter">${String(selected+1).padStart(2,'0')}<small style="font:12px system-ui;color:var(--muted)"> / 12</small></span></div><h2>${d[0]}</h2><div class="pali" lang="pi">${d[1]}</div><div class="neighbors">${selected>0?`<span>Preceding condition<strong>${links[selected-1][0]}</strong></span>`:'<span>First in this formula<strong>Not a first cause</strong></span>'}${selected<11?`<span>Following link<strong>${links[selected+1][0]}</strong></span>`:'<span>Conclusion<strong>Suffering / its cessation</strong></span>'}</div><div class="definition-label">Plain-language introduction</div><p class="definition">${d[2]}</p>${[3,10].includes(selected)?'<button class="small term-help" data-glossary>What are the aggregates?</button>':''}<div class="relation"><div class="eyebrow">${mode==='arising'?'The stated relationship':'The cessation formula'}</div><p>${relation(selected)}</p></div><p class="note">${mode==='arising'?d[3]:cessationNotes[selected]}</p><div class="distinction"><strong>READ WITH CARE</strong>${d[4]}</div><details><summary>Source & interpretation</summary><p>The sequence and core definitions follow SN 12.2. Introductory glosses draw on related discourses; explanatory notes also draw on Harvey and Gethin. Contact and feeling also draw on <a href="https://www.accesstoinsight.org/tipitaka/mn/mn.148.than.html" target="_blank" rel="noopener">MN 148</a>. Formations are read here in their karmic context; translation choices differ. ${dual(sn,'sn12.2','Read SN 12.2')} · ${dual(mn148,'mn148','MN 148')}</p></details>${[2,6].includes(selected)?'<button class="small" data-study="study-self">Does this require a permanent self?</button>':''}${[0,3,6,7].includes(selected)?'<button class="small" data-study="study-parallels">Compare textual versions</button>':''}<div class="panel-tools"><button class="small" id="connection-detail">Text · explanation · example</button><button class="small" id="share-link">Copy link to this step</button></div>`;}
 if($('connection-detail'))$('connection-detail').onclick=()=>showConnection(selected);if($('share-link'))$('share-link').onclick=shareStep;document.querySelectorAll('[data-glossary]').forEach(b=>b.onclick=showGlossary);
 $('progress-label').textContent=selected<0?'Your guided journey starts here':`${mode==='arising'?'Arising':'Cessation'} · Link ${selected+1} of 12`;$('next').textContent=selected<0?'Begin journey →':selected===11?(mode==='arising'?'Explore cessation →':'Compare & reflect →'):'Next link →';$('back').disabled=selected<0;
 nodeButtons.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===selected));b.classList.toggle('past',i<selected);b.classList.toggle('near',selected>=0&&Math.abs(i-selected)===1);b.classList.toggle('distant',selected>=0&&Math.abs(i-selected)>1)});readingButtons.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===selected));b.classList.toggle('near',selected>=0&&Math.abs(i-selected)===1)});stepButtons.forEach((b,i)=>{b.classList.toggle('done',i<=selected);if(i===selected)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});
}
function select(i){selected=i;renderPanel();schedule();saveStep();$('announcement').textContent=i<0?'Journey introduction':`Link ${i+1}: ${links[i][0]}. ${relation(i)}`;}
let applyingHash=false;
function setMode(m){
  const fromStart=selected<0&&m==='cessation';
  if(mode===m&&!fromStart) return;
  mode=m;
  if(fromStart) selected=0;
  const arisingBtn=$('arising'), cessBtn=$('cessation');
  if(arisingBtn) arisingBtn.setAttribute('aria-pressed',String(m==='arising'));
  if(cessBtn) cessBtn.setAttribute('aria-pressed',String(m==='cessation'));
  document.body.classList.toggle('ceased',m==='cessation');
  const banner=$('cessation-banner');
  if(banner) banner.hidden=m!=='cessation';
  if($('ring-legend')) $('ring-legend').textContent=m==='arising'?'Filled node: selected · Emphasized neighbors: preceding/following links · The ring remains open':'Emphasized neighbors: preceding/following links · Dashed arrows: cessation illustrated, not sensory shutdown';
  if($('center-mode')) $('center-mode').textContent=m==='arising'?'Conditional arising':'Conditional cessation';
  if($('center-title')) $('center-title').innerHTML=m==='arising'?'With this condition,<br>that arises.':'When this ceases,<br>that ceases.';
  if($('center-sub')) $('center-sub').innerHTML=m==='arising'?'A map of suffering<br>and the possibility of release.':'The ending of conditions<br>that sustain suffering.';
  renderPanel();
  schedule();
  if(!applyingHash) saveStep();
  $('announcement').textContent=`${m} view. ${selected>=0?relation(selected):''}`;
}
// 3D points in a plane, rotated around two axes and projected with perspective.
// Labels stay in screen space for legibility; geometry and shadows preserve depth.
function project(t,r=1){const R=Math.min(width*.34,215)*r;const xx=Math.cos(t+angle)*R,yy=Math.sin(t+angle)*(width<480?height*.37*r:R);const z=yy*Math.sin(tilt),scale=950/(950+z);return{x:width/2+xx*scale,y:height*.49+yy*Math.cos(tilt)*scale,z,scale};}
function theta(i){return(-65+i*310/11)*Math.PI/180;}
function schedule(){if(!raf)raf=requestAnimationFrame(()=>{raf=0;draw()})}
function draw(){if(reading)return;const rect=$('scene').getBoundingClientRect();width=rect.width;height=rect.height;if(!width)return;const dpr=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(width*dpr)||canvas.height!==Math.round(height*dpr)){canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr)}ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);positions=links.map((_,i)=>project(theta(i)));edgePositions=[];
 // A diffuse ground shadow makes the tilt visible without adding an enclosing cycle.
 const dark=currentTheme()==='dark';
 const g=ctx.createRadialGradient(width/2,height*.63,15,width/2,height*.63,width*.37);g.addColorStop(0,dark?'rgba(0,0,0,.42)':'rgba(68,83,54,.065)');g.addColorStop(1,dark?'rgba(0,0,0,0)':'rgba(68,83,54,0)');ctx.fillStyle=g;ctx.save();ctx.translate(0,height*.33);ctx.scale(1,.5);ctx.fillRect(0,0,width,height);ctx.restore();
 const gold=token('--gold','#7a5614'), sage=token('--sage','#32665f'), mute=token('--line','#c5c6b8'), faded=token('--muted','#454e45');
 for(let i=0;i<11;i++){const fading=mode==='cessation'&&i<=selected;ctx.beginPath();for(let j=0;j<=24;j++){let t=theta(i)+(theta(i+1)-theta(i))*(.1+j/24*.8),p=project(t);j?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)}ctx.strokeStyle=fading?mute:i===selected?(mode==='arising'?gold:sage):i<selected?gold:mute;if(selected>=0){const adjacent=i===selected||i===selected-1;ctx.strokeStyle=adjacent?(mode==='arising'?gold:sage):mute;ctx.lineWidth=adjacent?2.8:1}else ctx.lineWidth=1.3;ctx.setLineDash(fading?[3,5]:[]);ctx.stroke();ctx.setLineDash([]);const t=(theta(i)+theta(i+1))/2,p=project(t),q=project(t+.012),rot=Math.atan2(q.y-p.y,q.x-p.x);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(rot);ctx.beginPath();ctx.moveTo(-5,-3);ctx.lineTo(1,0);ctx.lineTo(-5,3);ctx.stroke();ctx.restore();edgePositions.push({x:p.x,y:p.y,i});}
 positions.forEach((p,i)=>{const b=nodeButtons[i];b.style.left=p.x+'px';b.style.top=p.y+'px';b.style.zIndex=String(Math.round(100-p.z));b.querySelector('.orb').style.transform=`scale(${p.scale})`;});
}
$('arising').onclick=null;$('cessation').onclick=null;
function bindImmediate(el, fn){
  if(!el) return;
  let stamp=0;
  el.addEventListener('pointerdown', e=>{
    if(e.pointerType==='mouse' && e.button!==0) return;
    stamp=e.timeStamp;
    fn();
  }, {signal:ac.signal});
  el.addEventListener('click', e=>{
    if(stamp && e.timeStamp-stamp<700){ e.preventDefault(); return; }
    fn();
  }, {signal:ac.signal});
}
bindImmediate($('arising'), ()=>setMode('arising'));
bindImmediate($('cessation'), ()=>setMode('cessation'));
$('next').onclick=()=>{if(selected<11)select(selected+1);else if(mode==='arising'){selected=0;setMode('cessation')}else showSummary()};$('back').onclick=()=>select(Math.max(-1,selected-1));
function setReading(on){
  reading=!!on;
  const vis=$('visual'), tog=$('reading-toggle');
  if(vis) vis.classList.toggle('readmode', reading);
  if(tog){
    tog.setAttribute('aria-pressed', String(reading));
    tog.textContent=reading?'3D ring view':'2D reading view';
  }
  if($('view-label')) $('view-label').textContent=reading?'READABLE OVERVIEW':'3D OPEN RING';
  if($('view-hint')) $('view-hint').textContent=reading?'Select a card to explore its relationship':'Drag to orbit · Select a numbered link';
  schedule();
}
$('reading-toggle').onclick=()=>setReading(!reading);
$('reset').onclick=()=>{angle=0;tilt=.34;schedule()};$('rotate-left').onclick=()=>{angle-=.15;schedule()};$('rotate-right').onclick=()=>{angle+=.15;schedule()};
$('scene').addEventListener('pointerdown',e=>{if(reading||e.target.closest('button'))return;drag={x:e.clientX,y:e.clientY,a:angle,t:tilt,moved:false};if(e.pointerType==='mouse')$('scene').setPointerCapture(e.pointerId)},{signal:ac.signal});
$('scene').addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>6)drag.moved=true;if(drag.moved){angle=drag.a+dx*.003;tilt=Math.max(.05,Math.min(.85,drag.t+dy*.003));schedule()}},{signal:ac.signal});
$('scene').addEventListener('pointerup',e=>{if(!drag)return;if(!drag.moved){const r=$('scene').getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;const hit=edgePositions.find(p=>Math.hypot(p.x-x,p.y-y)<24);if(hit)showConnection(hit.i)}drag=null},{signal:ac.signal});$('scene').addEventListener('pointercancel',()=>drag=null,{signal:ac.signal});
function setCrumb(text){const c=$('modal-crumb');if(!c)return;if(text){c.hidden=false;c.textContent=text}else{c.hidden=true;c.textContent=''}}
function openModal(title,html,crumb){returnFocus=document.activeElement;$('modal-title').textContent=title;setCrumb(crumb||'');$('modal-body').innerHTML=html;$('modal').showModal();$('close-modal').focus()}
function closeModal(){$('modal').close()}
$('modal').addEventListener('close',()=>{if(returnFocus&&document.contains(returnFocus))returnFocus.focus()},{signal:ac.signal});
$('close-modal').onclick=closeModal;$('modal').addEventListener('click',e=>{if(e.target===$('modal')){const r=$('modal').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal()}},{signal:ac.signal});
function showSummary(){openModal('One principle. Two directions of understanding.',`<div class="eyebrow">Reflect on the journey</div><div class="comparison"><section><h3>Arising</h3><p>With ignorance and the other sustaining conditions, the sequence leads to suffering and renewed existence.</p></section><section><h3>Cessation</h3><p>Through the ending of the sustaining conditions, the sequence of suffering and renewed existence ceases.</p></section></div><p>Cessation is not time running backward. Buddhist practice develops the conditions for understanding, non-clinging, and release.</p><h3>Three questions to take with you</h3><ol><li>How does a condition differ from a single sufficient cause?</li><li>How does feeling differ from craving?</li><li>Why does the teaching include cessation as well as arising?</li></ol><p class="note">This model follows the standard formula. Shorter and reciprocal formulas also occur in the early discourses.</p>`, 'Guided journey · Reflect')}
$('sources').onclick=()=>openModal('Sources & scope',`<div class="eyebrow">Early-discourse foundation</div><p>The main model follows the twelve-link sequence in SN 12.2. Selected Chinese Saṃyukta Āgama parallels are compared where noted, with agreement and differences preserved. Texts are paraphrased for study; the model serves education rather than scientific simulation.</p><h3>Main text &amp; companion discourses</h3><ol><li>${dual(sn,'sn12.2','SN 12.2 · Analysis of Dependent Co-arising')}<br>Sequence, definitions, and cessation.</li><li>${dual(reed,'sn12.67','SN 12.67 · Sheaves of Reeds')}<br>A companion account of reciprocal conditioning.</li><li>${dual(upanisa,'sn12.23','SN 12.23 · Prerequisites')}<br>Conditions supporting the path toward liberation.</li></ol><h3>Interpretive scholarship</h3><ol><li><a href="https://www.buddhistinquiry.org/article/dependent-arising/" target="_blank" rel="noopener">Bhikkhu Anālayo, “Dependent Arising” (2020) ↗</a><br>Distinguishing the principle from its different applications.</li><li>Peter Harvey, <em>An Introduction to Buddhism</em>, 2nd edition, pp. 65–72.<br>Conditionality, lived experience, rebirth, and the danger of implying a death-to-ignorance arrow.</li><li>Rupert Gethin, <em>The Foundations of Buddhism</em> (1998), pp. 149–159.<br>Classical interpretations, multiple timescales, and the Wheel of Life.</li></ol><h3>Parallel witnesses</h3><p>SĀ 298 / SN 12.2; SĀ 296 / SN 12.20; SĀ 288 / SN 12.67; SĀ 301 / SN 12.15. SĀ uses the standard discourse numbering of T 99. The “Study deeper” comparison gives passage locators and links to Zhuang Chunjiang’s Chinese-text edition and Pāli-to-Chinese SN translations.</p><h3>Later developments</h3><p>The three-life table is a classical interpretive framework. Nāgārjuna’s treatment appears in the separate Madhyamaka note, with Garfield’s standpoint identified. Historical reconstructions by Jurewicz and Gombrich remain attributed arguments.</p><p class="note">The main ring depicts neither the three-life allocation nor the full Tibetan Wheel of Life; these have separate explanations. Daily-life scenarios cover part of the sequence. The annotated Books & scholarship section below the model includes reading order, publication details, and links. External readings require internet access; the presentation itself runs offline.</p>`, 'Header · Sources & scope');
$('notes').onclick=()=>openModal('Presenter notes',`<div class="eyebrow">${selected<0?'Opening':`Link ${selected+1} · ${links[selected][0]}`}</div><h3>${selected<0?'Begin with conditionality.':links[selected][1]}</h3><p>${selected<0?'Explain that this is an early Buddhist account of the conditions sustaining suffering and renewed existence. The geometry is a contemporary learning aid, rather than a reconstruction of a diagram drawn by the Buddha.':links[selected][5]}</p><p><strong>Suggested flow:</strong> introduce the principle → explore the twelve links → switch to cessation → use the daily-life example → compare and reflect.</p><p><strong>Controls:</strong> Left/Right arrows move through links when focus is on the page. Use Tab and Enter for individual controls. Escape closes a dialog. Full screen is available from the top bar.</p><p class="note">No narration audio is included. Explanations and presenter notes provide the spoken presentation material.</p>`, 'Header · Presenter notes');
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{$('toast').textContent='Full screen is unavailable here. Open this file directly in your browser.'}};document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Exit full screen ↙':'Full screen ↗';schedule()},{signal:ac.signal});
document.addEventListener('keydown',e=>{if($('modal').open||e.altKey||e.ctrlKey||e.metaKey||['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName))return;if(e.key==='ArrowRight'){e.preventDefault();$('next').click()}if(e.key==='ArrowLeft'){e.preventDefault();$('back').click()}},{signal:ac.signal});

function saveStep(){if(selected<0||applyingHash)return;const next=`#link-${String(selected+1).padStart(2,'0')}-${mode}`;if(location.hash===next)return;const x=scrollX,y=scrollY;try{history.replaceState(null,'',next)}catch{return}if(scrollX!==x||scrollY!==y)scrollTo(x,y)}
async function shareStep(){if(location.protocol==='file:'){$('toast').textContent='Step reference: '+links[selected][0]+' · '+mode+'. After hosting, this button copies a direct web link.';return}try{await navigator.clipboard.writeText(location.href);$('toast').textContent='Direct link copied.'}catch{$('toast').textContent='Copy the address in your browser to share this step.'}}
function applyHash(){const match=location.hash.match(/^#link-(0[1-9]|1[0-2])-(arising|cessation)$/);if(!match)return;const i=Number(match[1])-1,m=match[2];if(selected===i&&mode===m)return;applyingHash=true;selected=i;setMode(m);applyingHash=false;if(innerWidth<821)$('detail-panel').scrollIntoView({block:'start',behavior:'auto'})}
window.addEventListener('hashchange',applyHash,{signal:ac.signal});
document.querySelectorAll('[data-jump]').forEach(a=>a.addEventListener('click',()=>{selected=Number(a.dataset.jump);setMode('arising');$('detail-panel').scrollIntoView({block:'center'});$('detail-panel').focus({preventScroll:true})},{signal:ac.signal}));
$('restart').onclick=()=>{selected=-1;setMode('arising');angle=0;tilt=.34;try{history.replaceState(null,'',location.pathname+location.search)}catch{}renderPanel();schedule()};
$('print-guide').onclick=()=>window.print();
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{const filter=b.dataset.filter;let count=0;document.querySelectorAll('.book').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;if(!card.hidden)count++});document.querySelectorAll('[data-filter]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn===b)));$('reading-count').textContent=filter==='all'?'10 readings · 7 books, 1 booklet, 2 articles':`${count} reading${count===1?'':'s'} shown`;});
document.querySelectorAll('details[name="nidana-guide"]').forEach(d=>d.addEventListener('toggle',()=>{if(!d.open)return;document.querySelectorAll('details[name="nidana-guide"]').forEach(o=>{if(o!==d)o.open=false})},{signal:ac.signal}));
// Educational layers. The source text, scholarly explanations, and invented
// illustrations are explicitly separated; none claims to be a scientific simulation.
const explanations=[
 ['Ignorance shapes action','Misunderstanding suffering and its conditions shapes intention and activity. Gethin discusses ignorance and karmic formations together in the classical account.','Gethin, The Foundations of Buddhism, pp. 150–151.','Illustration: believing that status will guarantee lasting security can shape repeated efforts to protect it. This illustrates conditioning, not the whole twelve-link sequence.'],
 ['Activity and the continuation of consciousness','Harvey discusses how intentions shape what becomes salient in experience, and also their role in consciousness in a future life. A present-life example cannot exhaust that rebirth-related interpretation.','Harvey, An Introduction to Buddhism, pp. 68–69.','Illustration adapted from the kind of example Harvey discusses: deciding to buy something can make related objects stand out. This illustrates attention shaped by intention, without serving as evidence for rebirth.'],
 ['Consciousness and embodied experience','Harvey describes the relation of consciousness to the sentient body. SN 12.67 additionally states reciprocal conditioning between consciousness and name-and-form. The one-way arrow records SN 12.2’s sequence alongside the reciprocal account preserved elsewhere.','Harvey, pp. 69–70; SN 12.67.','The two bundles of reeds in SN 12.67 support one another. This is a textual analogy for mutual dependence, not a demonstration that a disembodied consciousness constructs matter.'],
 ['The bases of experience','Harvey explains the six sense bases in relation to the living, sentient body. The list includes mind as well as the five bodily sense faculties.','Harvey, pp. 70–71.','Illustration: hearing depends on a functioning embodied capacity for hearing. This is a limited illustration, not a complete biological theory.'],
 ['Contact needs more than an object','MN 148 describes contact as the meeting of a faculty, its object, and the corresponding consciousness. The six bases participate in this relation together with the object and corresponding consciousness.','MN 148; Harvey, pp. 70–71.','Illustration: a sound alone is not the whole event of hearing; the account also identifies the ear and ear-consciousness.'],
 ['Contact and feeling tone','The discourses connect contact with feeling. Harvey distinguishes the arising of feeling from the degree of craving in response to it.','MN 148; Harvey, p. 71.','Illustration: hearing a remark can be accompanied by an unpleasant feeling tone. “Unpleasant” describes the feeling tone; the thoughts and emotions that follow require further explanation.'],
 ['Feeling does not compel craving','Harvey explicitly notes that ignorance must also be present for this conditioning of craving: an awakened person experiences feeling without craving. The arrow is not a deterministic instruction.','Harvey, p. 66 and p. 71; MN 148.','Illustration: a pleasant taste can be enjoyed, or it can become “I need more.” The daily-life scenarios compare such responses without equating a pause with complete liberation.'],
 ['From thirst to holding on','Harvey explains clinging as a more active involvement with the object of craving. Its objects include sensual pleasures and views, not only material possessions.','Harvey, p. 71; SN 12.2.','Illustration: wanting approval may develop into rigidly defending a flattering view of oneself. It illustrates one possibility, not a diagnosis of everyone who enjoys praise.'],
 ['Clinging and becoming','Harvey explains the classical distinction between karma-becoming and resultant existence. The early formula retains its concern with renewed existence, even when psychological examples help explain aspects of grasping.','Harvey, pp. 71–72; Gethin, pp. 150–153.','Boundary of illustration: “holding a view shapes my identity” may be useful, but does not replace the canonical definition of becoming or explain rebirth.'],
 ['Becoming and renewed birth','Gethin describes how the classical account connects becoming with a future birth. Harvey similarly discusses birth as the beginning of renewed existence. These explanations carry a rebirth framework.','Gethin, pp. 150–153; Harvey, pp. 71–72.','No everyday analogy is offered as proof of this link. Calling a new mood a “birth” would be an additional psychological interpretation, not the full early-text meaning.'],
 ['Birth and aging-and-death','Harvey emphasizes that the significance of this relation is its connection to the ending of rebirth. The cessation of renewed birth is not the immortality of a body already born.','Harvey, pp. 71–72; SN 12.2.','Ordinary illustration: a living being’s birth is a prerequisite for its aging and death. Particular illnesses or accidents are additional conditions, not substitutes for this relationship.'],
 ['The conclusion of the formula','The formula concludes with suffering’s arising or cessation. Gethin emphasizes the liberating purpose of understanding conditions; Harvey warns against inferring a death-to-ignorance arrow from circular artwork.','Gethin, pp. 156–159; Harvey, p. 72.','The gap preserves the stated sequence. Ignorance remains conditioned, and the opening marks no first beginning of saṃsāra.']
];
function sourceLink(url,label){return `<a href="${url}" target="_blank" rel="noopener">${label} ↗</a>`}
function showConnection(i){
 select(i);const d=explanations[i];
 openModal(i<11?`${links[i][0]} → ${links[i+1][0]}`:'The conclusion of the sequence',`<p class="note">Read the stated relation, then distinguish explanation from illustration.</p><div class="layer-nav" role="group" aria-label="Explanation layer"><button id="layer-text" aria-pressed="true">1 · Text</button><button id="layer-explanation" aria-pressed="false">2 · Explanation</button><button id="layer-example" aria-pressed="false">3 · Illustration</button></div><div class="layer-content" id="layer-content" aria-live="polite"></div>`, 'Explore the model · Connection');
 function layer(which){const names={text:'Text',explanation:'Explanation',example:'Illustration'};setCrumb(`Explore the model · ${links[i][0]} · ${names[which]}`);['text','explanation','example'].forEach(k=>$('layer-'+k).setAttribute('aria-pressed',String(k===which)));$('layer-content').innerHTML=which==='text'?`<div class="eyebrow">Early discourse · paraphrase</div><h3>${relation(i)}</h3><p>SN 12.2 states this conditioning relation, leaving room for the additional conditions described elsewhere.</p>${i===6?'<p><strong>Feeling in SN 12.2:</strong> six classes, arising from eye-contact, ear-contact, nose-contact, tongue-contact, body-contact, and mind-contact. Pleasant, unpleasant, and neutral describe another classification of feeling, used in our introductory gloss.</p>':''}${sourceLink(sn,'Read SN 12.2')} · ${sourceLink(sc('sn12.2'),'SuttaCentral')}${[4,5,6].includes(i)?'<p>'+dual(mn148,'mn148','Related account: MN 148')+'</p>':''}`:which==='explanation'?`<div class="eyebrow">Scholarly explanation · summarized</div><h3>${d[0]}</h3><p>${mode==='cessation'?cessationNotes[i]+'</p><p>':''}${d[1]}</p><p class="review-note">Reading: ${d[2]} These are concise interpretive summaries, not quotations.</p>`:`<div class="eyebrow">${i===2?'Textual analogy':'Illustration and its limits'}</div><p>${d[3]}</p><p class="review-note">Examples clarify a relation. Their explanatory value is distinct from evidence for the wider doctrine.</p>`;}
 layer('text');['text','explanation','example'].forEach(k=>$('layer-'+k).onclick=()=>layer(k));
}
function showGlossary(){openModal('Key terms, in plain language',`<p>For newcomers and anyone comparing translations. These are introductory glosses, not exhaustive definitions.</p><dl class="glossary-list"><dt>Dependent arising · Paṭiccasamuppāda</dt><dd>The principle that phenomena arise dependent on conditions; here applied to suffering and its cessation.</dd><dt>Dukkha</dt><dd>Usually translated as suffering, stress, or unsatisfactoriness. Its range is broader than physical pain.</dd><dt>Five aggregates · Khandhas</dt><dd>Five groupings used to analyze experience: material form, feeling, perception, volitional formations, and consciousness. They are not five parts of an enduring soul. “Appearance of the aggregates” in the birth definition refers to these groupings coming into manifestation.</dd><dt>Feeling · Vedanā</dt><dd>Pleasant, unpleasant, or neutral feeling tone. A complex emotion such as anger includes more than this one factor.</dd><dt>Karma · Kamma</dt><dd>Intentional action and its ethical significance; attributing every misfortune to a person’s karma turns this teaching into an unwarranted blanket judgment.</dd><dt>Saṃsāra / rebirth</dt><dd>The continuing round of birth and death, understood through conditions rather than an unchanging soul passing between lives.</dd><dt>Cessation · Nirodha</dt><dd>Ceasing. In this formula it concerns the ending of sustaining conditions and the suffering they support; not becoming numb or destroying a self.</dd><dt>Nibbāna / nirvāṇa</dt><dd>The liberation at which the Buddhist path aims, associated with the ending of greed, hatred, and delusion.</dd><dt>Taints · Āsavas</dt><dd>Deeply rooted defilements; English translations also use “cankers” or “effluents.”</dd><dt>Sutta / SN / MN</dt><dd>A discourse; SN refers to the Saṃyutta Nikāya, MN to the Majjhima Nikāya. SN 12.2 means discourse 2 in connected collection 12.</dd></dl><p class="review-note">Orientation: Harvey, pp. 57–72; Gethin, Chapter 6; definitions relevant to the main model in SN 12.2. Translation choices vary.</p>`, 'Study terms · Glossary')}
$('glossary').onclick=showGlossary;
function compareFormulations(){openModal('One principle, different formulations',`<div class="eyebrow">Textual forms and interpretive frameworks</div><h3>Begin with what each source actually states.</h3><div class="path-group"><strong>SN 12.2 · Standard sequence</strong><p>Ignorance → formations → consciousness → name-and-form → six sense bases → contact → feeling → craving → clinging → becoming → birth → aging-and-death.</p>${dual(sn,'sn12.2','Read the text')}</div><div class="path-group"><strong>SN 12.67 · Reciprocal support</strong><div class="reciprocal"><span>Consciousness</span><span aria-label="mutually conditions">⇄</span><span>Name-and-form</span></div><p>The discourse uses two bundles of reeds leaning against one another. It then continues through the six sense bases and the subsequent links.</p>${dual(reed,'sn12.67','Read Sheaves of Reeds')}</div><p>Both formulations occur in the early discourses. Scholarship examines their relationship without requiring us to choose one and discard the other.</p><h3>Where does the three-life reading fit?</h3><table class="compare-table"><thead><tr><th>Time</th><th>Links</th><th>Function</th></tr></thead><tbody><tr><td>Past</td><td>1–2</td><td>Past causes</td></tr><tr><td>Present</td><td>3–7</td><td>Present results</td></tr><tr><td>Present</td><td>8–10</td><td>Present causes</td></tr><tr><td>Future</td><td>11–12</td><td>Future results</td></tr></tbody></table><p>This is a major classical interpretive framework, not an extra list of links. Gethin discusses its use by Buddhaghosa and Vasubandhu, together with alternative timescales.</p><p><strong>Read:</strong> Rupert Gethin, <em>The Foundations of Buddhism</em> (Oxford University Press, 1998), <strong>pp. 149–155</strong>, especially the table on p. 152. Harvey, <em>An Introduction to Buddhism</em>, 2nd ed., pp. 65–72, provides a complementary account.</p><h3>And momentary readings?</h3><p>Classical Abhidharma analysis within a thought-moment and modern psychological examples are distinct approaches. A daily-life scenario should not silently redefine every canonical term.</p><p class="review-note">The main model follows SN 12.2 without assigning its links exclusively to one timescale. Omitting a three-life overlay is a scope decision, not a rejection of rebirth or classical interpretation. For principle versus applications, see ${sourceLink('https://www.buddhistinquiry.org/article/dependent-arising/','Anālayo (2020)')}.</p>`, 'Study sections · Compare formulations')}
$('formulations').onclick=compareFormulations;$('compare-models').onclick=compareFormulations;
const liberationSteps=[
 ['Suffering','Dukkha','Distress can prompt a search for release. Wisdom takes cultivation.'],
 ['Confidence','Saddhā','Trust in the path supports willingness to practice.'],
 ['Gladness','Pāmojja','Encouragement and joy accompany engagement with the teaching.'],
 ['Rapture','Pīti','An enlivening joy supports the settling that follows.'],
 ['Tranquility','Passaddhi','Agitation quiets; body and mind become more composed.'],
 ['Happiness','Sukha','Pleasant ease supports steadiness; it differs from energetic rapture.'],
 ['Concentration','Samādhi','Collectedness supports clear seeing. Concentration alone is not liberation.'],
 ['Knowing and seeing','Yathābhūtañāṇadassana','Insight concerns things as they are, beyond merely memorizing ideas.'],
 ['Disenchantment','Nibbidā','Fascination with conditioned experience loosens; this is not hatred.'],
 ['Dispassion','Virāga','Attachment fades through understanding.'],
 ['Liberation','Vimutti','Release from bondage; more than a temporary calm mood.'],
 ['Knowledge of ending','Āsavakkhaye ñāṇa','Knowing the destruction of the taints concludes the sequence.']
];
let pathStep=0;
function showLiberation(){openModal('Conditions supporting liberation',`<div class="eyebrow">Companion sequence · SN 12.23</div><p>This is distinct from the main ring and its cessation formula. The numbering follows the reading sequence, rather than stages measured in a person’s attainment.</p><div class="step-pills" id="path-pills" aria-label="Select a supporting condition"></div><div class="layer-content" id="path-content" aria-live="polite"></div><div class="path-controls"><button id="path-back">← Previous</button><button id="path-next">Next →</button></div><details style="margin-top:20px"><summary>The Noble Eightfold Path</summary><p>SN 12.65 connects understanding dependent arising with right view, intention, speech, action, livelihood, effort, mindfulness, and concentration. Wisdom, ethical conduct, and mental cultivation work together.</p>${dual('https://www.accesstoinsight.org/tipitaka/sn/sn12/sn12.065.than.html','sn12.65','Read SN 12.65')}</details><p class="review-note">Sequence: ${dual(upanisa,'sn12.23','SN 12.23')}. Brief explanations summarize ${sourceLink(bodhiPath,'Bodhi’s Theravāda exposition')}. No automatic progression or fixed timetable is implied.</p>`, 'Study sections · Path toward release');liberationSteps.forEach((d,i)=>{let b=document.createElement('button');b.textContent=String(i+1).padStart(2,'0');b.setAttribute('aria-label',`${i+1}. ${d[0]}`);b.onclick=()=>{pathStep=i;updatePath()};$('path-pills').append(b)});$('path-back').onclick=()=>{pathStep=Math.max(0,pathStep-1);updatePath()};$('path-next').onclick=()=>{if(pathStep<11){pathStep++;updatePath()}else{closeModal();setMode('cessation');$('explore').scrollIntoView({block:'start'})}};updatePath();}
function updatePath(){const d=liberationSteps[pathStep];$('path-content').innerHTML=`<div class="eyebrow">Supporting condition ${pathStep+1} / 12</div><h3>${d[0]}</h3><div class="pali" lang="pi">${d[1]}</div><p>${d[2]}</p><p class="modal-status">${pathStep<11?'Supports the next condition: '+liberationSteps[pathStep+1][0]:'The sequence concludes with knowledge of release.'}</p>`;$('path-back').disabled=pathStep===0;$('path-next').textContent=pathStep===11?'Return to cessation →':'Next →';[...$('path-pills').children].forEach((b,i)=>b.setAttribute('aria-pressed',String(i===pathStep)));}
$('path').onclick=showLiberation;
const symbols=['A person who is blind','A potter shaping a pot','A monkey','People in a boat','A house with six openings','An embracing couple','An arrow in the eye','A person drinking','A person gathering fruit','A pregnant woman','A woman giving birth','A person carrying a corpse'];
$('symbols').onclick=()=>openModal('Traditional Wheel of Life imagery',`<p>These conventional visual associations belong to the illustrated Wheel of Life tradition. They are memory aids, not literal definitions of the twelve links.</p><div class="symbol-grid">${symbols.map((x,i)=>`<div><span class="eyebrow">${String(i+1).padStart(2,'0')}</span><strong>${links[i][0]}</strong>${x}</div>`).join('')}</div><p class="review-note">Gethin, pp. 158–159; ${sourceLink('https://rubinmuseum.org/the-wheel-of-life-2/?returnto=4161','Rubin Museum’s annotated artwork')}. Imagery varies between paintings. No artwork is copied here. The main diagram presents an open sequence; the full traditional wheel contains additional imagery.</p>`, 'Explore the model · Traditional symbols');
const scenarios=[
 {name:'Hearing criticism',event:'You hear: “That wasn’t good enough.”',contact:'Hearing a remark',feeling:'Unpleasant',habit:'“Make this stop. I must be right.”',reaction:'An urge to escape discomfort develops into defending a view. Retaliation may intensify distress.',wise:'Notice the feeling; loosen the grasp.',response:'“An unpleasant feeling is present.” With training, recognition can support a considered response or an appropriate boundary. The feeling need not disappear.'},
 {name:'Wanting praise to continue',event:'Someone praises your work. The experience feels pleasant.',contact:'Hearing praise',feeling:'Pleasant',habit:'“I need them to keep admiring me.”',reaction:'Enjoyment can develop into thirst for repeated approval and attachment to a flattering self-image.',wise:'Enjoy the appreciation without demanding more.',response:'Recognize the pleasant feeling and its changing nature. Appreciation need not become a requirement that others continually confirm your worth.'},
 {name:'Remembering an unanswered message',event:'A memory of an unanswered message comes to mind.',contact:'A thought as a mental object',feeling:'Unpleasant in this scenario',habit:'“I need certainty. They must be rejecting me.”',reaction:'The wish to end uncertainty can become clinging to an interpretation. Repeated checking may add distress.',wise:'Notice uncertainty before settling on a story.',response:'Recognize the feeling, leave room for other explanations, and choose whether a practical follow-up is needed. This is one possible response, not a prescribed conclusion.'}
];
let scenarioIndex=0;
$('example').onclick=()=>{openModal('Everyday experience: three partial illustrations',`<label for="scenario-select" class="eyebrow">Choose a scenario</label><select class="scenario-select" id="scenario-select">${scenarios.map((s,i)=>`<option value="${i}">${s.name}</option>`).join('')}</select><div id="scenario-intro"></div><div class="example-options"><button id="habitual" aria-pressed="true">Habitual reaction</button><button id="mindful" aria-pressed="false">Mindful recognition</button></div><div class="example-result" id="example-result" aria-live="polite"></div><p class="review-note">These original scenarios illustrate links 6–9, rather than the complete sequence, evidence for rebirth, or a test of attainment. Their three everyday situations are distinct from the canonical three kinds of craving: sensuality, existence, and nonexistence. Distress here is an occasion for understanding, not an assignment of blame. Compare ${dual(mn148,'mn148','MN 148')} and Harvey, pp. 66, 70–71.</p>`, 'Explore the model · Daily-life example');let mindful=false;function renderScenario(){const d=scenarios[scenarioIndex];$('scenario-intro').innerHTML=`<p>${d.event}</p><div class="example-track"><span>06 · ${d.contact}</span><span class="active">07 · ${d.feeling} feeling</span><span>08 · Craving</span><span>09 · Clinging</span></div>`;$('habitual').setAttribute('aria-pressed',String(!mindful));$('mindful').setAttribute('aria-pressed',String(mindful));$('example-result').innerHTML=`<h3>${mindful?d.wise:d.habit}</h3><p>${mindful?d.response:d.reaction}</p>`;}$('scenario-select').value=String(scenarioIndex);$('scenario-select').onchange=e=>{scenarioIndex=Number(e.target.value);mindful=false;renderScenario()};$('habitual').onclick=()=>{mindful=false;renderScenario()};$('mindful').onclick=()=>{mindful=true;renderScenario()};renderScenario();};

function openStudy(id){const d=document.getElementById(id);if(!d)return;d.open=true;d.scrollIntoView({block:'start'});d.querySelector('summary').focus({preventScroll:true});}
document.addEventListener('click',e=>{const a=e.target.closest('[data-study]');if(a){e.preventDefault();openStudy(a.dataset.study)}const b=e.target.closest('[data-study-mode]');if(b){setMode(b.dataset.studyMode);$('explore').scrollIntoView({block:'start'});$('detail-panel').focus({preventScroll:true})}},{signal:ac.signal});
document.querySelectorAll('.study-topic').forEach(d=>d.addEventListener('toggle',()=>{if(d.open&&!printing)d.parentElement.querySelectorAll('.study-topic').forEach(other=>{if(other!==d)other.open=false})},{signal:ac.signal}));
$('deeper-path').onclick=showLiberation;
let printing=false;let printOpen=[];window.addEventListener('beforeprint',()=>{printing=true;printOpen=[...document.querySelectorAll('details')].filter(d=>d.open);document.querySelectorAll('details').forEach(d=>d.open=true)},{signal:ac.signal});window.addEventListener('afterprint',()=>{document.querySelectorAll('details').forEach(d=>d.open=printOpen.includes(d));printing=false},{signal:ac.signal});
applyHash();
initTheme();
initToc(ac.signal);
if(innerWidth<821) setReading(true);

const ro=new ResizeObserver(schedule);
if($('scene'))ro.observe($('scene'));
renderPanel();
schedule();

return function cleanup(){
  ac.abort();
  ro.disconnect();
  if(raf)cancelAnimationFrame(raf);
  raf=0;
  const n=$('nodes'), r=$('reading'), s=$('steps');
  if(n)n.replaceChildren();
  if(r)r.replaceChildren();
  if(s)s.replaceChildren();
};

}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initStudy);
else initStudy();
