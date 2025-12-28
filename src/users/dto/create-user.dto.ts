import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class CreateUserDto {
    @IsString()
    @Length(3, 15)
    @IsNotEmpty()
    username: string
    
    @IsString()
    @Length(8, 16)
    @IsNotEmpty()
    password: string
    
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    first_name: string
}
