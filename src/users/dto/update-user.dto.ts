import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @ApiProperty()
    first_name: string
}
