import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import TodoStatusEnum from 'src/todos/enums/todo-status.enum';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async findUserByUserName(username: string) {
    const findUser = await this.userRepository.findOneBy({ username: username })
    if(!findUser) throw new NotFoundException()
    return findUser
  }

  async findUserById(id: number) {
    const findUser = await this.userRepository.findOneBy({ id: id })
    if(!findUser) throw new NotFoundException()
    return findUser
  }

  async createNewUser(createUserDto: CreateUserDto) {
    const checkUserAvailability = await this.findUserByUserName(createUserDto.username)
    if(checkUserAvailability) throw new BadRequestException('user with this username is available')

    const newUser = this.userRepository.create(createUserDto)
    return this.userRepository.save(newUser)
  }

  async updateUser(updateUserDto: UpdateUserDto, userId: number, requestSenderId: number) {
    const findUser = await this.userRepository.findOneBy({ id: userId })
    if(!findUser || (userId != requestSenderId)) throw new BadRequestException('there was a problem while updating')

      return await this.userRepository.update(userId, { firstName: updateUserDto.first_name })
  }
}
