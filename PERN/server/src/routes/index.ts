import { Router } from 'express';
//TODO: import your routes
import homePageRoutes from './homePageRoutes.js';
import detailsPageRoute from './detailsPageRoute.js';

const router = Router();

//router.use('/api', apiRoutes); <- here you should put your routes
router.use('/', homePageRoutes);
router.use('/', detailsPageRoute);

export default router;