/* Original concise reference entries; not a complete ANSI specification. */
(function(){
'use strict';
if(location.pathname.replace(/\/$/,'')!=='/learn/reference')return;
const host=document.getElementById('referenceCatalog'),search=document.getElementById('referenceSearch'),category=document.getElementById('referenceCategory'),status=document.getElementById('referenceCount');
const entries=[
['WRITE','Command','Display values and formatting controls.','WRITE "Hello",!',1,'','commands.html#write'],
['SET','Command','Assign a value to a variable or supported string function target.','SET count=4',3,'','commands.html#set'],
['READ','Command','Read input from the current device.','READ name',6,'','commands.html#read'],
['IF','Command','Skip the remaining commands on the line if the condition is false.','IF count>0 WRITE count,!',8,'flow','commands.html#if'],
['ELSE','Command','Execute the remainder of the line when $TEST is false.','ELSE  WRITE "No",!',8,'flow','commands.html#else'],
['FOR','Command','Repeat commands on a line.','FOR i=1:1:3 WRITE i,!',9,'flow','commands.html#for'],
['DO','Command','Call a named entry point.','DO greet',21,'routines','commands.html#do'],
['QUIT','Command','Return from an invocation or terminate an applicable loop. With a value, return from an extrinsic.','QUIT result',27,'routines','commands.html#quit'],
['NEW','Command','Save a local name and make it undefined at the current invocation level.','NEW count',24,'routines','commands.html#new'],
['KILL','Command','Remove a variable or subtree.','KILL contact("Alex")',14,'trees','commands.html#kill'],
['$DATA','Function','Report whether a node has a value and descendants.','WRITE $DATA(contact("Alex")),!',15,'trees','functions.html'],
['$GET','Function','Retrieve a defined value or fallback.','WRITE $GET(name,"Unknown"),!',16,'trees','functions.html'],
['$ORDER','Function','Return the next subscript at a level.','SET name=$ORDER(city(name))',17,'trees','functions.html'],
['$LENGTH','Function','Count characters or delimited pieces.','WRITE $LENGTH("A|B","|"),!',35,'strings','functions.html'],
['$EXTRACT','Function','Retrieve characters at one-based positions.','WRITE $EXTRACT("MUMPS",2,4),!',32,'strings','functions.html'],
['$FIND','Function','Return the position immediately after a substring match, or zero.','WRITE $FIND("ABC","B"),!',33,'strings','functions.html'],
['$PIECE','Function','Retrieve one or more delimiter-separated pieces.','WRITE $PIECE("A|B","|",2),!',34,'strings','functions.html'],
['$TRANSLATE','Function','Map or remove individual characters.','WRITE $TRANSLATE("a-b","-",""),!',37,'strings','functions.html'],
['$SELECT','Function','Return the value associated with the first true condition.','WRITE $SELECT(1:"Yes"),!',38,'patterns','functions.html'],
['$TEST','Special variable','Reflect the current truth state used by IF and ELSE.','IF 1 WRITE $TEST,!',8,'flow','langfeat.html'],
['?','Operator','Test whether the entire value matches a pattern.','WRITE "A12"?1U2N,!',39,'patterns','langfeat.html'],
['_','Operator','Concatenate values.','WRITE "Red"_" apple",!',4,'','langfeat.html'],
['$$','Syntax','Invoke an extrinsic function and use its return value.','SET result=$$double(4)',27,'routines','langfeat.html'],
['^','Syntax','Identify a global variable reference.','WRITE $GET(^SSTLearn("message")),!',18,'memory','langfeat.html'],
['LOCK','Command','Coordinate cooperating processes using named locks.','LOCK +^SSTLearn("demoLock"):1',47,'reliability','commands.html#lock'],
['TSTART','Command','Begin transaction processing; restart behavior depends on the form used.','TSTART ()',48,'reliability','commands.html'],
['TCOMMIT','Command','Commit transaction changes at the outermost transaction level.','TCOMMIT',48,'reliability','commands.html'],
['TROLLBACK','Command','Discard uncommitted database changes.','TROLLBACK',48,'reliability','commands.html'],
['yottadb -direct','YottaDB environment','Enter interactive Direct Mode from a configured shell.','yottadb -direct',10,'',''],
['yottadb -run','YottaDB environment','Execute a named routine from a configured shell.','yottadb -run ^HELLO',10,'','']
];
function el(tag,text,parent,cls){const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;parent.append(n);return n}
function render(){const q=search.value.trim().toLowerCase(),c=category.value;host.replaceChildren();const matches=entries.filter(e=>(c==='all'||e[1]===c)&&e.slice(0,4).join(' ').toLowerCase().includes(q));status.textContent=matches.length+' of '+entries.length+' entries';for(const [name,type,desc,code,lesson,lab,ref] of matches){const card=el('article','',host,'reference-card');el('span',type,card,'academy-kicker');el('h3',name,card);el('p',desc,card);el('pre',code,card);const links=el('div','',card,'lab-actions');const a=el('a','Lesson '+String(lesson).padStart(2,'0'),links);a.href='/learn/lesson/'+String(lesson).padStart(2,'0');if(lab){const b=el('a','Visual lab',links);b.href='/learn/lab/'+lab}if(ref){const b=el('a','Technical documentation',links);b.href='https://docs.yottadb.com/ProgrammersGuide/'+ref}}if(!matches.length)el('p','No matching entries. Try a shorter search or change category.',host)}
search.addEventListener('input',render);category.addEventListener('change',render);render();
})();
