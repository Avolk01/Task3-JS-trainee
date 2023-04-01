import { Controller, Post, Body, Get, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor (private userService: UsersService) {}

    @UsePipes(ValidationPipe)                   // Валидация 
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    
    @Roles('ADMIN')                             // Обязательная роль для выполнения команды
    @UseGuards(RolesGuard)                      // 
    @Get()                                      // Метод с эндпоинтом
    getAll() {
        return this.userService.getAllUsers();
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }
}
