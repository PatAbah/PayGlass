const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
async function build(){
 const root=__dirname,version=require('./package.json').version,out=path.join(root,'dist','PayGlass');
 let runtime=process.env.PAYGLASS_ELECTRON_DIST;
 if(!runtime)runtime=path.dirname(require('electron'));
 if(!fs.existsSync(path.join(runtime,'electron.exe')))throw Error('Electron runtime missing. Run npm install.');
 fs.mkdirSync(out,{recursive:true});fs.cpSync(runtime,out,{recursive:true});
 const staging=path.join(root,'.package-app');fs.mkdirSync(staging,{recursive:true});
 for(const item of ['package.json','main.cjs','preload.cjs','renderer.js','index.html','style.css','compact.css','lib','assets','test'])fs.cpSync(path.join(root,item),path.join(staging,item),{recursive:true});
 const asar=require(process.env.PAYGLASS_ASAR||'@electron/asar');
 await asar.createPackage(staging,path.join(out,'resources','app.asar'));
 fs.rmSync(path.join(out,'resources','default_app.asar'),{force:true});
 const executable=path.join(out,'PayGlass.exe');fs.renameSync(path.join(out,'electron.exe'),executable);
 const utility=process.env.PAYGLASS_RESEDIT||require.resolve('@electron/packager/resedit');
 const {resedit}=await import(pathToFileURL(utility).href);
 await resedit(executable,{productVersion:version,fileVersion:version,productName:'PayGlass',iconPath:path.join(root,'assets','icon.ico'),win32Metadata:{FileDescription:'PayGlass',ProductName:'PayGlass',InternalName:'PayGlass',OriginalFilename:'PayGlass.exe',CompanyName:'PayGlass'}});
 fs.copyFileSync(path.join(root,'README.md'),path.join(out,'README.md'));
 if(path.dirname(staging)!==root)throw Error('Invalid staging path');
 fs.rmSync(staging,{recursive:true,force:true});console.log('Built '+executable);
}
build().catch(error=>{console.error(error);process.exitCode=1});
