import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new UnauthorizedException('Acesso negado. Por favor, realize o login.');
        }
        return user;
    }
}
