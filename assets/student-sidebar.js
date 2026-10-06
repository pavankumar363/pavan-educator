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
      sidebar=document.createElement('aside');
      sidebar.className='sidebar';
      document.body.insertBefore(sidebar,document.body.firstChild);
    }
    sidebar.className='sidebar pe-unified-sidebar';
    sidebar.innerHTML=
      '<button class="sidebar-toggle" id="sidebarToggle" type="button" aria-label="Collapse sidebar" title="Collapse sidebar">‹</button>'+
      '<a class="brand" href="student-dashboard.html"><img src="assets/pavan-logo.svg" alt="Pavan Educator"><span class="brand-text">Pavan <span>Educator</span></span></a>'+
      '<div class="panel-title">STUDENT PANEL</div>'+
      '<ul class="menu">'+
      '<li><a href="student-dashboard.html"><span class="menu-icon">🏠</span><span class="menu-label">Dashboard</span></a></li>'+
      '<li><a href="student-courses.html"><span class="menu-icon">📚</span><span class="menu-label">Courses</span></a></li>'+
      '<li><a href="student-projects.html"><span class="menu-icon">💻</span><span class="menu-label">My Projects</span></a></li>'+
      '<li><a href="skills-portfolio.html"><span class="menu-icon">🏆</span><span class="menu-label">My Skills &amp; Portfolio</span></a></li>'+
      '<li><a href="student-chat.html"><span class="menu-icon">💬</span><span class="menu-label">Chat with Students</span></a></li>'+
      '<li><a href="student-profile.html"><span class="menu-icon">👤</span><span class="menu-label">My Profile</span></a></li>'+
      '<li><a href="student-learning-center.html"><span class="menu-icon">🧠</span><span class="menu-label">Learning Center</span></a></li>'+
      '<li><a href="student-ai-lab.html"><span class="menu-icon">🧪</span><span class="menu-label">AI Lab</span></a></li>'+
      '<li><a href="student-future-ai.html"><span class="menu-icon">🤖</span><span class="menu-label">Future AI</span></a></li>'+
      '</ul><div class="separator"></div><div class="logout"><a href="login.html"><span class="menu-icon">🚪</span><span class="menu-label">Logout</span></a></div>';
    var links=sidebar.querySelectorAll('.menu a');
    links.forEach(function(link){
      if(link.getAttribute('href')===path)link.classList.add('active');
    });
    document.body.classList.add('pe-unified-student-layout');
    var style=document.getElementById('pe-unified-sidebar-style');
    if(!style){
      style=document.createElement('style');
      style.id='pe-unified-sidebar-style';
      style.textContent=
      ':root{--blue:#2563eb}'+
      '.pe-unified-sidebar{position:fixed!important;inset:0 auto 0 0!important;width:270px!important;height:100vh!important;background:linear-gradient(180deg,#081a34,#0d2547)!important;color:#fff!important;padding:22px 16px!important;display:flex!important;flex-direction:column!important;z-index:1000!important;transition:width .25s ease,padding .25s ease!important;box-shadow:8px 0 30px rgba(13,34,64,.08)!important;overflow-y:auto!important;overflow-x:hidden!important}'+
      '.pe-unified-sidebar .brand{display:flex!important;align-items:center!important;gap:11px!important;padding:4px 10px 30px!important;text-decoration:none!important;color:#fff!important}'+
      '.pe-unified-sidebar .brand img{width:42px!important;height:42px!important;object-fit:contain!important;flex:0 0 42px!important}'+
      '.pe-unified-sidebar .brand-text{font-size:19px!important;font-weight:850!important;white-space:nowrap!important}'+
      '.pe-unified-sidebar .brand-text span{color:#55a0ff!important}'+
      '.pe-unified-sidebar .panel-title{font-size:11px!important;letter-spacing:1.6px!important;color:#91a5c0!important;font-weight:850!important;padding:0 12px 12px!important}'+
      '.pe-unified-sidebar .menu{list-style:none!important;margin:0!important;padding:0!important}'+
      '.pe-unified-sidebar .menu li{margin:4px 0!important}'+
      '.pe-unified-sidebar .menu a,.pe-unified-sidebar .logout a{display:flex!important;align-items:center!important;gap:12px!important;padding:12px 13px!important;border-radius:10px!important;color:#dce7f6!important;text-decoration:none!important;font-weight:700!important;font-size:13px!important;transition:.18s!important;white-space:nowrap!important}'+
      '.pe-unified-sidebar .menu a:hover,.pe-unified-sidebar .menu a.active{background:linear-gradient(90deg,#2563eb,#3b82f6)!important;color:#fff!important;box-shadow:0 8px 20px rgba(37,99,235,.2)!important}'+
      '.pe-unified-sidebar .menu-icon{width:25px!important;min-width:25px!important;text-align:center!important;font-size:18px!important}'+
      '.pe-unified-sidebar .separator{height:1px!important;background:rgba(255,255,255,.1)!important;margin:16px 8px!important}'+
      '.pe-unified-sidebar .logout{margin-top:auto!important}'+
      '.pe-unified-sidebar .logout a{background:rgba(255,255,255,.06)!important;color:#ff9a9a!important}'+
      '.pe-unified-sidebar .logout a:hover{background:#ef4444!important;color:#fff!important}'+
      '.pe-unified-sidebar .sidebar-toggle{position:absolute!important;right:12px!important;top:16px!important;width:34px!important;height:34px!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:9px!important;background:#16345a!important;color:#fff!important;font-size:20px!important;line-height:1!important;cursor:pointer!important;z-index:5!important}'+
      '.pe-unified-sidebar .sidebar-toggle:hover{background:#2563eb!important}'+
      '.pe-unified-sidebar.collapsed{width:82px!important;padding:22px 10px!important}'+
      '.pe-unified-sidebar.collapsed .brand-text,.pe-unified-sidebar.collapsed .panel-title,.pe-unified-sidebar.collapsed .menu-label{display:none!important}'+
      '.pe-unified-sidebar.collapsed .brand{justify-content:center!important;padding:4px 0 30px!important}'+
      '.pe-unified-sidebar.collapsed .menu-icon{width:100%!important;font-size:20px!important}'+
      '.pe-unified-sidebar.collapsed .menu a,.pe-unified-sidebar.collapsed .logout a{justify-content:center!important;gap:0!important}'+
      '.pe-unified-sidebar.collapsed .separator{margin-left:2px!important;margin-right:2px!important}'+
      'body.pe-unified-student-layout .main{margin-left:270px!important;transition:margin-left .25s ease!important}'+
      'body.pe-unified-student-layout .main.sidebar-collapsed{margin-left:82px!important}'+
      'body.pe-unified-student-layout .pe-unified-sidebar.collapsed~.main{margin-left:82px!important}'+
      'body.pe-unified-student-layout>header.navbar,body.pe-unified-student-layout>section,body.pe-unified-student-layout>.wrap{margin-left:270px!important;transition:margin-left .25s ease!important}'+
      'body.pe-unified-student-layout:has(.pe-unified-sidebar.collapsed)>header.navbar,body.pe-unified-student-layout:has(.pe-unified-sidebar.collapsed)>section,body.pe-unified-student-layout:has(.pe-unified-sidebar.collapsed)>.wrap{margin-left:82px!important}'+
      '@media(max-width:750px){body.pe-unified-student-layout>header.navbar,body.pe-unified-student-layout>section,body.pe-unified-student-layout>.wrap{margin-left:270px!important}body.pe-unified-student-layout:has(.pe-unified-sidebar.collapsed)>header.navbar,body.pe-unified-student-layout:has(.pe-unified-sidebar.collapsed)>section,body.pe-unified-student-layout:has(.pe-unified-sidebar.collapsed)>.wrap{margin-left:82px!important}}';
      document.head.appendChild(style);
    }
    var toggle=sidebar.querySelector('#sidebarToggle');
    function setCollapsed(collapsed){
      sidebar.classList.toggle('collapsed',collapsed);
      document.body.classList.toggle('pe-unified-sidebar-collapsed',collapsed);
      toggle.innerHTML=collapsed?'›':'‹';
      toggle.title=collapsed?'Open sidebar':'Collapse sidebar';
      toggle.setAttribute('aria-label',toggle.title);
      localStorage.setItem('pavanStudentSidebarCollapsed',collapsed?'1':'0');
    }
    toggle.onclick=function(e){e.preventDefault();e.stopPropagation();setCollapsed(!sidebar.classList.contains('collapsed'));};
    setCollapsed(localStorage.getItem('pavanStudentSidebarCollapsed')==='1');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.PavanStudentSidebar={init:init};
})();