import { Request, Response, Router } from 'express';
import FirmForm from '../../model/firmForm';
import {
  requireObjectLength,
  requireObjectKeysType,
  checkingObjectRegexp
} from '../../validation';

const router = Router();

router.post('/firm', function (req: Request, res: Response) {
  const {
    name,
    idea,
    owner,
    expects,
    old,
    type,
    headquarters,
    members,
    dc,
    hex
  } = req.body;

  const validationLength = requireObjectLength(
    req.body,
    ['name', 'idea', 'owner', 'expects', 'type', 'headquarters', 'hex'],
    [2, 20, 2, 20, 10, 5, 15]
  );

  const validationRegexp: boolean = checkingObjectRegexp(
    req.body,
    ['dc'],
    [/.{1,}#[0-9]{4}|[0-9]{18}$/]
  );

  const validationString: boolean = requireObjectKeysType(
    req.body,
    ['name', 'idea', 'owner', 'expects', 'type', 'headquarters', 'hex'],
    'string'
  );
  const validationNumber: boolean = requireObjectKeysType(
    req.body,
    ['old', 'members'],
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
    new FirmForm({
      name,
      idea,
      owner,
      expects,
      old,
      type,
      headquarters,
      members,
      dc,
      hex,
      formType: 'firm',
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
