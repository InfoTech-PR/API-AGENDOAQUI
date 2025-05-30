import { Router } from "express";
import { createMulter  } from '../config/multer';
import { getAllEmployeesByBusiness, registerEmployees } from '../controllers/employeesController';

const router = Router();

const uploadService = createMulter('employees');

router.get("/getAllEmployeesByBusiness/:id", getAllEmployeesByBusiness);
router.post("/registerEmployees/", uploadService.single('image'), registerEmployees);

export default router;
