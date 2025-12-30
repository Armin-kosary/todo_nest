import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') userId, @Request() req) {
    return await this.usersService.updateUser(updateUserDto, userId, req.user.sub)
  }
}
