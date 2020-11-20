import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../model/user';

const router = Router();

router.post('/management', (req: Request, res: Response) => {
  const { token, name, pass, perms } = req.body;
  let decoded: any;

  try {
    decoded = jwt.verify(token, 'privateKey');
  } catch {
    return res.status(401).send({
      error: 'Invalid token'
    });
  }

  if (decoded.perms !== 'admin')
    return res.status(401).send({
      error: 'Unauthorized'
    });

  if (!name || !pass || !perms)
    return res.status(400).send({
      error: 'Bad request'
    });

  const hash = bcrypt.hashSync(pass, 10);

  new User({
    name,
    pass: hash,
    perms
  })
    .save()
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
