    import { Injectable } from '@nestjs/common';
    import { MailerService } from '@nestjs-modules/mailer';

    @Injectable()
    export class MailService {

        constructor(private readonly mailerService: MailerService) {}

        async sendMail(emailData: any): Promise<void>{
            try {
            await this.mailerService.sendMail({
                to: emailData.to,
                subject: emailData.subject,
                template: __dirname + '/templates/email',
                context: emailData,
            });
        
            console.log('Email sent successfully');
            } catch (error) {
            console.error('Failed to send email:', error);
            throw new Error('Failed to send email');
            }
        }
        
    }
