import { Body, Controller, Delete, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RegistrationDto } from 'src/auth/dto/registration.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ProfilesService } from './profiles.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profiles')
export class ProfilesController {

    constructor(private profileService: ProfilesService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto){
        return this.profileService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() registrationDto: RegistrationDto){
        return this.profileService.registration(registrationDto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)  
    @Delete('/delete')
    delete(@Query('userId') userId: number) {
        return this.profileService.delete(userId);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)  
    @Put('/update')
    update(@Query('userId') userId: number, @Body() profileDto: CreateProfileDto) {
        return this.profileService.update(userId, profileDto);
    }
}
