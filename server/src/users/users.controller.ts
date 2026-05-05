import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { CreateUserDto, UpdateUserDto } from './dtos/create-user.dto';
import { LoginUserDto, UserDto } from './dtos/user.dto';
import { AuthGuard } from '@/gaurds/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  @HttpCode(201)
  async createUser(@Body() user: CreateUserDto) {
    const { id, email, username } = await this.authService.signup(user);
    const token = this.jwtService.sign({ id });
    return { id, email, username, token };
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() user: LoginUserDto) {
    const { id, email, username } = await this.authService.login(user);
    const token = this.jwtService.sign({ id });
    return { id, email, username, token };
  }

  @HttpCode(204)
  @Delete('/signout')
  signout() {
    return;
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findUserById(@Param() data: { id: string }) {
    const user = await this.userService.findUserById(+data.id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async updateUser(@Param() data: { id: string }, @Body() user: UpdateUserDto) {
    return await this.userService.updateUser(+data.id, user);
  }

  @Delete('/:id/remove')
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async removeUser(@Param() data: { id: string }) {
    await this.userService.removeUser(+data.id);
  }
}
