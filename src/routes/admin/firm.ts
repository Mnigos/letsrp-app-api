import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import FirmForm from '../../model/firmForm';

const router = Router();

router.post('/firm', (req: Request, res: Response) => {
  try {
    jwt.verify(req.body?.token, 'privateKey');
  } catch (e) {
    return res.status(401).send({
      error: 'Invalid token'
    });
  }
  FirmForm.find({ formType: 'firm' }, (e, form) => {
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