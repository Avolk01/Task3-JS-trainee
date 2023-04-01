import { CanActivate, ExecutionContext, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    
    constructor (private jwtService: JwtService, 
                 private reflector: Reflector){}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {        
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ]);

            if (!requiredRoles)
                return true;

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token =  authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token)
                throw new NotFoundException({message: 'Пользователь не авторизован'});

            const user = this.jwtService.verify(token);
            req.user = user;   
            const self = user.id == req.query.userId;           // проверка на самого себя

            const flag = user.roles.some(role => requiredRoles.includes(role.value)) || self;
            
            if(!flag)
                throw new UnauthorizedException({message: 'Неправильная роль'})

            return flag;
        
        } catch (error) {
            throw new UnauthorizedException({message: error.message});
        }
    } 
} 