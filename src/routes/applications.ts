import { Request, Response, Router } from 'express';
import fs, { fstat } from 'fs';

import { checkAuth, fromLastConnection, checkTimeLock, setTimeLock } from './admin';
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
router.post('/applications/wl/delete', function(req: Request, res: Response) {
  if (checkAuth(req)) {
    let body = req.body;
    deleteApplications(body.index);
    res.status(200).send("Success");
  } else {
    res.status(403).send({
      message: { error: false, content: 'Not Authorized' },
      status: res.status
    });
  }
})
router.post('/applications/wl/delete/bulk', function(req: Request, res: Response) {
  if (checkAuth(req)) {
    let body = req.body;
    deleteApplicationsBulk(body.elements);

    res.status(200).send("Success");
  } else {
    res.status(403).send({
      message: { error: false, content: 'Not Authorized' },
      status: res.status
    });
  }
})

function PatchUnsafeChars(application: { date: string; idea: string; old: number; name: string; action: string; know: string; hex: string; experience: string; story: string; dc: string; sentstamp: number; }) {
  let illegal_chars = ['<','>','{','}']

  illegal_chars.forEach(el=>{
    Object.keys(application).forEach(key=>{
      if(Object.getOwnPropertyDescriptors(application)[key]&&Object.getOwnPropertyDescriptors(application)[key].value&&Object.getOwnPropertyDescriptors(application)[key].value.includes&&Object.getOwnPropertyDescriptors(application)[key].value.includes(el)){
        let code = el.charCodeAt(0)
        let body: any = {}
        body = application;
        while (body[key].includes(el))
          body[key] = body[key].replace(el,`&#${code};`)
        application = body;
      }
    })
  })
  return application
}

router.post('/applications/wl', function(req: Request, res: Response) {
  let cTL = checkTimeLock(req)
  if(cTL){
    const errors: any[] = [];
    let cTLmsg = cTL.lco.msg;
    if(cTLmsg.length>0){
      cTLmsg = "-- "+cTLmsg;
    }
    errors.push({
      err: `Validation failed (Wait At Least ${cTL.s}s ${cTLmsg})`,
    });
    res.status(406).send({
      message: { error: true, errors },
      status: res.status
    });
    return;
  }
  setTimeLock(req,10*1000);
  let application  = {
    name: req.body.name as string,
    date: req.body.date as string,
    idea: req.body.idea as string,
    story: req.body.story as string,
    action: req.body.action as string,
    old: req.body.old as number,
    know: req.body.know as string,
    experience: req.body.experience as string,
    dc: req.body.dc as string,
    hex: req.body.hex as string,
    sentstamp: undefined as number
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
    application = PatchUnsafeChars(application);
    if (!checkResult.error) {
      res.status(200).send({
        message: { error: false, txt: `Application Accepted!` },
        status: res.status
      });
      setTimeLock(req,20*60*1000,"You have recently sent application");
      application.sentstamp = + new Date();
      addApplication(application);
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

  if (application.old > 150||application.old<1)
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
  saveApplications()
}

function getApplications() {
  applications.forEach((el:any,index)=>{
    if(!el.status) {
      let body: any = {}
      body = applications[index];
      body.status = 'toapprove'
      applications[index] = body;
    }
  })
  saveApplications();
  return applications;
}
router.post('/applications/wl/setStatus', function(req: Request, res: Response) {
  if(checkAuth(req)){
    let data = req.body;
    setStatus(data.index,data.status)
    res.status(200).send("Success");
  }else {
    res.status(403).send("Not Authorised");
  }

})
router.post('/applications/wl/setStatus/bulk', function(req: Request, res: Response) {
  if (checkAuth(req)) {
    let body = req.body;
    setStatusBulk(body.elements,body.status);

    res.status(200).send("Success");
  } else {
    res.status(403).send({
      message: { error: false, content: 'Not Authorized' },
      status: res.status
    });
  }
})
function setStatus(index: number, status: any){
  let body: any = {}
  body = applications[index];
  body.status = status
  applications[index] = body;
  saveApplications()
}
function setStatusBulk(elements:[], status: any){
  elements.forEach(index=>{
    let body: any = {}
    body = applications[index];
    body.status = status
    applications[index] = body;
  })

  saveApplications()
}

function saveApplications(){
  fs.writeFileSync('./applications.json', JSON.stringify(applications));
}
function deleteApplications(index:number){
  if (index > -1) {
    applications.splice(index, 1);
  }
  saveApplications();
}
function deleteApplicationsBulk(elements:[]){
  let els:any = [];
  elements.forEach(el=>{
    els.push(applications[el])
  })
  els.forEach((el:any)=>{
    let index = applications.indexOf(el)
    if (index > -1) {
      applications.splice(index, 1);
    }
  })

  saveApplications();
}


export default router;
