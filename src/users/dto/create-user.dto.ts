import { IsString, Length, IsEmail, IsDate } from "class-validator";

export class CreateUserDto {
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не может быть меньше 4 и больше 16'})
    readonly password: string;
}