import { Model } from "sequelize-typescript";
interface ProfileCreationAttrs {
    userName: string;
    userSurname: string;
    phoneNumber: string;
    birthDate: string;
}
export declare class Profile extends Model<Profile, ProfileCreationAttrs> {
    userId: number;
    userName: string;
    userSurname: string;
    phoneNumber: string;
    birthDate: string;
}
export {};
