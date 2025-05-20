import { Router } from "express";
import businessRoutes from "./businessRoutes";
import clientRoutes from "./clientRoutes";

const router = Router();

router.use("/business", businessRoutes);
router.use("/clients", clientRoutes);

export default router;  
