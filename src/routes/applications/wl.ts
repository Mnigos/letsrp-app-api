import { Request, Response, Router } from 'express';
import WlForm from '../../model/wlForm';
import {
  requireObjectLength,
  requireObjectKeysType,
  checkingObjectRegexp
} from '../../validation';

const router = Router();

router.post('/wl', function (req: Request, res: Response) {
  const validationLength: boolean = requireObjectLength(
    req.body,
    ['name', 'idea', 'story', 'action', 'know', 'experience', 'hex'],
    [2, 20, 200, 50, 10, 10, 15]
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
  const validationNumber: boolean = requireObjectKeysType(
    req.body,
    ['old'],
    'number'
  );

  if (
    !validationString ||
    !validationNumber ||
    !validationLength ||
    !validationRegexp
  ) {
    res.status(406).send({
      message: 'Validation failed'
    });
  } else {
    new WlForm({
      name: req.body?.name,
      date: req.body?.date,
      idea: req.body?.idea,
      story: req.body?.story,
      action: req.body?.action,
      old: req.body?.old,
      know: req.body?.know,
      experience: req.body?.experience,
      dc: req.body?.dc,
      hex: req.body?.hex,
      formType: 'wl',
      status: 'awaiting'
    }).save(e => {
      if (e) {
        res.status(424).send({
          error: e
        });
      } else {
        res.status(201).send({
          message: 'Created'
        });
      }
    });
  }
});

export default router;
