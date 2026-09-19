/* Pavan Educator — real Supabase Auth student authentication helper. */
(function(){
  const SUPABASE_URL='https://jlrmmkgcjckkayearlca.supabase.co';
  const SUPABASE_KEY='sb_publishable_eEPceWmh6MUHLwZmAQMEdQ_uk1Gp1EH';
  const LOGIN_URL=SUPABASE_URL+'/functions/v1/student-login';
  const PROFILE_URL=SUPABASE_URL+'/functions/v1/student-profile';
  let heartbeatTimer=null;
  async function rpc(name,username,keepalive=false){
    try{return await fetch(SUPABASE_URL+'/rest/v1/rpc/'+name,{method:'POST',keepalive,headers:{'apikey':SUPABASE_KEY,'Authorization':'Bearer '+(sessionStorage.getItem('pavanAuthAccessToken')||SUPABASE_KEY),'Content-Type':'application/json'},body:JSON.stringify({p_username:username})})}catch(e){console.warn('Student presence tracking unavailable',e);return null}
  }
  function startHeartbeat(username){if(heartbeatTimer)clearInterval(heartbeatTimer);heartbeatTimer=setInterval(()=>rpc('student_heartbeat',username),30000);rpc('student_heartbeat',username)}
  async function backendLogin(username,password){
    const r=await fetch(LOGIN_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username,password})});
    const data=await r.json().catch(()=>({}));
    if(!r.ok||!data.success)return null;
    const s=data.student||{};
    const session={...s,auth:!!data.real,demo:!!data.demo,loginAt:new Date().toISOString()};
    if(data.session){session.accessToken=data.session.access_token||'';session.refreshToken=data.session.refresh_token||'';sessionStorage.setItem('pavanAuthAccessToken',session.accessToken);sessionStorage.setItem('pavanAuthRefreshToken',session.refreshToken)}
    sessionStorage.setItem('pavanDemoStudent',JSON.stringify(session));
    sessionStorage.setItem('currentRole','Student');sessionStorage.setItem('currentUser',s.username||username);sessionStorage.setItem('studentName',s.name||'Student');
    await rpc('record_student_login',s.username||username);startHeartbeat(s.username||username);
    return session;
  }
  window.PavanDemoAuth={
    login:async function(username,secret){try{return await backendLogin(String(username||'').trim(),secret)}catch(e){console.error('Student login service error',e);return null}},
    current:function(){try{const s=JSON.parse(sessionStorage.getItem('pavanDemoStudent')||'null');if(s&&s.username)startHeartbeat(s.username);return s}catch(e){return null}},
    accessToken:function(){return sessionStorage.getItem('pavanAuthAccessToken')||''},
    profileToken:function(){return sessionStorage.getItem('pavanAuthAccessToken')||''},
    logout:function(){let s=null;try{s=JSON.parse(sessionStorage.getItem('pavanDemoStudent')||'null')}catch(e){}if(heartbeatTimer)clearInterval(heartbeatTimer);heartbeatTimer=null;const token=this.accessToken();if(token)fetch(SUPABASE_URL+'/auth/v1/logout',{method:'POST',headers:{'apikey':SUPABASE_KEY,'Authorization':'Bearer '+token}}).catch(()=>{});if(s&&s.username)rpc('student_logout',s.username,true);sessionStorage.removeItem('pavanDemoStudent');sessionStorage.removeItem('pavanAuthAccessToken');sessionStorage.removeItem('pavanAuthRefreshToken');sessionStorage.removeItem('currentRole');sessionStorage.removeItem('currentUser');sessionStorage.removeItem('studentName')}
  };
})();