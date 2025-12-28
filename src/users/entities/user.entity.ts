import { Todo } from "src/todos/entities/todo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

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

    @OneToMany(()=> Todo, (todo)=> todo.user)
    todos: Todo[]
}
