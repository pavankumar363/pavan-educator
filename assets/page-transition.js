/* Pavan Educator - smooth page transitions */
(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce)return;
  var overlay=document.createElement('div');
  overlay.id='pageTransition';
  overlay.innerHTML='<div class="ptLogo"><img src="assets/pavan-logo.svg" alt=""><span>Pavan Educator</span></div>';
  overlay.style.cssText='position:fixed;inset:0;background:#f5f8ff;z-index:999999;display:flex;align-items:center;justify-content:center;opacity:1;transition:opacity .32s ease;pointer-events:none;';
  var style=document.createElement('style');
  style.textContent='#pageTransition .ptLogo{display:flex;align-items:center;gap:10px;font:800 22px Arial,sans-serif;color:#172033;transform:translateY(8px);opacity:.92}#pageTransition .ptLogo img{width:42px;height:42px}#pageTransition .ptLogo span{color:#2563eb}@media(prefers-reduced-motion:reduce){#pageTransition{display:none!important}}';
  document.head.appendChild(style);document.body.appendChild(overlay);
  requestAnimationFrame(function(){requestAnimationFrame(function(){overlay.style.opacity='0';});});
  setTimeout(function(){if(overlay.parentNode)overlay.remove();},450);
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a||e.defaultPrevented)return;
    var href=a.getAttribute('href');
    if(!href||href.charAt(0)==='#'||href.indexOf('://')>0||href.indexOf('mailto:')===0||a.target==='_blank')return;
    var url=new URL(href,location.href);
    if(url.origin!==location.origin)return;
    e.preventDefault();
    overlay.style.pointerEvents='auto';overlay.style.opacity='1';
    setTimeout(function(){location.href=url.href;},300);
  });
})();
