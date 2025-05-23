import { Router } from "express";
import { getAllSchedulingsByBusinessId, registerScheduling } from '../controllers/schedulingController';

const router = Router();

router.get("/getAllSchedulingsByBusinessId/:id", getAllSchedulingsByBusinessId);
router.post("/registerScheduling", registerScheduling);

export default router;
