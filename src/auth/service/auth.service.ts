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
            const refreshToken = await AuthService.createRefreshToken(user, values);
            this.refreshTokens.push(refreshToken);
            return {
                user,
                refreshToken,
                accessToken: await AuthService.createAccessToken(user)
            };
        } else {
            return undefined;
        }
    }

    private static async createRefreshToken(user, values): Promise<string> {
        const refreshToken = new RefreshToken({
            userId: user.id,
            userAgent: values.userAgent,
            ipAddress: values.ipAddress,
        });
        return refreshToken.sign();
    }

    private static async createAccessToken(user: User) {
        return sign({sub: user._id}, process.env.ACCESS_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION});
    }
}
