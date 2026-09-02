/* Demo authentication helper for current student records. */
(function(){
  const SUPABASE_URL='https://jlrmmkgcjckkayearlca.supabase.co';
  const SUPABASE_KEY='sb_publishable_eEPceWmh6MUHLwZmAQMEdQ_uk1Gp1EH';
  let heartbeatTimer=null;
  function students(){ return Array.isArray(window.PAVAN_DEMO_STUDENTS) ? window.PAVAN_DEMO_STUDENTS : []; }
  async function digest(value){
    const bytes=new TextEncoder().encode(value||'');
    const result=await crypto.subtle.digest('SHA-256',bytes);
    return Array.from(new Uint8Array(result)).map(b=>b.toString(16).padStart(2,'0')).join('');
  }
  async function rpc(name,username){
    try{
      await fetch(SUPABASE_URL+'/rest/v1/rpc/'+name,{
        method:'POST',
        headers:{'apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},
        body:JSON.stringify({p_username:username})
      });
    }catch(e){ console.warn('Student presence tracking unavailable',e); }
  }
  function startHeartbeat(username){
    if(heartbeatTimer) clearInterval(heartbeatTimer);
    rpc('student_heartbeat',username);
    heartbeatTimer=setInterval(()=>rpc('student_heartbeat',username),30000);
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
      await rpc('record_student_login',s.username);
      startHeartbeat(s.username);
      return session;
    },
    current:function(){
      try{
        const s=JSON.parse(sessionStorage.getItem('pavanDemoStudent')||'null');
        if(s && s.username) startHeartbeat(s.username);
        return s;
      }catch(e){return null;}
    },
    logout:function(){
      if(heartbeatTimer) clearInterval(heartbeatTimer);
      heartbeatTimer=null;
      sessionStorage.removeItem('pavanDemoStudent');
      sessionStorage.removeItem('currentRole');
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('studentName');
    }
  };
})();