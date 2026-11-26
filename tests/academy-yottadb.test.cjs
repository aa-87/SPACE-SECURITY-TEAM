'use strict';
// Run ONLY in an explicitly configured, disposable learning database.
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),{spawnSync}=require('node:child_process'),assert=require('node:assert/strict');
const lessons=require('../public/space-security/academy/curriculum.js');
const model=require('../public/space-security/academy/construction-model.js');
if(process.env.SST_LEARNING_DATABASE!=='YES'||!process.env.ydb_gbldir||!process.env.ydb_dist)throw Error('Configure a disposable YottaDB learning database and set SST_LEARNING_DATABASE=YES. Never use a production database.');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'sst-academy-'));
const exe=path.join(process.env.ydb_dist,'yottadb');
const env={...process.env,ydb_routines:dir,gtmroutines:dir};
const project=fs.readFileSync(path.join(__dirname,'../public/space-security/academy/projects/SSTJOURNAL.m.txt'),'utf8');
let passed=0;
function run(lines,expected,input=''){
 const name='SSTVERIFY';
 const source=[name,...lines,' QUIT'].join('\n')+'\n';
 // Remove compiled object before each different test source.
 for(const f of fs.readdirSync(dir))fs.unlinkSync(path.join(dir,f));
 fs.writeFileSync(path.join(dir,name+'.m'),source);
 fs.writeFileSync(path.join(dir,'SSTJOURNAL.m'),project+'\n');
 const r=spawnSync(exe,['-run','^'+name],{cwd:dir,env,input,encoding:'utf8',timeout:10000,maxBuffer:1024*1024});
 if(r.error||r.status!==0)throw Error('YottaDB execution failed: '+(r.error||r.stderr||r.stdout));
 assert.equal(r.stdout.replace(/\r\n/g,'\n').trimEnd(),expected.trimEnd(),source);passed++;
}
function routine(code){return code.slice(1)}
try{
 // Direct instruction examples become routine command lines. Lesson 06 terminal echo
 // is device-specific, so verify the supplied READ input with a separate test.
 for(const l of lessons){
  const id=Number(l.id);
  if([6,18,19,20].includes(id))continue;
  const lines=id===10||(id>=21&&id<=30)||id===40||(id>=46&&id<=49)?routine(l.code):l.code.map(s=>' '+s);
  run(lines,l.frames.at(-1).output);
 }
 run([' READ name',' WRITE name,!'],'Alex','Alex\n');
 // Use an isolated global namespace supplied by the curriculum. Verify persistence
 // across two fresh M processes; no KILL of a production/global tree.
 run(lessons[17].code.map(s=>' '+s),lessons[17].frames.at(-1).output);
 run([' WRITE $GET(message,"Missing local"),!',' WRITE $GET(^SSTLearn("message"),"Missing global"),!'],'Missing local\nSaved\n');
 // Contact project requires fresh database; its listing must contain exactly two names.
 run(routine(lessons[19].code),lessons[19].frames.at(-1).output);
 for(const mode of ['scope','shared','value','reference','function'])for(const n of [0,4,99]){
  const t=model.trace(mode,n);run(routine(t.code),t.frames.at(-1).out);
 }
 model.challenges.forEach((c,i)=>c.choices.forEach((_,j)=>{const t=model.construct(i,j);run(routine(t.code),t.output)}));
 // Compare constrained string model output with real M for fixed examples.
 const strings=require('../public/space-security/academy/string-model.js');
 for(const [op,text,opt] of [
 ['length','',{}],['extract','MUMPS',{start:2,end:4}],
 ['find','abcabc',{needle:'abc',start:2}],
 ['piece','A||B|',{delimiter:'|',start:2,end:4}],
 ['pieces','',{delimiter:'|'}],
 ['replacePiece','A||B',{delimiter:'|',start:2,replacement:'X'}],
 ['replaceChar','ABC',{start:2,replacement:'x'}],
 ['translate','a-b',{from:'-',to:''}]
 ]){const t=strings.evaluate(op,text,opt);run(t.code.split('\n').map(s=>' '+s),String(t.value))}
 for(const [text,pattern] of [['123','3N'],['A12','1U2N'],['a12','1U2N'],['12-34','2N1"-"2N']]){
 const t=strings.match(text,pattern);run([' '+t.code],String(t.value))}
 for(const n of [0,5,6,10,11,20]){const t=strings.select(n);run(t.code.split('\n').map(s=>' '+s),t.value)}
 // Fresh disposable database required; use a fictional record only.
 run([' WRITE $save^SSTJOURNAL("J901","A","B",0),!'],'Saved');
 run([' WRITE $save^SSTJOURNAL("J901","X","Y",0),!',' WRITE $read^SSTJOURNAL("J901"),!'],'Already exists\nA|B');
 run([' WRITE $save^SSTJOURNAL("J901","","B",1),!',' WRITE $read^SSTJOURNAL("J901"),!'],'Invalid title\nA|B');
 run([' WRITE $save^SSTJOURNAL("J901","C","D",1),!'],'Saved');
 run([' WRITE $read^SSTJOURNAL("J901"),!',' WRITE $remove^SSTJOURNAL("J901"),!',' WRITE $read^SSTJOURNAL("J901"),!'],'C|D\nDeleted\nMissing');
 console.log('Actual YottaDB checks passed: '+passed);
}finally{fs.rmSync(dir,{recursive:true,force:true})}
