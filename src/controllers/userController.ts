import { Request, Response } from 'express';
import { User } from '../entity/User';
import { dataSource } from '../data-source';

const userRepository = dataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = userRepository.create(req.body);
        const result = await userRepository.save(user);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userRepository.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (user) {
            userRepository.merge(user, req.body);
            const result = await userRepository.save(user);
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userRepository.delete(parseInt(req.params.id));
        if (result.affected) {
            res.status(200).json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};
