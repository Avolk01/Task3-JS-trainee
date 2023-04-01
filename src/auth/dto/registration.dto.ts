import { IsString, Length, IsEmail, IsDate } from "class-validator";

export class RegistrationDto {
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не может быть меньше 4 и больше 16'})
    readonly password: string;

    @IsString({message: 'Должно быть строкой'})
    @Length(2, 20, {message: 'Не может быть меньше 2 и больше 20'})
    readonly userName: string;

    @IsString({message: 'Должно быть строкой'})
    @Length(2, 50, {message: 'Не может быть меньше 2 и больше 50'})
    readonly userSurname: string;

    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly phoneNumber: string;

    @IsString({message: 'Должно быть строкой'})
    readonly birthDate: string;
}