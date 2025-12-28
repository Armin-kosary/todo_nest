import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    first_name: string
}
