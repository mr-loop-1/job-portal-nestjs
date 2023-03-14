import { UserLibService } from '@lib/users';
import { CacheStore } from '@libs/boat';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'libs/common/interfaces';
import { CacheKeys } from 'libs/common/utils/cacheBuild';
import { ulid } from 'ulid';
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
      ulid: ulid(),
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      skills: inputs.skills,
      mobileNo: inputs.mobileNo,
      role: inputs.role,
    };
    const newUser = await this.userService.repo.create({
      ...createUser,
    });
    const token = await this.__generateToken(newUser);
    return { ...newUser, token };
  }

  async adminLogin(inputs: AdminLoginDto): Promise<IUser> {
    const admin = await this.userService.repo.firstWhere({
      email: inputs.email,
      password: inputs.password,
    });
    // if(admin.role!==3) {
    //     throw new
    // }
    const token = await this.__generateToken(admin);
    return { ...admin, token: token };
  }

  async userLogin(inputs: UserLoginDto): Promise<IUser> {
    const user = await this.userService.repo.firstWhere({
      email: inputs.email,
      password: inputs.password,
    });
    const token = await this.__generateToken(user);
    return { ...user, token: token };
  }

  async forgotPassword(inputs: ForgotPasswordDto): Promise<string> {
    if (await this.userService.repo.existsUserEmail(inputs.email)) {
      throw new HttpException("Email doesn't exists", HttpStatus.FORBIDDEN);
    }
    const key = CacheKeys.build(CacheKeys.FORGOT_PASSWORD, {
      email: inputs.email,
    });
    const otp = Math.floor(Math.random() * 10000);
    console.log('otp = ', `${otp}`);
    await CacheStore().set(key, `${otp}`, 10 * 60);
    return 'Otp sent on mail';
  }

  async resetPassword(inputs: ResetPasswordDto): Promise<IUser> {
    if (await this.userService.repo.existsUserEmail(inputs.email)) {
      throw new HttpException("Email doesn't exists", HttpStatus.FORBIDDEN);
    }

    const key = CacheKeys.build(CacheKeys.FORGOT_PASSWORD, {
      email: inputs.email,
    });

    if (!(await CacheStore().has(key))) {
    }

    if ((await CacheStore().get(key)) !== inputs.otp) {
      throw new HttpException('Incorrect Otp entered', HttpStatus.UNAUTHORIZED);
    }

    await this.userService.repo.updateWhere(
      { email: inputs.email },
      { password: inputs.newPassword },
    );
    const user = await this.userService.repo.firstWhere({
      email: inputs.email,
      password: inputs.newPassword,
    });
    const token = await this.__generateToken(user);
    return { ...user, token };
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
