import { AppConfig } from '@libs/boat';
import { Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Mailman, MailMessage } from "@squareboat/nest-mailman";


export type User = any;
export type Admin = any;

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService
    ) { };

    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
            role: 1
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
            role: 2
        },
        {
            userId: 3,
            username: 'a',
            password: 'b',
            role: 1
        }
    ];

    private readonly admin = {
        adminId: 1,
        adminName: 'abdul',
        adminPassword: 'samad',
        role: 3
    }

    async addUser(@Body() body): Promise<User | undefined> {
        // console.log(b);
        const newUser = {
            userId: Math.random() * 1000,
            username: body.username,
            password: body.password,
            role: body.role
        }
        this.users.push(newUser)
        console.log(this.users);
        return newUser
    }

    async adminLogin(@Body() body): Promise<Admin | undefined> {
        if (body.username === this.admin.adminName
            && body.password === this.admin.adminPassword) {
            return { message: 'admin logged in', token: await this.login(this.admin) };
        }
        else {
            return { message: 'invalid credentials for admin' }
        }
    }

    async checkEmail(username: string): Promise<boolean | undefined> {
        console.log(this.users)
        return this.users.some(user => user.username === username);
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async validateUser(@Body() body): Promise<any> {
        console.log(this.users);
        const user = await this.findOne(body.username);
        if (user && user.password === body.password) {
            // const { password, ...result } = user;
            return user;
        }
        return null;
    }

    async login(user: any) {
        console.log(user);
        // console.log(AppConfig.get('app.name'))
        const payload = { username: user.username, sub: user.userId, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async sendMail(email: string) {

        const otp = 1111;

        const mail = MailMessage.init()
            .line(otp.toString());

        Mailman.init()
            .to('abdul.samad@squareboat.com') // OR .to(['id1@email.com', 'id2@email.com'])
            .send(mail);
    }
}
