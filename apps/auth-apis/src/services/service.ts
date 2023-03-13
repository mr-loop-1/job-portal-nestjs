import { AdminLibService, UserLibService } from '@lib/users';
import { AppConfig, CacheKey, CacheStore, ExceptionFilter } from '@libs/boat';
import { Body, ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Mailman, MailMessage } from "@squareboat/nest-mailman";
import { IAdmin, IUser } from 'libs/common/interfaces';
import { CacheKeys } from 'libs/common/utils/cacheBuild';
import { ulid } from 'ulid';
import { resetDto } from '../dto/reset';
import { UserSignupDto } from '../dto/userSignup';


export type User = any;
export type Admin = any;

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly adminService: AdminLibService,
        private readonly userService: UserLibService
    ) { };

    async addUser(inputs: UserSignupDto): Promise<IAdmin> {

        const newUser = await this.adminService.repo.create({
            ulid: ulid(),
            ...inputs
        })

        const token = await this.generateToken(newUser);
        return {...newUser, token};
    }

    async adminLogin(email: string, password: string): Promise<IAdmin> {

        const admin = await this.adminService.repo.firstWhere({ email: email, password: password });
        const token = await this.generateToken(admin);
        return {...admin, token: token};

    }

    async userLogin(email: string, password: string): Promise<IAdmin> {
        
        const admin = await this.adminService.repo.firstWhere({ email: email, password: password });
        const token = await this.generateToken(admin);
        return {...admin, token: token};

    }

    async generateToken(admin: IAdmin) : Promise<string> {
        const payload = { 
            sub: admin.id, 
            name: admin.name, 
            role: admin.role
        };
        return await this.jwtService.signAsync(payload);
    }

    async forgotHandler(email: string) : Promise<string> {

        if(await this.adminService.repo.existsUserEmail(email)) {

            const key = CacheKeys.build(
                CacheKeys.FORGOT_PASSWORD, {
                    email: email
                }
            );

            const otp = await CacheStore().get(key);
            console.log(otp);
            
            await CacheStore().set(key, `${otp}`, 10*60);

            const mail = MailMessage.init()
                .line(otp.toString());

            Mailman.init()
                .to(email)
                .send(mail);
            
            return "Otp sent on mail"
        }
        else {
            return "Email Not Valid"
        }
    }

    async resetUser(inputs: resetDto) : Promise<any> {
        
        const key = CacheKeys.build(
            CacheKeys.FORGOT_PASSWORD, {
                email: inputs.email
            }
        );

        const storedOtp = await CacheStore().get(key);

        if(storedOtp.toString() === inputs.otp) {

            const updatedUser = await this.adminService.repo.updateWhere(
                {email: inputs.email},
                {password: inputs.newPassword}
            )
            
            const user = await this.adminService.repo.firstWhere({ email: inputs.email, password: inputs.newPassword });
            const token = await this.generateToken(user);
            return {...user, token};
        }


    }
}
