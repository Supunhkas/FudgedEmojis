import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [ MailerModule.forRootAsync({
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
      defaults: {
        from: 'fudgedemoji@gmail.com',
      },
      
      template: {
        dir: join(__dirname, './templates/email.hbs'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: false,
        },
      },
    }),

  }),],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
    