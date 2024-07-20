import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  dueDate: Date;

  @Column()
  priority: number;

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.tasks)
  user!: User;

  constructor(title: string, dueDate: Date, priority: number, status: string, user: User, description?: string) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
    this.description = description;
    this.user = user; // Asegúrate de que 'user' nunca sea undefined
  }
}
