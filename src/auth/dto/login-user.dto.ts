import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 15)
    @ApiProperty()
    username: string

    @IsString()
    @IsNotEmpty()
    @Length(8, 16)
    @ApiProperty()
    password: string
}