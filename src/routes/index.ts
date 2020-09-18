import { Request, Response, Router} from 'express';

const router = Router();

router.get('/', function (req: Request, res: Response) {
  res.status(200).send({
    message: 'Success',
    status: res.status
  });
});

export default router;
