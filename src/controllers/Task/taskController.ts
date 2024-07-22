import { Request, Response } from 'express';
import { taskService } from '../../services/taskService';

export const createTask = async (req: Request, res: Response) => {
    try {
        const result = await taskService.createTask(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

    try {
        const result = await taskService.getTasks(page, pageSize);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

    try {
        const task = await taskService.getTaskById(id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

    try {
        const task = await taskService.updateTask(id, req.body);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: 'Invalid ID' });

    try {
        const success = await taskService.deleteTask(id);
        if (success) {
            res.status(200).json({ message: 'Task deleted' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};
