import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import TodoStatusEnum from './enums/todo-status.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly userService: UsersService,
  ) {}

  async createNewTodo(createTodoDto: CreateTodoDto, userId) {
    const checkUser = await this.userService.findUserById(userId);
    const newTodo = this.todoRepository.create({
      title: createTodoDto.title,
      description: createTodoDto.description,
      user: checkUser,
    });

    return await this.todoRepository.save(newTodo);
  }

  async updateTodo(
    updateTodoDto: UpdateTodoDto,
    todoId: number,
    userId: number,
  ) {
    const findTodo = await this.todoRepository.findOne({
      where: { id: todoId, user: { id: userId } },
    });
    if (!findTodo) throw new BadRequestException('access denid');

    return await this.todoRepository.update(todoId, updateTodoDto);
  }

  async usersTodoList(id: number, status?: TodoStatusEnum) {
    const todoList = this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.user.id = :id', { id: id });
    if (status) todoList.andWhere('todo.status = :status', { status: status });
    return todoList.getMany();
  }
}
