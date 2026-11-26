(function(){
'use strict';
const kind=location.pathname.replace(/\/$/,'').split('/')[3];
if(!['routines','construction'].includes(kind))return;
const $=id=>document.getElementById(id),M=window.SSTConstruction,host=$('labContent');
function el(tag,text,parent=host,cls=''){const n=document.createElement(tag);if(text!==null)n.textContent=text;if(cls)n.className=cls;parent.append(n);return n}
function btn(text,fn,p){const b=el('button',text,p);b.type='button';b.onclick=fn;return b}
function field(label,tag,id,p){const w=el('div',null,p,'lab-field'),l=el('label',label,w),c=el(tag,null,w);c.id=id;l.htmlFor=id;return c}
function options(s,items){s.replaceChildren();items.forEach(([v,t])=>{const o=el('option',t,s);o.value=v})}
function panel(title){const p=el('section',null,host,'lab-panel');el('h2',title,p);return p}
function code(lines,pre,active){pre.replaceChildren();lines.forEach((line,i)=>{const s=el('span',line,pre,'academy-code-line');if(i===active)s.classList.add('active')})}
function status(p,id){const s=el('p','',p,'lab-status');s.id=id;s.setAttribute('role','status');return s}
if(kind==='routines'){
const p=panel('Follow a routine call'),controls=el('div',null,p,'lab-controls');
const mode=field('Routine example','select','routineMode',controls);options(mode,[['scope','Protected local (NEW)'],['shared','Shared local (DO)'],['value','Parameter by value'],['reference','Parameter by reference'],['function','Extrinsic return']]);
const n=field('Starting value','input','routineValue',controls);n.type='number';n.min=0;n.max=99;n.step=1;n.value=4;
const grid=el('div',null,p,'construction-grid'),left=el('div',null,grid),right=el('div',null,grid);el('h3','Program',left);const pre=el('pre','',left);pre.id='routineCode';
el('h3','Active call stack',right);const stack=el('div',null,right,'call-stack');stack.id='routineStack';
el('h3','Visible and saved values',right);const mem=el('div',null,right,'lab-step-grid');mem.id='routineMemory';
el('h3','Output',right);const out=el('pre','',right);out.id='routineOutput';const msg=status(p,'routineStatus'),actions=el('div',null,p,'lab-actions');let step=-1,model;
const next=btn('Next instruction',()=>{if(model&&step<model.frames.length-1){step++;render()}},actions);
btn('Previous instruction',()=>{if(step>=0){step--;render()}},actions);btn('Reset trace',()=>{step=-1;render()},actions);
function render(){if(!model)return;const f=model.frames[step];code(model.code,pre,f?.line);stack.replaceChildren();(f?f.stack:['main']).forEach((name,i)=>el('div',(i+1)+' / '+name,stack,'stack-frame'));mem.replaceChildren();function card(label,v){const c=el('div',null,mem,'lab-step');el('small',label,c);el('strong',v==null?'Undefined':String(v),c)}if(f){card(mode.value==='scope'&&f.stack.length>1?'Caller count (saved or visible)':'Caller count',f.caller);if(f.stack.length>1)card(['scope','shared'].includes(mode.value)?'Active count':'Formal value',f.formal);if(f.result!==undefined)card('result',f.result)}else el('p','Advance to inspect values.',mem);out.textContent=f?.out||'';msg.textContent=f?f.why:'Ready. Predict the output first.';next.disabled=step>=model.frames.length-1}
function reset(){step=-1;try{if(n.value==='')throw Error('Enter a starting value.');model=M.trace(mode.value,Number(n.value));render()}catch(e){model=null;pre.textContent='';stack.replaceChildren();mem.replaceChildren();out.textContent='';msg.textContent=e.message;next.disabled=true}}
mode.onchange=n.oninput=reset;reset();
el('p','The stack and memory are bounded teaching diagrams, not an executing M process. In the protected example, NEW makes count undefined before a new literal is assigned.',p,'academy-muted');
}else{
const p=panel('Construct and repair a program'),sel=field('Challenge','select','buildChallenge',p);
options(sel,M.challenges.map((c,i)=>[String(i),c.title]));const goal=el('p','',p);goal.id='buildGoal';
const choice=field('Choose the missing instruction','select','buildInstruction',p);
const grid=el('div',null,p,'construction-grid'),left=el('div',null,grid),right=el('div',null,grid);
el('h3','Assembled program',left);const pre=el('pre','',left);pre.id='buildCode';
el('h3','Preview output',right);const out=el('pre','',right);out.id='buildOutput';
const msg=status(p,'buildFeedback'),actions=el('div',null,p,'lab-actions');let checked=false;
function render(){const i=Number(sel.value),j=Number(choice.value),r=M.construct(i,j);code(r.code,pre,M.challenges[i].prefix.length+1);out.textContent=checked?r.output:'Predict the output, then check.';msg.textContent=checked?(r.correct?'Correct! '+r.explain:'Not yet. Compare '+r.output+' with the goal, then change the instruction.'):'Choose an instruction to repair the example.'}
function reset(){const c=M.challenges[Number(sel.value)];goal.textContent=c.goal;options(choice,c.choices.map((v,i)=>[String(i),v.trim()]));checked=false;render()}
btn('Check program',()=>{checked=true;render()},actions);btn('Show explanation',()=>{msg.textContent=M.challenges[Number(sel.value)].explain},actions);btn('Reset challenge',reset,actions);
sel.onchange=reset;choice.onchange=()=>{checked=false;render()};reset();
el('p','These challenges assemble predefined instructions and compare known outcomes. They do not evaluate arbitrary code. Copy the program into a configured local YottaDB environment to execute it.',p,'academy-muted');
}
})();
