import { User } from "src/users/entities/user.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import TodoStatusEnum from "../enums/todo-status.enum"

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string
    
    @Column({ nullable: true })
    description: string
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ type: 'enum', enum: TodoStatusEnum, default: TodoStatusEnum.PENDING })
    status: TodoStatusEnum

    @ManyToOne(()=> User, (user)=> user.todos)
    user: User
}
