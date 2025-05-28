import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    nombre: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}