import { Request, Response, Router } from 'express';
import EmsForm from '../../model/emsForm';
import {
  requireObjectLength,
  requireObjectKeysType,
  checkingObjectRegexp
} from '../../validation';

const router = Router();

router.post('/ems', function (req: Request, res: Response) {
  const {
    name,
    date,
    act,
    bring,
    action,
    whyU,
    hoursPerDay,
    old,
    experience,
    dc,
    hex
  } = req.body;

  const validationLength: boolean = requireObjectLength(
    req.body,
    ['name', 'act', 'bring', 'action', 'whyU', 'experience', 'hex'],
    [2, 20, 20, 30, 20, 20, 10, 15]
  );

  const validationRegexp: boolean = checkingObjectRegexp(
    req.body,
    ['date', 'dc'],
    [
      /^([0-2][0-9]|[0-9]|3[0-1])-(([0][0-9])|[0-9]|1[0-2])-[0-9]{4}$/,
      /.{1,}#[0-9]{4}|[0-9]{18}$/
    ]
  );

  const validationString: boolean = requireObjectKeysType(
    req.body,
    ['name', 'act', 'bring', 'action', 'whyU', 'experience', 'hex'],
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
    return res.status(406).send({
      error: 'Validation failed',
      status: res.statusCode
    });
  }
  new EmsForm({
    name,
    date,
    act,
    bring,
    action,
    whyU,
    hoursPerDay,
    old,
    experience,
    dc,
    hex,
    formType: 'ems',
    status: 'awaiting'
  })
    .save()
    .then(() => {
      res.status(201).send({
        message: 'Created'
      });
    })
    .catch(() => {
      res.status(500).send({
        error: 'Cannot save to database'
      });
    });
});

export default router;
