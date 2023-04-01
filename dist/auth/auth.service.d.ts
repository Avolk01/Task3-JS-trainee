import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { RegistrationDto } from './dto/registration.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    private validateUser;
    registration(registrationDto: RegistrationDto): Promise<{
        token: Promise<{
            token: string;
        }>;
        userId: number;
    }>;
    private generateToken;
}
