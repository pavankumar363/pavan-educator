/* Pavan Educator - demo admin session guard */
(function(){
  window.PavanAdminAuth = {
    isLoggedIn:function(){
      return sessionStorage.getItem('adminLoggedIn')==='true' && sessionStorage.getItem('currentRole')==='Admin';
    },
    require:function(){
      if(!this.isLoggedIn()){
        location.replace('login.html');
        return false;
      }
      return true;
    },
    logout:function(){
      sessionStorage.removeItem('adminLoggedIn');
      sessionStorage.removeItem('currentRole');
      sessionStorage.removeItem('currentUser');
      location.href='login.html';
    }
  };
  if(document.currentScript && document.currentScript.dataset.guard==='true'){
    PavanAdminAuth.require();
  }
})();
