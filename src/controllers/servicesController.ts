import { Response, Request } from "express";
import { Service } from "../models/Service";
import { Business } from "../models/Business";

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

export const registerService = async (req: Request, res: Response) => {
  try {
    const { id_business, image, name, summary, price, duration } = req.body;

    if (!id_business || !name || !price || !duration) return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    
    const existingBusiness = await Business.findOne({ where: { id: id_business } })
    if (!existingBusiness) return res.status(400).json({ message: 'Negócio não existe!' });

    const existingService = await Service.findOne({ where: { name: name} })
    if (existingService) return res.status(400).json({ message: 'Serviço com esse nome já existe!' });

    await Service.create({
        id_business,
        image,
        name,
        summary,
        price,
        duration
    });

    return res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao fazer cadastro:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};