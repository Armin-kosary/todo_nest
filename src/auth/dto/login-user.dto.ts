import { IsNotEmpty, IsString, Length } from "class-validator"

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 15)
    username: string

    @IsString()
    @IsNotEmpty()
    @Length(8, 16)
    password: string
}