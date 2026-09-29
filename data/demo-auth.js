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
  async function rpc(name,username,keepalive=false){
    try{
      return await fetch(SUPABASE_URL+'/rest/v1/rpc/'+name,{
        method:'POST',keepalive,
        headers:{'apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'},
        body:JSON.stringify({p_username:username})
      });
    }catch(e){ console.warn('Student tracking unavailable',e); return null; }
  }
  async function dbStudent(username,hash){
    try{
      const q=SUPABASE_URL+'/rest/v1/student_credentials?select=username,password_hash,login_hash,active&username=eq.'+encodeURIComponent(username)+'&active=eq.true&limit=1';
      const r=await fetch(q,{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY}});
      if(!r.ok)return null;
      const rows=await r.json();
      const row=rows&&rows[0];
      if(!row || String(row.login_hash||row.password_hash||'')!==hash)return null;
      const p=await fetch(SUPABASE_URL+'/rest/v1/student_profiles?select=username,name,student_class,age,location,active&username=eq.'+encodeURIComponent(username)+'&active=eq.true&limit=1',{headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+SUPABASE_KEY}});
      const profiles=p.ok?await p.json():[];
      const profile=profiles&&profiles[0];
      if(!profile)return null;
      return {id:'db-'+profile.username,name:profile.name,username:profile.username,passwordHash:hash,studentClass:profile.student_class,age:profile.age,location:profile.location};
    }catch(e){console.warn('Database student lookup unavailable',e);return null;}
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
      let s=students().find(x=>String(x.username).toLowerCase()===u && x.passwordHash===hash);
      if(!s) s=await dbStudent(u,hash);
      if(!s) return null;
      const session={...s,demo:true,loginAt:new Date().toISOString()};
      sessionStorage.setItem('pavanDemoStudent',JSON.stringify(session));
      sessionStorage.setItem('currentRole','Student');
      sessionStorage.setItem('currentUser',s.username);
      sessionStorage.setItem('studentName',s.name);
      await rpc('record_portal_login_attendance',s.username);
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
      let s=null;
      try{s=JSON.parse(sessionStorage.getItem('pavanDemoStudent')||'null');}catch(e){}
      if(heartbeatTimer) clearInterval(heartbeatTimer);
      heartbeatTimer=null;
      if(s && s.username) rpc('student_logout',s.username,true);
      sessionStorage.removeItem('pavanDemoStudent');
      sessionStorage.removeItem('currentRole');
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('studentName');
    }
  };
})();