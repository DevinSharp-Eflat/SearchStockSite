import { Router } from "express";
import htmlRoutes from "./html/index.js";
import apiRoutes from "./api/index.js";
//TODO: import your routes
import homePageRoutes from './homePageRoutes.js';

const router = Router();
router.use("/", htmlRoutes);
//router.use('/api', apiRoutes); <- here you should put your routes
router.use("/api", apiRoutes);
router.use('/', homePageRoutes);

export default router;
