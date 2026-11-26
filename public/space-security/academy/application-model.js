/* Isolated fictional journal and two-process reliability models. */
(function(root){'use strict';
const quote=s=>'"'+s.replace(/"/g,'""')+'"';
const validId=id=>typeof id==='string'&&/^J[0-9]{3}$/.test(id);
function valid(id,title,body){if(!validId(id))return 'Invalid ID';if(typeof title!=='string'||title.length<1||title.length>40)return 'Invalid title';if(typeof body!=='string'||body.length<1||body.length>120)return 'Invalid body';if(/[^\x20-\x7e]/.test(title+body))return 'Use printable ASCII';if(title.includes('|')||body.includes('|'))return 'Delimiter not allowed';return 'OK'}
class Journal{
 constructor(){this.records=new Map()}
 run(op,id,title='',body=''){
 if(!validId(id))return 'Invalid ID';
 const exists=this.records.has(id);
 if(op==='read')return exists?this.records.get(id).title+'|'+this.records.get(id).body:'Missing';
 if(op==='delete'){if(!exists)return 'Missing';this.records.delete(id);return 'Deleted'}
 if(op!=='create'&&op!=='update')throw Error('Unknown operation');
 const status=valid(id,title,body);if(status!=='OK')return status;
 if(op==='create'&&exists)return 'Already exists';
 if(op==='update'&&!exists)return 'Missing';
 this.records.set(id,{title,body});return 'Saved';
 }
 list(){return [...this.records].sort(([a],[b])=>a<b?-1:a>b?1:0).map(([id,v])=>({id,...v}))}
}
class Reliability{
 constructor(){this.owner=null;this.committed={title:'Original',body:'Original body'};this.pending=null}
 acquire(p){if(!['A','B'].includes(p))throw Error('Unknown process');if(this.owner!==null)return false;this.owner=p;return true}
 release(p){if(this.owner!==p)return false;this.owner=null;return true}
 begin(){if(this.pending)return false;this.pending={...this.committed};return true}
 stage(field,value){if(!this.pending||!['title','body'].includes(field))return false;this.pending[field]=value;return true}
 commit(){if(!this.pending)return false;this.committed={...this.pending};this.pending=null;return true}
 rollback(){if(!this.pending)return false;this.pending=null;return true}
}
const api={Journal,Reliability,valid,quote};if(typeof module==='object'&&module.exports)module.exports=api;else root.SSTApplicationModel=api;
})(typeof window!=='undefined'?window:globalThis);
