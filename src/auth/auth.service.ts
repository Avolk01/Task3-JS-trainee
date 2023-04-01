import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.model';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService){}
    
    // основная функция авторизации. Возвращает токен пользователя.
    async login(userDto: CreateUserDto) {                   
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    // проверка пользователя в базе данных. Если существует и введен правильный пароль, то возвращается пользователь из БД
    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if(user && passwordEquals)
            return user;

        throw new UnauthorizedException({message: 'Неверный логин или пароль'})
    }

    // основная функция регистрации. email уникальный, пароль шифруется
    async registration(registrationDto: RegistrationDto){   
        const candidate = await this.userService.getUserByEmail(registrationDto.email);
        if (candidate)
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(registrationDto.password, 5);
        const user = await this.userService.createUser({email: registrationDto.email, password: hashPassword});
    
        return {token: this.generateToken(user), userId: user.id};
    }

    // специльная генерация токена
    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles};
        return {
            token: this.jwtService.sign(payload),
        }
    }
}
