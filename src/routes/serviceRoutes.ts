import { Router } from "express";
import { createMulter  } from '../config/multer';
import { getAllServicesByBusiness, registerService } from '../controllers/servicesController';

const router = Router();

const uploadService = createMulter('services');

router.get("/getAllServicesByBusiness/:id", getAllServicesByBusiness);
router.post("/registerService/", uploadService.single('image'), registerService);

export default router;
