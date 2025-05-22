import { Router } from "express";
import { getAllSchedulingsByBusinessId } from '../controllers/schedulingController';

const router = Router();

router.get("/getAllSchedulingsByBusinessId/:id", getAllSchedulingsByBusinessId);

export default router;
