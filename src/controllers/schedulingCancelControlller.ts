import { Request, Response } from "express";
import { format } from 'date-fns';
import { SchedulingCancel } from "../models/SchedulingCancel";
import { Scheduling } from "../models/Scheduling";
import { sendCanceledScheduling } from "../services/mailService";
import { Client } from "../models/Client";
import { Business } from "../models/Business";
import { Service } from "../models/Service";

export const createSchedulingCancel = async (req: Request, res: Response) => {
  try {
    const { schedulingId, cancelledById, cancelledByType, cancelDescription } = req.body;

    if (!schedulingId || !cancelledById) return res.status(400).json({ message: "schedulingId e cancelledById são obrigatórios." });

    const scheduling = await Scheduling.findByPk(schedulingId);
    if (!scheduling) return res.status(404).json({ message: "Agendamento não encontrado." });

    if (cancelledByType !== 'client' && cancelledByType !== 'business') return res.status(400).json({ message: 'Tipo de cancelador inválido.' });

    const schedulingCancel = await SchedulingCancel.create({
      schedulingId,
      cancelledById,
      cancelledByType,
      cancelDescription: cancelDescription || null,
    });

    scheduling.canceled = true;
    await scheduling.save();

    let clientOrBusiness = null;
    if (cancelledByType === 'client') {
      clientOrBusiness = await Client.findByPk(cancelledById);
    } else {
      clientOrBusiness = await Business.findByPk(cancelledById);
    }
    if (!clientOrBusiness) return res.status(404).json({ message: 'Cliente ou negócio não encontrado.' });
    
    let schedulingType = null;
    const service = await Service.findByPk(scheduling.serviceId);
    schedulingType = service?.name ?? '';
    
    const schedulingDate = format(scheduling.date, 'dd/MM/yyyy');
    const schedulingHour = scheduling.hour;
    
    const email = clientOrBusiness.email;
    const business = clientOrBusiness.name;
    
    await sendCanceledScheduling(email, business, schedulingType, schedulingDate, schedulingHour);

    return res.status(201).json({
      message: "Cancelamento registrado com sucesso.",
      schedulingCancel,
    });
  } catch (error) {
    console.error("Erro ao registrar cancelamento:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};