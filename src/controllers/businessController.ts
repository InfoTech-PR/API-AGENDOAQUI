import { Response, Request } from "express";
import { Business } from "../models/Business";
import bcrypt from 'bcrypt';

export const registerBusiness = async (req: Request, res: Response) => {
    try {
        const { name, category, email, phone, user, password } = req.body;

        if (!name || !category || !user || !password) return res.status(400).json({ message: 'Todos os campos obrigatórios!' });
        if (!(email || phone)) return res.status(400).json({ message: 'Pelo menos um dos campos (email ou telefone) deve ser preenchido!' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const nameUppercase = name.trim().toUpperCase();

        if (email) {
            if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) return res.status(400).json({ message: 'Formato de email inválido!' });
            const existingEmail = await Business.findOne({ where: { email } });
            if (existingEmail) return res.status(400).json({ message: 'Email já cadastrado!' });
        }
        if (phone) {
            if (!/^\(?\d{2}\)?\s?9\d{4}[-\s]?\d{4}$/.test(phone)) return res.status(400).json({ message: 'Formato de telefone inválido!' });
            const existingPhone = await Business.findOne({ where: { phone } });
            if (existingPhone) return res.status(400).json({ message: 'Telefone já cadastrado!' });
        } 

        // verificar usuario se existe

        await Business.create({
            name: nameUppercase,
            category,
            email,
            phone: phone || null,
            user,
            password: hashedPassword
        });
        return res.status(200).json({ message: 'Novo negócio registrado!' });

    } catch (error) {
        console.error('Erro ao fazer cadastro:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};