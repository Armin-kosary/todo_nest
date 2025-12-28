import { User } from "src/users/entities/user.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

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

    @ManyToOne(()=> User, (user)=> user.todos)
    user: User
}
