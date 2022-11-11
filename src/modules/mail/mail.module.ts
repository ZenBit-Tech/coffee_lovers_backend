import { MailerModule } from '@nestjs-modules/mailer';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '@/modules/user/user.module';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('SMPT_HOST'),
          port: config.get('SMPT_PORT'),
          ignoreTLS: true,
          secure: true,
          auth: {
            user: config.get('SMPT_USER'),
            pass: config.get('SMTP_PASSWORD'),
          },
        },
        defaults: {
          from: `"${config.get('MAIL_NAME')}" <${config.get('MAIL_ADDRESS')}>`,
        },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UserModule),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
