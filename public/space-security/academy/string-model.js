/* Bounded ASCII learning models. No arbitrary source execution. */
(function(root){'use strict';
const quote=s=>'"'+s.replace(/"/g,'""')+'"';
function ascii(s,max=120){if(typeof s!=='string'||s.length>max||/[^\x20-\x7e]/.test(s))throw Error('Use up to '+max+' printable ASCII characters.');return s}
function pos(n){if(!Number.isInteger(n)||n<1||n>121)throw Error('Choose a whole position from 1 to 121.');return n}
function split(s,d){ascii(s);ascii(d,12);if(!d)throw Error('Enter a nonempty delimiter.');return s.split(d)}
function evaluate(op,s,opt={}){
 ascii(s);let value,code,segments=[],highlight=[];
 const start=()=>pos(opt.start),end=()=>pos(opt.end);
 if(op==='length'){value=s.length;code='$LENGTH('+quote(s)+')'}
 else if(op==='extract'){const a=start(),b=end();value=b<a?'':s.slice(a-1,b);code='$EXTRACT('+quote(s)+','+a+','+b+')';highlight=Array.from({length:s.length},(_,i)=>i+1>=a&&i+1<=b)}
 else if(op==='find'){const needle=ascii(opt.needle,40),a=start();if(!needle)throw Error('Enter nonempty search text.');const i=s.indexOf(needle,a-1);value=i<0?0:i+needle.length+1;code='$FIND('+quote(s)+','+quote(needle)+','+a+')';highlight=Array.from({length:s.length},(_,j)=>i>=0&&j>=i&&j<i+needle.length)}
 else if(['piece','pieces','replacePiece'].includes(op)){segments=split(s,opt.delimiter);const d=quote(opt.delimiter);if(op==='pieces'){value=segments.length;code='$LENGTH('+quote(s)+','+d+')'}else if(op==='piece'){const a=start(),b=end();value=b<a?'':segments.slice(a-1,b).join(opt.delimiter);code='$PIECE('+quote(s)+','+d+','+a+','+b+')'}else{const a=start(),v=ascii(opt.replacement);if(a>segments.length)throw Error('Choose an existing piece in this model.');const copy=segments.slice();copy[a-1]=v;value=copy.join(opt.delimiter);code='SET text='+quote(s)+'\nSET $PIECE(text,'+d+','+a+')='+quote(v)+'\nWRITE text,!' }}
 else if(op==='replaceChar'){const a=start(),v=ascii(opt.replacement,1);if(a>s.length||v.length!==1)throw Error('Choose an existing character and one replacement character.');value=s.slice(0,a-1)+v+s.slice(a);code='SET text='+quote(s)+'\nSET $EXTRACT(text,'+a+')='+quote(v)+'\nWRITE text,!';highlight=Array.from({length:s.length},(_,i)=>i===a-1)}
 else if(op==='translate'){const from=ascii(opt.from,40),to=ascii(opt.to,40);value=Array.from(s,c=>{const i=from.indexOf(c);return i<0?c:to[i]||''}).join('');code='$TRANSLATE('+quote(s)+','+quote(from)+','+quote(to)+')';highlight=Array.from(s,c=>from.includes(c))}
 else throw Error('Unknown operation.');
 return {value,code:code.startsWith('SET ')?code:'WRITE '+code+',!',segments,highlight};
}
const patterns={'3N':/^[0-9]{3}$/,'1U2N':/^[A-Z][0-9]{2}$/,'1.A':/^[A-Za-z]+$/,'2N1"-"2N':/^[0-9]{2}-[0-9]{2}$/};
function match(s,p){ascii(s);if(!Object.prototype.hasOwnProperty.call(patterns,p))throw Error('Choose a listed pattern.');return {value:patterns[p].test(s)?1:0,code:'WRITE '+quote(s)+'?'+p+',!'}}
function select(n){if(!Number.isInteger(n)||n<0||n>20)throw Error('Choose a whole score from 0 to 20.');return {value:n>10?'High':n>5?'Middle':'Low',tests:[n>10,n>5,true],chosen:n>10?0:n>5?1:2,code:'SET score='+n+'\nWRITE $SELECT(score>10:"High",score>5:"Middle",1:"Low"),!'}}
function format(s){const p=split(s,'|');return p.length!==3?'Invalid fields':match(p[2],'3N').value?p[0]+' lives in '+p[1]:'Invalid code'}
const api={evaluate,match,select,format};if(typeof module==='object'&&module.exports)module.exports=api;else root.SSTStringModel=api;
})(typeof window!=='undefined'?window:globalThis);
