import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Sse,
  UseGuards,
  HttpCode,
  Param,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Notification } from '@entities/Notification.entity';
import { getAuthorizationApiHeader } from '@utils/swagger';
import { HttpStatus } from '@nestjs/common/enums';
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

  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiHeader(getAuthorizationApiHeader())
  @Post('/markall')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  markAllNotificationsAsRead(@Request() req: ReqUser): Promise<void> {
    return this.notificationsService.markAllNotificationsAsRead(req.user);
  }

  @ApiOperation({ summary: 'Mark notifications as read' })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiBody({ isArray: true, type: Number })
  @Post('/mark')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  markNotificationsAsRead(@Request() req: ReqUser, @Body() body: number[]) {
    return this.notificationsService.markNotificationsAsRead(req.user, body);
  }
}
