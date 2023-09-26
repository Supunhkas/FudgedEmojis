import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { RequestModule } from './controllers/request/request.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MulterModule } from '@nestjs/platform-express';
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
          
cloudinary.config({ 
  cloud_name: 'dpjw4jihq', 
  api_key: '557773761185323', 
  api_secret: 'fiz-nYpxaj3RYwuFVDF24kmVFpM' 
});

@Module({
  imports: [
    AuthModule,
    RequestModule,
    CloudinaryModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587, 
          secure: false, 
          auth: {
            user: 'fudgedemoji@gmail.com',
            pass: 'ruiwatofyhkcxvro',
          },
        },
        // defaults: {
        //   from: '',
        // },
        // template: {
        //   dir: __dirname + './mails/template.hbs',
        //   adapter: new HandlebarsAdapter(),
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
    }),
    MulterModule.register({
      
    }),
    CloudinaryModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
