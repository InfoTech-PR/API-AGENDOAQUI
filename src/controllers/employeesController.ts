import { Response, Request } from "express";
import { Employees } from "../models/Employees";
import { Business } from "../models/Business";

export const registerEmployees = async (req: Request, res: Response) => {
  try {
    const { id_business, name, summary, specialization } = req.body;
    const image = req.file ? `/uploads/employees/${req.file.filename}` : null;
    console.log('chegou aqui 0')

    const idBusinessNum = Number(id_business);

    if (!idBusinessNum || !name || !specialization || isNaN(idBusinessNum)) return res.status(400).json({ message: 'Campos obrigatórios inválidos ou vazios!' });
    console.log('chegou aqui 1')

    // const existingBusiness = await Business.findOne({ where: { id: id_business } });
    // if (!existingBusiness) return res.status(400).json({ message: 'Negócio não existe!' });
    console.log('chegou aqui 2')

    const existingEmployee = await Employees.findOne({ where: { name } });
    if (existingEmployee) return res.status(400).json({ message: 'Funcionário com esse nome já existe!' });
    console.log('chegou aqui 3')

    await Employees.create({
      id_business,
      image,
      name,
      summary,
      specialization
    });
    console.log('chegou aqui 4')

    return res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao fazer cadastro:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

export const getAllEmployeesByBusiness = async (req: Request, res: Response) => { 
  const { id } = req.params;
  try {
    const employees = await Employees.findAll({ where: { id_business: id } });
      return res.status(200).json(employees);
  } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};