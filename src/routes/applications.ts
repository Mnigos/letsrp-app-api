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

  const requireObjectLength = (
    obj: any,
    keys: string[],
    expectedlength: number[],
    ) => keys.every(key => obj[key].length >= expectedlength.forEach(item => {
      return item;
    }));

  const requireObjectKeysType = (
    obj: any,
    keys: string[],
    expectedType: string = 'string',
  ) => keys.every(key => typeof obj[key] === expectedType);

  const ValidationLength = requireObjectLength(
    req.body,
    [
      'name',
      'idea',
      'story',
      'action',
      'know',
      'experience',
    ],
    [
      2,
      20,
      200,
      50,
      10,
      10
    ]
    );

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

  if (!validationString || !validationNumber || !ValidationLength) {
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
