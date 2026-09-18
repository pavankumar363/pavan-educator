/* Pavan Educator — real Supabase admin session guard */
(function(){
  const SUPABASE_URL='https://jlrmmkgcjckkayearlca.supabase.co';
  const SUPABASE_KEY='sb_publishable_eEPceWmh6MUHLwZmAQMEdQ_uk1Gp1EH';
  function token(){return sessionStorage.getItem('adminAccessToken')||'';}
  window.PavanAdminAuth={
    isLoggedIn:function(){return sessionStorage.getItem('adminLoggedIn')==='true'&&sessionStorage.getItem('currentRole')==='Admin'&&!!token();},
    require:function(){if(!this.isLoggedIn()){location.replace('login.html');return false}return true},
    accessToken:function(){return token()},
    logout:function(){const t=token();if(t)fetch(SUPABASE_URL+'/auth/v1/logout',{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+t}}).catch(()=>{});['adminLoggedIn','currentRole','currentUser','adminAccessToken','adminRefreshToken'].forEach(k=>sessionStorage.removeItem(k));location.href='login.html'}
  };
  if(document.currentScript&&document.currentScript.dataset.guard==='true')PavanAdminAuth.require();
})();