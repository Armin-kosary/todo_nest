import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import TodoStatusEnum from './enums/todo-status.enum';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';


@Controller('todos')
@ApiBearerAuth()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('new')
  @UseGuards(JwtAuthGuard)
  async createNewTodo(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return await this.todosService.createNewTodo(createTodoDto, req.user.sub)
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number })
  async updateTodo(@Body() updateTodoDto: UpdateTodoDto, @Request() req, @Param('id') todoId) {
    return await this.todosService.updateTodo(updateTodoDto, todoId, req.user.sub)
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'status', required: false })
  async usersTodoList(@Request() req, @Query('status') todoStaus?: TodoStatusEnum) {
    return this.todosService.usersTodoList(req.user.sub, todoStaus)
  }
}
