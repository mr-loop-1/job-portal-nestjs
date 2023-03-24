import { pick, random } from 'lodash';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfig, CacheStore, EmitEvent, Hash, Helpers } from '@libs/boat';
import { UserLibService } from '@lib/users';
import { ERROR, SUCCESS } from 'libs/common/constants';
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
    const hashedPassword = await Hash.make(inputs.password);
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
    if (
      !(await Hash.compare(inputs.password, admin.password)) ||
      AppConfig.get('settings.role.admin') !== admin.role
    ) {
      throw new HttpException(ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    const token = await this.__generateToken(admin);
    return { ...admin, token: token };
  }

  async userLogin(inputs: UserLoginDto): Promise<IUser> {
    const user = await this.userService.repo.firstWhere({
      email: inputs.email,
    });
    if (
      !(await Hash.compare(inputs.password, user.password)) ||
      !AppConfig.get('settings.role.user').includes(user.role)
    ) {
      throw new HttpException(ERROR.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    const token = await this.__generateToken(user);
    return { ...user, token: token };
  }

  async forgotPassword(inputs: ForgotPasswordDto): Promise<string> {
    const user = await this.userService.repo.firstWhere({
      email: inputs.email,
    });
    if (!AppConfig.get('settings.role.user').includes(user.role)) {
      throw new HttpException(ERROR.CANNOT_RESET, HttpStatus.UNAUTHORIZED);
    }
    const key = CacheKeys.build(CacheKeys.FORGOT_PASSWORD, {
      email: inputs.email,
    });

    if (await CacheStore().has(key)) {
      await EmitEvent(
        new ForgotPassword({
          userEmail: inputs.email,
          info: { otp: await CacheStore().get(key) },
        }),
      );
      return SUCCESS.OTP_SENT;
    }

    const otp = random(1000, 9999);

    await CacheStore().set(key, `${otp}`, AppConfig.get('settings.otpTimeout'));

    await EmitEvent(
      new ForgotPassword({
        userEmail: inputs.email,
        info: { otp: otp },
      }),
    );
    return SUCCESS.OTP_SENT;
  }

  async resetPassword(inputs: ResetPasswordDto): Promise<string> {
    const key = CacheKeys.build(CacheKeys.FORGOT_PASSWORD, {
      email: inputs.email,
    });
    if (!(await CacheStore().has(key))) {
      throw new HttpException(ERROR.OTP_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if ((await CacheStore().get(key)) !== inputs.otp) {
      throw new HttpException(ERROR.OTP_INCORRECT, HttpStatus.FORBIDDEN);
    }
    await CacheStore().forget(key);
    const hashedNewPassword = await Hash.make(inputs.newPassword);
    await this.userService.repo.updateWhere(
      { email: inputs.email },
      { password: hashedNewPassword },
    );
    await EmitEvent(
      new ResetPassword({
        userEmail: inputs.email,
      }),
    );
    return SUCCESS.RESET_PASSWORD;
  }

  async __generateToken(user: IUser): Promise<string> {
    const payload = {
      sub: user.id,
      ulid: user.ulid,
      name: user.name,
      role: user.role,
    };
    return await this.jwtService.signAsync(payload);
  }
}
