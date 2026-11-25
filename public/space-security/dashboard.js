(function(){
  'use strict';
  var $=function(id){return document.getElementById(id)},filter='all',timelineLimit=12,timelineEvents=[];
  function read(key,fallback){try{var value=JSON.parse(localStorage.getItem(key)||'null');return value===null?fallback:value}catch(e){return fallback}}
  function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function dateLabel(value){var d=new Date(value);return isNaN(d.getTime())?'Date unavailable':d.toLocaleString(undefined,{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'})}
  function duration(seconds){var n=Number(seconds);if(!Number.isFinite(n)||n<0)return '—';return Math.floor(n/60)+'m '+(n%60).toFixed(1)+'s'}
  function dayKey(date){var d=new Date(date);if(isNaN(d.getTime()))return '';return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function dayLabel(date){return date.toLocaleDateString(undefined,{weekday:'short'}).slice(0,2)}
  function renderInsights(c,validBreath){
    var now=new Date(),days=[],map={},triggers={},cravingValues=[],calendarStart=new Date(now.getFullYear(),now.getMonth(),now.getDate()-13).getTime();
    for(var i=13;i>=0;i--){var d=new Date(now.getFullYear(),now.getMonth(),now.getDate()-i),key=dayKey(d);days.push({date:d,key:key,label:dayLabel(d),cessation:0,breath:0});map[key]=days[days.length-1]}
    c.forEach(function(e){if(!e||typeof e.when!=='string')return;var dt=new Date(e.when);if(isNaN(dt.getTime()))return;var key=dayKey(dt);if(map[key])map[key].cessation++;if(now-dt<=30*86400000&&now>=dt&&typeof e.trigger==='string'&&e.trigger.trim()){var trigger=e.trigger.trim().replace(/\s+/g,' '),triggerKey=trigger.toLocaleLowerCase();if(!triggers[triggerKey])triggers[triggerKey]={name:trigger,count:0};triggers[triggerKey].count++}if(dt.getTime()>=calendarStart&&dt<=now&&e.craving!==''&&e.craving!=null&&Number.isFinite(Number(e.craving)))cravingValues.push(Number(e.craving))});
    validBreath.forEach(function(e){var dt=new Date(e.date),key=dayKey(dt);if(map[key])map[key].breath++});
    var svg=$('activityChart'),max=Math.max(1,...days.map(function(d){return d.cessation+d.breath})),base=174,plotH=145,left=40,plotW=660,step=plotW/14,barW=22,out='';
    [0,Math.ceil(max/2),max].filter(function(v,i,a){return a.indexOf(v)===i}).forEach(function(v){var y=base-(v/max)*plotH;out+='<line class="insight-gridline" x1="'+left+'" y1="'+y+'" x2="'+(left+plotW)+'" y2="'+y+'"/><text class="insight-axis-label" x="'+(left-10)+'" y="'+(y+4)+'" text-anchor="end">'+v+'</text>'});
    days.forEach(function(d,i){var x=left+i*step+(step-barW)/2,h1=d.cessation/max*plotH,h2=d.breath/max*plotH;out+='<rect class="bar-cessation" x="'+x+'" y="'+(base-h1)+'" width="'+barW+'" height="'+h1+'" rx="2"><title>'+d.label+': '+d.cessation+' cessation entries</title></rect>';out+='<rect class="bar-breath" x="'+x+'" y="'+(base-h1-h2)+'" width="'+barW+'" height="'+h2+'" rx="2"><title>'+d.label+': '+d.breath+' breath observations</title></rect>';if(i%2===0||i===13)out+='<text class="insight-axis-label" x="'+(x+barW/2)+'" y="197" text-anchor="middle">'+d.label+'</text>'});
    svg.innerHTML=out;
    var topTriggers=Object.keys(triggers).map(function(k){return triggers[k]}).sort(function(a,b){return b.count-a.count||a.name.localeCompare(b.name)}).slice(0,3),host=$('triggerInsights');
    host.textContent='';
    if(!topTriggers.length){var empty=document.createElement('p');empty.className='insight-empty';empty.textContent='No trigger details recorded in the last 30 days.';host.appendChild(empty)}
    else topTriggers.forEach(function(item,index){var row=document.createElement('div');row.className='trigger-row';var rank=document.createElement('span');rank.className='trigger-rank';rank.textContent='0'+(index+1);var name=document.createElement('strong');name.textContent=item.name;var count=document.createElement('small');count.textContent=item.count+' '+(item.count===1?'entry':'entries');row.appendChild(rank);row.appendChild(name);row.appendChild(count);host.appendChild(row)});
    $('recentCravingAverage').textContent=cravingValues.length?(cravingValues.reduce(function(a,b){return a+b},0)/cravingValues.length).toFixed(1)+'/10':'—';
    $('recentCravingCount').textContent=cravingValues.length?cravingValues.length+' ratings in the last 14 days':'No recent ratings';
  }
  function load(){
    var cessation=read('sst.fieldlog.v1',{}),breath=read('sst.breathlog.v1',[]),journal=read('sst.journal.v1',[]);
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
    renderInsights(c,validBreath);
    var events=c.filter(Boolean).map(function(e){var kind=e.type==='cigarette'?'Cigarette entry':e.type==='craving'?'Craving observation':e.type==='blend'?'Tobacco / cannabis entry':e.type==='smokefree'?'Smoke-free milestone':'Cessation note';return {group:'cessation',date:e.when,title:kind,detail:[e.quantity&&e.type==='cigarette'?e.quantity+' cigarette(s)':null,e.craving!==''&&e.craving!=null?'Craving '+e.craving+'/10':null,e.trigger||null,e.notes||null].filter(Boolean).join(' · '),id:e.id,kind:e.type,trigger:e.trigger||''}}).concat(validBreath.map(function(e){return {group:'breath',date:e.date,title:'Breath observation',detail:[duration(e.seconds),e.context||null,e.notes||null].filter(Boolean).join(' · '),id:e.id,seconds:Number(e.seconds),kind:'observation'}})).concat((Array.isArray(journal)?journal:[]).filter(function(e){return e&&typeof e.date==='string'&&typeof e.body==='string'}).map(function(e){return {group:'journal',date:e.date,title:e.title||'Personal reflection',detail:e.body,id:e.id,scope:e.scope||'general'}})).filter(function(e){return typeof e.date==='string'&&!isNaN(new Date(e.date).getTime())}).sort(function(a,z){return new Date(z.date)-new Date(a.date)});
    window.__sstDashboardEvents=events;
    timelineEvents=events;timelineLimit=12;renderTimeline();
    render();
    $('dashboardUpdated').textContent=events.length?'Updated just now · '+events.length+' records':'No local records yet';
    $('dashboardStatus').textContent='LOCAL STORAGE / '+(events.length?'CONNECTED':'READY');
  }
  function render(){
    var events=(window.__sstDashboardEvents||[]).filter(function(e){return filter==='all'||e.group===filter}).slice(0,8),host=$('combinedActivity');
    if(!events.length){host.innerHTML='<p class="activity-empty">'+(filter==='all'?'Your observations will appear here when you add them to either field log.':'No '+(filter==='breath'?'breath':filter==='journal'?'journal':'cessation')+' records yet.')+'</p>';return}
    host.innerHTML=events.map(function(e){return '<article class="activity-item '+e.group+'"><span class="activity-mark" aria-hidden="true">'+(e.group==='breath'?'02':e.group==='journal'?'03':'01')+'</span><div class="activity-copy"><strong>'+esc(e.title)+'</strong><small>'+esc(dateLabel(e.date))+'</small>'+(e.detail?'<p>'+esc(e.detail)+'</p>':'')+'</div><span class="activity-type">'+(e.group==='breath'?'BREATH':e.group==='journal'?'JOURNAL':'CESSATION')+'</span></article>'}).join('');
  }

  function timelineDateKey(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function timelineDateLabel(d){return d.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'})}
  function timelineMonthKey(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')}
  function timelineChart(events){
    var now=new Date(),months=[],counts={},max=1;
    for(var i=11;i>=0;i--){var d=new Date(now.getFullYear(),now.getMonth()-i,1),key=timelineMonthKey(d);months.push({key:key,label:d.toLocaleDateString(undefined,{month:'short'}),year:d.getFullYear()});counts[key]={cessation:0,breath:0,journal:0}}
    events.forEach(function(e){var d=new Date(e.date),key=timelineMonthKey(d);if(counts[key]&&counts[key][e.group]!=null)counts[key][e.group]++});
    months.forEach(function(m){max=Math.max(max,counts[m.key].cessation+counts[m.key].breath+counts[m.key].journal)});
    var out='',base=142,plot=122,left=42,step=64,w=28;
    [0,Math.ceil(max/2),max].filter(function(v,i,a){return a.indexOf(v)===i}).forEach(function(v){var y=base-v/max*plot;out+='<line class="tl-grid" x1="'+left+'" y1="'+y+'" x2="815" y2="'+y+'"/><text class="tl-axis" x="30" y="'+(y+4)+'" text-anchor="end">'+v+'</text>'});
    months.forEach(function(m,i){var c=counts[m.key],x=left+i*step+14,y=base;[['cessation','tl-bar-cessation'],['breath','tl-bar-breath'],['journal','tl-bar-journal']].forEach(function(s){var v=c[s[0]],h=v/max*plot;y-=h;if(v)out+='<rect class="'+s[1]+'" x="'+x+'" y="'+y+'" width="'+w+'" height="'+Math.max(h,1)+'" rx="3"><title>'+m.label+' '+m.year+' · '+s[0]+': '+v+'</title></rect>'});out+='<text class="tl-axis" x="'+(x+w/2)+'" y="163" text-anchor="middle">'+m.label+'</text>'});
    $('timelineChart').innerHTML=out;
  }
  function renderTimeline(){
    var all=timelineEvents.slice().filter(function(e){return e.date&&!isNaN(new Date(e.date).getTime())}),now=new Date(),range=$('timelineRange').value,type=$('timelineType').value,q=$('timelineSearch').value.trim().toLowerCase();
    timelineChart(all);$('timelineTotal').textContent=all.length.toLocaleString();$('timelineReflections').textContent=all.filter(function(e){return e.group==='journal'}).length.toLocaleString();
    var days={};all.forEach(function(e){days[timelineDateKey(new Date(e.date))]=1});$('timelineDays').textContent=Object.keys(days).length.toLocaleString();
    var first=all.length?all.reduce(function(a,b){return new Date(a.date)<new Date(b.date)?a:b}):null;$('timelineFirst').textContent=first?new Date(first.date).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}):'—';$('timelineSpan').textContent=first?Math.max(0,Math.floor((now-new Date(first.date))/86400000))+' days since first record':'Your timeline starts here';
    var filtered=all.filter(function(e){var dt=new Date(e.date);return(range==='all'||dt>=new Date(now.getFullYear(),now.getMonth(),now.getDate()-Number(range)))&&(type==='all'||e.group===type)&&(!q||(e.title+' '+e.detail+' '+e.group).toLowerCase().includes(q))});
    var host=$('personalTimeline');$('timelineShown').textContent=filtered.length+' '+(filtered.length===1?'RECORD':'RECORDS');
    if(!filtered.length){host.innerHTML='<div class="timeline-empty"><span>✳</span><strong>No moments in this view.</strong><p>Try a wider time window or another field filter. Your original records are unchanged.</p></div>';$('timelineMore').hidden=true;$('timelineMoreNote').textContent='Your records remain in this browser.';return}
    var shown=filtered.slice(0,timelineLimit),groups={},keys=[];shown.forEach(function(e){var k=timelineDateKey(new Date(e.date));if(!groups[k]){groups[k]=[];keys.push(k)}groups[k].push(e)});
    host.innerHTML=keys.map(function(k){var d=new Date(k+'T12:00:00');return '<section class="timeline-day"><div class="timeline-day-date"><span class="timeline-day-number">'+String(d.getDate()).padStart(2,'0')+'</span><span><strong>'+esc(timelineDateLabel(d))+'</strong><small>'+groups[k].length+' '+(groups[k].length===1?'moment':'moments')+'</small></span></div><div class="timeline-day-events">'+groups[k].map(function(e){var icon=e.group==='cessation'?'01':e.group==='breath'?'02':'03',label=e.group==='cessation'?'CESSATION':e.group==='breath'?'BREATH':'JOURNAL',time=new Date(e.date).toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'});return '<article class="timeline-event '+e.group+'"><span class="timeline-event-marker">'+icon+'</span><div class="timeline-event-content"><div class="timeline-event-top"><span>'+label+'</span><time>'+esc(time)+'</time></div><h5>'+esc(e.title)+'</h5>'+(e.detail?'<p>'+esc(e.detail)+'</p>':'')+(e.group==='journal'?'<span class="timeline-event-tag">'+esc(e.scope||'general')+'</span>':'')+'</div></article>'}).join('')+'</div></section>'}).join('');
    $('timelineMore').hidden=filtered.length<=timelineLimit;$('timelineMoreNote').textContent='Showing '+shown.length+' of '+filtered.length+' matching records · stored only in this browser';
  }
  ['timelineRange','timelineType'].forEach(function(id){$(id).addEventListener('change',function(){timelineLimit=12;renderTimeline()})});
  $('timelineSearch').addEventListener('input',function(){timelineLimit=12;renderTimeline()});$('timelineMore').addEventListener('click',function(){timelineLimit+=12;renderTimeline()});
  document.querySelectorAll('.activity-filter').forEach(function(button){button.addEventListener('click',function(){filter=button.getAttribute('data-filter');document.querySelectorAll('.activity-filter').forEach(function(other){var active=other===button;other.classList.toggle('is-active',active);other.setAttribute('aria-pressed',active?'true':'false')});render()})});
  $('dashboardRefresh').addEventListener('click',load);
  window.addEventListener('storage',function(event){if(event.key==='sst.landing.theme'){if(event.newValue==='light'||event.newValue==='dark')document.documentElement.setAttribute('data-theme',event.newValue);return}if(!event.key||event.key==='sst.fieldlog.v1'||event.key==='sst.breathlog.v1'||event.key==='sst.journal.v1')load()});
  load();
})();
