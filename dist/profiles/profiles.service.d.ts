import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.model';
import { RegistrationDto } from 'src/auth/dto/registration.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class ProfilesService {
    private profileRepository;
    private authService;
    private userRepository;
    constructor(profileRepository: typeof Profile, authService: AuthService, userRepository: typeof Profile);
    createProfile(dto: CreateProfileDto): Promise<Profile>;
    registration(dto: RegistrationDto): Promise<{
        token: string;
    }>;
    login(dto: CreateUserDto): Promise<{
        token: string;
    }>;
    delete(userId: number): Promise<Profile>;
    update(userId: number, dto: CreateProfileDto): Promise<Profile>;
}
