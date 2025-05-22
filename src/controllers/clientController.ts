import { Response, Request } from "express";
import { Client } from "../models/Client";
import { Business } from "../models/Business";
import { sendNewUserNotificationActive } from "../services/mailService";
import { generateUsername, generatePassword } from "../utils/authUtils";

export const registerClient = async (req: Request, res: Response) => {
    try {
        const { name, dob, email, phone, business } = req.body;

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

        const username = generateUsername(nameUppercase);
        const password = generatePassword();
        const nameBusiness = await Business.findOne({ where: { id: business }, attributes: ['name'], raw: true });

        try {
            await sendNewUserNotificationActive(email, nameBusiness ? nameBusiness.name : '', username, password);
        } catch (error) {
            return res.status(500).json({ message: 'Email em formato invalido ou não existe!' });
        }

        await Client.create({
            name: nameUppercase,
            business,
            dob,
            email,
            active: true,
            phone: phone || null,
            user: username,
            password: password,
            createdBy: nameBusiness?.name || ''
        });

        return res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao fazer cadastro:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const updateClient = async (req: Request, res: Response) => {
    try {
        const { id, name, dob, email, phone } = req.body;

        if (!id) return res.status(400).json({ message: 'Campo obrigatório: id' });
        if (!name) return res.status(400).json({ message: 'Campo obrigatório: name' });
        if (!(email || phone)) return res.status(400).json({ message: 'Pelo menos um dos campos (email ou telefone) deve ser preenchido!' });

        const nameUppercase = name.trim().toUpperCase();

        const client = await Client.findOne({ where: { id } });
        if (!client) return res.status(404).json({ message: 'Cliente não encontrado!' });

        if (email && email !== client.email) {
            if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) return res.status(400).json({ message: 'Formato de email inválido!' });
            const existingEmail = await Client.findOne({ where: { email } });
            if (existingEmail) return res.status(400).json({ message: 'Email já cadastrado!' });
        }

        if (phone && phone !== client.phone) {
            if (!/^\(?\d{2}\)?\s?9\d{4}[-\s]?\d{4}$/.test(phone)) return res.status(400).json({ message: 'Formato de telefone inválido!' });
            const existingPhone = await Client.findOne({ where: { phone } });
            if (existingPhone) return res.status(400).json({ message: 'Telefone já cadastrado!' });
        }

        client.name = nameUppercase;
        client.dob = dob;
        client.email = email;
        client.phone = phone || null;

        await client.save();

        return res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
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

export const getClientById = async (req: Request, res: Response) => { 
    const { id } = req.params;
    try {
        const client = await Client.findOne({where: { id: id }});
        return res.status(200).json(client);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};