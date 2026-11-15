const fs=require('node:fs');const path=require('node:path');
class Store{constructor(root){this.root=root;fs.mkdirSync(root,{recursive:true})}get(name,fallback){try{return JSON.parse(fs.readFileSync(path.join(this.root,name+'.json'),'utf8'))}catch{return fallback}}set(name,value){const file=path.join(this.root,name+'.json');fs.writeFileSync(file+'.tmp',JSON.stringify(value,null,2));fs.renameSync(file+'.tmp',file);return value}}
module.exports={Store};
