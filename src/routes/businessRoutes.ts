import { Router } from "express";
import { registerBusiness, loginBusiness } from '../controllers/businessController';

const router = Router();

router.post("/registerBusiness", registerBusiness);
router.post("/loginBusiness", loginBusiness);

export default router;
