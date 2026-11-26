'use strict';
const assert=require('node:assert/strict');
const M=require('../public/space-security/academy/construction-model.js');
for(const n of [0,4,99]){
 for(const [mode,expected] of [['scope',n],['shared',n+1],['value',n],['reference',n+1],['function',n*2]]){
  const r=M.trace(mode,n);assert.equal(r.frames.at(-1).out,String(expected));
  assert.ok(r.frames.some(f=>f.stack.length===2));
  assert.ok(r.frames.every(f=>f.line>=0&&f.line<r.code.length));
 }
 const r=M.trace('scope',n);assert.equal(r.frames[2].formal,null);assert.equal(r.frames[3].formal,n+1);assert.equal(r.frames.at(-1).caller,n);
}
assert.throws(()=>M.trace('scope',-1));assert.throws(()=>M.trace('scope',1.5));assert.throws(()=>M.trace('other',4));
assert.equal(M.challenges.length,5);
M.challenges.forEach((c,i)=>c.choices.forEach((_,j)=>{const r=M.construct(i,j);assert.equal(r.correct,j===c.answer);assert.equal(r.output,c.outputs[j]);assert.equal(r.code[0],'SSTBUILD');assert.equal(r.code.at(-1).trim().startsWith('QUIT'),true)}));
assert.throws(()=>M.construct(0,-1));assert.throws(()=>M.construct(99,0));
console.log('Construction models passed');
