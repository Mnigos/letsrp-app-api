import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../model/user';

const router = Router();

router.post('/managment', (req: Request, res: Response) => {
  const { token, name, pass, perms } = req.body;

  try {
    jwt.verify(token, 'privateKey');
  } catch {
    return res.status(401).send({
      error: 'Invalid token'
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pass, salt);

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
