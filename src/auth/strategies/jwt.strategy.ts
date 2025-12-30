import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService, private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET_KEY') 
        })
    }
    async validate(payload: any) {
        const checkUserAvailability = this.userService.findUserByUserName(payload.mobile)
        if(!checkUserAvailability) throw new BadRequestException('there is no user')

        return {
            sub: payload.sub,
            username: payload.username,
            firstName: payload.firstName
        }
    }
}

