import { Controller, Get, Request, Sse, UseGuards } from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Notification } from '@entities/Notification.entity';
import { getAuthorizationApiHeader } from '@utils/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ReqUser } from '@/modules/user/dto/get-user-dto.dto';
import { SseAuthGuard } from '@/modules/auth/guards/sse-auth.guard';
import { NotificationsService } from './notifications.service';
import NotificationResponseDto from './dto/notification-response.dto';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOperation({ summary: 'Subscribe to notifications with EventSource' })
  @ApiResponse({ type: NotificationResponseDto })
  @ApiParam({ name: 'token', description: 'access token' })
  @Sse('/subscribe')
  @UseGuards(SseAuthGuard)
  sendNotification(@Request() req: ReqUser): Observable<unknown> {
    return this.notificationsService.subscribe(req.user);
  }

  @ApiOperation({ summary: 'Get notifications' })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiResponse({ type: [NotificationResponseDto] })
  @Get('/')
  @UseGuards(JwtAuthGuard)
  getNotification(@Request() req: ReqUser): Promise<Notification[]> {
    return this.notificationsService.getNotifications(req.user);
  }
}
