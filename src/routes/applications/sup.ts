import { Request, Response, Router } from 'express';
import {
  requireObjectLength,
  requireObjectKeysType,
  checkingObjectRegexp
} from '../../validation';

const router = Router();

router.post('/sup', function (req: Request, res: Response) {
  const validationLength = requireObjectLength(
    req.body,
    ['name', 'about', 'whyU', 'experienceSup', 'hex'],
    [2, 20, 20, 20, 15]
  );

  const validationRegexp: boolean = checkingObjectRegexp(
    req.body,
    ['dc'],
    [/.{1,}#[0-9]{4}|[0-9]{18}$/]
  );

  const validationString: boolean = requireObjectKeysType(
    req.body,
    ['name', 'about', 'whyU', 'experienceSup', 'dc', 'hex'],
    'string'
  );
  const validationNumber: boolean = requireObjectKeysType(
    req.body,
    ['old', 'hoursPerDay'],
    'number'
  );

  if (
    !validationString ||
    !validationNumber ||
    !validationLength ||
    !validationRegexp
  ) {
    res.status(406).send({
      error: 'Validation failed',
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
