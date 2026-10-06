/* Pavan Educator - unified admin sidebar */
(function(){
'use strict';
function init(){
 var path=location.pathname.split('/').pop()||'admin-dashboard.html';
 var sidebar=document.querySelector('.admin-unified-sidebar,.sidebar,.side');
 if(!sidebar){sidebar=document.createElement('aside');document.body.insertBefore(sidebar,document.body.firstChild);}
 sidebar.className='sidebar admin-unified-sidebar';
 sidebar.innerHTML=
 '<button class="sidebar-toggle" id="adminSidebarToggle" type="button" aria-label="Collapse sidebar" title="Collapse sidebar">‹</button>'+
 '<a class="brand" href="admin-dashboard.html"><img src="assets/pavan-logo.svg" alt="Pavan Educator"><span class="brand-text">Pavan <span>Educator</span></span></a>'+
 '<div class="admin-label">ADMIN PANEL</div>'+
 '<ul class="menu">'+
 '<li><a href="admin-dashboard.html"><span class="menu-icon">🏠</span><span class="menu-label">Dashboard</span></a></li>'+
 '<li><a href="admin-courses.html"><span class="menu-icon">📚</span><span class="menu-label">Courses</span></a></li>'+
 '<li><a href="admin-projects.html"><span class="menu-icon">💻</span><span class="menu-label">Projects</span></a></li>'+
 '<li><a href="admin-videos.html"><span class="menu-icon">🎥</span><span class="menu-label">Videos</span></a></li>'+
 '<li><a href="admin-students.html"><span class="menu-icon">🎓</span><span class="menu-label">Students</span></a></li>'+
 '<li><a href="admin-attendance.html"><span class="menu-icon">📋</span><span class="menu-label">Attendance</span></a></li>'+
 '<li><a href="admin-analytics.html"><span class="menu-icon">📊</span><span class="menu-label">Analytics</span></a></li>'+
 '<li><a href="admin-chat.html"><span class="menu-icon">💬</span><span class="menu-label">Student Chat</span></a></li>'+
 '<li><a href="admin-settings.html"><span class="menu-icon">⚙️</span><span class="menu-label">Settings</span></a></li>'+
 '</ul><div class="separator"></div><div class="logout"><a href="login.html"><span class="menu-icon">🚪</span><span class="menu-label">Logout</span></a></div>';
 sidebar.querySelectorAll('.menu a').forEach(function(a){if(a.getAttribute('href')===path)a.classList.add('active');});
 document.body.classList.add('admin-unified-layout');
 var style=document.getElementById('admin-unified-sidebar-style');
 if(!style){
  style=document.createElement('style');style.id='admin-unified-sidebar-style';
  style.textContent=
  '.admin-unified-sidebar{position:fixed!important;inset:0 auto 0 0!important;width:270px!important;height:100vh!important;background:linear-gradient(180deg,#081a34,#0d2547)!important;color:#fff!important;padding:22px 16px!important;display:flex!important;flex-direction:column!important;z-index:1000!important;transition:width .25s ease,padding .25s ease!important;box-shadow:8px 0 30px rgba(13,34,64,.08)!important;overflow-y:auto!important;overflow-x:hidden!important}'+
  '.admin-unified-sidebar .brand{display:flex!important;align-items:center!important;gap:11px!important;padding:4px 10px 30px!important;text-decoration:none!important;color:#fff!important}'+
  '.admin-unified-sidebar .brand img{width:42px!important;height:42px!important;object-fit:contain!important;flex:0 0 42px!important}'+
  '.admin-unified-sidebar .brand-text{font-size:19px!important;font-weight:850!important;white-space:nowrap!important}.admin-unified-sidebar .brand-text span{color:#55a0ff!important}'+
  '.admin-unified-sidebar .admin-label{font-size:11px!important;letter-spacing:1.6px!important;color:#91a5c0!important;font-weight:850!important;padding:0 12px 12px!important}'+
  '.admin-unified-sidebar .menu{list-style:none!important;margin:0!important;padding:0!important}.admin-unified-sidebar .menu li{margin:4px 0!important}'+
  '.admin-unified-sidebar .menu a,.admin-unified-sidebar .logout a{display:flex!important;align-items:center!important;gap:12px!important;padding:12px 13px!important;border-radius:10px!important;color:#dce7f6!important;text-decoration:none!important;font-weight:700!important;font-size:13px!important;transition:.18s!important;white-space:nowrap!important}'+
  '.admin-unified-sidebar .menu a:hover,.admin-unified-sidebar .menu a.active{background:linear-gradient(90deg,#2563eb,#3b82f6)!important;color:#fff!important;box-shadow:0 8px 20px rgba(37,99,235,.2)!important}'+
  '.admin-unified-sidebar .menu-icon{width:25px!important;min-width:25px!important;text-align:center!important;font-size:18px!important}'+
  '.admin-unified-sidebar .separator{height:1px!important;background:rgba(255,255,255,.1)!important;margin:16px 8px!important}.admin-unified-sidebar .logout{margin-top:auto!important}'+
  '.admin-unified-sidebar .logout a{background:rgba(255,255,255,.06)!important;color:#ff9a9a!important}.admin-unified-sidebar .logout a:hover{background:#ef4444!important;color:#fff!important}'+
  '.admin-unified-sidebar .sidebar-toggle{position:absolute!important;right:12px!important;top:16px!important;width:34px!important;height:34px!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:9px!important;background:#16345a!important;color:#fff!important;font-size:20px!important;line-height:1!important;cursor:pointer!important;z-index:5!important}.admin-unified-sidebar .sidebar-toggle:hover{background:#2563eb!important}'+
  '.admin-unified-sidebar.collapsed{width:82px!important;padding:22px 10px!important}.admin-unified-sidebar.collapsed .brand-text,.admin-unified-sidebar.collapsed .admin-label,.admin-unified-sidebar.collapsed .menu-label{display:none!important}.admin-unified-sidebar.collapsed .brand{justify-content:center!important;padding:4px 0 30px!important}.admin-unified-sidebar.collapsed .menu-icon{width:100%!important;font-size:20px!important}.admin-unified-sidebar.collapsed .menu a,.admin-unified-sidebar.collapsed .logout a{justify-content:center!important;gap:0!important}.admin-unified-sidebar.collapsed .separator{margin-left:2px!important;margin-right:2px!important}'+
  'body.admin-unified-layout .main,body.admin-unified-layout .side~.main{margin-left:270px!important;transition:margin-left .25s ease!important}body.admin-unified-layout .main.sidebar-collapsed{margin-left:82px!important}'+
  'body.admin-unified-layout .wrap{max-width:none!important;margin-left:270px!important;margin-right:0!important;padding-left:28px!important;padding-right:28px!important;transition:margin-left .25s ease!important}'+
  'body.admin-unified-layout:has(.admin-unified-sidebar.collapsed) .wrap{margin-left:82px!important}'+
  '@media(max-width:750px){body.admin-unified-layout .main{margin-left:270px!important}body.admin-unified-layout .wrap{margin-left:270px!important}body.admin-unified-layout:has(.admin-unified-sidebar.collapsed) .main,body.admin-unified-layout:has(.admin-unified-sidebar.collapsed) .wrap{margin-left:82px!important}}';
  document.head.appendChild(style);
 }
 var toggle=sidebar.querySelector('#adminSidebarToggle');
 function setCollapsed(c){sidebar.classList.toggle('collapsed',c);document.body.classList.toggle('admin-sidebar-collapsed',c);toggle.innerHTML=c?'›':'‹';toggle.title=c?'Open sidebar':'Collapse sidebar';toggle.setAttribute('aria-label',toggle.title);localStorage.setItem('pavanAdminSidebarCollapsed',c?'1':'0');}
 toggle.onclick=function(e){e.preventDefault();e.stopPropagation();setCollapsed(!sidebar.classList.contains('collapsed'));};
 setCollapsed(localStorage.getItem('pavanAdminSidebarCollapsed')==='1');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();