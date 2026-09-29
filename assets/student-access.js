/* Pavan Educator — student-only page gate */
(function(){
  function go(){
    try{
      const s=window.PavanDemoAuth&&window.PavanDemoAuth.current();
      if(!s){ location.replace('login.html?next='+encodeURIComponent(location.pathname.split('/').pop()+location.search)); }
    }catch(e){ location.replace('login.html'); }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',go); else go();
})();