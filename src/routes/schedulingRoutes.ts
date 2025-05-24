import { Router } from "express";
import { getAllSchedulingsByBusinessId, registerScheduling, getSchedulingById } from '../controllers/schedulingController';

const router = Router();

router.get("/getAllSchedulingsByBusinessId/:id", getAllSchedulingsByBusinessId);
router.get("/getSchedulingById/:id", getSchedulingById);
router.post("/registerScheduling", registerScheduling);

export default router;
