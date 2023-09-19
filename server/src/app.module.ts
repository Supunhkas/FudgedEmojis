import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { RequestModule } from './controllers/request/request.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


@Module({
  imports: [
    AuthModule,
    RequestModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
        defaults: {
          from: 'jayakabaraya@gmail.com',
        },
        template: {
          dir: __dirname + 'mails',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }}),
    
    }),
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
