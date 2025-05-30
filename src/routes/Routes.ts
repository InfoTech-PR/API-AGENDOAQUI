import { Router } from "express";
import businessRoutes from "./businessRoutes";
import clientRoutes from "./clientRoutes";
import schedulingRoutes from "./schedulingRoutes";
import schedulingCancelRoutes from "./schedulingCancelRoutes";
import serviceRoutes from "./serviceRoutes";
import employeesRoutes from "./employeeRoutes";

const router = Router();

router.use("/business", businessRoutes);
router.use("/clients", clientRoutes);
router.use("/schedulings", schedulingRoutes);
router.use("/schedulingsCancel", schedulingCancelRoutes);
router.use("/services", serviceRoutes);
router.use("/employees", employeesRoutes);

export default router;  
