import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class CreateTodoDto {
    @IsString()
    @Length(5, 25)
    title: string

    @IsOptional()
    @IsNotEmpty()
    @Length(10, 100)
    description?: string
}
