import { Column, DataType, Model, Table } from "sequelize-typescript";

// Схема профиля
interface ProfileCreationAttrs {
    userName: string;               // Имя 
    userSurname: string;            // Фамилия
    phoneNumber: string;            // Номер телефона
    birthDate: string;                // Дата рождения
}

@Table({tableName: 'profiles'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {
    
    @Column({type: DataType.INTEGER, unique: true,})
    userId: number;
    
    @Column({type: DataType.STRING, allowNull: false})
    userName: string;

    @Column({type: DataType.STRING, allowNull: false})
    userSurname: string;

    @Column({type: DataType.STRING, allowNull: false,})
    phoneNumber: string;

    @Column({type: DataType.STRING, allowNull: false})
    birthDate: string;
}