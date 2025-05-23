import { Response, Request } from "express";
import { Business } from "../models/Business";
import { Client } from "../models/Client";
import { Scheduling } from "../models/Scheduling";
import { sendNewUserNotificationActive } from "services/mailService";
import { Service } from "../models/Service";

export const registerScheduling = async (req: Request, res: Response) => {
  try {
    const { date, hour, serviceId, clientId, businessId, obs } = req.body;

    if (!date || !hour || !serviceId || !clientId) return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    
    const existinClient = await Client.findOne({ where: { id: clientId } })
    if (!existinClient) return res.status(400).json({ message: 'Cliente não existe!' });

    const existingService = await Service.findOne({ where: { id: serviceId} })
    if (!existingService) return res.status(400).json({ message: 'Serviço não existe!' });

    const existingBusiness = await Business.findOne({ where: { id: businessId} })
    if (!existingBusiness) return res.status(400).json({ message: 'Negócio não existe!' });

    // try {
    //     await sendNewUserNotificationActive(email, nameBusiness ? nameBusiness.name : '', username, password);
    // } catch (error) {
    //     return res.status(500).json({ message: 'Email em formato invalido ou não existe!' });
    // }

    await Scheduling.create({
      date,
      hour,
      serviceId,
      clientId,
      businessId,
      observations: obs
    });

    return res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao fazer cadastro:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// export const updateScheduling = async (req: Request, res: Response) => {
//     try {
//         const { id, name, dob, email, phone } = req.body;

//         if (!id) return res.status(400).json({ message: 'Campo obrigatório: id' });
//         if (!name) return res.status(400).json({ message: 'Campo obrigatório: name' });
//         if (!(email || phone)) return res.status(400).json({ message: 'Pelo menos um dos campos (email ou telefone) deve ser preenchido!' });

//         const nameUppercase = name.trim().toUpperCase();

//         const client = await Client.findOne({ where: { id } });
//         if (!client) return res.status(404).json({ message: 'Cliente não encontrado!' });

//         if (email && email !== client.email) {
//             if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) return res.status(400).json({ message: 'Formato de email inválido!' });
//             const existingEmail = await Client.findOne({ where: { email } });
//             if (existingEmail) return res.status(400).json({ message: 'Email já cadastrado!' });
//         }

//         if (phone && phone !== client.phone) {
//             if (!/^\(?\d{2}\)?\s?9\d{4}[-\s]?\d{4}$/.test(phone)) return res.status(400).json({ message: 'Formato de telefone inválido!' });
//             const existingPhone = await Client.findOne({ where: { phone } });
//             if (existingPhone) return res.status(400).json({ message: 'Telefone já cadastrado!' });
//         }

//         client.name = nameUppercase;
//         client.dob = dob;
//         client.email = email;
//         client.phone = phone || null;

//         await client.save();

//         return res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
//     } catch (error) {
//         console.error('Erro ao atualizar cliente:', error);
//         return res.status(500).json({ message: 'Erro interno do servidor.' });
//     }
// };

export const getAllSchedulingsByBusinessId = async (req: Request, res: Response) => { 
  try {
    const { id } = req.params;

    const existingBusiness = await Business.findOne({ where: { id } });
    if (!existingBusiness) return res.status(400).json({ message: 'Negócio não encontrado' });

    const schedulings = await Scheduling.findAll({
      where: { businessId: id },
      include: [
        { model: Client, attributes: ['name'] },
        { model: Service, attributes: ['name'] }
      ]
    });

    if (!schedulings || schedulings.length === 0) {
      return res.status(200).json({ message: 'Nenhum agendamento encontrado para este negócio.' });
    }

    return res.status(200).json(schedulings);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// export const getSchedulingById = async (req: Request, res: Response) => { 
//     const { id } = req.params;
//     try {
//         const client = await Client.findOne({where: { id: id }});
//         return res.status(200).json(client);
//     } catch (error) {
//         console.error('Erro ao buscar clientes:', error);
//         return res.status(500).json({ message: 'Erro interno do servidor.' });
//     }
// };