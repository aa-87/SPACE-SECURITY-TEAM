/* Read-only dashboard preview. No personal storage is read or written here. */
(function(){
'use strict';
if(!new URLSearchParams(location.search).has('demo'))return;
const data={c:{entries:[],profile:{baseline:'',startDate:'',goal:'Understand my patterns'},theme:'dark'},b:[],m:[],j:[]};
function stamp(days,hour){const d=new Date();d.setDate(d.getDate()-days);d.setHours(hour,0,0,0);if(d>Date.now())d.setTime(Date.now()-60000);return d.toISOString()}
for(let i=0;i<72;i++){const day=i<24?i%14:20+(i-24)*7;const date=stamp(day,9+i%7);switch(i%4){
case 0:data.c.entries.push({id:'demo-c'+i,when:date,type:i%12===0?'craving':'cigarette',quantity:i%12===0?0:1+i%3,craving:String(2+i%6),trigger:['After waking','Work break','Stress / anxiety'][i%3],notes:'Synthetic example — routine context recorded.'});break;
case 1:data.b.push({id:'demo-b'+i,date,seconds:12,context:'Retrospective example',notes:'Synthetic record, not a recommended duration.'});break;
case 2:data.m.push({id:'demo-m'+i,date,kind:i%3===0?'Lactose-free milk':'Regular milk',ml:150+i%3*50,calcium:null,source:'Food',symptoms:i%3===0?'Not assessed':'None noticed',notes:'Synthetic example, no treatment inference.'});break;
case 3:data.j.push({id:'demo-j'+i,date,scope:['general','cessation','milk','all'][Math.floor(i/4)%4],title:['A moment worth noting','Reviewing a routine','Context matters'][i%3],body:'Example reflection: I recorded what happened and kept the surrounding context. This is fictional.'});break;
}}
window.SSTDemo={data:data};
document.documentElement.dataset.demo='true';
})();
