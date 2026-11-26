/* Bounded visual construction models. No source evaluation or interpreter. */
(function(root){'use strict';
function small(n){if(!Number.isInteger(n)||n<0||n>99)throw Error('Choose a whole number from 0 to 99.');return n}
function trace(mode,n){
 small(n);let code,frames;
 const f=(line,stack,caller,formal,out,why)=>({line,stack,caller,formal,out,why});
 if(mode==='scope'||mode==='shared'){
 const protect=mode==='scope';
 code=['SSTDEMO',' SET count='+n,' DO change',' WRITE count,!',' QUIT','change',...(protect?[' NEW count']:[]),' SET count=count+1',' QUIT'];
 // Protected local starts undefined; explicitly initialize before increment.
 if(protect)code[7]=' SET count='+ (n+1);
 frames=[f(1,['main'],n,null,'','Initialize caller count.'),f(2,['main','change'],n,n,'','DO enters change; the caller value is visible.')];
 if(protect)frames.push(f(6,['main','change'],n,null,'','NEW saves the caller value and makes count undefined.'));
 frames.push(f(protect?7:6,['main','change'],protect?n:n+1,n+1,'','Assignment changes the active count.'),f(protect?8:7,['main'],protect?n:n+1,null,'','QUIT returns; NEW restores the saved value if used.'),f(3,['main'],protect?n:n+1,null,String(protect?n:n+1),'WRITE displays the caller count.'));
 }else if(mode==='value'||mode==='reference'){
 const ref=mode==='reference';
 code=['SSTDEMO',' SET count='+n,' DO increment('+(ref?'.':'')+'count)',' WRITE count,!',' QUIT','increment(value)',' SET value=value+1',' QUIT'];
 frames=[f(1,['main'],n,null,'','Initialize count.'),f(2,['main','increment'],n,n,'',ref?'The formal value aliases count.':'The formal value receives a copy.'),f(6,['main','increment'],ref?n+1:n,n+1,'','Increment the formal parameter.'),f(7,['main'],ref?n+1:n,null,'','Return and remove the parameter binding.'),f(3,['main'],ref?n+1:n,null,String(ref?n+1:n),'Display count.')];
 }else if(mode==='function'){
 code=['SSTDEMO',' SET count='+n,' SET result=$$double(count)',' WRITE result,!',' QUIT','double(value)',' QUIT value*2'];
 frames=[f(1,['main'],n,null,'','Initialize count.'),f(2,['main','double'],n,n,'','The assignment waits for the return value.'),f(6,['main'],n,null,'','Return '+n*2+' and assign it to result.'),f(3,['main'],n,null,String(n*2),'Display result.')];
 frames[2].result=n*2;frames[3].result=n*2;
 }else throw Error('Unknown example');
 return {code,frames};
}
const challenges=[
 {title:'Increment a counter',goal:'Display 5 after starting with count=4.',prefix:[' SET count=4'],choices:[' SET count=1',' SET count=count+1',' SET count=count-1'],suffix:[' WRITE count,!'],outputs:['1','5','3'],answer:1,explain:'The right side reads the old count, adds one, and assigns the result.'},
 {title:'Group an expression',goal:'Display 14 using 2, 3 and 4.',prefix:[],choices:[' WRITE 2+3*4,!',' WRITE (2+3)*4,!',' WRITE 2+(3*4),!'],suffix:[],outputs:['20','20','14'],answer:2,explain:'Parentheses cause the multiplication to be evaluated before addition.'},
 {title:'Protect a local value',goal:'Display 4 after change assigns 9.',prefix:[' SET count=4',' DO change',' WRITE count,!',' QUIT','change'],choices:[' NEW count',' SET count=4',' ; No protection'],suffix:[' SET count=9',' QUIT'],outputs:['4','9','9'],answer:0,explain:'NEW saves count and restores it when change returns.'},
 {title:'Choose a parameter mode',goal:'Display 5 by allowing increment to update count.',prefix:[' SET count=4'],choices:[' DO increment(count)',' DO increment(.count)'],suffix:[' WRITE count,!',' QUIT','increment(value)',' SET value=value+1',' QUIT'],outputs:['4','5'],answer:1,explain:'A leading period passes the variable by reference.'},
 {title:'Return a value',goal:'Display 8 from the function double.',prefix:[' SET result=$$double(4)',' WRITE result,!',' QUIT','double(value)'],choices:[' QUIT value+2',' QUIT value*2',' QUIT value'],suffix:[],outputs:['6','8','4'],answer:1,explain:'QUIT with an argument returns that value from an extrinsic.'}
];
function construct(index,choice){const c=challenges[index];if(!c||!Number.isInteger(choice)||choice<0||choice>=c.choices.length)throw Error('Choose an instruction.');return {code:['SSTBUILD',...c.prefix,c.choices[choice],...c.suffix,...(c.suffix.at(-1)===' QUIT'||c.choices[choice].startsWith(' QUIT')?[]:[' QUIT'])],output:c.outputs[choice],correct:choice===c.answer,explain:c.explain}}
const api={trace,challenges,construct};if(typeof module==='object'&&module.exports)module.exports=api;else root.SSTConstruction=api;
})(typeof window!=='undefined'?window:globalThis);
