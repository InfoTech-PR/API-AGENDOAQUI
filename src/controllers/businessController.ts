import { Response, Request } from "express";
import { Business } from "../models/Business";
import bcrypt from 'bcrypt';
import admin from '../services/firebase';
import { sendNewUserNotification } from "services/mailService";

export const registerBusiness = async (req: Request, res: Response) => {
    try {
        const { name, category, email, phone, user, password } = req.body;

        if (!name || !category || !user) return res.status(400).json({ message: 'Campos obrigatórios: name, category e user.' });
        if (!(email || phone)) return res.status(400).json({ message: 'Pelo menos um dos campos (email ou telefone) deve ser preenchido!' });

        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
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

        // const managers = await User.findAll({ where: { role: 'admin' } });
        const managers = ['josue21servico@gmail.com', 'paula@infotech-solucoes.com'];
        for (const manager of managers) {
            await sendNewUserNotification(manager, name, email);
        }
        
        return res.status(200).json({ message: 'Cadastro enviado para aprovação. Entre em contato com a Infotech para confirmar seu cadastro dentro do sistema!' });

    } catch (error) {
        console.error('Erro ao fazer cadastro:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const loginBusiness = async (req: Request, res: Response) => { 
    try {
        const { email, password, token } = req.body;

        if (token) {
            const decodedToken = await admin.auth().verifyIdToken(token);
            if (decodedToken.email !== email) return res.status(401).json({ message: 'Email do token não confere.' });
        
            const business = await Business.findOne({ where: { email: decodedToken.email } });
            if (!business) return res.status(401).json({ message: 'Usuário não registrado.' });

            const isActive = await Business.findOne({ where: { active: true } });
            if (!isActive) return res.status(401).json({ message: "Sua conta está em avaliação!" })
        
            return res.status(200).json({ message: 'Login feito com Sucesso (VIA TOKEN)!' });
        }
        
        if (!password) return res.status(400).json({ message: 'Senha é obrigatória quando não usar token.' });

        const business = await Business.findOne({ where: { email } });
        if (!business) return res.status(401).json({ message: 'Credenciais inválidas ou usuário não registrado.' });

        const isPasswordValid = await bcrypt.compare(password, business.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Credenciais inválidas.' });

        const isActive = await Business.findOne({ where: { active: true } });
        if (!isActive) return res.status(401).json({ message: "Sua conta está em avaliação!" })

        return res.status(200).json({ message: 'Login feito com Sucesso!' });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};