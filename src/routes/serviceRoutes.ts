import { Router } from "express";
import { getAllServicesByBusiness } from '../controllers/servicesController';

const router = Router();

router.get("/getAllServicesByBusiness/:id", getAllServicesByBusiness);

export default router;
