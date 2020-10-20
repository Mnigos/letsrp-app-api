import { Router } from 'express';
import WlRoute from './wl';
import SupRoute from './sup';
import FirmRoute from './firm';
import EMSRoute from './ems';
import LSCMRoute from './lscm';
import LSPDRoute from './lspd';
import OrgRoute from './org';

const router = Router();

router.use('/', FirmRoute);
router.use('/', SupRoute);
router.use('/', WlRoute);
router.use('/', EMSRoute);
router.use('/', LSCMRoute);
router.use('/', LSPDRoute);
router.use('/', OrgRoute);

export default router;
