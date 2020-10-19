import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import User from './model/user';
import { requireObjectKeysType } from './validation';

const router = Router();

router.post('/auth/admin', async (req: Request, res: Response) => {
  if (!requireObjectKeysType(req.body, ['name', 'pass'], 'string'))
    return res
      .status(400)
      .send({ error: 'both name and pass are required in body' });

  const { name, pass } = req.body;
  console.error(name);

  const foundedUser = await User.findOne({ name });

  if (foundedUser === null) {
    return res.status(400).send({
      e: 'userNotFound'
    });
  }

  if (foundedUser.pass !== pass) {
    return res.status(401).send({
      e: 'passwordIncorrect'
    });
  }

  const token = jwt.sign({ user: foundedUser.name }, 'privateKey');

  res.send({ token });
});

export default router;
