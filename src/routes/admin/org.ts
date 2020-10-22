import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import OrgForm from '../../model/orgForm';

const router = Router();

router.post('/org', (req: Request, res: Response) => {
  try {
    jwt.verify(req.body?.token, 'privateKey');
  } catch (e) {
    return res.status(401).send({
      error: 'Invalid token'
    });
  }
  OrgForm.find({ formType: 'org' }, (e, form) => {
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

router.post('/org/check', (req: Request, res: Response) => {
  try {
    jwt.verify(req.body?.token, 'privateKey');
  } catch (e) {
    return res.status(401).send({
      error: 'Invalid token'
    });
  }

  OrgForm.findByIdAndUpdate({ _id: req.body?.id }, { status: req.body?.status })
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
});

export default router;
