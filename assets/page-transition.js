/* Pavan Educator - global animated splash + page transitions */
(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var animationsEnabled=localStorage.getItem('siteAnimations')==='on';
  if(!animationsEnabled) document.documentElement.classList.add('site-animations-off');
  var splash=document.getElementById('appSplash');
  var overlay=null;

  function build(){
    if(splash) return splash;
    overlay=document.getElementById('pageTransition');
    if(overlay) return overlay;
    overlay=document.createElement('div');
    overlay.id='pageTransition';
    overlay.innerHTML='<div class="ptBox"><img src="assets/pavan-logo.svg" alt="Pavan Educator"><h2>Pavan <span>Educator</span></h2><p>Learn • Build • Grow</p><div class="ptLoader"><i></i></div></div>';
    document.body.appendChild(overlay);
    return overlay;
  }

  function styles(){
    if(document.getElementById('pavanTransitionStyles')) return;
    var s=document.createElement('style');
    s.id='pavanTransitionStyles';
    s.textContent='.site-animations-off *,.site-animations-off *::before,.site-animations-off *::after{animation:none!important;transition:none!important}#pageTransition{position:fixed;inset:0;background:#fff;z-index:999999;display:flex;align-items:center;justify-content:center;opacity:1;transition:opacity .38s ease;pointer-events:none}#pageTransition .ptBox,#appSplash .splashBox{text-align:center}#pageTransition .ptBox img{width:82px;height:82px;display:block;margin:auto}#pageTransition .ptBox h2{font:800 27px Arial,sans-serif;margin:16px 0 0;color:#172033}#pageTransition .ptBox h2 span{color:#2563eb}#pageTransition .ptBox p{font:14px Arial,sans-serif;color:#687389;margin:7px 0 20px}.ptLoader{width:52px;height:4px;background:#e5eaf3;margin:auto;overflow:hidden;border-radius:5px}.ptLoader i{display:block;width:45%;height:100%;background:#2563eb;animation:ptLoad 1s ease-in-out infinite}@keyframes ptLoad{0%{transform:translateX(-110%)}100%{transform:translateX(230%)}}@media(prefers-reduced-motion:reduce){#pageTransition{display:none!important}.ptLoader i{animation:none}}';
    document.head.appendChild(s);
  }

  styles();

  if(!animationsEnabled){
    if(splash){ splash.style.opacity='0'; setTimeout(function(){if(splash.parentNode)splash.remove()},50); }
  }else if(splash){
    setTimeout(function(){
      splash.style.opacity='0';
      setTimeout(function(){if(splash.parentNode)splash.remove()},380);
    },700);
  }else if(!reduce){
    var initial=build();
    requestAnimationFrame(function(){requestAnimationFrame(function(){initial.style.opacity='0'})});
    setTimeout(function(){if(initial&&initial.parentNode)initial.remove()},850);
  }

  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a||e.defaultPrevented)return;
    if(!animationsEnabled)return;
    var href=a.getAttribute('href');
    if(!href||href.charAt(0)==='#'||href.indexOf('://')>0||href.indexOf('mailto:')===0||a.target==='_blank')return;
    var url=new URL(href,location.href);
    if(url.origin!==location.origin)return;
    e.preventDefault();
    if(splash)splash.style.opacity='1';
    else {var o=build();o.style.pointerEvents='auto';o.style.opacity='1';}
    setTimeout(function(){location.href=url.href},420);
  });
})();