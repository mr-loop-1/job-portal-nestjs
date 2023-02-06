import { Request, Response, RestController } from '@libs/boat';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { CreateUserDTO } from '@app/dto/create-user.dto';
import { AuthService } from '../services';
@Controller('auth')
export class AuthController extends RestController {
  usersService: any;
  constructor(private service: AuthService) {
    super();

  }
  @Post('/signup')
  Users(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/login')
  LoginUsers(@Body() createUserDto: CreateUserDTO) {
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
