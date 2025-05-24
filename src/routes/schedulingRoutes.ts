import { Router } from "express";
import { getAllSchedulingsByBusinessId, registerScheduling, getSchedulingById, updateScheduling } from '../controllers/schedulingController';

const router = Router();

router.get("/getAllSchedulingsByBusinessId/:id", getAllSchedulingsByBusinessId);
router.get("/getSchedulingById/:id", getSchedulingById);
router.post("/registerScheduling", registerScheduling);
router.patch("/updateScheduling", updateScheduling);

export default router;
