import { IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
import TodoStatusEnum from "../enums/todo-status.enum"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class UpdateTodoDto {    
    @IsString()
    @Length(5, 25)
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    title: string

    @IsString()
    @Length(10, 100)
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    description: string

    @IsEnum(TodoStatusEnum)
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional()
    status: TodoStatusEnum
}
