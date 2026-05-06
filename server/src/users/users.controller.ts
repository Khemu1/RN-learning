import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Serialize } from '@/interceptors/serialize.interceptor';
import { CreateUserDto, UpdateUserDto } from './dtos/create-user.dto';
import { LoginUserDto, UserDto } from './dtos/user.dto';
import { AuthGuard } from '@/gaurds/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { User } from './user.entity';

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

  @Put()
  @UseGuards(AuthGuard)
  async updateUser(
    @Body() user: UpdateUserDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.userService.updateUser(+currentUser.id, user);
  }

  @Delete()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async removeUser(@CurrentUser() currentUser: User) {
    await this.userService.removeUser(+currentUser.id);
  }
}
