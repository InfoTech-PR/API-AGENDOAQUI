import { Router } from "express";
import { registerClient, getAllClients, getClientById, updateClient, getAllClientsByBusiness } from '../controllers/clientController';

const router = Router();

router.post("/registerClient", registerClient);
router.get("/getAllClients", getAllClients);
router.get("/getClientById/:id", getClientById);
router.get("/getAllClientsByBusiness/:id", getAllClientsByBusiness);
router.patch("/updateClient", updateClient);

export default router;
