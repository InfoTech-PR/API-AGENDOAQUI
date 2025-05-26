import { Response, Request } from "express";
import { Business } from "../models/Business";
import { Client } from "../models/Client";
import { Scheduling } from "../models/Scheduling";
import { sendNewUserNotificationActive } from "services/mailService";
import { Service } from "../models/Service";
import { SchedulingCancel } from "../models/SchedulingCancel";

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

export const updateScheduling = async (req: Request, res: Response) => {
  try {
    const { id, date, hour, serviceId, clientId, businessId, obs } = req.body;

    if (!id || !date || !hour || !serviceId || !clientId) return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });

    const scheduling = await Scheduling.findOne({ where: { id } });
    if (!scheduling) return res.status(404).json({ message: 'Agendamento não encontrado!' });

    const existinClient = await Client.findOne({ where: { id: clientId } })
    if (!existinClient) return res.status(400).json({ message: 'Cliente não existe!' });

    const existingService = await Service.findOne({ where: { id: serviceId} })
    if (!existingService) return res.status(400).json({ message: 'Serviço não existe!' });

    const existingBusiness = await Business.findOne({ where: { id: businessId} })
    if (!existingBusiness) return res.status(400).json({ message: 'Negócio não existe!' });

    scheduling.date = date;
    scheduling.hour = hour;
    scheduling.serviceId = serviceId;
    scheduling.clientId = clientId;

    await scheduling.save();

    return res.status(200).json({ message: 'Agendamento atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

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

    const results = await Promise.all(schedulings.map(async (scheduling) => {
      let nameWhoCanceled = null;

      if (scheduling.canceled) {
        const cancel = await SchedulingCancel.findOne({
          where: { schedulingId: scheduling.id }
        });

        if (cancel) {
          if (cancel.cancelledByType === 'client') {
            const client = await Client.findByPk(cancel.cancelledById);
            if (client) nameWhoCanceled = client.name;
          } else if (cancel.cancelledByType === 'business') {
            const business = await Business.findByPk(cancel.cancelledById);
            if (business) nameWhoCanceled = business.name;
          }
        }
      }
      return {
        ...scheduling.toJSON(),
        nameWhoCanceled
      };
    }));

    return res.status(200).json(results);
    
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const getSchedulingById = async (req: Request, res: Response) => { 
    const { id } = req.params;
    try {
        const scheduling = await Scheduling.findOne({where: { id: id }});
        return res.status(200).json(scheduling);
    } catch (error) {
        console.error('Erro ao buscar agendamento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};