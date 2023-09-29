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
import { UserRole } from '../../config/guards/roles.enum';
import { AdminLoginDto } from './dto/admin.dto';
import { Admin, AdminDocument } from 'src/schema/auth/admin.schema';
import { AdminRegisterDto } from './dto/adminRegister.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
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
    newUser.role = UserRole.USER;
    return await newUser.save();
  }

  async createAdmin(dto: AdminRegisterDto) {
    const existAdmin = await this.adminModel.findOne({ email: dto.email });
    if (existAdmin !== null) {
      throw new ConflictException('Email already exists');
    }

    const newAdmin = new this.adminModel(dto);
    newAdmin.role = UserRole.ADMIN;
    return await newAdmin.save();
  }

  async login(dto: LoginDto) {
    try {
        const existUser = await this.userModel.findOne({ email: dto.email });

        if (!existUser) {
          return {
            statusCode: 401,
            message: 'Email not found',
          };
        }

        if (existUser.password !== dto.password) {
          return {
            statusCode: 401,
            message: 'Incorrect password',
          };
        }

        const payload: JwtPayload = {
          name: existUser.firstName,
          email: existUser.email,
          _id: existUser._id,
          role: existUser.role,
        };

      const token = await this.jwtProvider.generateToken(payload);

      return {
        statusCode: 200,
        message: 'Login successful',
        token: token,
      };
    } catch (error) {
      console.error('Login error:', error);

      return {
        statusCode: 401,
        message: 'Authentication failed',
      };
    }
  }

  // admin login 
 async adminLogin(dto: AdminLoginDto) {
  try {
    // Add logic to check if the user with the provided credentials is an admin
    const existUser = await this.adminModel.findOne({ email: dto.email });

      if (!existUser) {
        return {
          statusCode: 401,
          message: 'Email not found',
        };
      }

      if (existUser.password !== dto.password) {
        return {
          statusCode: 401,
          message: 'Incorrect password',
        };
      }

      const payload: JwtPayload = {
        name: existUser.firstName,
        email: existUser.email,
        _id: existUser._id,
        role: existUser.role,
      };

    const token = await this.jwtProvider.generateToken(payload);

    return {
      statusCode: 200,
      message: 'Admin login successful',
      token: token,
    };
  } catch (error) {
    console.error('Admin login error:', error);

    return {
      statusCode: 401,
      message: 'Authentication failed',
    };
  }
 }

  async findAll() {
    return await this.userModel.find().select('-password').exec();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id }).select('-password').exec();
  }
}
