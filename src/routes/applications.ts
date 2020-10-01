import { Request, Response, Router } from 'express';
import { requireObjectLength,  requireObjectKeysType, checkingObjectRegexp } from './../validation';

const router = Router();

router.get('/applications', (req: Request, res: Response) => {
  res.status(200).send({
    message: 'Success',
    status: res.statusCode
  });
});
router.post('/applications/wl', function (req: Request, res: Response) {
  const ValidationLength = requireObjectLength(
    req.body,
    [
      'name',
      'idea',
      'story',
      'action',
      'know',
      'experience',
      'hex'
    ],
    [
      2,
      20,
      200,
      50,
      10,
      10,
      15
    ]
    );

    const validationRegexp = checkingObjectRegexp(
      req.body,
      [
        'date',
        'dc'
      ],
      [
        /^([0-2][0-9]|[0-9]|3[0-1])-(([0][0-9])|[0-9]|1[0-2])-[0-9]{4}$/,
        /.{1,}#[0-9]{4}|[0-9]{18}$/,

      ]
    )

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

  if (!validationString || !validationNumber || !ValidationLength || !validationRegexp) {
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
