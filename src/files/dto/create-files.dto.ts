import { IsString, Length, IsEmail, IsDate, IsNumber } from "class-validator";

export class CreateFileDto {

    @IsString({message: 'Должно быть строкой'})
    @Length(2, 20, {message: 'Не может быть меньше 2 и больше 20'})
    readonly fileName: string;

    @IsString({message: 'Должно быть строкой'})
    readonly createdAt: string;

    @IsString({message: 'Должно быть строкой'})
    readonly essenceTable: string;

    @IsNumber({}, {message: 'Должно быть числом'})
    readonly essenceId: number;

    readonly file: any;
}