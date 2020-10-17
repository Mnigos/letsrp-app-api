import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import wlForm from '../../model/wlForm';

const router = Router();

router.post('/wl', (req: Request, res: Response) => {
  const verify = jwt.verify(req.body?.token, 'privateKey');

  if (verify) {
    wlForm.find({ formType: 'wl' }, (e, form) => {
      if (e) {
        console.log(e);
      } else {
        res.status(200).send({
          form
        });
      }
    });
  } else {
    return res.status(401).send({
      e: 'Token denied'
    });
  }
});

export default router;
