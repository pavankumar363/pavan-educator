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
      brand.innerHTML='<img src="assets/pavan-logo.svg" alt="Pavan Educator"><span class="brand-text">Pavan <span>Educator</span></span>';
    }else{
      brand=document.createElement('a');brand.className='brand';brand.href='student-dashboard.html';brand.innerHTML='<img src="assets/pavan-logo.svg" alt="Pavan Educator"><span class="brand-text">Pavan <span>Educator</span></span>';sidebar.insertBefore(brand,sidebar.firstChild);
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
      ':root{--blue:#2563eb;--blue2:#4f46e5;}'+
      '.pe-unified-sidebar{position:fixed!important;inset:0 auto 0 0!important;width:270px!important;background:linear-gradient(180deg,#081a34,#0d2547)!important;color:#fff!important;padding:22px 16px!important;display:flex!important;flex-direction:column!important;z-index:1000!important;transition:.25s!important;box-shadow:8px 0 30px rgba(13,34,64,.08)!important;overflow-y:auto!important;overflow-x:hidden!important;}'+
      '.pe-unified-sidebar .brand{display:flex!important;align-items:center!important;gap:11px!important;padding:4px 10px 30px!important;text-decoration:none!important;color:#fff!important;}'+
      '.pe-unified-sidebar .brand img{width:42px!important;height:42px!important;object-fit:contain!important;flex:0 0 42px!important;}'+
      '.pe-unified-sidebar .brand-text{font-size:19px!important;font-weight:850!important;white-space:nowrap!important;}'+
      '.pe-unified-sidebar .brand-text span{color:#55a0ff!important;}'+
      '.pe-unified-sidebar .student-logo{display:flex!important;align-items:center!important;padding:4px 10px 30px!important;}'+
      '.pe-unified-sidebar .student-logo img{width:42px!important;height:42px!important;}'+
      '.pe-unified-sidebar .panel-title,.pe-unified-sidebar .student-panel-title{font-size:11px!important;letter-spacing:1.6px!important;color:#91a5c0!important;font-weight:850!important;padding:0 12px 12px!important;margin:0!important;}'+
      '.pe-unified-sidebar .menu,.pe-unified-sidebar .student-menu{list-style:none!important;margin:0!important;padding:0!important;}'+
      '.pe-unified-sidebar .menu li,.pe-unified-sidebar .student-menu li{margin:4px 0!important;}'+
      '.pe-unified-sidebar .menu a,.pe-unified-sidebar .student-menu a,.pe-unified-sidebar .logout a,.pe-unified-sidebar .student-logout a{display:flex!important;align-items:center!important;gap:12px!important;padding:12px 13px!important;border-radius:10px!important;color:#dce7f6!important;text-decoration:none!important;font-weight:700!important;font-size:13px!important;transition:.18s!important;white-space:nowrap!important;}'+
      '.pe-unified-sidebar .menu a:hover,.pe-unified-sidebar .menu a.active,.pe-unified-sidebar .student-menu a:hover,.pe-unified-sidebar .student-menu a.active{background:linear-gradient(90deg,#2563eb,#3b82f6)!important;color:#fff!important;box-shadow:0 8px 20px rgba(37,99,235,.2)!important;}'+
      '.pe-unified-sidebar .menu-icon,.pe-unified-sidebar .student-icon{width:25px!important;min-width:25px!important;text-align:center!important;font-size:18px!important;}'+
      '.pe-unified-sidebar .separator,.pe-unified-sidebar .student-separator{height:1px!important;background:rgba(255,255,255,.1)!important;margin:16px 8px!important;}'+
      '.pe-unified-sidebar .logout,.pe-unified-sidebar .student-logout{margin-top:auto!important;}'+
      '.pe-unified-sidebar .logout a,.pe-unified-sidebar .student-logout a{background:rgba(255,255,255,.06)!important;color:#ff9a9a!important;}'+
      '.pe-unified-sidebar .logout a:hover,.pe-unified-sidebar .student-logout a:hover{background:#ef4444!important;color:#fff!important;}'+
      '.pe-unified-toggle,.pe-unified-sidebar .sidebar-toggle{position:absolute!important;right:12px!important;top:16px!important;width:34px!important;height:34px!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:9px!important;background:#16345a!important;color:#fff!important;font-size:20px!important;cursor:pointer!important;z-index:5!important;}'+
      '.pe-unified-toggle:hover,.pe-unified-sidebar .sidebar-toggle:hover{background:#2563eb!important;}'+
      '.pe-unified-sidebar.pe-unified-collapsed{width:82px!important;padding:22px 10px!important;}'+
      '.pe-unified-sidebar.pe-unified-collapsed .brand-text,.pe-unified-sidebar.pe-unified-collapsed .panel-title,.pe-unified-sidebar.pe-unified-collapsed .student-panel-title{display:none!important;}'+
      '.pe-unified-sidebar.pe-unified-collapsed .brand{justify-content:center!important;padding:4px 0 30px!important;}'+
      '.pe-unified-sidebar.pe-unified-collapsed .menu a,.pe-unified-sidebar.pe-unified-collapsed .student-menu a,.pe-unified-sidebar.pe-unified-collapsed .logout a,.pe-unified-sidebar.pe-unified-collapsed .student-logout a{justify-content:center!important;gap:0!important;}'+
      '.pe-unified-sidebar.pe-unified-collapsed .menu-icon,.pe-unified-sidebar.pe-unified-collapsed .student-icon{width:100%!important;font-size:20px!important;}'+
      '.pe-unified-sidebar.pe-unified-collapsed .pe-unified-label{display:none!important;}'+
      '.pe-unified-sidebar.pe-unified-collapsed .separator,.pe-unified-sidebar.pe-unified-collapsed .student-separator{margin-left:2px!important;margin-right:2px!important;}'+
      '.pe-unified-sidebar.pe-unified-collapsed .brand img{width:42px!important;}'+
      '.pe-unified-sidebar + .main,.pe-unified-sidebar + .student-page-main{margin-left:270px!important;transition:.25s!important;}'+
      'body.pe-unified-sidebar-collapsed .main,body.pe-unified-sidebar-collapsed .student-page-main{margin-left:82px!important;}'+
      '@media(max-width:750px){.pe-unified-sidebar{width:270px!important;}.pe-unified-sidebar.pe-unified-collapsed{width:82px!important;}.pe-unified-sidebar + .main,.pe-unified-sidebar + .student-page-main{margin-left:270px!important;}body.pe-unified-sidebar-collapsed .main,body.pe-unified-sidebar-collapsed .student-page-main{margin-left:82px!important;}}'
      document.head.appendChild(style);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.PavanStudentSidebar={init:init};
})();