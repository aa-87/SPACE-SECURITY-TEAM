(function(){
'use strict';
const M=window.SSTLabModel,$=id=>document.getElementById(id),host=$('labContent');
const path=location.pathname.replace(/\/$/,'');
if(!/^\/learn\/lab(?:\/|$)/.test(path))return;
$('academyHero').hidden=true;$('academyHome').hidden=true;$('academyProgress').hidden=true;$('academyLab').hidden=false;
const labs=[['trees','Information trees','Store, inspect, remove and traverse named nodes.'],['expressions','Expressions','Compare left-to-right evaluation with parentheses.'],['flow','Control flow','Explore decisions and bounded loops.'],['memory','Persistent memory','See what survives a simulated process restart.'],['routines','Routine calls and scope','Follow the call stack, parameters and return values.'],['construction','Program construction','Repair instructions and predict program output.'],['strings','String manipulation','Explore character positions, fields and mappings.'],['patterns','Patterns and selection','Recognize formats and choose values.']];
const kind=path.split('/')[3];const current=labs.find(x=>x[0]===kind);
function node(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n}
function el(tag,text,cls,parent=host){const n=node(tag,text,cls);parent.append(n);return n}
function button(text,fn,parent=host){const n=el('button',text,'',parent);n.type='button';n.onclick=fn;return n}
// Keep option text outside the label so accessible names are stable.
let fieldSequence=0;
function fieldControl(label,tag,parent){
 const field=el('div',undefined,'lab-field',parent);
 const l=el('label',label,'',field),control=el(tag,undefined,'',field);
 control.id='academy-lab-field-'+(++fieldSequence);
 l.htmlFor=control.id;
 return control;
}
function select(label,values,parent){const s=fieldControl(label,'select',parent);values.forEach(([v,t])=>{const o=el('option',t,'',s);o.value=v});return s}
function input(label,value,parent,type='text'){const i=fieldControl(label,'input',parent);i.type=type;i.value=value;i.maxLength=120;return i}
function panel(title,parent=host){const p=el('section',undefined,'lab-panel',parent);el('h2',title,'',p);return p}
function code(parent){return el('pre','','lab-code',parent)}
function status(parent){const p=el('p','','lab-status',parent);p.setAttribute('role','status');return p}
function actions(parent){return el('div',undefined,'lab-actions',parent)}
function svg(parent,view){const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('viewBox',view);s.setAttribute('role','img');s.setAttribute('aria-label','Visual model of the current example');parent.append(s);return s}
function shape(s,tag,attrs,text){const n=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));if(text!==undefined)n.textContent=text;s.append(n);return n}
function box(s,x,y,w,h,text,active=false){shape(s,'rect',{x,y,width:w,height:h,rx:8,class:active?'lab-svg-active':'lab-svg-box'});shape(s,'text',{x:x+w/2,y:y+h/2+4,'text-anchor':'middle',class:'lab-svg-text'},text)}
function line(s,x1,y1,x2,y2,active=false){shape(s,'line',{x1,y1,x2,y2,class:active?'lab-svg-line active':'lab-svg-line'})}
if(!current){$('labTitle').textContent='Learn by exploring.';$('labIntro').textContent=labs.length+' interactive models let you manipulate values and see the corresponding standard MUMPS instructions. No code is executed on the server.';const grid=el('div',undefined,'academy-lessons');labs.forEach(([id,title,desc],i)=>{const a=el('a',undefined,'academy-card',grid);a.href='/learn/lab/'+id;el('span','LAB 0'+(i+1),'academy-kicker',a);el('h3',title,'',a);el('p',desc,'',a);el('span','Explore →','academy-card-status',a)});return}
$('labTitle').textContent=current[1];$('labIntro').textContent=current[2];document.title=current[1]+' — MUMPS Academy';
const nav=el('nav',undefined,'lab-nav');labs.forEach(([id,title])=>{const a=el('a',title,'',nav);a.href='/learn/lab/'+id;if(id===kind)a.setAttribute('aria-current','page')});
if(kind==='trees'){
const tree=new M.Tree();function seed(){tree.kill([]);tree.set(['Alex','city'],'Boston');tree.set(['Alex','age'],'21');tree.set(['Sam','city'],'Chicago')}seed();
const p=panel('Build and inspect an information tree'),controls=el('div',undefined,'lab-controls',p);
const person=select('Person',[['Alex','Alex'],['Sam','Sam'],['Jordan','Jordan']],controls),field=select('Node',[['','Person node'],['city','City'],['age','Age']],controls),value=input('Value (empty is allowed)','Boston',controls);
const target=()=>[person.value,...(field.value?[field.value]:[])];const cmd=code(p),out=status(p),act=actions(p);
const diagram=svg(p,'0 0 640 320');const list=el('div',undefined,'lab-node-list',p);
function render(){const rows=[];function walk(path,depth){rows.push({path,depth,data:tree.data(path),value:tree.get(path)});tree.keys(path).forEach(k=>walk(path.concat(k),depth+1))}walk([],0);diagram.replaceChildren();diagram.setAttribute('viewBox','0 0 640 '+(rows.length*48+20));const positions=new Map();rows.forEach((r,i)=>{const x=12+r.depth*65,y=10+i*48,w=610-r.depth*65;const parent=positions.get(JSON.stringify(r.path.slice(0,-1)));if(r.depth&&parent){line(diagram,x-12,parent.y+34,x-12,y+17);line(diagram,x-12,y+17,x,y+17)}box(diagram,x,y,w,34,(r.path.at(-1)||'contact')+' · '+r.data+(r.data%10?' · '+(r.value.length>35?r.value.slice(0,32)+'…':JSON.stringify(r.value)):''),JSON.stringify(r.path)===JSON.stringify(target()));positions.set(JSON.stringify(r.path),{y})});list.replaceChildren();rows.forEach(r=>el('div',M.address(r.path)+' — $DATA='+r.data+(r.data%10?' · '+JSON.stringify(r.value):''),'',list))}
function report(c,o){cmd.textContent=c;out.textContent=o;render()}
button('SET — store',()=>{const t=target();tree.set(t,value.value);report('SET '+M.address(t)+'='+M.quote(value.value),'Stored the selected node.')},act);
button('KILL — remove branch',()=>{const t=target();tree.kill(t);report('KILL '+M.address(t),'Removed the selected node and its descendants.')},act);
button('$DATA — inspect',()=>{const t=target();report('WRITE $DATA('+M.address(t)+'),!',String(tree.data(t)))},act);
button('$GET — retrieve',()=>{const t=target();report('WRITE $GET('+M.address(t)+',"Unknown"),!',JSON.stringify(tree.get(t,'Unknown')))},act);
let cursor='';button('$ORDER — next name',()=>{const before=cursor;cursor=tree.order([],cursor);report('WRITE $ORDER(contact('+M.quote(before)+')),!',cursor?cursor:'Empty string — end of traversal. Next click starts again.')},act);
button('Reset example',()=>{seed();cursor='';report('; Initial example restored','Three example values.')},act);person.onchange=field.onchange=render;report('; Choose an operation','Select a node to explore.');
el('p','The four $DATA results are 0 (missing), 1 (value), 10 (descendants), and 11 (both). This model uses only fixed nonempty ASCII name and field keys, not general M collation. Empty strings are valid values.','academy-muted',p);
}else if(kind==='expressions'){
const p=panel('Change the numbers'),controls=el('div',undefined,'lab-controls',p),a=input('First number','2',controls,'number'),b=input('Second number','3',controls,'number'),c=input('Third number','4',controls,'number');[a,b,c].forEach(i=>{i.min=0;i.max=99;i.step=1});const mode=select('Evaluation',[['plain','Left to right'],['group','Parentheses']],controls),cmd=code(p),steps=el('div',undefined,'lab-step-grid',p),out=status(p);
function render(){try{if([a,b,c].some(i=>i.value===''))throw Error('Enter all three numbers.');const r=M.expression(Number(a.value),Number(b.value),Number(c.value),mode.value==='group');cmd.textContent=r.code;steps.replaceChildren();r.steps.forEach((s,i)=>{const x=el('div',undefined,'lab-step',steps);el('small','STEP '+(i+1),'',x);el('strong',s,'',x)});out.textContent='Output: '+r.result}catch(e){cmd.textContent='';steps.replaceChildren();out.textContent=e.message}}[a,b,c,mode].forEach(i=>i.addEventListener('input',render));render();
}else if(kind==='flow'){
const p=panel('Make a decision'),controls=el('div',undefined,'lab-controls',p),score=input('Score (0–20)','7',controls,'range');score.min=0;score.max=20;score.step=1;const cmd=code(p),diagram=svg(p,'0 0 640 230'),out=status(p);
function render(){const n=Number(score.value),r=M.decision(n);cmd.textContent='SET score='+n+'\nIF score>10 WRITE "Above ten",!\nELSE  WRITE "Ten or below",!';diagram.replaceChildren();box(diagram,230,10,180,40,'score = '+n);line(diagram,320,50,320,80,true);box(diagram,230,80,180,40,'score > 10?',true);line(diagram,320,120,150,170,r.test===1);line(diagram,320,120,490,170,r.test===0);box(diagram,35,170,230,40,'TRUE: Above ten',r.test===1);box(diagram,375,170,230,40,'FALSE: Ten or below',r.test===0);out.textContent='$TEST = '+r.test+' · Output: '+r.output}score.oninput=render;render();
const loop=panel('Repeat a bounded loop'),n=input('Last number (1–10)','3',loop,'number');n.min=1;n.max=10;n.step=1;const lc=code(loop),lo=code(loop),ls=status(loop),la=actions(loop);let i=0;function reset(){i=0;lo.textContent='';lc.textContent='FOR i=1:1:'+n.value+' WRITE i,!';ls.textContent='Ready for first iteration.'}n.oninput=reset;button('Next iteration',()=>{const end=Number(n.value);if(!Number.isInteger(end)||end<1||end>10){ls.textContent='Choose a whole number from 1 to 10.';return}if(i>=end){ls.textContent='Loop finished.';return}i++;lo.textContent+=i+'\n';ls.textContent='Iteration '+i+' of '+end+(i===end?' — loop finished.':'')},la);button('Reset loop',reset,la);reset();
}else if(kind==='memory'){
const p=panel('Compare process and database memory'),m=new M.Memory(),v=input('Message','Hello',p),cmd=code(p),out=status(p),grid=el('div',undefined,'lab-step-grid',p),local=el('div',undefined,'lab-step',grid),global=el('div',undefined,'lab-step',grid),act=actions(p);
function render(c,o){cmd.textContent=c;out.textContent=o;local.replaceChildren();global.replaceChildren();el('small','LOCAL / message','',local);el('strong',m.local===undefined?'Undefined':JSON.stringify(m.local),'',local);el('small','GLOBAL / ^SSTLearn("message")','',global);el('strong',m.global===undefined?'Undefined':JSON.stringify(m.global),'',global)}
button('SET local',()=>{m.local=v.value;render('SET message='+M.quote(v.value),'Value belongs to the current process.')},act);button('SET global',()=>{m.global=v.value;render('SET ^SSTLearn("message")='+M.quote(v.value),'Value belongs to the simulated database.')},act);button('Restart process',()=>{m.restart();render('; End process and start another','Local cleared; global retained in this simulation.')},act);button('Reset model',()=>{m.reset();render('; Reset simulation','Both model values cleared.')},act);render('; Choose where to store a value','No values defined.');el('p','No database is touched. A page reload resets this model. Real global persistence requires a configured YottaDB database; use a separate learning environment.','academy-muted',p);
}
})();
