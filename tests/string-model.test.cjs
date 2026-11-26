'use strict';
const assert=require('node:assert/strict'),M=require('../public/space-security/academy/string-model.js');
const cases=[
 ['length','',{},0],['length','A B',{},3],['extract','MUMPS',{start:2,end:4},'UMP'],['extract','ABC',{start:2,end:121},'BC'],['extract','ABC',{start:4,end:5},''],['extract','ABC',{start:3,end:2},''],
 ['find','red apple',{needle:'apple',start:1},10],['find','abcabc',{needle:'abc',start:2},7],['find','abc',{needle:'z',start:1},0],
 ['piece','A||B|',{delimiter:'|',start:2,end:2},''],['piece','A||B|',{delimiter:'|',start:2,end:4},'|B|'],['piece','A::B::C',{delimiter:'::',start:2,end:3},'B::C'],['piece','A',{delimiter:'|',start:2,end:2},''],
 ['pieces','',{delimiter:'|'},1],['pieces','A||B|',{delimiter:'|'},4],['replacePiece','A||B',{delimiter:'|',start:2,replacement:'X'},'A|X|B'],['replaceChar','ABC',{start:2,replacement:'x'},'AxC'],
 ['translate','a-b-a',{from:'ab',to:'AB'},'A-B-A'],['translate','a-b',{from:'-',to:''},'ab'],['translate','aba',{from:'aa',to:'XY'},'XbX']
];
for(const [op,s,opt,want] of cases){const r=M.evaluate(op,s,opt);assert.equal(r.value,want);assert.ok(r.code.startsWith('WRITE ')||r.code.startsWith('SET '))}
assert.equal(M.evaluate('length','A"B').code,'WRITE $LENGTH("A""B"),!');
for(const [s,p,want] of [['123','3N',1],['1234','3N',0],['A12','1U2N',1],['a12','1U2N',0],['','1.A',0],['Ab','1.A',1],['12-34','2N1"-"2N',1],['12-345','2N1"-"2N',0]])assert.equal(M.match(s,p).value,want);
for(const [n,v] of [[0,'Low'],[5,'Low'],[6,'Middle'],[10,'Middle'],[11,'High'],[20,'High']])assert.equal(M.select(n).value,v);
assert.equal(M.format('Alex|Boston|123'),'Alex lives in Boston');assert.equal(M.format('Alex|Boston|12'),'Invalid code');assert.equal(M.format('Alex|Boston'),'Invalid fields');
assert.throws(()=>M.evaluate('pieces','A',{delimiter:''}));assert.throws(()=>M.evaluate('find','A',{needle:'',start:1}));assert.throws(()=>M.evaluate('extract','A',{start:0,end:1}));assert.throws(()=>M.evaluate('replacePiece','A',{delimiter:'|',start:2,replacement:'B'}));assert.throws(()=>M.evaluate('length','é'));assert.throws(()=>M.match('A','toString'));assert.throws(()=>M.select(21));
console.log('String model tests passed');
