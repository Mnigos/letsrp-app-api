import { Request, Response, Router } from 'express';
import { fdatasync } from 'fs';
import fs from 'fs';
import path from "path";
const router = Router();

router.get('/', function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, './../../web/form.html'));
});

router.get('/form.js', function (req: Request, res: Response) {
  res.sendFile(path.join(__dirname, './../../web/form.js'));
});


export default router;