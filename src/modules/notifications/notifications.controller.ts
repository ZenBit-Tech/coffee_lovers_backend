import {
  Controller,
  Get,
  Request,
  Sse,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Notification } from '@entities/Notification.entity';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { NotificationsService } from './notifications.service';
import { NotificationEvent } from './types';
import { ReqUser } from '@/modules/user/dto/get-user-dto.dto';
import { SseAuthGuard } from '@/modules/auth/guards/sse-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Sse('/subscribe')
  @UseGuards(SseAuthGuard)
  sendNotification(@Request() req: ReqUser): Observable<unknown> {
    return this.notificationsService.subscribe(req.user);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getNotification(@Request() req: ReqUser): Promise<Notification[]> {
    return this.notificationsService.getNotifications(req.user);
  }
}
