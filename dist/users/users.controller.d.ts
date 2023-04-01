import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(userDto: CreateUserDto): Promise<import("./user.model").User>;
    getAll(): Promise<import("./user.model").User[]>;
    addRole(dto: AddRoleDto): Promise<import("./user.model").User>;
}
