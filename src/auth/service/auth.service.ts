import {Injectable} from '@nestjs/common';
import {UsersService} from "../../users/service/users.service";
import {RefreshToken} from "../entities/refreshToken";
import {sign} from "jsonwebtoken";
import {User} from "../../users/entities/user.schema";

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) {}

    private refreshTokens: string[] = [];

    async login(
        email: string,
        password: string,
        values: { userAgent: string; ipAddress: string },
    ): Promise<{user: User, refreshToken: string, accessToken: string} | undefined> {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            return undefined;
        }

        const bcrypt = require('bcrypt');

        if (await bcrypt.compare(password, user.password)) {
            const refreshToken = await this.createRefreshToken(user, values);
            this.refreshTokens.push(refreshToken);
            return {
                user,
                refreshToken,
                accessToken: await this.createAccessToken(user)
            };
        } else {
            return undefined;
        }
    }

    private async createRefreshToken(user, values): Promise<string> {
        const refreshToken = new RefreshToken({
            userId: user.id,
            userAgent: values.userAgent,
            ipAddress: values.ipAddress,
        });
        return refreshToken.sign();
    }

    private async createAccessToken(user: User) {
        console.log({user});
        return sign({sub: user._id}, process.env.ACCESS_SECRET, {expiresIn: '15m'});
            // user._id,
            // process.env.ACCESS_SECRET,
            // {expiresIn: 60 * 60 * 24 * 7}
        // );
    }
}
