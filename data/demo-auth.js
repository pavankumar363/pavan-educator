/* Demo authentication helper for current student records. */
(function(){
  function students(){ return Array.isArray(window.PAVAN_DEMO_STUDENTS) ? window.PAVAN_DEMO_STUDENTS : []; }
  async function digest(value){
    const bytes=new TextEncoder().encode(value||'');
    const result=await crypto.subtle.digest('SHA-256',bytes);
    return Array.from(new Uint8Array(result)).map(b=>b.toString(16).padStart(2,'0')).join('');
  }
  window.PavanDemoAuth = {
    login: async function(username,secret){
      const u=(username||'').trim().toLowerCase();
      const hash=await digest(secret);
      const s=students().find(x=>String(x.username).toLowerCase()===u && x.passwordHash===hash);
      if(!s) return null;
      const session={...s,demo:true,loginAt:new Date().toISOString()};
      sessionStorage.setItem('pavanDemoStudent',JSON.stringify(session));
      sessionStorage.setItem('currentRole','Student');
      sessionStorage.setItem('currentUser',s.username);
      sessionStorage.setItem('studentName',s.name);
      return session;
    },
    current:function(){
      try{return JSON.parse(sessionStorage.getItem('pavanDemoStudent')||'null');}catch(e){return null;}
    },
    logout:function(){
      sessionStorage.removeItem('pavanDemoStudent');
      sessionStorage.removeItem('currentRole');
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('studentName');
    }
  };
})();