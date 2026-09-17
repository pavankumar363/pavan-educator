/* Pavan Educator — real student authentication with Supabase Auth.
   Demo accounts remain as a temporary fallback for existing project testing. */
(function(){
  const SUPABASE_URL='https://jlrmmkgcjckkayearlca.supabase.co';
  const SUPABASE_KEY='sb_publishable_eEPceWmh6MUHLwZmAQMEdQ_uk1Gp1EH';
  const PROFILE_URL=SUPABASE_URL+'/functions/v1/student-profile';
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
    }catch(e){ console.warn('Student presence tracking unavailable',e); return null; }
  }
  function startHeartbeat(username){
    if(heartbeatTimer) clearInterval(heartbeatTimer);
    heartbeatTimer=setInterval(()=>rpc('student_heartbeat',username),30000);
    rpc('student_heartbeat',username);
  }
  async function realLogin(username,password){
    const clean=String(username||'').trim().toLowerCase();
    if(!clean||!password) return null;
    const email=clean+'@pavaneducator.local';
    const r=await fetch(SUPABASE_URL+'/auth/v1/token?grant_type=password',{
      method:'POST',
      headers:{'apikey':SUPABASE_KEY,'Content-Type':'application/json'},
      body:JSON.stringify({email,password})
    });
    const data=await r.json().catch(()=>({}));
    if(!r.ok) return {ok:false,error:data.error_description||data.msg||'Invalid student username or password.'};
    const accessToken=data.access_token;
    if(!accessToken) return {ok:false,error:'Student authentication session was not returned.'};
    const p=await fetch(PROFILE_URL,{headers:{Authorization:'Bearer '+accessToken,apikey:SUPABASE_KEY}});
    const pdata=await p.json().catch(()=>({}));
    if(!p.ok||!pdata.student) return {ok:false,error:pdata.error||'Student profile could not be loaded.'};
    const s=pdata.student;
    const session={...s,auth:true,demo:false,accessToken,refreshToken:data.refresh_token,loginAt:new Date().toISOString()};
    sessionStorage.setItem('pavanDemoStudent',JSON.stringify(session));
    sessionStorage.setItem('pavanAuthAccessToken',accessToken);
    sessionStorage.setItem('pavanAuthRefreshToken',data.refresh_token||'');
    sessionStorage.setItem('currentRole','Student');
    sessionStorage.setItem('currentUser',s.username);
    sessionStorage.setItem('studentName',s.name);
    await rpc('record_student_login',s.username);
    startHeartbeat(s.username);
    return {ok:true,student:session};
  }

  async function demoLogin(username,secret){
    const u=(username||'').trim().toLowerCase();
    const hash=await digest(secret);
    const s=students().find(x=>String(x.username).toLowerCase()===u && x.passwordHash===hash);
    if(!s) return null;
    const session={...s,demo:true,auth:false,loginAt:new Date().toISOString()};
    sessionStorage.setItem('pavanDemoStudent',JSON.stringify(session));
    sessionStorage.setItem('currentRole','Student');
    sessionStorage.setItem('currentUser',s.username);
    sessionStorage.setItem('studentName',s.name);
    await rpc('record_student_login',s.username);
    startHeartbeat(s.username);
    return session;
  }

  window.PavanDemoAuth = {
    login: async function(username,secret){
      const clean=String(username||'').trim().toLowerCase();
      try{
        const result=await realLogin(clean,secret);
        if(result&&result.ok) return result.student;
        const demo=await demoLogin(username,secret);
        if(demo) return demo;
        return null;
      }catch(e){
        console.warn('Real student authentication unavailable; trying demo fallback.',e);
        return await demoLogin(username,secret);
      }
    },
    current:function(){
      try{
        const s=JSON.parse(sessionStorage.getItem('pavanDemoStudent')||'null');
        if(s && s.username) startHeartbeat(s.username);
        return s;
      }catch(e){return null;}
    },
    accessToken:function(){ return sessionStorage.getItem('pavanAuthAccessToken')||''; },
    logout:function(){
      let s=null;
      try{s=JSON.parse(sessionStorage.getItem('pavanDemoStudent')||'null');}catch(e){}
      if(heartbeatTimer) clearInterval(heartbeatTimer);
      heartbeatTimer=null;
      const token=this.accessToken();
      if(token){ fetch(SUPABASE_URL+'/auth/v1/logout',{method:'POST',headers:{'apikey':SUPABASE_KEY,'Authorization':'Bearer '+token}}).catch(()=>{}); }
      if(s && s.username) rpc('student_logout',s.username,true);
      sessionStorage.removeItem('pavanDemoStudent');
      sessionStorage.removeItem('pavanAuthAccessToken');
      sessionStorage.removeItem('pavanAuthRefreshToken');
      sessionStorage.removeItem('currentRole');
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('studentName');
    }
  };
})();