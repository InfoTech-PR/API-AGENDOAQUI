import { Response, Request } from "express";
import { Service } from "../models/Service";

export const getAllServicesByBusiness = async (req: Request, res: Response) => { 
    const { id } = req.params;
    try {
        // futuramente serviços talvez pertençam a seus negócios
        const services = await Service.findAll();
        return res.status(200).json(services);
    } catch (error) {
        console.error('Erro ao buscar serviços:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};