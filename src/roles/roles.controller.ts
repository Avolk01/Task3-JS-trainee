import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService){}

    @Post()
    create(@Body() roleDto: CreateRoleDto) {
        const role = this.roleService.createUser(roleDto);
        return role;
    }    

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        const role = this.roleService.getRoleByValue(value);
        return role;
    }     
}
