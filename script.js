const STAGES = [
 {t:'Python Programming',time:'3 to 4 weeks',d:'Learn the language every ML tool is built on: variables, loops, functions, OOP and file handling.',tags:['Syntax','Functions','OOP','Files'],links:[['Bro Code Python Full Course','https://youtu.be/ix9cRaBkVe0?si=2XMJxmflDdaohr21']]},
 {t:'Math and Data Tools',time:'3 weeks',d:'Get comfortable with the numbers behind models, and with the libraries used to handle data.',tags:['NumPy','Pandas','Matplotlib','Statistics','Linear algebra'],links:[['Machine Learning Notes','https://machine-learrning-notes-by-syed-tal.vercel.app/']]},
 {t:'Machine Learning',time:'6 to 8 weeks',d:'Regression, classification, clustering, model evaluation and feature engineering with scikit-learn.',tags:['Regression','Classification','Clustering','Evaluation','scikit-learn'],links:[['ML Full Course','https://youtube.com/playlist?list=PLKnIA16_Rmvbr7zKYQuBfsVkjoLcJgxHH&si=334e919zWUiEA-45'],['Notes by Syed Talha','https://machine-learrning-notes-by-syed-tal.vercel.app/']]},
 {t:'Deep Learning',time:'6 to 8 weeks',d:'Neural networks, CNNs, RNNs and transformers, built and trained with a modern framework.',tags:['Neural nets','CNN','RNN','Transformers','PyTorch / TensorFlow'],links:[['Deep Learning Full Course','https://youtube.com/playlist?list=PLKnIA16_RmvYuZauWaPlRTC54KxSNLtNn&si=F7r5lU5U7P3bzAhA']]},
 {t:'Generative AI',time:'4 to 6 weeks',d:'Work with large language models: prompting, embeddings, RAG and agents.',tags:['LLMs','Prompting','RAG','LangChain','Agents'],links:[['Generative AI Full Course','https://youtu.be/F0GQ0l2NfHA?si=MECSNuzsJwf5qct2']]},
 {t:'Projects and Deployment',time:'Ongoing',d:'Build end-to-end projects, put them online with FastAPI or Streamlit, and publish them on GitHub.',tags:['Portfolio','FastAPI','Streamlit','Cloud','GitHub'],links:[]}
];
const $=s=>document.querySelector(s);
let done=JSON.parse(localStorage.getItem('mlDone')||'[]');

// render roadmap
const ol=$('#stages');
STAGES.forEach((s,i)=>{
 const li=document.createElement('li');li.className='stage';li.dataset.i=i;
 li.innerHTML=`<span class="num">${i+1}</span><h4>${s.t}</h4><div class="time">${s.time}</div><p>${s.d}</p>
 <ul>${s.tags.map(t=>`<li>${t}</li>`).join('')}</ul>
 <div class="row">${s.links.map((l,j)=>`<a class="${j?'alt':''}" href="${l[1]}" target="_blank" rel="noopener">${l[0]}</a>`).join('')}
 <label><input type="checkbox" ${done.includes(i)?'checked':''}> Mark complete</label></div>`;
 ol.appendChild(li);
});
function refresh(){
 document.querySelectorAll('.stage').forEach(el=>el.classList.toggle('done',done.includes(+el.dataset.i)));
 const p=Math.round(done.length/STAGES.length*100);$('#bar').style.width=p+'%';$('#pct').textContent=p+'% complete';
 try{localStorage.setItem('mlDone',JSON.stringify(done))}catch(e){}
}
ol.addEventListener('change',e=>{const i=+e.target.closest('.stage').dataset.i;
 done=e.target.checked?[...new Set([...done,i])]:done.filter(x=>x!==i);refresh()});
refresh();

// resources
const seen=new Set();
STAGES.forEach(s=>s.links.forEach(l=>{if(seen.has(l[1]))return;seen.add(l[1]);
 $('#resGrid').insertAdjacentHTML('beforeend',`<a href="${l[1]}" target="_blank" rel="noopener"><b>${l[0]}</b><span>Open resource</span></a>`)}));

// doors
function doorSound(){
 try{
  const A=new (window.AudioContext||window.webkitAudioContext)(),t=A.currentTime,out=A.createGain();out.gain.value=.9;out.connect(A.destination);
  // knock thuds
  [0,.18,.36].forEach(d=>{const o=A.createOscillator(),g=A.createGain();o.type='sine';o.frequency.setValueAtTime(140,t+d);o.frequency.exponentialRampToValueAtTime(45,t+d+.14);
   g.gain.setValueAtTime(.9,t+d);g.gain.exponentialRampToValueAtTime(.001,t+d+.2);o.connect(g).connect(out);o.start(t+d);o.stop(t+d+.25)});
  // creaking hinge
  const c=A.createOscillator(),lfo=A.createOscillator(),lg=A.createGain(),f=A.createBiquadFilter(),cg=A.createGain();
  c.type='sawtooth';c.frequency.setValueAtTime(85,t+.6);c.frequency.linearRampToValueAtTime(230,t+1.4);c.frequency.linearRampToValueAtTime(120,t+2.3);
  lfo.frequency.value=14;lg.gain.value=22;lfo.connect(lg).connect(c.frequency);
  f.type='bandpass';f.frequency.value=700;f.Q.value=4;
  cg.gain.setValueAtTime(0,t+.6);cg.gain.linearRampToValueAtTime(.28,t+1.1);cg.gain.linearRampToValueAtTime(.18,t+1.9);cg.gain.linearRampToValueAtTime(0,t+2.4);
  c.connect(f).connect(cg).connect(out);c.start(t+.6);lfo.start(t+.6);c.stop(t+2.5);lfo.stop(t+2.5);
  // wooden rumble (filtered noise)
  const n=A.createBufferSource(),b=A.createBuffer(1,A.sampleRate*2.2,A.sampleRate),dd=b.getChannelData(0);
  for(let i=0;i<dd.length;i++)dd[i]=Math.random()*2-1;n.buffer=b;
  const nf=A.createBiquadFilter(),ng=A.createGain();nf.type='lowpass';nf.frequency.value=260;
  ng.gain.setValueAtTime(0,t+.6);ng.gain.linearRampToValueAtTime(.7,t+1.2);ng.gain.linearRampToValueAtTime(0,t+2.7);
  n.connect(nf).connect(ng).connect(out);n.start(t+.6);
  // final boom
  const bo=A.createOscillator(),bg=A.createGain();bo.type='sine';bo.frequency.setValueAtTime(70,t+2.2);bo.frequency.exponentialRampToValueAtTime(30,t+2.8);
  bg.gain.setValueAtTime(.8,t+2.2);bg.gain.exponentialRampToValueAtTime(.001,t+2.9);bo.connect(bg).connect(out);bo.start(t+2.2);bo.stop(t+3);
 }catch(e){}
}
$('#knock').onclick=()=>{doorSound();setTimeout(()=>$('#doors').classList.add('open'),700);setTimeout(()=>document.body.classList.remove('locked'),2900)};

// effects: cursor glow, scroll line + parallax, 3D tilt
addEventListener('pointermove',e=>{const g=$('#glow').style;g.setProperty('--x',e.clientX+'px');g.setProperty('--y',e.clientY+'px')});
addEventListener('scroll',()=>{
 document.documentElement.style.setProperty('--sy',scrollY);
 const r=ol.getBoundingClientRect();const p=Math.min(Math.max((innerHeight*.6-r.top)/r.height,0),1);
 ol.style.setProperty('--line',(p*100)+'%');
},{passive:true});
document.querySelectorAll('.stage').forEach(c=>{
 c.addEventListener('pointermove',e=>{const b=c.getBoundingClientRect();const x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;
  c.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg)`});
 c.addEventListener('pointerleave',()=>c.style.transform='');
});

// about modal
const about=$('#about');
$('#aboutBtn').onclick=()=>about.hidden=false;
about.addEventListener('click',e=>{if(e.target===about||e.target.hasAttribute('data-close'))about.hidden=true});
addEventListener('keydown',e=>{if(e.key==='Escape'){about.hidden=true}});

// PDF
$('#pdfBtn').onclick=()=>{
 const {jsPDF}=window.jspdf;const doc=new jsPDF({unit:'pt',format:'a4'});
 const W=doc.internal.pageSize.getWidth(),H=doc.internal.pageSize.getHeight();let y=0;
 const header=()=>{doc.setFillColor(0,0,0);doc.rect(0,0,W,90,'F');doc.setTextColor(255,200,0);doc.setFont('helvetica','bold');doc.setFontSize(24);doc.text('AI Roadmap',40,52);doc.setFontSize(10);doc.setTextColor(255,246,214);doc.text('By Syed Talha Ali Shah',40,72);y=125};
 header();
 STAGES.forEach((s,i)=>{
  const lines=doc.splitTextToSize(s.d,W-110);const need=60+lines.length*14+s.links.length*14+20;
  if(y+need>H-40){doc.addPage();header()}
  doc.setFillColor(255,200,0);doc.circle(58,y-4,14,'F');doc.setTextColor(0);doc.setFontSize(13);doc.text(String(i+1),i>8?52:55,y);
  doc.setFontSize(15);doc.text(s.t,86,y);
  doc.setFont('helvetica','normal');doc.setFontSize(10);doc.setTextColor(150,110,0);doc.text('Duration: '+s.time,86,y+15);
  doc.setTextColor(40);doc.text(lines,86,y+32);let yy=y+32+lines.length*14;
  doc.setTextColor(0);doc.text('Topics: '+s.tags.join(', '),86,yy);yy+=14;
  doc.setTextColor(0,70,200);s.links.forEach(l=>{doc.textWithLink(l[0],86,yy,{url:l[1]});yy+=14});
  doc.setFont('helvetica','bold');y=yy+26;
 });
 doc.save('AI-Roadmap-Syed-Talha.pdf');
};

