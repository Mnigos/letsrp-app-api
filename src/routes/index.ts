import { Request, Response, Router } from 'express';
import { fdatasync } from 'fs';
import fs from 'fs';
const router = Router();

router.get('/', function (req: Request, res: Response) {
  res.sendfile('./web/form.html')
});

router.get('/form.js', function (req: Request, res: Response) {
	res.sendfile('./web/form.js')
});


export default router;