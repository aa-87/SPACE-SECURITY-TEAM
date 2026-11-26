(function(){
'use strict';
const kind=location.pathname.replace(/\/$/,'').split('/')[3];if(!['application','reliability'].includes(kind))return;
const M=window.SSTApplicationModel,host=document.getElementById('labContent');
function el(tag,text,parent=host,cls=''){const n=document.createElement(tag);if(text!==null)n.textContent=text;if(cls)n.className=cls;parent.append(n);return n}
function field(label,id,p,value){const w=el('div',null,p,'lab-field'),l=el('label',label,w),c=el('input',null,w);c.id=id;l.htmlFor=id;c.value=value;return c}
function panel(title){const p=el('section',null,host,'lab-panel');el('h2',title,p);return p}
function button(text,fn,p){const b=el('button',text,p);b.type='button';b.onclick=fn;return b}
function status(p,id){const n=el('p','',p,'lab-status');n.id=id;n.setAttribute('role','status');return n}
function code(p,id){const n=el('pre','',p);n.id=id;return n}
function link(p,text,href){const a=el('a',text,p);a.href=href;return a}
if(kind==='application'){
 const p=panel('Build a fictional journal'),j=new M.Journal(),ctrl=el('div',null,p,'lab-controls');
 const id=field('Record ID','appId',ctrl,'J001'),title=field('Title','appTitle',ctrl,'A walk'),body=field('Body','appBody',ctrl,'Noticed the trees');
 id.maxLength=20;title.maxLength=80;body.maxLength=240;
 const actions=el('div',null,p,'lab-actions'),msg=status(p,'appResult'),cmd=code(p,'appCode'),tree=el('div',null,p,'app-tree');tree.id='appTree';
 function render(){tree.replaceChildren();el('strong','^SSTLearn("journal05")',tree);const records=j.list();if(!records.length)el('p','No records yet.',tree,'academy-muted');records.forEach(r=>{const row=el('article',null,tree,'app-record');el('strong',r.id,row);el('div','title: '+r.title,row);el('div','body: '+r.body,row)})}
 function run(op){const i=id.value,t=title.value,b=body.value;if(/[^\x20-\x7e]/.test(i+t+b)){msg.textContent='Use printable ASCII in this model.';cmd.textContent='';return}
 const result=j.run(op,i,t,b);const args=M.quote(i);cmd.textContent=op==='read'?'WRITE $$read^SSTJOURNAL('+args+'),!':op==='delete'?'WRITE $$remove^SSTJOURNAL('+args+'),!':'WRITE $$save^SSTJOURNAL('+args+','+M.quote(t)+','+M.quote(b)+','+(op==='update'?1:0)+'),!';msg.textContent=result;render()}
 ['create','read','update','delete'].forEach(op=>button(op[0].toUpperCase()+op.slice(1),()=>{if(op==='delete'&&!confirm('Delete this fictional record?'))return;run(op)},actions));
 button('Reset model',()=>{j.records.clear();msg.textContent='Model reset.';cmd.textContent='';render()},actions);render();
 el('p','This is an in-memory simulation. It resets on reload and never reads or writes personal records. The real routine uses transactions; the model is single-process.',p,'academy-muted');
 const q=panel('Run the actual MUMPS project');el('p','Use a fresh disposable YottaDB database. Save the source as SSTJOURNAL.m in your configured routine directory. Use fictional data only.',q);const a=link(q,'Download SSTJOURNAL.m','/public/space-security/academy/projects/SSTJOURNAL.m.txt');a.download='SSTJOURNAL.m';el('pre','yottadb -run ^SSTJOURNAL',q);link(q,'Read lesson 50 →','/learn/lesson/50');
}else{
 const m=new M.Reliability(),p=panel('Two cooperating processes'),a=el('div',null,p,'lab-actions'),out=status(p,'lockResult'),state=el('p','',p);state.id='lockOwner';const cmd=code(p,'lockCode');
 function lock(op,who){const ok=op==='acquire'?m.acquire(who):m.release(who);cmd.textContent=op==='acquire'?'LOCK +^SSTLearn("demoLock"):1':'LOCK -^SSTLearn("demoLock")';out.textContent=op==='acquire'?'Process '+who+' · $TEST='+Number(ok):ok?'Process '+who+' released the lock.':'Process '+who+' does not own the lock.';state.textContent='Owner: '+(m.owner||'None')}
 for(const who of ['A','B']){button('Acquire '+who,()=>lock('acquire',who),a);button('Release '+who,()=>lock('release',who),a)}state.textContent='Owner: None';
 el('p','A single-acquisition model: actual incremental LOCK can be acquired recursively by its owner. Locks only coordinate cooperating processes.',p,'academy-muted');
 const q=panel('Commit or roll back related fields'),actions=el('div',null,q,'lab-actions'),msg=status(q,'txResult'),tc=code(q,'txCode'),grid=el('div',null,q,'lab-step-grid');grid.id='txState';
 function render(){grid.replaceChildren();for(const [label,value] of [['Committed',m.committed],['Pending',m.pending]]){const c=el('div',null,grid,'lab-step');el('strong',label,c);el('span',value?'Title: '+value.title+' / Body: '+value.body:'No transaction',c)}}
 function tx(name,command,fn){const ok=fn();tc.textContent=command;msg.textContent=ok?name:'Operation unavailable in current state.';render()}
 button('Begin',()=>tx('Transaction started','TSTART ()',()=>m.begin()),actions);
 button('Stage title',()=>tx('Title staged','SET ^SSTLearn("demo","title")="Updated"',()=>m.stage('title','Updated')),actions);
 button('Stage body',()=>tx('Body staged','SET ^SSTLearn("demo","body")="New body"',()=>m.stage('body','New body')),actions);
 button('Commit',()=>tx('Committed','TCOMMIT',()=>m.commit()),actions);button('Rollback',()=>tx('Rolled back','TROLLBACK',()=>m.rollback()),actions);render();
 el('p','The model illustrates atomic visibility, not YottaDB restart, isolation or error-recovery internals. No real database is accessed.',q,'academy-muted');
}
})();