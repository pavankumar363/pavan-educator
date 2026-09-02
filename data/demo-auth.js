/* Demo authentication helper for fictional students. */
(function(){
  function students(){ return Array.isArray(window.PAVAN_DEMO_STUDENTS) ? window.PAVAN_DEMO_STUDENTS : []; }
  window.PavanDemoAuth = {
    login: function(username,password){
      const u=(username||'').trim().toLowerCase();
      const s=students().find(x=>String(x.username).toLowerCase()===u && x.password===password);
      if(!s) return null;
      const session={...s, demo:true, loginAt:new Date().toISOString()};
      sessionStorage.setItem('pavanDemoStudent',JSON.stringify(session));
      sessionStorage.setItem('currentRole','Student');
      sessionStorage.setItem('currentUser',s.username);
      sessionStorage.setItem('studentName',s.name);
      return session;
    },
    current: function(){
      try{return JSON.parse(sessionStorage.getItem('pavanDemoStudent')||'null');}catch(e){return null;}
    },
    logout: function(){
      sessionStorage.removeItem('pavanDemoStudent');
      sessionStorage.removeItem('currentRole');
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('studentName');
    }
  };
})();
