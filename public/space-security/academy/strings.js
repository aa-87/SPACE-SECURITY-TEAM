(function(){
'use strict';
const kind=location.pathname.replace(/\/$/,'').split('/')[3];
if(!['strings','patterns'].includes(kind))return;
const M=window.SSTStringModel,host=document.getElementById('labContent');
function el(tag,text,parent=host,cls=''){const n=document.createElement(tag);if(text!==null)n.textContent=text;if(cls)n.className=cls;parent.append(n);return n}
function field(label,tag,id,p,value){const w=el('div',null,p,'lab-field'),l=el('label',label,w),c=el(tag,null,w);c.id=id;l.htmlFor=id;if(value!==undefined)c.value=value;return {w,c}}
function opts(c,items){items.forEach(([v,t])=>{const o=el('option',t,c);o.value=v})}
function panel(title){const p=el('section',null,host,'lab-panel');el('h2',title,p);return p}
function result(p,id){const r=el('p','',p,'lab-status');r.id=id;r.setAttribute('role','status');return r}
function code(p,id){const r=el('pre','',p);r.id=id;return r}
function cells(p,values,active=[]){p.replaceChildren();values.forEach((v,i)=>{const c=el('div',null,p,'string-cell'+(active[i]?' selected':''));el('small',String(i+1),c);el('strong',v===''?'∅':v===' '?'␠':v,c)})}
if(kind==='strings'){
const p=panel('Inspect and transform a string'),ctrl=el('div',null,p,'lab-controls');
const op=field('Operation','select','stringOperation',ctrl).c;
opts(op,[['length','$LENGTH — characters'],['extract','$EXTRACT — range'],['find','$FIND — search'],['piece','$PIECE — fields'],['pieces','$LENGTH — fields'],['replacePiece','SET $PIECE — replace field'],['replaceChar','SET $EXTRACT — replace character'],['translate','$TRANSLATE — mapping']]);
const text=field('Source text','input','stringSource',ctrl,'Alex|Boston||21');text.c.maxLength=120;
const a=field('Start position','input','stringStart',ctrl,'1'),b=field('End position','input','stringEnd',ctrl,'3');
[a,b].forEach(x=>{x.c.type='number';x.c.min=1;x.c.max=121;x.c.step=1});
const d=field('Delimiter','input','stringDelimiter',ctrl,'|'),needle=field('Search text','input','stringNeedle',ctrl,'Boston'),rep=field('Replacement','input','stringReplacement',ctrl,'Chicago'),from=field('Map from','input','stringFrom',ctrl,'ab'),to=field('Map to','input','stringTo',ctrl,'AB');
const legend=el('p','',p,'academy-muted'),visual=el('div',null,p,'string-cells');visual.id='stringCells';
const cmd=code(p,'stringCode'),out=result(p,'stringResult');
function render(){const k=op.value;const visible={start:['extract','find','piece','replacePiece','replaceChar'],end:['extract','piece'],delimiter:['piece','pieces','replacePiece'],needle:['find'],replacement:['replacePiece','replaceChar'],from:['translate'],to:['translate']};for(const [key,f] of Object.entries({start:a,end:b,delimiter:d,needle,replacement:rep,from,to}))f.w.hidden=!visible[key].includes(k);
try{const r=M.evaluate(k,text.c.value,{start:Number(a.c.value),end:Number(b.c.value),delimiter:d.c.value,needle:needle.c.value,replacement:rep.c.value,from:from.c.value,to:to.c.value});const isPieces=['piece','pieces','replacePiece'].includes(k);const values=isPieces?r.segments:Array.from(text.c.value);let marks=r.highlight;if(isPieces&&k!=='pieces')marks=values.map((_,i)=>i+1>=Number(a.c.value)&&i+1<=(k==='piece'?Number(b.c.value):Number(a.c.value)));cells(visual,values,marks);legend.textContent=isPieces?'Field positions · ∅ is an empty field.':'Character positions · ␠ represents a space.';cmd.textContent=r.code;out.textContent='Result: '+JSON.stringify(r.value)+(k==='find'?' (position after match; 0 means missing)':'')}catch(e){visual.replaceChildren();cmd.textContent='';out.textContent=e.message}}
ctrl.addEventListener('input',render);ctrl.addEventListener('change',render);render();
el('p','Printable ASCII only. Positions are one-based. Empty delimiters, empty search strings, and replacement beyond existing positions are intentionally excluded from this model.',p,'academy-muted');
}else{
const p=panel('Recognize an entire value'),ctrl=el('div',null,p,'lab-controls'),s=field('Test value','input','patternSource',ctrl,'A12').c,pat=field('Pattern','select','patternChoice',ctrl).c;
opts(pat,[['3N','3N — three digits'],['1U2N','1U2N — uppercase letter and two digits'],['1.A','1.A — one or more letters'],['2N1"-"2N','2N1"-"2N — two digits, hyphen, two digits']]);
pat.value='1U2N';s.maxLength=120;const vis=el('div',null,p,'string-cells'),cmd=code(p,'patternCode'),out=result(p,'patternResult');
function render(){try{const r=M.match(s.value,pat.value);cells(vis,Array.from(s.value),Array.from(s.value,()=>r.value===1));cmd.textContent=r.code;out.textContent='Result: '+r.value+(r.value?' — whole value matches':' — whole value does not match')}catch(e){vis.replaceChildren();cmd.textContent='';out.textContent=e.message}}
ctrl.addEventListener('input',render);ctrl.addEventListener('change',render);render();
const q=panel('Choose the first true condition'),score=field('Score','input','selectScore',q,'7').c;score.type='range';score.min=0;score.max=20;score.step=1;
const rows=el('div',null,q,'select-branches'),sc=code(q,'selectCode'),so=result(q,'selectResult');
function choose(){const n=Number(score.value),r=M.select(n);rows.replaceChildren();['score>10 : "High"','score>5 : "Middle"','1 : "Low"'].forEach((v,i)=>{const row=el('div',null,rows,'select-branch'+(i===r.chosen?' selected':''));el('strong',v,row);el('span',i>r.chosen?'Not evaluated':r.tests[i]?'True — selected':'False — continue',row)});sc.textContent=r.code;so.textContent='Score '+n+' → '+r.value}score.oninput=choose;choose();
const f=panel('Record formatter project'),rec=field('Delimited record','input','formatRecord',f,'Alex|Boston|123').c;rec.maxLength=120;const fv=el('div',null,f,'string-cells'),fo=result(f,'formatResult');
function format(){try{const r=M.format(rec.value);cells(fv,rec.value.split('|'));fo.textContent=r}catch(e){fv.replaceChildren();fo.textContent=e.message}}rec.oninput=format;format();const link=el('a','Open lesson 40 and see the complete routine →',f);link.href='/learn/lesson/40';
el('p','The pattern model supports only the four shown ASCII patterns. The formatter uses simple delimiters, not CSV quoting. No general pattern engine or interpreter is provided.',f,'academy-muted');
}
})();
