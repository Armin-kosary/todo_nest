import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class CreateUserDto {
    @IsString()
    @Length(3, 15)
    @IsNotEmpty()
    @ApiProperty()
    username: string
    
    @IsString()
    @Length(8, 16)
    @IsNotEmpty()
    @ApiProperty()
    password: string
    
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional({ default: "optional" })
    firstName: string
}
