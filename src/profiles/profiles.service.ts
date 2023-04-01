import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.model';
import { InjectModel } from '@nestjs/sequelize';
import { RegistrationDto } from 'src/auth/dto/registration.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/user.model';

@Injectable()
export class ProfilesService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile,
                private authService: AuthService,
                @InjectModel(User) private userRepository: typeof Profile) {}

    async createProfile(dto: CreateProfileDto) {    
        const profile = await this.profileRepository.create(dto);
        return profile;
    }

    async registration(dto: RegistrationDto) {
        const reg = await this.authService.registration(dto);
        // не получилось распарсить dto
        await this.createProfile({   
            userName: dto.userName,
            userSurname: dto.userSurname, 
            birthDate: dto.birthDate,
            phoneNumber: dto.phoneNumber,
            userId: reg.userId
        });
        return reg.token;
    }

    async login(dto: CreateUserDto) {
        const token = await this.authService.login(dto);
        return token;
    }

    async delete(userId: number) {
        const profile = await this.profileRepository.findOne({where: {userId: userId}});
        const user = await this.userRepository.findOne({where: {id: userId}});
        await profile.destroy();
        await user.destroy();
        return user;
    }

    async update(userId:number, dto: CreateProfileDto) {
        const profile = await this.profileRepository.findOne({where: {userId: userId}});
        await profile.update(dto);
        return profile;
    }
}
