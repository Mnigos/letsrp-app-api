import { Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/admin',
  passport.authenticate('bearer', { session: false }),
  (req: Request, res: Response) => {
    res.status(200).send({
      message: 'Success',
      status: res.statusCode
    });
  }
);
