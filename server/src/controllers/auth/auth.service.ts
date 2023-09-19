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
import { JwtPayload } from './jwt/jwt.payload';
import { JwtProvider } from './jwt/jwt.provider';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtProvider: JwtProvider,
  ) {}

  async validateUser(payload: JwtPayload) {
    const currentUser = await this.userModel
      .findOne({
        email: payload.email,
      })
      .select('-password');

    if (!currentUser) {
      throw new UnauthorizedException('Unauthorized user');
    }

    return currentUser;
  }

  async create(dto: RegisterDto) {
    const existUser = await this.userModel.findOne({ email: dto.email });
    if (existUser !== null) {
      throw new ConflictException('Email already exists');
    }

    const newUser = new this.userModel(dto);
    return await newUser.save();
  }

  async login(dto: LoginDto) {
    try {
      const existUser = await this.userModel.findOne({ email: dto.email });

      if (!existUser) {
        throw new UnauthorizedException('Email not found');
      }

      if (existUser.password !== dto.password) {
        throw new UnauthorizedException('Incorrect password');
      }
      const payload: JwtPayload = {
        name: existUser.name,
        email: existUser.email,
        _id: existUser._id,
       
      };
      const token = await this.jwtProvider.generateToken(payload);

      return { statusCode: 200, token: token };
    } catch (error) {
      console.error('Login error:', error);
      throw new UnauthorizedException('Authentication failed');
    }
  }

  async findAll() {
    return await this.userModel.find().select('-password').exec();
  }

 async findOne(id: string) {
  return await this.userModel
  .findOne({ _id: id })
  .select('-password')
  .exec();
  }

  update(id: number, dto: RegisterDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: string) {
    return `This action removes a #${id} auth`;
  }
}
