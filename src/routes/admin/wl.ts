import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import wlForm from '../../model/wlForm';

const router = Router();

router.post('/wl', (req: Request, res: Response) => {
  try {
    jwt.verify(req.body?.token, 'privateKey');
  } catch (e) {
    res.status(401).send({
      error: 'Invalid token'
    });
  }
  wlForm.find({ formType: 'wl' }, (e, form) => {
    if (e) {
      res.status(500).send({
        error: 'Cannot get this from database'
      });
    } else {
      res.status(200).send({
        form
      });
    }
  });
});

export default router;
