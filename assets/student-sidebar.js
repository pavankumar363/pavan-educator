/* Pavan Educator - unified student sidebar */
(function(){
  'use strict';
  var items=[
    ['🏠','Dashboard','student-dashboard.html'],
    ['📚','Courses','student-courses.html'],
    ['💻','My Projects','student-projects.html'],
    ['🏆','My Skills & Portfolio','skills-portfolio.html'],
    ['💬','Chat with Students','student-chat.html'],
    ['👤','My Profile','student-profile.html'],
    ['🧠','Learning Center','student-learning-center.html'],
    ['🧪','AI Lab','student-ai-lab.html'],
    ['🤖','Future AI','student-future-ai.html']
  ];
  function init(){
    var path=location.pathname.split('/').pop()||'student-dashboard.html';
    var sidebar=document.querySelector('.student-sidebar,.sidebar');
    if(!sidebar){
      var studentPaths=items.map(function(x){return x[2]});
      if(studentPaths.indexOf(path)<0)return;
      sidebar=document.createElement('aside');
      sidebar.className='student-sidebar pe-unified-sidebar';
      document.body.insertBefore(sidebar,document.body.firstChild);
    }
    sidebar.classList.add('pe-unified-sidebar');
    sidebar.classList.remove('collapsed');
    var oldMain=document.querySelector('.main,.student-page-main');
    if(oldMain)oldMain.classList.remove('sidebar-collapsed');
    var isStudent=sidebar.classList.contains('student-sidebar');
    var menu=sidebar.querySelector('.student-menu,.menu');
    if(!menu){
      menu=document.createElement('ul');
      menu.className=isStudent?'student-menu':'menu';
      sidebar.appendChild(menu);
    }
    menu.innerHTML='';
    items.forEach(function(x){
      var li=document.createElement('li'),a=document.createElement('a');
      a.href=x[2];
      if(path===x[2])a.className='active';
      var icon=document.createElement('span');
      icon.className=isStudent?'student-icon':'menu-icon';
      icon.textContent=x[0];
      var label=document.createElement('span');
      label.className='pe-unified-label';
      label.textContent=x[1];
      a.appendChild(icon);a.appendChild(label);li.appendChild(a);menu.appendChild(li);
    });
    var sep=sidebar.querySelector('.student-separator,.separator');
    if(!sep){sep=document.createElement('div');sep.className=isStudent?'student-separator':'separator';sidebar.appendChild(sep);}
    var logout=sidebar.querySelector('.student-logout,.logout');
    if(!logout){logout=document.createElement('div');logout.className=isStudent?'student-logout':'logout';sidebar.appendChild(logout);}
    logout.innerHTML='<a href="login.html" class="pe-unified-logout">🚪 <span class="pe-unified-label">Logout</span></a>';
    var brand=sidebar.querySelector('.student-logo,.brand,.logo');
    if(brand){
      brand.innerHTML='<span class="pe-unified-brand">Pavan <b>Educator</b></span>';
    }else{
      brand=document.createElement('div');brand.className='student-logo';brand.innerHTML='<span class="pe-unified-brand">Pavan <b>Educator</b></span>';sidebar.insertBefore(brand,sidebar.firstChild);
    }
    var title=sidebar.querySelector('.student-panel-title,.panel-title,.admin-label');
    if(title)title.textContent='STUDENT PANEL';
    var oldToggle=sidebar.querySelector('#sidebarToggle,.sidebar-toggle');
    var toggle=oldToggle;
    if(toggle){ var cleanToggle=toggle.cloneNode(true); toggle.parentNode.replaceChild(cleanToggle,toggle); toggle=cleanToggle; toggle.classList.add('pe-unified-toggle'); }
    if(!toggle){
      toggle=document.createElement('button');toggle.type='button';toggle.className='pe-unified-toggle';toggle.innerHTML='‹';toggle.setAttribute('aria-label','Collapse sidebar');toggle.title='Collapse sidebar';sidebar.appendChild(toggle);
      toggle.addEventListener('click',function(){setCollapsed(!sidebar.classList.contains('pe-unified-collapsed'));});
    }
    function setCollapsed(c){
      sidebar.classList.toggle('pe-unified-collapsed',c);
      document.body.classList.toggle('pe-unified-sidebar-collapsed',c);
      toggle.innerHTML=c?'›':'‹';toggle.title=c?'Open sidebar':'Collapse sidebar';toggle.setAttribute('aria-label',toggle.title);
      localStorage.setItem('pavanStudentSidebarCollapsed',c?'1':'0');
      localStorage.setItem('pavanSidebarCollapsed',c?'1':'0');
    }
    if(!toggle.dataset.peUnifiedBound){
      toggle.dataset.peUnifiedBound='1';
      toggle.addEventListener('click',function(){setCollapsed(!sidebar.classList.contains('pe-unified-collapsed'));});
    }
    setCollapsed(localStorage.getItem('pavanStudentSidebarCollapsed')==='1');
    var style=document.getElementById('pe-unified-sidebar-style');
    if(!style){
      style=document.createElement('style');style.id='pe-unified-sidebar-style';
      style.textContent=
      '.pe-unified-sidebar{position:fixed!important;inset:0 auto 0 0!important;width:270px!important;height:100vh!important;max-height:100vh!important;overflow-y:auto!important;overflow-x:hidden!important;background:linear-gradient(180deg,#071a33,#0b2850)!important;color:#fff!important;padding:22px 16px!important;display:flex!important;flex-direction:column!important;z-index:1000!important;box-shadow:8px 0 30px rgba(8,26,52,.08)!important;transition:width .25s ease,padding .25s ease!important}'+
      '.pe-unified-sidebar .pe-unified-brand{font-size:22px;font-weight:850;color:#fff;display:block;padding:5px 10px 30px;white-space:nowrap}.pe-unified-sidebar .pe-unified-brand b{color:#55a0ff}'+
      '.pe-unified-sidebar .menu,.pe-unified-sidebar .student-menu{list-style:none;margin:0;padding:0}.pe-unified-sidebar .menu li,.pe-unified-sidebar .student-menu li{margin:4px 0}.pe-unified-sidebar .menu a,.pe-unified-sidebar .student-menu a,.pe-unified-sidebar .logout a,.pe-unified-sidebar .student-logout a{display:flex!important;align-items:center!important;gap:12px!important;padding:12px 13px!important;border-radius:10px!important;color:#dce7f6!important;text-decoration:none!important;font-weight:700!important;font-size:13px!important;transition:.18s!important;white-space:nowrap}.pe-unified-sidebar .menu a:hover,.pe-unified-sidebar .menu a.active,.pe-unified-sidebar .student-menu a:hover,.pe-unified-sidebar .student-menu a.active{background:linear-gradient(90deg,#2563eb,#3b82f6)!important;color:#fff!important;box-shadow:0 8px 20px rgba(37,99,235,.18)!important}.pe-unified-sidebar .menu-icon,.pe-unified-sidebar .student-icon{width:25px!important;min-width:25px!important;text-align:center!important;font-size:18px!important}.pe-unified-sidebar .separator,.pe-unified-sidebar .student-separator{height:1px;background:rgba(255,255,255,.12);margin:14px 8px}.pe-unified-sidebar .logout,.pe-unified-sidebar .student-logout{margin-top:auto}.pe-unified-sidebar .logout a,.pe-unified-sidebar .student-logout a{background:rgba(255,255,255,.06)!important;color:#ff9a9a!important}.pe-unified-sidebar .logout a:hover,.pe-unified-sidebar .student-logout a:hover{background:#ef4444!important;color:#fff!important}.pe-unified-toggle{position:absolute;right:12px;top:16px;width:34px;height:34px;border:1px solid rgba(255,255,255,.14);border-radius:9px;background:#16345a;color:#fff;font-size:21px;line-height:1;cursor:pointer;z-index:5}.pe-unified-toggle:hover{background:#2563eb}.pe-unified-sidebar.pe-unified-collapsed{width:82px!important;padding:22px 10px!important}.pe-unified-sidebar.pe-unified-collapsed .pe-unified-brand{font-size:0;text-align:center;padding:4px 0 30px}.pe-unified-sidebar.pe-unified-collapsed .pe-unified-brand:before{content:'🎓';font-size:28px}.pe-unified-sidebar.pe-unified-collapsed .menu a,.pe-unified-sidebar.pe-unified-collapsed .student-menu a,.pe-unified-sidebar.pe-unified-collapsed .logout a,.pe-unified-sidebar.pe-unified-collapsed .student-logout a{justify-content:center!important;gap:0!important}.pe-unified-sidebar.pe-unified-collapsed .pe-unified-label{display:none!important}.pe-unified-sidebar.pe-unified-collapsed .menu-icon,.pe-unified-sidebar.pe-unified-collapsed .student-icon{width:100%!important;font-size:20px!important}.pe-unified-sidebar.pe-unified-collapsed .pe-unified-toggle{right:10px}.pe-unified-sidebar.pe-unified-collapsed + .main,.pe-unified-sidebar.pe-unified-collapsed + .student-page-main{margin-left:82px!important}.pe-unified-sidebar:not(.pe-unified-collapsed) + .main,.pe-unified-sidebar:not(.pe-unified-collapsed) + .student-page-main{margin-left:270px!important}body.pe-unified-sidebar-collapsed .main,body.pe-unified-sidebar-collapsed .student-page-main{margin-left:82px!important}@media(max-width:750px){.pe-unified-sidebar{width:270px!important}.pe-unified-sidebar.pe-unified-collapsed{width:82px!important}.pe-unified-sidebar + .main,.pe-unified-sidebar + .student-page-main{margin-left:270px!important}.pe-unified-sidebar.pe-unified-collapsed + .main,.pe-unified-sidebar.pe-unified-collapsed + .student-page-main{margin-left:82px!important}}';
      document.head.appendChild(style);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.PavanStudentSidebar={init:init};
})();