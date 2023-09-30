import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "../auth.service";
import { JwtPayload } from "./jwt.payload";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey:process.env.JWT_SECRET,
        }
        )
       
    }

    async validate(payload: JwtPayload) {
        const user = await this.authService.validateUser(payload);
        return user;
    }
}