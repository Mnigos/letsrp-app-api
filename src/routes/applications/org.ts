import { Request, Response, Router } from 'express';
import OrgForm from '../../model/orgForm';
import {
  requireObjectLength,
  requireObjectKeysType,
  checkingObjectRegexp
} from '../../validation';

const router = Router();

router.post('/org', function (req: Request, res: Response) {
  const {
    name,
    idea,
    owner,
    story,
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
    [
      'name',
      'idea',
      'story',
      'owner',
      'expects',
      'type',
      'headquarters',
      'hex'
    ],
    [2, 20, 100, 2, 20, 10, 5, 15]
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
    return res.status(406).send({
      error: 'Validation failed',
      status: res.statusCode
    });
  }
  new OrgForm({
    name,
    idea,
    owner,
    story,
    expects,
    old,
    type,
    headquarters,
    members,
    dc,
    hex,
    formType: 'org',
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
