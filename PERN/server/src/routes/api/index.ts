import { Router } from "express";
import userRoutes from "./user.js";
//TODO: import your routes

const router = Router();
router.use("/user", userRoutes);

export default router;
