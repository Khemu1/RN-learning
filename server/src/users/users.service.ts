import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(data: {
    email: string;
    password: string;
    username: string;
  }) {
    const user = this.repo.create({
      email: data.email,
      password: data.password,
      username: data.username,
    });
    return await this.repo.save(user);
  }

  async findUsersByEmail(email: string) {
    const user = await this.repo.findBy({ email });
    return user;
  }

  async isEmailTaken(email: string) {
    const [user] = await this.findUsersByEmail(email);
    return user;
  }

  async findUserById(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      select: {
        email: true,
        id: true,
      },
    });
    return user;
  }

  async removeUser(id: number) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.repo.remove(user);
  }

  async updateUser(id: number, data: Partial<User>) {
    const foundUser = await this.findUserById(id);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    if (data.email) {
      const isEmailTaken = await this.isEmailTaken(data.email);
      if (isEmailTaken && isEmailTaken.id !== id) {
        throw new BadRequestException('Email already exists');
      }
    }
    if (data.password) {
      if (data.password.length < 3) {
        throw new BadRequestException('Password must be at least 6 characters');
      }
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(data.password, salt, 32)) as Buffer;
      const res = salt + '.' + hash.toString('hex');
      data.password = res;
    }
    Object.assign(foundUser, data);
    await this.repo.save(foundUser);
  }
}
