const router = require('express').Router();

router.get('/', function (req: Request, res: Response) {
  res.status(200)
  .send({
    message: 'Success',
    status: res.status,
  });
});

module.exports = router;
