import { Request, Response, Router } from 'express';
import SupForm from '../../model/supForm';
import {
  requireObjectLength,
  requireObjectKeysType,
  checkingObjectRegexp
} from '../../validation';

const router = Router();

router.post('/sup', function (req: Request, res: Response) {
  const {
    name,
    about,
    whyU,
    hoursPerDay,
    old,
    experienceSup,
    dc,
    hex
  } = req.body;

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
    new SupForm({
      name,
      about,
      whyU,
      hoursPerDay,
      old,
      experienceSup,
      dc,
      hex,
      formType: 'sup',
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
  }
});

export default router;
