import { Request, Response, Router } from 'express';
import fs, { fstat } from 'fs';

import { checkAuth } from './admin';
require('./admin')

const router = Router();

router.get('/applications', function(req: Request, res: Response) {
  res.status(200).send({
    message: 'Success',
    status: res.status
  });
});

router.get('/applications/wl/raw', function(req: Request, res: Response) {
  if (checkAuth(req)) {
    res.status(200).send({
      message: { error: false, content: getApplications() },
      status: res.status
    });
  } else {
    res.status(403).send({
      message: { error: false, content: 'Not Authorized' },
      status: res.status
    });
  }
});
router.post('/applications/wl', function(req: Request, res: Response) {
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

  const validation = checkTypes(req.body);

  if (validation.length > 0) {
    const errors: any[] = [];
    validation.forEach((el) => {
      errors.push({
        err: `Validation failed (${el})`,
        cssSelector: `#${el}_q`
      });
    });

    res.status(406).send({
      message: { error: true, errors },
      status: res.status
    });
  } else {
    let checkResult;
    checkResult = CheckApplication(application);
    if (!checkResult.error) {
      res.status(406).send({
        message: { error: false, txt: `Application Accepted!` },
        status: res.status
      });
      addApplication(req.body);
    } else {
      res.status(400).send({
        message: checkResult,
        status: res.status
      });
    }
  }
});

function CheckApplication(application: {
  name: any;
  date: any;
  idea: any;
  story: any;
  action?: string;
  old: any;
  know: any;
  experience: any;
  dc: any;
  hex: any;
}) {
  const err = [];

  const minimum1 = 40;
  const minimum2 = 100;
  const minimum3 = 200;

  if (application.old > 150)
    err.push({ err: 'Validation failed - Wrong old', cssSelector: '#old_q' });

  if (application.know.length < minimum1)
    err.push({
      err: `Validation failed - Too Short Know (${application.know.length}<${minimum1})`,
      cssSelector: '#know_q'
    });
  if (application.experience.length < minimum1)
    err.push({
      err: `Validation failed - Too Short Experience (${application.experience.length}<${minimum1})`,
      cssSelector: '#experience_q'
    });
  if (application.story.length < minimum2)
    err.push({
      err: `Validation failed - Too Short Story (${application.story.length}<${minimum2})`,
      cssSelector: '#story_q'
    });
  if (application.idea.length < minimum2)
    err.push({
      err: `Validation failed - Too Short Idea (${application.idea.length}<${minimum2})`,
      cssSelector: '#idea_q'
    });
  if (application.action.length < minimum3)
    err.push({
      err: `Validation failed - Too Short Action (${application.action.length}<${minimum3})`,
      cssSelector: '#action_q'
    });

  if (
    !application.date.match(
      /^([0-2][0-9]|[0-9]|3[0-1])-(([0][0-9])|[0-9]|1[0-2])-[0-9]{4}$/
    )
  )
    err.push({
      err: `Validation failed - Invalid date (dd-mm-rrrr)`,
      cssSelector: '#date_q'
    });
  if (!application.dc.match(/.{1,}#[0-9]{4}|[0-9]{18}$/))
    err.push({
      err: `Validation failed - Discord tag invalid. \nRemember to provide full tag with numbers after # OR your user ID (18 numbers)`,
      cssSelector: '#dc_q'
    });

  if (application.name.length < 1)
    err.push({
      err: `Validation failed - Name is empty`,
      cssSelector: '#name_q'
    });
  if (application.hex.length < 1)
    err.push({
      err: `Validation failed - Hex is empty`,
      cssSelector: '#hex_q'
    });

  if (err.length > 0) return { error: true, errors: err };
  return { error: false };
}

function checkTypes(body: string) {
  let errors: string[] = [];

  function requireObjectKeysType(
    obj: any,
    keys: string[],
    expectedType: string = 'string'
  ) {
    const err: string[] = [];
    keys.every((key) => {
      if (typeof obj[key] !== expectedType) {
        err.push(key);
      }
    });
    return err;
  }

  const validationString = requireObjectKeysType(
    body,
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

  const validationNumber = requireObjectKeysType(body, ['old'], 'number');

  errors = validationString;
  if (validationNumber.length > 0) errors.push(validationNumber[0]);
  return errors;
}

let applications: {}[] = [];
try {
  applications = JSON.parse(fs.readFileSync('./applications.json', 'utf-8'));
} catch {
}

function addApplication(body: any) {
  body.status = 'toapprove'
  applications.push(body);
  fs.writeFileSync('./applications.json', JSON.stringify(applications));
}

function getApplications() {
  return applications;
}
router.post('/applications/wl/setStatus', function(req: Request, res: Response) {
  if(checkAuth(req)){
    let data = req.body;
    setStatus(data.index,data.status)
    res.status(200).send("Succes");
  }else {
    res.status(403).send("Not Authorised");
  }

})
function setStatus(index: number, status: any){
  let body: any = {}
  body = applications[index];
  body.status = status
  applications[index] = body;
}

export default router;
