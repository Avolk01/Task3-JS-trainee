import { RegistrationDto } from 'src/auth/dto/registration.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
export declare class ProfilesController {
    private profileService;
    constructor(profileService: ProfilesService);
    login(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    registration(registrationDto: RegistrationDto): Promise<{
        token: string;
    }>;
    delete(userId: number): Promise<import("./profile.model").Profile>;
    update(userId: number, profileDto: CreateProfileDto): Promise<import("./profile.model").Profile>;
}
