import { Request, Response, Router } from 'express';
import { requireObjectLength,  requireObjectKeysType, checkingObjectRegexp } from '../../validation';

const router = Router();

router.post('/sup', function (req: Request, res: Response) {
  const ValidationLength = requireObjectLength(
    req.body,
    [
      'name',
      'about',
      'whyU',
      'experienceSup',
      'hex'
    ],
    [
      2,
      20,
      20,
      20,
      15
    ]
    );

    const validationRegexp = checkingObjectRegexp(
      req.body,
      [
        'dc'
      ],
      [
        /.{1,}#[0-9]{4}|[0-9]{18}$/,
      ]
    )

  const validationString = requireObjectKeysType(
    req.body,
    [
      'name',
      'about',
      'whyU',
      'experienceSup',
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
