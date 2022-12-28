import {Body, Controller, ForbiddenException, Post} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import {LoginRequest} from "../dto/loginRequest";
import {User} from "../../users/entities/user.schema";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login (
      @Body() loginRequest: LoginRequest
  ): Promise<{user: User, refreshToken: string, accessToken: string} | undefined> {
    const res = await this.authService.login(loginRequest.email, loginRequest.password, loginRequest.values);

    if (res) {
      res.user.password = undefined;
      return res;
    } else {
      throw new ForbiddenException('Invalid credentials');
    }
  }
}
