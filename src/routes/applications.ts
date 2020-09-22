import { Request, Response } from 'express';

const router = require('express').Router();

declare global {
  namespace Express {
    interface Request {
      body: {
        name: string;
        date: string;
        idea: string;
        story: string;
        action: string;
        old: number;
        know: string;
        experience: string;
        dc: string;
        hex: string;
      };
    }
  }
}

router.get('/applications', function (req: Request, res: Response) {
  res.status(200).send({
    message: 'Success',
    status: res.status
  });
});

router.post('/applications/wl', function (req: Request, res: Response) {
  const application = {
    name: req.body.name as string,
    date: req.body.date as string,
    idea: req.body.idea as string,
    story: req.body.story as string,
    action: req.body.action as string,
    old: req.body.old as number,
    know: req.body.know as string,
    experience: req.body.experience as string,
    dc: req.body.dc as string,
    hex: req.body.hex as string
  };

  const requireObjectKeysType = (
    obj: any,
    keys: string[],
    expectedType: string = 'string'
  ) => keys.every((key) => typeof obj[key] === expectedType);

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

  if (!validationString || !validationNumber) {
    res.status(406).send({
      message: 'Validation failed',
      status: res.status
    });
  } else {
    res.status(202).send({
      message: 'Accepted',
      status: res.status
    });
  }
});

export default router;
