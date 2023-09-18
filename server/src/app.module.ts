import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { RequestModule } from './controllers/request/request.module';

@Module({
  imports: [AuthModule, RequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
