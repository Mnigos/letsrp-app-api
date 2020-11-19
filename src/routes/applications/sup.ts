import { Request, Response, Router } from 'express';
import SupForm from '../../model/supForm';
import {
  requireObjectLength,
  requireObjectKeysType,
  checkingObjectRegexp
} from '../../validation';

const router = Router();

router.post('/sup', async function (req: Request, res: Response) {
  const {
    name,
    about,
    whyU,
    hoursPerDay,
    old,
    experienceSup,
    dc,
    hex,
    submissionDate
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

  const form = await SupForm.findOne({ dc });

  const subDate = new Date(submissionDate);

  if (form) {
    if (new Date(form.submissionDate.getTime() + days(7)) > subDate) {
      return res.status(406).send({
        error: 'Too frequent submission of applications',
        status: res.statusCode
      });
    }
  }

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
