(function(){
"use strict";
const KEY="pavanWorldClass";
let state;try{state=JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){state={}}
state.xp=Number(state.xp||0);state.streak=Number(state.streak||0);state.completed=Array.isArray(state.completed)?state.completed:[];state.lastVisit=state.lastVisit||"";
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
const today=new Date().toISOString().slice(0,10);
if(state.lastVisit!==today){const d=new Date();d.setDate(d.getDate()-1);const yesterday=d.toISOString().slice(0,10);state.streak=state.lastVisit===yesterday?state.streak+1:1;state.lastVisit=today;state.xp+=5;save()}
function inject(){
if(document.getElementById("pewFab"))return;
const link=document.createElement("link");link.rel="stylesheet";link.href="assets/world-class.css?v=20261005";document.head.appendChild(link);
const fab=document.createElement("button");fab.id="pewFab";fab.className="pew-fab";fab.textContent="🤖";fab.title="Pavan AI Learning Assistant";document.body.appendChild(fab);
const panel=document.createElement("section");panel.className="pew-panel";panel.innerHTML='<div class="pew-head"><strong>Pavan AI Learning Assistant</strong><button class="pew-close">×</button></div><div class="pew-body"><div class="pew-msg" id="pewMsg">Welcome. I can guide your learning journey.</div><div class="pew-actions"><button class="pew-action" data-a="plan">Learning Plan</button><button class="pew-action" data-a="next">What next?</button><button class="pew-action" data-a="ai">Explain AI</button><button class="pew-action" data-a="progress">Progress</button></div></div>';document.body.appendChild(panel);
// Drag the launcher and chat panel independently; positions persist on this device.
const POS_KEY="pavanJarvisWidgetPositions";
let positions={};try{positions=JSON.parse(localStorage.getItem(POS_KEY)||"{}")}catch(e){positions={}}
function savePositions(){try{localStorage.setItem(POS_KEY,JSON.stringify(positions))}catch(e){}}
function applyPosition(el,key){const p=positions[key];if(!p)return;const r=el.getBoundingClientRect(),x=Math.max(8,Math.min(innerWidth-r.width-8,p.x)),y=Math.max(8,Math.min(innerHeight-r.height-8,p.y));el.style.left=x+"px";el.style.top=y+"px";el.style.right="auto";el.style.bottom="auto"}
function makeDraggable(el,handle,key,onTap){
let startX=0,startY=0,originX=0,originY=0,moved=false,active=false;
handle.style.touchAction="none";handle.style.cursor="grab";
handle.addEventListener("pointerdown",e=>{if(e.button!==undefined&&e.button!==0)return;if(e.target.closest("button")&&e.target!==handle)return;active=true;moved=false;startX=e.clientX;startY=e.clientY;const r=el.getBoundingClientRect();originX=r.left;originY=r.top;handle.setPointerCapture(e.pointerId);});
handle.addEventListener("pointermove",e=>{if(!active)return;const dx=e.clientX-startX,dy=e.clientY-startY;if(Math.abs(dx)+Math.abs(dy)>4)moved=true;if(!moved)return;const x=Math.max(8,Math.min(innerWidth-el.offsetWidth-8,originX+dx)),y=Math.max(8,Math.min(innerHeight-el.offsetHeight-8,originY+dy));el.style.left=x+"px";el.style.top=y+"px";el.style.right="auto";el.style.bottom="auto";});
function finish(e){if(!active)return;active=false;if(moved){const r=el.getBoundingClientRect();positions[key]={x:r.left,y:r.top};savePositions()}else if(onTap)onTap();handle.style.cursor="grab"}
handle.addEventListener("pointerup",finish);handle.addEventListener("pointercancel",finish);
}
makeDraggable(fab,fab,"fab",()=>panel.classList.toggle("show"));
const head=panel.querySelector(".pew-head");makeDraggable(panel,head,"panel");
panel.querySelector(".pew-close").onclick=()=>panel.classList.remove("show");
applyPosition(fab,"fab");applyPosition(panel,"panel");
window.addEventListener("resize",()=>{applyPosition(fab,"fab");if(positions.panel)applyPosition(panel,"panel")});
panel.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{const m=panel.querySelector("#pewMsg"),a=b.dataset.a;m.textContent=a==="plan"?"Learn → Watch → Practice → Quiz → Project → Portfolio.":a==="next"?"Continue your Future AI topic or open an AI Lab activity.":a==="ai"?"AI enables computers to perform tasks such as recognizing patterns, understanding language and making predictions.":"XP: "+state.xp+" • Learning streak: "+state.streak+" day(s).";state.xp+=2;save()});
const toolbar=document.createElement("div");toolbar.className="pew-toolbar";toolbar.innerHTML='<button class="pew-tool" id="pewTop">↑ Top</button><button class="pew-tool" id="pewAccess">Accessibility</button>';document.body.appendChild(toolbar);
toolbar.querySelector("#pewTop").onclick=()=>scrollTo({top:0,behavior:"smooth"});toolbar.querySelector("#pewAccess").onclick=()=>document.documentElement.classList.toggle("pew-access");
}
function dashboard(){
if(!/student-dashboard\.html$/i.test(location.pathname)||document.getElementById("pewEngine"))return;
const host=document.querySelector(".dashboard-main")||document.querySelector("main");if(!host)return;
const box=document.createElement("section");box.id="pewEngine";box.className="pew-overlay-card";box.innerHTML='<div style="font-size:11px;font-weight:900;letter-spacing:1px;color:#1764db">PAVAN LEARNING ENGINE</div><h2 style="margin:4px 0;color:#0b1b35">Personalized Learning Center</h2><p style="margin:0;color:#718097;font-size:13px">Learn → Practice → Create → Track → Build your portfolio.</p><div class="pew-grid" style="margin-top:16px"><div class="pew-kpi"><b>'+state.xp+'</b><span>Learning XP</span></div><div class="pew-kpi"><b>'+state.streak+' 🔥</b><span>Day Streak</span></div><div class="pew-kpi"><b>'+state.completed.length+'</b><span>Completed</span></div><div class="pew-kpi"><b>AI</b><span>Future Skills</span></div></div><h3 style="margin:20px 0 10px;color:#18334f">Recommended Next Steps</h3><div class="pew-recommend"><div class="pew-rec"><strong>🤖 Future AI</strong><span>Continue your AI pathway.</span><a href="student-future-ai.html">Open →</a></div><div class="pew-rec"><strong>🧪 AI Lab</strong><span>Practice with interactive activities.</span><a href="ai-lab.html">Practice →</a></div><div class="pew-rec"><strong>💼 Portfolio</strong><span>Turn learning into projects.</span><a href="skills-portfolio.html">Build →</a></div></div>';
host.prepend(box)
}
function init(){inject();dashboard()}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
window.PavanWorldClass={getState:()=>state,award:x=>{state.xp+=Number(x)||0;save()}};
})();