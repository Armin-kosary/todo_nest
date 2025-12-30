import { Todo } from "src/todos/entities/todo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, update: false })
    username: string

    @Column()
    password: string

    @Column({ nullable: true })
    firstName: string

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(()=> Todo, (todo)=> todo.user)
    todos: Todo[]
}
