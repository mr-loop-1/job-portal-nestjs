import { Injectable } from '@nestjs/common';
import { Command, ConsoleIO } from '@squareboat/nest-console';
import bcrypt from 'bcrypt';
import { ulid } from 'ulid';
import { AppConfig } from '@libs/boat';
import { UserLibService } from '@lib/users';
@Injectable()
@Command('seed:admin', {
  desc: 'Command to create seed data for admin',
})
export class CreateAdmin {
  constructor(private readonly service: UserLibService) {}
  public async handle(_cli: ConsoleIO): Promise<void> {
    try {
      const name = await _cli.ask('Enter Name');
      const email = await _cli.ask('Enter Email');
      const password = await _cli.ask('Enter Password');
      const mobileNo = await _cli.ask('Enter Mobile No');
      const hashedPassword = await bcrypt.hash(
        password,
        AppConfig.get('auth.saltRounds'),
      );
      await this.service.repo.create({
        ulid: ulid(),
        name,
        email,
        password: hashedPassword,
        mobileNo,
        role: AppConfig.get('settings.role.admin'),
      });
      _cli.success('Admin Created');
    } catch (error) {
      console.log(error);
    }
    return;
  }
}
