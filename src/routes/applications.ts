import { Request, Response, Router } from 'express';

const router = Router();

router.get('/applications', function (req: Request, res: Response) {
  res.status(200).send({
    message: 'Success',
    status: res.status
  });
});

router.post('/applications/wl', function (req: Request, res: Response) {
  /* eslint-disable valid-typeof */
  const requireObjectKeysType = (
    obj: any,
    keys: string[],
    expectedType: string = 'string'
  ) => keys.every(key => typeof obj[key] === expectedType);
  /* eslint-enable */

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
