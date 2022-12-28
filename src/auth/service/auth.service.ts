import {ForbiddenException, Injectable} from '@nestjs/common';
import {UsersService} from "../../users/service/users.service";
import {RefreshToken} from "../entities/refreshToken";
import {sign, verify} from "jsonwebtoken";
import {User} from "../../users/entities/user.schema";
import {RefreshTokenRepository} from "../repository/refreshToken.repository";

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
                private readonly refreshTokenRepository: RefreshTokenRepository) {}


    async refresh(refreshTokenRequest: {refreshToken: string}): Promise<string | undefined> {
        const refreshTokenObj = await this.retrieveRefreshToken(refreshTokenRequest.refreshToken);
        if(!refreshTokenObj) {
            throw new ForbiddenException('Invalid refresh token');
        }
        const user = await this.usersService.findOne(refreshTokenObj.user._id);
        if(!user) {
            throw new ForbiddenException('Invalid user');
        }
        const accessToken = await AuthService.createAccessToken(user);
        return sign({sub: accessToken}, process.env.ACCESS_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION});
    }

    private async retrieveRefreshToken(refreshToken: string): Promise<RefreshToken | undefined> {
        try {
            const decoded = verify(refreshToken, process.env.REFRESH_SECRET);
            if(typeof decoded === 'string') {
                return undefined;
            }
            return Promise.resolve(
                await this.refreshTokenRepository.findOne(decoded._id)
            )
        } catch (e) {
            return undefined;
        }
    }

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
            await this.refreshTokenRepository.save(refreshToken);
            return {
                user,
                refreshToken: refreshToken.sign(),
                accessToken: await AuthService.createAccessToken(user)
            };
        } else {
            return undefined;
        }
    }

    private static async createRefreshToken(user, values): Promise<RefreshToken> {
        return new RefreshToken({
            user: user,
            userAgent: values.userAgent,
            ipAddress: values.ipAddress,
        });
    }

    private static async createAccessToken(user: User) {
        return sign({sub: user._id}, process.env.ACCESS_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION});
    }

    async logout(refreshTokenRequest: { refreshToken: string }): Promise<void> {
        const refreshTokenObj = await this.retrieveRefreshToken(refreshTokenRequest.refreshToken);
        if(refreshTokenObj) {
            await this.refreshTokenRepository.delete(refreshTokenObj);
        } else {
            throw new ForbiddenException('Invalid refresh token');
        }
    }
}
