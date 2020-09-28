import { Request, Response, Router } from 'express';

const router = Router();

declare global {
  namespace Express {
    interface Request {
      body: {
        name: string;
        date: string;
        idea: string;
        story: string;
        action: string;
        old: number;
        know: string;
        experience: string;
        dc: string;
        hex: string;
      };
    }
  }
}

router.get('/applications', function (req: Request, res: Response) {
  res.status(200).send({
    message: 'Success',
    status: res.status
  });
});

router.post('/applications/wl', function (req: Request, res: Response) {
  const nameLength = 2;
  const ideaLength = 20;
  const storyLength = 200;
  const actionLength = 50;
  const knowLength = 10;
  const experienceLength = 10;

  const requireObjectLength = (
    obj: any,
    keys: string[],
    expectedlength: string[],
    ) => keys.every(key => obj[key].length >= expectedlength.forEach(item => {
      return item;
    }));

  const requireObjectKeysType = (
    obj: any,
    keys: string[],
    expectedType: string = 'string',
  ) => keys.every(key => typeof obj[key] === expectedType);

  const validationString = requireObjectKeysType(
    req.body,
    [
      'name',
      'date',
      'idea',
      'story',
      'action',
      'know',
      'experience',
      'dc',
      'hex'
    ],
    'string'
  );
  const validationNumber = requireObjectKeysType(req.body, ['old'], 'number');

  if (!validationString || !validationNumber) {
    res.status(406).send({
      message: 'Validation failed',
      status: res.status
    });
  } else {
    res.status(202).send({
      message: 'Accepted',
      status: res.status
    });
  }
});

export default router;
