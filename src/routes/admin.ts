import { Request, Response, Router } from 'express';
import { fdatasync, copyFile } from 'fs';
import fs from 'fs';
import router from './index';
import exp from 'constants';
import path from 'path';

export let config: any = {};
try {
  config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
} catch {
}
if (!config.password) config.password = 'password';

export function checkAuth(req: Request) {
  function getCookie(name:string) {
    try {
      const value = `; ${req.header('cookie')}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    } catch {
    }
  }
  if(getCookie('auth')===exports.config.password){
    return true;
  }
  if (req.headers.authorization == exports.config.password) {
    return true;
  }
  return false;
}
let lastconnections:any = {}
let lockconnections:any = {}
export function fromLastConnection(ip:string){
  let now = + new Date();
  if(lastconnections[ip]){
    let lasttime = lastconnections[ip]
    lastconnections[ip] = now;
    return lasttime-now;
  }
  lastconnections[ip] = now;
  return -1;
}
export function checkTimeLock(req:Request){
  let now = + new Date();
  if(checkAuth(req))return false;
  if(lockconnections[req.ip]&&lockconnections[req.ip].time){
    if(now-lockconnections[req.ip].time<lockconnections[req.ip].lock){
      let ms = lockconnections[req.ip].lock-(now-lockconnections[req.ip].time)
      return {ms:ms,s:Math.round(ms/1000),lco:lockconnections[req.ip]};
    }
  }
  return false;
}
export function setTimeLock(req:Request,lock:number,msg:string = ""){
  let now = + new Date();
  lockconnections[req.ip] = {time:now,lock:lock,msg:msg};
  return true;
}


router.get('/admin', function(req: Request, res: Response) {
  if (checkAuth(req)) {
    res.sendFile(path.join(__dirname, './../../web/admin.html'));
  } else {
    res.sendFile(path.join(__dirname, './../../web/admin-login.html'));
  }

});
router.get('/admin.js', function(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, './../../web/admin.js'));
});
