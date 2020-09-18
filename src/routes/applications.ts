import { Request, Response } from 'express';

const router = require('express').Router();

router.get('/applications', function (req: Request, res: Response) {
  res.status(200).send({
    message: 'Success',
    status: res.status
  });
});

module.exports = router;
