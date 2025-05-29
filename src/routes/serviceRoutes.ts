import { Router } from "express";
import { getAllServicesByBusiness, registerService } from '../controllers/servicesController';

const router = Router();

router.get("/getAllServicesByBusiness/:id", getAllServicesByBusiness);
router.post("/registerService/", registerService);

export default router;
