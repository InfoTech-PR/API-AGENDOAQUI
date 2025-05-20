import { Response, Request } from "express";
import { Client } from "../models/Client";
import { sendNewUserNotification } from "../services/mailService";

export const registerClient = async (req: Request, res: Response) => {
    try {
        const { name, dob, email, phone } = req.body;

        if (!name) return res.status(400).json({ message: 'Campos obrigatórios: name' });
        if (!(email || phone)) return res.status(400).json({ message: 'Pelo menos um dos campos (email ou telefone) deve ser preenchido!' });

        const nameUppercase = name.trim().toUpperCase();

        if (email) {
            if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) return res.status(400).json({ message: 'Formato de email inválido!' });
            const existingEmail = await Client.findOne({ where: { email } });
            if (existingEmail) return res.status(400).json({ message: 'Email já cadastrado!' });
        }
        if (phone) {
            if (!/^\(?\d{2}\)?\s?9\d{4}[-\s]?\d{4}$/.test(phone)) return res.status(400).json({ message: 'Formato de telefone inválido!' });
            const existingPhone = await Client.findOne({ where: { phone } });
            if (existingPhone) return res.status(400).json({ message: 'Telefone já cadastrado!' });
        }

        await Client.create({
            name: nameUppercase,
            dob,
            email,
            phone: phone || null,
        });

        // const managers = await User.findAll({ where: { role: 'admin' } });
        // for (const manager of managers) {
        //     await sendNewUserNotification(manager, name, email);
        // }
        
        return res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao fazer cadastro:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const getAllClients = async (req: Request, res: Response) => { 
    try {
        const clients = await Client.findAll({
          order: [['createdAt', 'DESC']],
          attributes: ['id', 'name', 'email', 'phone', 'dob', 'createdAt'],
        });
    
        return res.status(200).json(clients);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
};