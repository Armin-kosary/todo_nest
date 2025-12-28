import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService 
  ){}

  async registerUser(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    return this.usersService.createNewUser(createUserDto)
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findUserByUserName(loginUserDto.username)
    if(!user) throw new BadRequestException('there is no user with this username')

    if(await bcrypt.compare(loginUserDto.password, user.password)) {
      const payload = { sub: user.id, username: user.username, firstName: user.firstName }
      const token = this.jwtService.sign(payload)
      return { AccessToken: token }
    }
  }
}
