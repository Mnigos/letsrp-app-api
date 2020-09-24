import { Request, Response, Router } from 'express';

const router = Router();

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

	const validation = checkTypes(req.body);

	if (validation!="") {
		let element = validation;
		res.status(406).send({
			message: {error:true,errortxt:`Validation failed (${element})`,cssSelector:`#${element}_q`},
			status: res.status
		});
	} else {
		let checkResult= {
			error:false,
			errortxt:"",
			cssSelector:""
		}
		checkResult = CheckApplication(application);
		if(!checkResult.error){
			res.status(406).send({
				message: {error:false,txt:`Validation Accepted!`},
				status: res.status
			});
		}else{
			res.status(400).send({
				message: checkResult,
				status: res.status
			});
		}
	}
});

function CheckApplication(application: { name: any; date: any; idea: any; story: any; action?: string; old: any; know: any; experience: any; dc: any; hex: any; }){
	const minimum1 = 40;
	const minimum2 = 100;
	const minimum3 = 200;

	if(application.old>150)return {error:true,errortxt:"Validation failed - Wrong old",cssSelector:"#old_q"}

	if(application.know.length<minimum1)return {error:true,errortxt:`Validation failed - Too Short Know (${application.know.length}<${minimum1})`,cssSelector:"#know_q"}
	if(application.experience.length<minimum1)return {error:true,errortxt:`Validation failed - Too Short Experience (${application.experience.length}>${minimum1})`,cssSelector:"#experience_q"}
	if(application.story.length<minimum2)return {error:true,errortxt:`Validation failed - Too Short Story (${application.story.length}<${minimum2})`,cssSelector:"#story_q"}
	if(application.idea.length<minimum2)return {error:true,errortxt:`Validation failed - Too Short Idea (${application.idea.length}<${minimum2})`,cssSelector:"#idea_q"}
	if(application.action.length<minimum3)return {error:true,errortxt:`Validation failed - Too Short Action (${application.action.length}<${minimum3})`,cssSelector:"#action_q"}

	if(!application.date.match(/^([0-2][0-9]|[0-9]|3[0-1])-(([0][0-9])|[0-9]|1[0-2])-[0-9]{4}/)) return {error:true,errortxt:`Validation failed - Invalid date (dd-mm-rrrr)`,cssSelector:"#date_q"}
	if(!application.dc.match(/.{1,}#[0-9]{4}|[0-9]{18}/))return {error:true,errortxt:`Validation failed - Discord tag invalid. \nRemember to provide full tag with numbers after # OR your user ID (18 numbers)`,cssSelector:"#dc_q"}

	if(application.name.length<1)return {error:true,errortxt:`Validation failed - Name is empty`,cssSelector:"#name_q"}
	if(application.hex.length<1)return {error:true,errortxt:`Validation failed - Hex is empty`,cssSelector:"#name_q"}

	return {error:false,errortxt:null,cssSelector:null}
}

function checkTypes(body: string){
	function requireObjectKeysType (
		obj: any,
		keys: string[],
		expectedType: string = 'string'
	) {
		let err = "";
		keys.every((key) => {
			if(typeof obj[key] !== expectedType){
				err = key;
				return;
			}
		});
		return err;
	}
	
	const validationString = requireObjectKeysType(body,['name','date','idea','story','action','know','experience','dc','hex'],
		'string'
	);

	const validationNumber = requireObjectKeysType(body, ['old'], 'number');

	if(validationString!="")return validationString;
	if(validationNumber!="")return validationNumber;
	return "";
}
export default router;
