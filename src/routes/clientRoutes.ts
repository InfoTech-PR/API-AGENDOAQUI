import { Router } from "express";
import { registerClient, getAllClients, getClientById } from '../controllers/clientController';

const router = Router();

router.post("/registerClient", registerClient);
router.get("/getAllClients", getAllClients);
router.get("/getClientById/:id", getClientById);

export default router;
