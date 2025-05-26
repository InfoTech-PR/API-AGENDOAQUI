import { Router } from "express";
import { createSchedulingCancel } from '../controllers/schedulingCancelControlller';

const router = Router();

router.post("/createSchedulingCancel", createSchedulingCancel);

export default router;
