import { Request, Response, Router } from 'express';

const router = Router();

router.get('/applications', (req: Request, res: Response) => {
  res.status(200).send({
    message: 'Success',
    status: res.statusCode
  });
});

<<<<<<< HEAD
router.post('/applications/wl', function (req: Request, res: Response) {

  const requireObjectLength = (
    obj: any,
    keys: string[],
    expectedlength: number[],
    ) => keys.every(key => obj[key].length >= expectedlength.forEach(item => {
      return item;
    }));

=======
router.post('/applications/wl', (req: Request, res: Response) => {
  /* eslint-disable valid-typeof */
>>>>>>> 3d0b1fdecf163ddd0bdf03a4403d88216bcc23af
  const requireObjectKeysType = (
    obj: any,
    keys: string[],
    expectedType: string = 'string'
  ) => keys.every(key => typeof obj[key] === expectedType);
  /* eslint-enable */

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
      status: res.statusCode
    });
  } else {
    res.status(202).send({
      message: 'Accepted',
      status: res.statusCode
    });
  }
});

export default router;
