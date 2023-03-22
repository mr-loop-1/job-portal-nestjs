import { pick, random } from 'lodash';
import bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfig, CacheStore, EmitEvent, Helpers } from '@libs/boat';
import { UserLibService } from '@lib/users';
import {
  UNAUTHORIZED,
  OTP_INCORRECT,
  OTP_NOT_FOUND,
  OTP_SENT,
  RESET_PASSWORD,
} from 'libs/common/constants';
import { CacheKeys } from 'libs/common/utils/cacheBuild';
import { IUser } from 'libs/common/interfaces';
import {
  AdminLoginDto,
  UserRegisterDto,
  ForgotPasswordDto,
  UserLoginDto,
  ResetPasswordDto,
} from '../dto/index';
import { ForgotPassword, ResetPassword, UserRegistered } from '../events';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserLibService,
  ) {}

  async userRegister(inputs: UserRegisterDto): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(
      inputs.password,
      AppConfig.get('auth.saltRounds'),
    );
    const createUser = {
      ulid: Helpers.ulid(),
      ...pick(inputs, ['name', 'email', 'skills', 'mobileNo', 'role']),
      password: hashedPassword,
      status: AppConfig.get('settings.status.active'),
    };
    const newUser = await this.userService.repo.create(createUser);

    await EmitEvent(
      new UserRegistered({
        userEmail: newUser.email,
      }),
    );

    const token = await this.__generateToken(newUser);
    return { ...newUser, token };
  }

  async adminLogin(inputs: AdminLoginDto): Promise<IUser> {
    const admin = await this.userService.repo.firstWhere({
      email: inputs.email,
    });
    if (!(await bcrypt.compare(inputs.password, admin.password))) {
      throw new HttpException(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    if (AppConfig.get('settings.role.admin') !== admin.role) {
      throw new HttpException(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    const token = await this.__generateToken(admin);
    return { ...admin, token: token };
  }

  async userLogin(inputs: UserLoginDto): Promise<IUser> {
    const user = await this.userService.repo.firstWhere({
      email: inputs.email,
    });
    if (
      !(await bcrypt.compare(inputs.password, user.password)) ||
      !AppConfig.get('settings.role.user').includes(user.role)
    ) {
      throw new HttpException(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    const token = await this.__generateToken(user);
    return { ...user, token: token };
  }

  async forgotPassword(inputs: ForgotPasswordDto): Promise<string> {
    const user = await this.userService.repo.firstWhere({
      email: inputs.email,
    });
    if (!AppConfig.get('settings.role.user').includes(user.role)) {
      throw new HttpException(UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    const key = CacheKeys.build(CacheKeys.FORGOT_PASSWORD, {
      email: inputs.email,
    });
    const otp = random(1000, 9999);

    await CacheStore().set(key, `${otp}`, AppConfig.get('settings.otpTimeout'));

    await EmitEvent(
      new ForgotPassword({
        userEmail: inputs.email,
        info: { otp: otp },
      }),
    );
    return OTP_SENT;
  }

  async resetPassword(inputs: ResetPasswordDto): Promise<string> {
    const key = CacheKeys.build(CacheKeys.FORGOT_PASSWORD, {
      email: inputs.email,
    });
    if (!(await CacheStore().has(key))) {
      throw new HttpException(OTP_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if ((await CacheStore().get(key)) !== inputs.otp) {
      throw new HttpException(OTP_INCORRECT, HttpStatus.FORBIDDEN);
    }
    await CacheStore().forget(key);
    await this.userService.repo.updateWhere(
      { email: inputs.email },
      { password: inputs.newPassword },
    );
    await EmitEvent(
      new ResetPassword({
        userEmail: inputs.email,
      }),
    );
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
