import { UserLibService } from '@lib/users';
import { AppConfig, CacheKey, CacheStore } from '@libs/boat';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'libs/common/interfaces';
import { CacheKeys } from 'libs/common/utils/cacheBuild';
import { ulid } from 'ulid';
import { resetPasswordDto } from '../dto/resetPassword';
import { UserRegisterDto } from '../dto/userRegister';


@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserLibService
    ) { };

    async addUser(inputs: UserRegisterDto): Promise<IUser> {

        const createUser = {
            ulid: ulid(),
            name: inputs.name,
            email: inputs.email,
            password: inputs.password,
            skills:  inputs.skills,
            mobileNo: inputs.mobileNo,
            role: inputs.role
        }

        const newUser = await this.userService.repo.create({
            createUser
        })

        const token = await this.generateToken(newUser);
        return {...newUser, token};
    }

    async adminLogin(email: string, password: string): Promise<IUser> {

        const admin = await this.userService.repo.firstWhere({ email: email, password: password });
        const token = await this.generateToken(admin);
        return {...admin, token: token};

    }

    async userLogin(email: string, password: string): Promise<IUser> {
        
        const user = await this.userService.repo.firstWhere({ email: email, password: password });
        const token = await this.generateToken(user);
        return {...user, token: token};

    }

    async generateToken(user: IUser) : Promise<string> {
        const payload = { 
            sub: user.id, 
            name: user.name, 
            role: user.role
        };
        return await this.jwtService.signAsync(payload);
    }

    async forgotPasswordHandler(email: string) : Promise<string> {

        if(await this.userService.repo.existsUserEmail(email)) {

            const key = CacheKeys.build(
                CacheKeys.FORGOT_PASSWORD, {
                    email: email
                }
            );

            console.log("kwy = ",key);

            const otp = await CacheStore().get(key);
            console.log('otp = ',`${otp}`);
            
            await CacheStore().set(key, `${otp}`, 10*60);

            return "Otp sent on mail"
        }
        else {
            throw new HttpException("Email doesn't exists", HttpStatus.FORBIDDEN);
        }
    }

    async resetUser(inputs: resetPasswordDto) : Promise<any> {

        if(await this.userService.repo.existsUserEmail(inputs.email)) {

            const key = CacheKeys.build(
                CacheKeys.FORGOT_PASSWORD, {
                    email: inputs.email
                }
            );
    
            const storedOtp = await CacheStore().get(key);
    
            if(`${storedOtp}` === inputs.otp) {
    
                const updatedUser = await this.userService.repo.updateWhere(
                    {email: inputs.email},
                    {password: inputs.newPassword}
                )
                
                const user = await this.userService.repo.firstWhere({ email: inputs.email, password: inputs.newPassword });
                const token = await this.generateToken(user);
                return {...user, token};
            }
            else {
                throw new HttpException('Incorrect Otp entered', HttpStatus.UNAUTHORIZED)
            }
        }
        else {
            throw new HttpException("Email doesn't exists", HttpStatus.FORBIDDEN);
        }

    }
}
