import { Request, Response, RestController } from '@libs/boat';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { UserService } from '../services';
import { UserDetailTransformer } from '@app/transformer';
import { CreateUserDTO } from '@app/dto/create-user.dto';
@Controller('users')
export class UserController extends RestController {
  usersService: any;
  constructor(private service: UserService) {
    super();

  }
  @Post()
  Users(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.findUsers();
  }

  @Get(":id")
  findUserById(@Param("id") id: number) {
    return this.usersService.findUser(+id);
  }

  @Put(":id")
  updateUser(@Param("id") id: number, @Body() updateUserDto: CreateUserDTO) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: number) {
    return this.usersService.deleteUser(+id);
  }
 
}


