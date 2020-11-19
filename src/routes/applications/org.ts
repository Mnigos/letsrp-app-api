import { Request, Response, Router } from 'express';
import OrgForm from '../../model/orgForm';
import {
  requireObjectLength,
  requireObjectKeysType,
  checkingObjectRegexp
} from '../../validation';

const router = Router();

router.post('/org', async (req: Request, res: Response) => {
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
    hex,
    submissionDate
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

  const seconds = (s: number) => 1000 * s;
  const minutes = (m: number) => seconds(60) * m;
  const hours = (h: number) => minutes(60) * h;
  const days = (d: number) => hours(24) * d;

  if (!submissionDate) return res.status(406).send({ error: 'e' });

  const form = await OrgForm.findOne({ dc });

  const subDate = new Date(submissionDate);

  if (form) {
    if (new Date(form.submissionDate.getTime() + days(7)) > subDate) {
      return res.status(406).send({
        error: 'Too frequent submission of applications',
        status: res.statusCode
      });
    }
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
    submissionDate: subDate,
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
