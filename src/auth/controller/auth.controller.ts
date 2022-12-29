import {Body, Controller, Delete, ForbiddenException, Ip, Post, Req} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import {LoginRequest} from "../dto/loginRequest";
import {User} from "../../users/entities/user.schema";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login (
      @Body() loginRequest: LoginRequest,
      @Req() req,
      @Ip() ip: string
  ): Promise<{user: User, refreshToken: string, accessToken: string} | undefined> {
      console.log({ip})
    const res = await this.authService.login(loginRequest.email, loginRequest.password, {
        userAgent: req.headers['user-agent'],
        ipAddress: ip
    });
    if (res) {
      res.user.password = undefined;
      return res;
    } else {
      throw new ForbiddenException('Invalid credentials');
    }
  }

  @Post('refresh')
    async refresh (
        @Body() refreshToken: { refreshToken: string }
    ): Promise<string | undefined> {
        const res = await this.authService.refresh(refreshToken);
        if (res) {
            return res;
        } else {
            throw new ForbiddenException('Invalid credentials');
        }
    }

    @Delete('logout')
    async logout (
        @Body() refreshTokenRequest: { refreshToken: string }
    ): Promise<void> {
        await this.authService.logout(refreshTokenRequest);
    }
}
