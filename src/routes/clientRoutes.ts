import { Router } from "express";
import { registerClient, getAllClients } from '../controllers/clientController';

const router = Router();

router.post("/registerClient", registerClient);
router.get("/getAllClients", getAllClients);

export default router;
