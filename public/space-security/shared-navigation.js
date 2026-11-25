/* Shared navigation for SSR and standalone HTML documents. */
(function(){
  'use strict';
  var root=document.documentElement,key='sst.landing.theme';
  function valid(t){return t==='dark'||t==='light'}
  function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function preferred(){
    var t=get(key);if(valid(t))return t;
    try{var old=JSON.parse(get('sst.fieldlog.v1')||'null');if(old&&valid(old.theme))return old.theme}catch(e){}
    t=get('sst.breathlog.theme');if(valid(t))return t;
    return window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
  }
  function apply(t){
    if(!valid(t))return;
    root.setAttribute('data-theme',t);
    var b=document.getElementById('themeToggle'),label=document.getElementById('themeLabel'),meta=document.querySelector('meta[name="theme-color"]');
    if(b){b.setAttribute('aria-label',t==='light'?'Switch to dark theme':'Switch to light theme');b.setAttribute('aria-pressed',t==='light'?'true':'false')}
    if(label)label.textContent=t==='light'?'Dark theme':'Light theme';
    if(meta)meta.setAttribute('content',t==='light'?'#f3f1ed':'#08090b');
    window.dispatchEvent(new CustomEvent('sst:themechange',{detail:t}));
  }
  root.setAttribute('data-theme',preferred());
  function init(){
    var menu=document.getElementById('trackerMenu'),toggle=document.getElementById('trackerMenuToggle'),theme=document.getElementById('themeToggle');
    if(!menu||!toggle||!theme)return;
    function count(id,k,object){
      var node=document.getElementById(id);if(!node)return;
      try{var raw=localStorage.getItem(k),data=raw?JSON.parse(raw):[];if(object&&raw)data=data.entries;if(!Array.isArray(data))throw Error();var n=data.length;node.textContent=n+' ENTR'+(n===1?'Y':'IES')}catch(e){node.textContent='COUNT UNAVAILABLE'}
    }
    function counts(){if(window.SSTDemo)return;count('dashCessationEntries','sst.fieldlog.v1',true);count('dashBreathEntries','sst.breathlog.v1',false);count('dashMilkEntries','sst.milklog.v1',false)}
    function sync(){apply(preferred());counts()}
    theme.addEventListener('click',function(){var t=root.getAttribute('data-theme')==='light'?'dark':'light';try{localStorage.setItem(key,t)}catch(e){}apply(t)});
    function close(focus){menu.open=false;if(focus)toggle.focus()}
    menu.addEventListener('toggle',function(){if(menu.open)counts()});
    document.querySelectorAll('.tracker-launch').forEach(function(link){link.addEventListener('click',function(e){e.preventDefault();menu.open=true;toggle.scrollIntoView({block:'nearest'});toggle.focus({preventScroll:true})})});
    document.addEventListener('click',function(e){if(menu.open&&!menu.contains(e.target)&&!e.target.closest('.tracker-launch'))close(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&menu.open){e.preventDefault();close(true)}});
    menu.addEventListener('focusout',function(e){if(e.relatedTarget&&!menu.contains(e.relatedTarget))close(false)});
    function normalize(p){return p.replace(/index\.html$/,'').replace(/\/$/,'')||'/'}
    menu.querySelectorAll('a').forEach(function(a){if(window.SSTDemo)a.setAttribute('title','Open your personal tracker (exit demo)');if(normalize(a.pathname)===normalize(window.location.pathname)){a.setAttribute('aria-current','page');var arrow=a.querySelector('.tracker-menu-arrow');if(arrow)arrow.textContent='✓'}a.addEventListener('click',function(){close(false)})});
    window.addEventListener('storage',function(e){if(!e.key||e.key===key||['sst.fieldlog.v1','sst.breathlog.v1','sst.milklog.v1'].includes(e.key))sync()});
    window.addEventListener('pageshow',function(e){if(e.persisted)sync()});
    var refresh=document.getElementById('dashboardRefresh');if(refresh)refresh.addEventListener('click',sync);
    sync();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
