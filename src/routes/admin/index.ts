import { Router } from 'express';
import WlRoute from './wl';
import SupRoute from './sup';
import FirmRoute from './firm';
import OrgRoute from './org';
import EMSRoute from './ems';
import LSPDRoute from './lspd';
import LSCMRoute from './lscm';

const router = Router();

router.use('/', WlRoute);
router.use('/', SupRoute);
router.use('/', FirmRoute);
router.use('/', OrgRoute);
router.use('/', EMSRoute);
router.use('/', LSPDRoute);
router.use('/', LSCMRoute);

export default router;
