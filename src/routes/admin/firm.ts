import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import FirmForm from '../../model/firmForm';

const router = Router();

router.post('/firm', (req: Request, res: Response) => {
  const { token } = req.body;
  let decoded: any;

  try {
    decoded = jwt.verify(token, 'privateKey');
  } catch (e) {
    return res.status(401).send({
      error: 'Invalid token'
    });
  }

  if (decoded.perms === 'admin' || decoded.perms === 'firm') {
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
  } else {
    return res.status(401).send({
      error: 'Unauthorized'
    });
  }
});

router.post('/firm/check', (req: Request, res: Response) => {
  const { token, id, status } = req.body;
  let decoded: any;

  try {
    decoded = jwt.verify(token, 'privateKey');
  } catch (e) {
    return res.status(401).send({
      error: 'Invalid token'
    });
  }

  if (decoded.perms === 'admin' || decoded.perms === 'firm') {
    FirmForm.findByIdAndUpdate(
      { _id: id },
      {
        status,
        reason: req.body?.reason
      }
    )
      .then(() => {
        res.status(201).send({
          message: 'Created'
        });
      })
      .catch(() => {
        res.status(500).send({
          error: 'Cannot save to database'
        });
      });
  } else {
    return res.status(401).send({
      error: 'Unauthorized'
    });
  }
});

export default router;
