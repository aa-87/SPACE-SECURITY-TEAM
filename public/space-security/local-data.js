/* Local data contract: no network access, no silent replacement of unreadable data. */
(function(root,factory){var api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.SSTData=api})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
const keys={c:'sst.fieldlog.v1',b:'sst.breathlog.v1',m:'sst.milklog.v1',j:'sst.journal.v1',t:'sst.landing.theme'};
const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const str=x=>typeof x==='string', date=x=>str(x)&&x.trim()!==''&&Number.isFinite(Date.parse(x));
const num=(x,min,max)=>((typeof x==='number')||(str(x)&&x.trim()!==''))&&Number.isFinite(Number(x))&&Number(x)>=min&&Number(x)<=max;
const id=x=>str(x)&&x.trim()!=='';
const theme=x=>x==='light'||x==='dark';
const rating=x=>x==null||x===''||num(x,0,10);
const cessation=e=>obj(e)&&id(e.id)&&date(e.when)&&['cigarette','blend','craving','smokefree','other'].includes(e.type)&&str(e.trigger)&&str(e.notes)&&rating(e.craving)&&(e.type!=='cigarette'||(num(e.quantity,1,100)&&Number.isInteger(Number(e.quantity))))&&(e.type!=='blend'||(num(e.tobaccoPct,0,100)&&num(e.cannabisPct,0,100)&&Math.abs(Number(e.tobaccoPct)+Number(e.cannabisPct)-100)<1e-8));
const breath=e=>obj(e)&&id(e.id)&&date(e.date)&&typeof e.seconds==='number'&&num(e.seconds,0,59999.9)&&str(e.context)&&str(e.notes);
const milk=e=>obj(e)&&id(e.id)&&date(e.date)&&['Regular milk','Lactose-free milk','Yogurt','Cheese','Other dairy','No dairy / calcium only'].includes(e.kind)&&['Not recorded','Food','Supplement','Both'].includes(e.source)&&['Not assessed','None noticed','Mild','Moderate','Severe'].includes(e.symptoms)&&str(e.notes)&&['ml','calcium'].every(k=>e[k]===null||(typeof e[k]==='number'&&num(e[k],0,10000)));
const note=e=>obj(e)&&id(e.id)&&date(e.date)&&['general','cessation','breath','milk','both','all'].includes(e.scope)&&str(e.title)&&e.title.length<=90&&str(e.body)&&e.body.trim().length>0&&e.body.length<=4000;
const list=(a,test)=>Array.isArray(a)&&a.every(test)&&new Set(a.map(e=>e.id)).size===a.length;
const profile=x=>obj(x)&&['baseline','startDate','goal'].every(k=>x[k]==null||str(x[k])||typeof x[k]==='number');
const validators={c:x=>obj(x)&&profile(x.profile)&&list(x.entries,cessation),b:x=>list(x,breath),m:x=>list(x,milk),j:x=>list(x,note),t:theme};
const empty=k=>k==='c'?{entries:[],profile:{baseline:'',startDate:'',goal:'Understand my patterns'},theme:'dark'}:k==='t'?'dark':[];
function validate(k,value){if(!validators[k]||!validators[k](value))throw Error('Invalid '+keys[k]+' records. Existing storage was not changed.');return value}
function read(store,k){let raw=store.getItem(keys[k]),value=raw===null?empty(k):k==='t'?raw:JSON.parse(raw);return {raw,value:validate(k,value)}}
function write(store,k,value,expected){validate(k,value);if(store.getItem(keys[k])!==expected)throw Error('Records changed in another tab. Reload this page before saving.');const raw=k==='t'?value:JSON.stringify(value);store.setItem(keys[k],raw);return raw}
function merge(a,b){return Array.from(new Map(a.concat(b).map(e=>[e.id,e])).values())}
function backup(store,activeTheme){const data={cessation:read(store,'c').value,breath:read(store,'b').value,milk:read(store,'m').value,journal:read(store,'j').value,preferences:{theme:validate('t',activeTheme)}};return {format:'sst-complete-backup-v1',version:1,exportedAt:new Date().toISOString(),data}}
function parse(x){if(!obj(x)||x.format!=='sst-complete-backup-v1'||x.version!==1||!obj(x.data)||!obj(x.data.preferences))throw Error('Unsupported backup format.');const d=x.data;return {c:validate('c',d.cessation),b:validate('b',d.breath),j:validate('j',d.journal),m:d.milk===undefined?undefined:validate('m',d.milk),t:validate('t',d.preferences.theme)}}
function restore(store,input,replace){const d=parse(input),names=['c','b','j','t'];if(d.m!==undefined)names.push('m');const before={},next={},written=[];names.forEach(k=>{before[k]=store.getItem(keys[k]);if(replace||k==='t')next[k]=d[k];else{const old=read(store,k).value;next[k]=k==='c'?{...old,entries:merge(old.entries,d.c.entries),profile:before[k]===null?d.c.profile:old.profile,theme:d.t}:merge(old,d[k])}validate(k,next[k])});if(names.some(k=>store.getItem(keys[k])!==before[k]))throw Error('Records changed. Retry the restore.');try{names.forEach(k=>{write(store,k,next[k],before[k]);written.push(k)})}catch(e){let failed=false;written.reverse().forEach(k=>{try{if(store.getItem(keys[k])!==(k==='t'?next[k]:JSON.stringify(next[k]))){failed=true;return}if(before[k]===null)store.removeItem(keys[k]);else store.setItem(keys[k],before[k])}catch(ignore){failed=true}});throw Error(failed?'Restore failed and rollback was incomplete. Do not edit records; retain your backup.':'Restore failed; completed writes were rolled back. '+e.message)}return next}
return {keys,empty,validate,read,write,merge,backup,parse,restore,cessation,breath,milk,note,rating};
});
