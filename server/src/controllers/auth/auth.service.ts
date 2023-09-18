import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schema/auth/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  validateUser(email: string, password: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(dto: RegisterDto) {
    const existUser = await this.userModel.findOne({ email: dto.email });
    if (existUser !== null) {
      throw new ConflictException('Email already exists');
    }

    const newUser = new this.userModel(dto);
    return await newUser.save();
  }

  async login(dto: LoginDto) {
    const existUser = await this.userModel.findOne({ email: dto.email });

    if (existUser === null) {
      throw new UnauthorizedException('Email not found');
    }
    if (existUser.password !== dto.password) {
      throw new UnauthorizedException('Incorrect password');
    }
    return { statusCode: 200 };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, dto: RegisterDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
