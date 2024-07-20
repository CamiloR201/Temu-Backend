import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @OneToMany(() => Task, task => task.user)
  tasks!: Task[];

  constructor(name: string, email: string, password: string, tasks?: Task[]) {
    this.name = name;
    this.email = email;
    this.password = password;
    if (tasks) {
      this.tasks = tasks;
    }
  }
}
