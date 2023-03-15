import { pick } from 'lodash';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfig, CacheStore, Helpers } from '@libs/boat';
import { UserLibService } from '@lib/users';
import {
  NOT_ADMIN,
  NOT_USER,
  OTP_SENT,
  RESET_PASSWORD,
} from 'libs/common/constants';
import { CacheKeys } from 'libs/common/utils/cacheBuild';
import { IUser } from 'libs/common/interfaces';
import { AdminLoginDto } from '../dto/adminLogin';
import { ForgotPasswordDto } from '../dto/forgotPassword';
import { ResetPasswordDto } from '../dto/resetPassword';
import { UserLoginDto } from '../dto/userLogin';
import { UserRegisterDto } from '../dto/userRegister';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserLibService,
  ) {}

  async userRegister(inputs: UserRegisterDto): Promise<IUser> {
    const createUser = {
      ulid: Helpers.ulid(),
      ...pick(inputs, [
        'name',
        'email',
        'password',
        'skills',
        'mobileNo',
        'role',
      ]),
    };
    const newUser = await this.userService.repo.create(createUser);
    const token = await this.__generateToken(newUser);
    return { ...newUser, token };
  }

  async adminLogin(inputs: AdminLoginDto): Promise<IUser> {
    const admin = await this.userService.repo.firstWhere({
      email: inputs.email,
      password: inputs.password,
    });
    if (AppConfig.get('settings.role.admin') !== admin.role) {
      throw new HttpException(NOT_ADMIN, HttpStatus.UNAUTHORIZED);
    }
    const token = await this.__generateToken(admin);
    return { ...admin, token: token };
  }

  async userLogin(inputs: UserLoginDto): Promise<IUser> {
    const user = await this.userService.repo.firstWhere({
      email: inputs.email,
      password: inputs.password,
    });
    if (!AppConfig.get('settings.role.user').includes(user.role)) {
      throw new HttpException(NOT_USER, HttpStatus.UNAUTHORIZED);
    }
    const token = await this.__generateToken(user);
    return { ...user, token: token };
  }

  async forgotPassword(inputs: ForgotPasswordDto): Promise<string> {
    const user = await this.userService.repo.firstWhere({
      email: inputs.email,
    });
    if (!AppConfig.get('settings.role.user').includes(user.role)) {
      throw new HttpException(NOT_USER, HttpStatus.UNAUTHORIZED);
    }
    const key = CacheKeys.build(CacheKeys.FORGOT_PASSWORD, {
      email: inputs.email,
    });
    const otp = Math.floor(
      Math.random() * Math.pow(10, AppConfig.get('settings.otpLength')),
    );
    console.log('otp = ', `${otp}`);
    await CacheStore().set(key, `${otp}`, AppConfig.get('settings.otpTimeout'));
    //? SEND EMAIL TO USER
    return OTP_SENT;
  }

  async resetPassword(inputs: ResetPasswordDto): Promise<string> {
    const key = CacheKeys.build(CacheKeys.FORGOT_PASSWORD, {
      email: inputs.email,
    });
    Helpers.throwForbiddenIf(
      !(await CacheStore().has(key)) ||
        (await CacheStore().get(key)) !== inputs.otp,
      AppConfig.get('error.incorrectOtp'),
    );
    await CacheStore().forget(key);
    await this.userService.repo.updateWhere(
      { email: inputs.email },
      { password: inputs.newPassword },
    );
    //? SEND EMAIL to USER
    return RESET_PASSWORD;
  }

  async __generateToken(user: IUser): Promise<string> {
    const payload = {
      sub: user.id,
      name: user.name,
      role: user.role,
    };
    return await this.jwtService.signAsync(payload);
  }
}
