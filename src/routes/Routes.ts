import { Router } from "express";
import businessRoutes from "./businessRoutes";
import clientRoutes from "./clientRoutes";
import schedulingRoutes from "./schedulingRoutes";

const router = Router();

router.use("/business", businessRoutes);
router.use("/clients", clientRoutes);
router.use("/schedulings", schedulingRoutes);

export default router;  
