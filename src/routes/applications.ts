import { Request, Response } from 'express';

const router = require('express').Router();

router.get('/applications', function (req: Request, res: Response) {
  res.status(200).send({
    message: 'Success',
    status: res.status
  });
});

router.post('/applications', function (req: Request, res: Response) {
  const application = {
    name: req.body.name
  };

  res.send(application);
});

export default router;
