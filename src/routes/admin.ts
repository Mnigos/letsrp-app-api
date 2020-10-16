import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/admin', (req: Request, res: Response) => {
  const verify = jwt.verify(req.body?.token, 'privateKey');

  if (verify) {
    res.status(200).send({
      accepted: verify
    });
  } else {
    return res.status(401).send({
      e: 'Token denied'
    });
  }
});

export default router;
