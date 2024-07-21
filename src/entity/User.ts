import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './Task';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive?: boolean;

  @OneToMany(() => Task, task => task.user)
  tasks!: Task[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  constructor(name: string, email: string, password: string, tasks?: Task[]) {
    this.name = name;
    this.email = email;
    this.password = password;
    if (tasks) {
      this.tasks = tasks;
    }
  }
}
