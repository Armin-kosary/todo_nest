import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('new')
  @UseGuards(JwtAuthGuard)
  async createNewTodo(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return await this.todosService.createNewTodo(createTodoDto, req.user.userId)
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  async updateTodo(@Body() updateTodoDto: UpdateTodoDto, @Request() req, @Param('id') todoId) {
    return await this.todosService.updateTodo(updateTodoDto, todoId, req.user.userId)
  }
}
