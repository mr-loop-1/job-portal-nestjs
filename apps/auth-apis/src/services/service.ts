import { AdminLibService, UserLibService } from '@lib/users';
import { AppConfig } from '@libs/boat';
import { Body, ConsoleLogger, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Mailman, MailMessage } from "@squareboat/nest-mailman";
import { IAdmin } from 'libs/common/interfaces';
import { ulid } from 'ulid';


export type User = any;
export type Admin = any;

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly adminService: AdminLibService,
        private readonly userService: UserLibService
    ) { };

    async addUser(@Body() body): Promise<User | undefined> {

        //? duplicate email check - Done at decorator

        const newU = await this.adminService.repo.create({
            ulid: ulid(),
            email: body.email,
            password: body.password,
            role: body.role
        })

        if(newU) {
            //* success create

            //? login and return
            return this.generateToken(newU)
        }
        else {
            //! failure create

            //? return creation error
        }
    }

    async adminLogin(email: string, password: string): Promise<any> {
        
        const admin = await this.adminService.repo.firstWhere({email: email, password: password, role: 3});
        console.log(admin );

        if(admin) {
            //* Success

            console.log('success -----------')
            //? Fetch the details instead of just checking - DONE
            return this.generateToken(admin);
            //? Make a login request - DONE
        }
        else {
            //! Failure

            console.log('failure -----------');
            //? Invalid credentials error return
        }
    }

    async userLogin(email: string, password: string, role: number): Promise<Admin | undefined> {
        
        const user = await this.adminService.repo.firstWhere({email: email, password: password, role: role});
        console.log(user);

        if(user) {
            //* Success

            console.log('success -----------')
            //? Fetch the details instead of just checking - DONE
            return this.generateToken(user);
            //? Make a login request - DONE
        }
        else {
            //! Failure

            console.log('failure -----------');
            //? Invalid credentials error return
        }
    }

    generateToken(admin: IAdmin) : string {
        const payload = { 
            sub: admin.ulid, 
            name: admin.name, 
            role: admin.role
        };
        return this.jwtService.sign(payload);
    }

    async forgotHandler(email: string) {

        if(await this.adminService.repo.existsEmail(email)) {
            //* valid email, proceed to reset

            //? make an otp
            //? send a mail

            const otp = 1111;

            const mail = MailMessage.init()
                .line(otp.toString());


            //? send a beautified email

            Mailman.init()
                .to(email) // OR .to(['id1@email.com', 'id2@email.com'])
                .send(mail);

            //? store the otp in cache
            //? send the confirmation message

            return {'message': 'check your mail'}

        }
        else {
            //! Invalid email

            //? report email not found
        }
    }

    async resetUser(@Body() body) {
        
    }
}
