import { Router } from 'express';
//TODO: import your routes
import homePageRoutes from './homePageRoutes.js';

const router = Router();

//router.use('/api', apiRoutes); <- here you should put your routes
router.use('/', homePageRoutes);

export default router;