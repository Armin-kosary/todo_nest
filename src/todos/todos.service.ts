import { BadRequestException, Injectable, NotFoundException, Request, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>
    ) {}

    async createNewTodo(createTodoDto: CreateTodoDto, userId) {
        const newTodo = this.todoRepository.create(createTodoDto)
        newTodo.user = userId
        return await this.todoRepository.save(newTodo)
    }

    async updateTodo(updateTodoDto: UpdateTodoDto, todoId: number, userId: number) {
        const findTodo = await this.todoRepository.findOne(
            { where: { id: todoId, user: {id: userId} } }
        )
        if(!findTodo) throw new BadRequestException('access denid')
        
        return await this.todoRepository.update(todoId, updateTodoDto)
    }
}
