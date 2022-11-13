import { v4 as uuidv4 } from 'uuid';
import {
  Injectable,
  Inject,
  InternalServerErrorException,
  HttpException,
  forwardRef,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { User } from '@entities/User.entity';
import { UserService } from '@/modules/user/user.service';
import { passwordResetRoute, passwordResetSubject } from './constants';
import resetPasswordTemplate from './templates/resetPassword';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async sendResetPassword(user: User): Promise<void> {
    try {
      const key = uuidv4();
      this.userService.updateUserByEmail(user.email, {
        reset_password_key: key,
      });
      const url = `${
        this.configService.get('CLIENT_URL') + passwordResetRoute
      }/${key}`;
      await this.sendMail(
        user,
        passwordResetSubject,
        resetPasswordTemplate(url),
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  private async sendMail(
    user: User,
    subject: string,
    html: string,
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject,
        html,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
