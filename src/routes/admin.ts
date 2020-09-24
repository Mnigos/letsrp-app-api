import { Request, Response, Router } from 'express';
import { fdatasync, copyFile } from 'fs';
import fs from 'fs';
import router from './index';
import exp from 'constants';

export let config: any = {};
try {
  config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
} catch {
}
if (!config.password) config.password = 'password';

export function checkAuth(req: Request) {
  if (req.headers.authorization == exports.config.password) {
    return true;
  }
  let status = false;
  if (req.url.split('?').length > 1) {
    let args = req.url.split('?')[1].split('=');
    if(!args)return
    args.forEach((el, i) => {
      if (el == 'auth') {
        if (args[i + 1] && args[i + 1] == exports.config.password) {
          status = true;
        }
      }
    });
  }


  return status;
}

router.get('/admin', function(req: Request, res: Response) {
  if (checkAuth(req)) {
    res.sendfile('./web/admin.html');
  } else {
    res.sendfile('./web/admin-login.html');
  }

});
router.get('/admin.js', function(req: Request, res: Response) {
  res.sendfile('./web/admin.js');
});
