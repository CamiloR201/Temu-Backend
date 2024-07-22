import { Repository } from 'typeorm';
import { Task } from '../entity/Task';
import { dataSource } from '../data-source';

class TaskService {
    private taskRepository: Repository<Task>;

    constructor() {
        this.taskRepository = dataSource.getRepository(Task);
    }

    async createTask(taskData: Partial<Task>): Promise<Task> {
        const task = this.taskRepository.create(taskData);
        return await this.taskRepository.save(task);
    }

    async getTasks(page: number, pageSize: number): Promise<{ data: Task[], total: number, totalPages: number }> {
        const [tasks, total] = await this.taskRepository.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        return {
            data: tasks,
            total,
            totalPages: Math.ceil(total / pageSize),
        };
    }

    async getTaskById(id: number): Promise<Task | null> {
        return await this.taskRepository.findOneBy({ id });
    }

    async updateTask(id: number, taskData: Partial<Task>): Promise<Task | null> {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task) return null;
        this.taskRepository.merge(task, taskData);
        return await this.taskRepository.save(task);
    }

    async deleteTask(id: number): Promise<boolean> {
        const result = await this.taskRepository.delete(id);
        return result.affected !== 0;
    }
}

export const taskService = new TaskService();
