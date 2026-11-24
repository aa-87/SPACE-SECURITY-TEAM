(function(){
  'use strict';
  var $=function(id){return document.getElementById(id)},filter='all';
  function read(key,fallback){try{var value=JSON.parse(localStorage.getItem(key)||'null');return value===null?fallback:value}catch(e){return fallback}}
  function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function dateLabel(value){var d=new Date(value);return isNaN(d.getTime())?'Date unavailable':d.toLocaleString(undefined,{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'})}
  function duration(seconds){var n=Number(seconds);if(!Number.isFinite(n)||n<0)return '—';return Math.floor(n/60)+'m '+(n%60).toFixed(1)+'s'}
  function load(){
    var cessation=read('sst.fieldlog.v1',{}),breath=read('sst.breathlog.v1',[]);
    var c=cessation&&Array.isArray(cessation.entries)?cessation.entries:[],b=Array.isArray(breath)?breath:[];
    var cigarettes=c.filter(function(e){return e&&e.type==='cigarette'}).reduce(function(sum,e){return sum+(Number(e.quantity)||0)},0);
    var cravings=c.filter(function(e){return e&&e.craving!==''&&e.craving!=null&&Number.isFinite(Number(e.craving))}).map(function(e){return Number(e.craving)});
    var average=cravings.length?(cravings.reduce(function(a,n){return a+n},0)/cravings.length).toFixed(1)+'/10':'—';
    var validBreath=b.filter(function(e){return e&&Number.isFinite(Number(e.seconds))&&Number(e.seconds)>=0&&typeof e.date==='string'}).sort(function(a,z){return z.date.localeCompare(a.date)});
    $('dashCigarettes').textContent=cigarettes.toLocaleString();
    $('dashCraving').textContent=average;
    $('dashCravingCount').textContent=cravings.length?cravings.length+' rated observations':'No craving ratings yet';
    $('dashBreathCount').textContent=validBreath.length.toLocaleString();
    $('dashBreathLatest').textContent=validBreath.length?'Latest: '+duration(validBreath[0].seconds):'No observations recorded';
    $('dashTotal').textContent=(c.length+validBreath.length).toLocaleString();
    $('dashBreakdown').textContent=c.length+' cessation · '+validBreath.length+' breath';
    $('dashCessationEntries').textContent=c.length+' ENTR'+(c.length===1?'Y':'IES');
    $('dashBreathEntries').textContent=validBreath.length+' ENTR'+(validBreath.length===1?'Y':'IES');
    var events=c.filter(Boolean).map(function(e){var kind=e.type==='cigarette'?'Cigarette entry':e.type==='craving'?'Craving observation':e.type==='blend'?'Tobacco / cannabis entry':e.type==='smokefree'?'Smoke-free milestone':'Cessation note';return {group:'cessation',date:e.when,title:kind,detail:[e.quantity&&e.type==='cigarette'?e.quantity+' cigarette(s)':null,e.craving!==''&&e.craving!=null?'Craving '+e.craving+'/10':null,e.trigger||null,e.notes||null].filter(Boolean).join(' · ')}}).concat(validBreath.map(function(e){return {group:'breath',date:e.date,title:'Breath observation · '+duration(e.seconds),detail:[e.context||null,e.notes||null].filter(Boolean).join(' · ')}})).filter(function(e){return typeof e.date==='string'&&!isNaN(new Date(e.date).getTime())}).sort(function(a,z){return new Date(z.date)-new Date(a.date)});
    window.__sstDashboardEvents=events;
    render();
    $('dashboardUpdated').textContent=events.length?'Updated just now · '+events.length+' records':'No local records yet';
    $('dashboardStatus').textContent='LOCAL STORAGE / '+(events.length?'CONNECTED':'READY');
  }
  function render(){
    var events=(window.__sstDashboardEvents||[]).filter(function(e){return filter==='all'||e.group===filter}).slice(0,8),host=$('combinedActivity');
    if(!events.length){host.innerHTML='<p class="activity-empty">'+(filter==='all'?'Your observations will appear here when you add them to either field log.':'No '+(filter==='breath'?'breath':'cessation')+' records yet.')+'</p>';return}
    host.innerHTML=events.map(function(e){return '<article class="activity-item '+e.group+'"><span class="activity-mark" aria-hidden="true">'+(e.group==='breath'?'02':'01')+'</span><div class="activity-copy"><strong>'+esc(e.title)+'</strong><small>'+esc(dateLabel(e.date))+'</small>'+(e.detail?'<p>'+esc(e.detail)+'</p>':'')+'</div><span class="activity-type">'+(e.group==='breath'?'BREATH':'CESSATION')+'</span></article>'}).join('');
  }
  document.querySelectorAll('.activity-filter').forEach(function(button){button.addEventListener('click',function(){filter=button.getAttribute('data-filter');document.querySelectorAll('.activity-filter').forEach(function(other){var active=other===button;other.classList.toggle('is-active',active);other.setAttribute('aria-pressed',active?'true':'false')});render()})});
  $('dashboardRefresh').addEventListener('click',load);
  window.addEventListener('storage',function(event){if(event.key==='sst.landing.theme'){if(event.newValue==='light'||event.newValue==='dark')document.documentElement.setAttribute('data-theme',event.newValue);return}if(!event.key||event.key==='sst.fieldlog.v1'||event.key==='sst.breathlog.v1')load()});
  load();
})();
