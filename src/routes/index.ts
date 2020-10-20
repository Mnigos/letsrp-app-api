import { Router } from 'express';
import adminRoutes from './admin';
import applicationsRoutes from './applications';

const router = Router();

router.use('/admin', adminRoutes);
router.use('/applications', applicationsRoutes);

export default router;
