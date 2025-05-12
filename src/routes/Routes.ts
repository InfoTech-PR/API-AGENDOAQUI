import { Router } from "express";
import businessRoutes from "./businessRoutes";

const router = Router();

router.use("/business", businessRoutes);

export default router;  
