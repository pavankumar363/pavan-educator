/* Pavan Educator - smooth page transitions */
(function(){
  
function initGlobalSidebar(){
  var sidebar=document.querySelector('.sidebar,.student-sidebar');
  if(!sidebar || document.getElementById('sidebarToggle') || sidebar.querySelector('.sidebar-toggle')) return;
  var links=sidebar.querySelectorAll('.menu a,.student-menu a,.logout a,.student-logout a');
  links.forEach(function(a){
    if(a.querySelector('.pe-nav-label')) return;
    var hasIcon=a.querySelector('.menu-icon,.student-icon');
    if(hasIcon){
      Array.from(a.childNodes).forEach(function(n){
        if(n.nodeType===3 && n.textContent.trim()){
          var s=document.createElement('span'); s.className='pe-nav-label'; s.textContent=n.textContent.trim(); n.replaceWith(s);
        }
      });
      return;
    }
    var raw=a.textContent.trim(); if(!raw)return;
    var chars=Array.from(raw), iconChar=chars.shift();
    var icon=document.createElement('span'); icon.className='pe-nav-icon'; icon.textContent=iconChar;
    var label=document.createElement('span'); label.className='pe-nav-label'; label.textContent=chars.join('').trim();
    a.textContent=''; a.appendChild(icon); a.appendChild(label);
  });
  var mini=document.createElement('img'); mini.className='pe-collapsed-logo'; mini.src='assets/pavan-logo.svg'; mini.alt='Pavan Educator';
  sidebar.insertBefore(mini,sidebar.firstChild);
  var btn=document.createElement('button'); btn.id='peGlobalSidebarToggle'; btn.className='pe-global-sidebar-toggle'; btn.type='button';
  btn.setAttribute('aria-label','Collapse sidebar'); btn.title='Collapse sidebar'; btn.innerHTML='‹'; sidebar.appendChild(btn);
  var style=document.createElement('style'); style.id='pe-global-sidebar-style';
  style.textContent=
    '.sidebar,.student-sidebar{transition:width .25s ease,padding .25s ease,box-shadow .25s ease!important;}'+
    '.pe-global-sidebar-toggle{position:absolute;right:12px;top:16px;width:34px;height:34px;border:1px solid rgba(255,255,255,.14);border-radius:9px;background:#16345a;color:#fff;font-size:21px;line-height:1;cursor:pointer;z-index:5;transition:.2s;}'+
    '.pe-global-sidebar-toggle:hover{background:#2563eb;transform:scale(1.04)}'+
    '.pe-collapsed-logo{display:none;width:42px;height:42px;object-fit:contain;margin:4px auto 30px;}'+
    '.pe-nav-icon{width:25px;min-width:25px;text-align:center;font-size:18px;line-height:1;}'+
    '.sidebar.pe-global-collapsed,.student-sidebar.pe-global-collapsed{width:82px!important;padding-left:10px!important;padding-right:10px!important;}'+
    '.sidebar.pe-global-collapsed .brand-text,.sidebar.pe-global-collapsed .panel-title,.sidebar.pe-global-collapsed .admin-label,.sidebar.pe-global-collapsed .menu-label,.student-sidebar.pe-global-collapsed .student-logo,.student-sidebar.pe-global-collapsed .student-panel-title{display:none!important;}'+
    '.sidebar.pe-global-collapsed .brand,.student-sidebar.pe-global-collapsed .brand{justify-content:center;padding-left:0;padding-right:0;}'+
    '.sidebar.pe-global-collapsed .brand img{margin:auto;}'+
    '.sidebar.pe-global-collapsed .pe-collapsed-logo,.student-sidebar.pe-global-collapsed .pe-collapsed-logo{display:block;}'+
    '.sidebar.pe-global-collapsed .menu a,.sidebar.pe-global-collapsed .logout a,.student-sidebar.pe-global-collapsed .student-menu a,.student-sidebar.pe-global-collapsed .student-logout a{justify-content:center;gap:0;padding-left:10px;padding-right:10px;}'+
    '.sidebar.pe-global-collapsed .menu a .pe-nav-label,.sidebar.pe-global-collapsed .menu a .menu-label,.sidebar.pe-global-collapsed .logout a .pe-nav-label,.student-sidebar.pe-global-collapsed .student-menu a .pe-nav-label,.student-sidebar.pe-global-collapsed .student-logout a .pe-nav-label{display:none!important;}'+
    '.sidebar.pe-global-collapsed .menu-icon,.student-sidebar.pe-global-collapsed .student-icon,.sidebar.pe-global-collapsed .pe-nav-icon{width:100%;font-size:20px;}'+
    'body.pe-global-sidebar-collapsed .main,body.pe-global-sidebar-collapsed .student-page-main{margin-left:82px!important;}'+
    '@media(max-width:750px){.pe-global-sidebar-toggle{display:flex;align-items:center;justify-content:center}.sidebar.pe-global-collapsed,.student-sidebar.pe-global-collapsed{width:82px!important}.sidebar.pe-global-collapsed + .main,.student-sidebar.pe-global-collapsed + .student-page-main{margin-left:82px!important;}}';
  document.head.appendChild(style);
  var openWidth=Math.round(parseFloat(getComputedStyle(sidebar).width))||270;
  document.documentElement.style.setProperty('--pe-global-sidebar-open',openWidth+'px');
  function setCollapsed(collapsed){
    sidebar.classList.toggle('pe-global-collapsed',collapsed);
    document.body.classList.toggle('pe-global-sidebar-collapsed',collapsed);
    btn.innerHTML=collapsed?'›':'‹'; btn.title=collapsed?'Open sidebar':'Collapse sidebar'; btn.setAttribute('aria-label',btn.title);
    localStorage.setItem('pavanSidebarCollapsed',collapsed?'1':'0');
  }
  btn.addEventListener('click',function(){setCollapsed(!sidebar.classList.contains('pe-global-collapsed'))});
  setCollapsed(localStorage.getItem('pavanSidebarCollapsed')==='1');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initGlobalSidebar);else initGlobalSidebar();

window.addEventListener('pageshow',function(){var o=document.getElementById('pageTransition');if(o)o.remove();document.body&&document.body.classList.remove('pe-leave');});
  var founder=document.getElementById('founderPhoto');
  if(founder){
    founder.style.mixBlendMode='multiply';
    founder.style.filter='brightness(1.10) contrast(1.04) saturate(1.08) drop-shadow(0 20px 28px rgba(14,69,135,.16))';
  }
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce)return;
  var overlay=document.createElement('div');
  overlay.id='pageTransition';
  overlay.innerHTML='<div class="ptLogo"><img src="assets/pavan-logo.svg" alt=""><span>Pavan Educator</span></div>';
  overlay.style.cssText='position:fixed;inset:0;background:#f5f8ff;z-index:999999;display:flex;align-items:center;justify-content:center;opacity:1;transition:opacity .32s ease;pointer-events:none;';
  var style=document.createElement('style');
  style.textContent='#pageTransition .ptLogo{display:flex;align-items:center;gap:10px;font:800 22px Arial,sans-serif;color:#172033;transform:translateY(8px);opacity:.92}#pageTransition .ptLogo img{width:42px;height:42px}#pageTransition .ptLogo span{color:#2563eb}@media(prefers-reduced-motion:reduce){#pageTransition{display:none!important}}';
  document.head.appendChild(style);document.body.appendChild(overlay);
  requestAnimationFrame(function(){requestAnimationFrame(function(){overlay.style.opacity='0';});});
  setTimeout(function(){if(overlay.parentNode)overlay.remove();},450);
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a||e.defaultPrevented)return;
    var href=a.getAttribute('href');
    if(!href||href.charAt(0)==='#'||href.indexOf('://')>0||href.indexOf('mailto:')===0||a.target==='_blank')return;
    var url=new URL(href,location.href);
    if(url.origin!==location.origin)return;
    e.preventDefault();
    overlay.style.pointerEvents='auto';overlay.style.opacity='1';
    setTimeout(function(){location.href=url.href;},300);
  });
})();
