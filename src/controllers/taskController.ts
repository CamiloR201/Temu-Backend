import { Request, Response } from 'express';
import { Task } from '../entity/Task';
import { dataSource } from '../data-source';

const taskRepository = dataSource.getRepository(Task);

export const createTask = async (req: Request, res: Response) => {
    try {
        const task = taskRepository.create(req.body);
        const result = await taskRepository.save(task);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea', error });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await taskRepository.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas', error });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const task = await taskRepository.findOneBy({ id: parseInt(req.params.id) });
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la tarea', error });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const task = await taskRepository.findOneBy({ id: parseInt(req.params.id) });
        if (task) {
            taskRepository.merge(task, req.body);
            const result = await taskRepository.save(task);
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea', error });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const result = await taskRepository.delete(parseInt(req.params.id));
        if (result.affected) {
            res.status(200).json({ message: 'Tarea eliminada' });
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea', error });
    }
};
