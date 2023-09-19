import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() dto: RegisterDto) {
    return this.authService.create(dto);
  }

  @Post('login')
    async login(@Body() dto: LoginDto) {
      return await this.authService.login(dto);
    }
  

  @Get('all-users')
  findAll() {
    return this.authService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() dto: RegisterDto) {
    return this.authService.update(+id, dto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
