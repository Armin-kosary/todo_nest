import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class CreateTodoDto {
    @ApiProperty()
    @IsString()
    @Length(5, 25)
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @Length(10, 100)
    description?: string
}
