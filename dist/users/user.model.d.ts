import { Model } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
interface UserCreationAttrs {
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    email: string;
    password: string;
    roles: Role[];
}
export {};
