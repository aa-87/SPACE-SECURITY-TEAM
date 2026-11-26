// Development-only fixture server; not a MIOTPL/YottaDB integration test.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
http.createServer((req,res)=>{try{const url=new URL(req.url,'http://localhost');let body,type;
if(url.pathname==='/'||url.pathname==='/space-security'){body=fs.readFileSync(path.join(root,'templates/layouts/space_security_layout.html'),'utf8').replace('{{{content}}}',()=>fs.readFileSync(path.join(root,'templates/pages/space_security_home.html'),'utf8'));type='text/html'}
else if(/^\/learn(?:\/foundations|\/reference|\/lab(?:\/(?:trees|expressions|flow|memory|routines|construction|strings|patterns))?|\/lesson\/(?:0[1-9]|[123][0-9]|40))?$/.test(url.pathname)){body=fs.readFileSync(path.join(root,'templates/pages/space_security_academy.html'),'utf8');type='text/html'}
else {const file=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(!file.startsWith(path.join(root,'public')+path.sep))throw Error();body=fs.readFileSync(file);type=({'.js':'text/javascript','.css':'text/css','.html':'text/html'})[path.extname(file)]||'application/octet-stream'}
res.writeHead(200,{'Content-Type':type+'; charset=utf-8'});res.end(body)}catch(e){res.writeHead(404);res.end('Not found')}}).listen(4173,'127.0.0.1');
