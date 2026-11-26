/* Constrained educational models, not an interpreter. */
(function(root){'use strict';
const quote=s=>'"'+String(s).replace(/"/g,'""')+'"';
const address=p=>'contact'+(p.length?'('+p.map(quote).join(',')+')':'');
const prefix=(p,q)=>p.length<=q.length&&p.every((x,i)=>x===q[i]);
class Tree{
 constructor(){this.nodes=new Map()}
 set(p,v){this.nodes.set(JSON.stringify(p),String(v))}
 kill(p){for(const k of this.nodes.keys())if(prefix(p,JSON.parse(k)))this.nodes.delete(k)}
 data(p){return (this.nodes.has(JSON.stringify(p))?1:0)+([...this.nodes.keys()].some(k=>{const q=JSON.parse(k);return q.length>p.length&&prefix(p,q)})?10:0)}
 get(p,fallback=''){return this.nodes.has(JSON.stringify(p))?this.nodes.get(JSON.stringify(p)):fallback}
 keys(p){return [...new Set([...this.nodes.keys()].map(JSON.parse).filter(q=>q.length>p.length&&prefix(p,q)).map(q=>q[p.length]))].sort()}
 order(p,after){return this.keys(p).find(k=>k>after)||''}
}
function expression(a,b,c,group){if(![a,b,c].every(x=>Number.isInteger(x)&&x>=0&&x<=99))throw Error('Choose whole numbers from 0 to 99.');const first=group?b*c:a+b;return {code:'WRITE '+a+'+'+(group?'('+b+'*'+c+')':b+'*'+c)+',!',steps:group?[b+' × '+c+' = '+first,a+' + '+first+' = '+(a+first)]:[a+' + '+b+' = '+first,first+' × '+c+' = '+(first*c)],result:group?a+first:first*c}}
function decision(score){return {test:score>10?1:0,output:score>10?'Above ten':'Ten or below'}}
class Memory{constructor(){this.local=undefined;this.global=undefined}restart(){this.local=undefined}reset(){this.local=this.global=undefined}}
const api={Tree,quote,address,expression,decision,Memory};if(typeof module==='object'&&module.exports)module.exports=api;else root.SSTLabModel=api;
})(typeof window!=='undefined'?window:globalThis);
